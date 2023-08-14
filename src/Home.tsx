import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Text,
  VStack
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import { ApiResponse } from './types/ApiResponse'
import { queryApi, getCardsFromApiResponse } from './lib/api'
import { Nav } from './components/Nav'
import { useLoadGraph, SigmaContainer } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import Graph from 'graphology'

export const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)
  const [graphData, setGraphData] = useState<any>(null)

  const pageSize = 100

  const handleSearch = async (query: string): Promise<void> => {
    console.log('Search query:', query)

    try {
      setIsSearching(true)
      setIsError(false)
      const response = await queryApi(query)
      setData(response)
    } catch (error) {
      setError(error)
      setIsError(true)
      console.error('Error fetching data from API:', error)
    }
    setIsSearching(false)
  }

  const displaySuccess = data && !isError && !isSearching
  const displayError = isError && !isSearching
  const nbOfPages = data ? Math.ceil(data.total / pageSize) : 0

  console.log('nbOfPages:', nbOfPages)

  return (
    <>
      <Box maxH='100vh'>
        <Nav>
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        </Nav>

        {displayAPIError()}
        {displayAPISuccess()}

        <Flex width='100%' height='100vh'>
          <Box flex='1' bg='white' p={4} overflowY='auto'>
            {resultsPane()}
          </Box>
          <Box flex='2' bg='cyan' p={4}>
            {graphPane()}
          </Box>
        </Flex>
      </Box>
    </>
  )

  function resultsPane () {
    return (
      <>
        <VStack spacing={4}>{data && getCardsFromApiResponse(data)}</VStack>
        {!data && (
          <Center>
            <Text>Make a query to see the results</Text>
          </Center>
        )}
      </>
    )
  }

  function graphPane () {
    return (
      <>
        <DisplayGraph />
      </>
    )
  }

  function displayAPIError () {
    return (
      <>
        {displayError && (
          <div>
            <VStack spacing={4} m='1rem'>
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
            </VStack>
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
              <Text fontSize={'sm'} size={'sm'}>
                Search returned <b> {data.total.toLocaleString(undefined)} </b>{' '}
                results.
              </Text>
            </Alert>
          </div>
        )}
      </>
    )
  }
}

export const LoadGraph = () => {
  const loadGraph = useLoadGraph()

  useEffect(() => {
    const graph = new Graph()
    graph.addNode('first', {
      x: 0,
      y: 0,
      size: 15,
      label: 'My first node',
      color: '#FA4F40'
    })
    loadGraph(graph)
  }, [loadGraph])

  return null
}

export const DisplayGraph = () => {
  return (
    <SigmaContainer>
      <LoadGraph />
    </SigmaContainer>
  )
}
