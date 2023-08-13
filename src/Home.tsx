import React, { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Code,
  Divider,
  Flex,
  SlideFade,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import { ApiResponse } from './types/ApiResponse'
import { queryApi, getCardsFromApiResponse } from './lib/api'
import { Nav } from './components/Nav'

export const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)

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

  return (
    <>
      <Nav>
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </Nav>
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
      {displaySuccess && (
        <div>
          <SlideFade in={displaySuccess} offsetY='20px'></SlideFade>
          <VStack spacing={4} m='1rem'>
            <Alert
              status={data.total > 0 ? 'success' : 'warning'}
              variant='left-accent'
            >
              <AlertIcon />
              <Text w='sm'>
                Search returned <b> {data.total.toLocaleString(undefined)} </b>{' '}
                results.
              </Text>
            </Alert>
            <Divider />
            {getCardsFromApiResponse(data)}
          </VStack>
        </div>
      )}
      <Flex width='100%' height='100vh'>
        <Box flex='1' bg='tomato' p={4}>
          Ici, les résultats de la recherche
        </Box>
        <Box flex='2' bg='cyan' p={4}>
          <Text>
            Ici c'est le graph avec <Code>Sigma.js</Code>
          </Text>
        </Box>
      </Flex>
    </>
  )
}
