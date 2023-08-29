import React, { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Divider,
  Flex,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import { ApiResponse } from './types/ApiResponse'
import { querySearchApi, getCardsFromApiResponse, queryGraph } from './lib/api'
import { Nav } from './components/Nav'
import { SigmaContainer } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import Graph from 'graphology'

import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image'
import { GraphEvents } from './components/GraphEvents'
import { CircleLoader } from 'react-spinners'

export const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)
  const [graphData, setGraphData] = useState<Graph | null>(null)

  // Graph
  const pageSize = 100

  const handleSearch = async (query: string): Promise<void> => {
    console.log('Search query:', query)

    try {
      setIsSearching(true)
      setIsError(false)

      const response = await querySearchApi(query)
      setData(response)

      const graphResponse = await queryGraph(query)
      setGraphData(graphResponse)
    } catch (error) {
      setError(error)
      setIsError(true)
      console.error('Error fetching data from API:', error)
    }
    setIsSearching(false)
  }

  const displaySuccess = data && !isError && !isSearching
  const displayError = isError && !isSearching
  const lessNodesThanResults =
    graphData && graphData.nodes.length !== data?.total

  const nbOfPages = data ? Math.ceil(data.total / pageSize) : 0

  console.log('nbOfPages:', nbOfPages)

  return (
    <>
      <Box maxH='100vh' h='100%' objectFit={'fill'}>
        <Nav>
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        </Nav>

        {displayAPIError()}

        <Flex
          width='100%'
          height='94vh'
          bg={useColorModeValue('blue.100', 'gray.900')}
          overflow={'clip'}
        >
          <Box flex='1'>
            {displayAPISuccess()}
            <Box p={4} overflowY='auto' maxH='90vh'>
              {ResultsPane()}
            </Box>
          </Box>
          <Divider
            orientation='vertical'
            bg={useColorModeValue('gray.900', 'gray.100')}
          />
          <Box
            flex='2'
            bg={useColorModeValue('white', 'gray.900')}
            p={0}
            h='94vh'
          >
            {GraphPane()}
          </Box>
        </Flex>
      </Box>
    </>
  )

  function ResultsPane (): JSX.Element {
    return (
      <>
        {!data && !isSearching && (
          <Center h='80vh'>
            <Text>Make a query first to see results</Text>
          </Center>
        )}
        {data && !isSearching && data.records.length === 0 && (
          <Center h='80vh'>
            <Text>No results for this query. Please try again</Text>
          </Center>
        )}
        {!data && isSearching && (
          <Box p={4}>
            <Center h='80vh'>
              <CircleLoader size={100} />
            </Center>
          </Box>
        )}

        <VStack spacing={4}>
          {data && data.records && getCardsFromApiResponse(data)}
        </VStack>
      </>
    )
  }

  function GraphPane (): JSX.Element {
    return (
      <>
        {!graphData && !isSearching && (
          <Box p={4}>
            <Center h='80vh'>
              <Text>
                The results will appear here as a network of documents, UN
                entities, countries...
              </Text>
            </Center>
          </Box>
        )}
        {!graphData && isSearching && (
          <Box p={4}>
            <Center h='80vh'>
              <CircleLoader size={100} />
            </Center>
          </Box>
        )}
        {lessNodesThanResults && displayGraphWarning()}
        {graphData && (
          <SigmaContainer
            graph={graphData}
            settings={{
              nodeProgramClasses: { image: getNodeProgramImage() },
              // labelRenderer: drawLabel,
              defaultNodeType: 'image',
              defaultEdgeType: 'arrow',
              labelDensity: 0.1,
              labelGridCellSize: 100,
              labelRenderedSizeThreshold: 6,
              labelFont: 'Helvetica Neue, sans-serif',
              labelWeight: '300',
              zIndex: true
            }}
          >
            <GraphEvents />
          </SigmaContainer>
        )}
      </>
    )
  }

  function displayAPIError () {
    return (
      <>
        {displayError && (
          <div>
            <Alert status='error' variant='left-accent'>
              <AlertIcon />
              <AlertTitle>Oops... </AlertTitle>
              <AlertDescription>
                <Text>
                  There was an error fetching the API: {error.message}
                </Text>
              </AlertDescription>
            </Alert>
            <Text align='start' w='100'></Text>
          </div>
        )}
      </>
    )
  }

  function displayGraphWarning () {
    return (
      <>
        {lessNodesThanResults && (
          <div>
            <Alert status='warning' variant='top-accent'>
              <AlertIcon />
              <AlertTitle>Information </AlertTitle>
              <AlertDescription>
                <Text>
                  Some results were not displayed in the graph because they were
                  not yet passed through the ML pipeline{' '}
                  <b>
                    ({graphData.nodes().length}/{data!.total})
                  </b>
                  .
                </Text>
              </AlertDescription>
            </Alert>
            <Text align='start' w='100'></Text>
          </div>
        )}
      </>
    )
  }

  function displayAPISuccess () {
    return (
      <>
        {displaySuccess && (
          <div>
            <Alert
              status={data.total > 0 ? 'success' : 'warning'}
              variant='top-accent'
              maxH={'40'}
            >
              <AlertIcon />
              {data && data.records.length !== 0 && (
                <Text fontSize={'sm'} size={'sm'}>
                  Search returned{' '}
                  <b> {data.total.toLocaleString(undefined)} </b> results.
                </Text>
              )}
              {data && data.records.length === 0 && (
                <Text fontSize={'sm'} size={'sm'}>
                  Search returned <b>0</b> results.
                </Text>
              )}
            </Alert>
          </div>
        )}
      </>
    )
  }
}
