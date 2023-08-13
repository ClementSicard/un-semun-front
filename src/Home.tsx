import React, { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'
import ApiResponse from './types/ApiResponse'

export const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)

  const handleSearch = async (query: string): Promise<void> => {
    console.log('Search query:', query)

    try {
      setIsSearching(true)
      setIsError(false)
      const url = `http://localhost:80/search?q=${query}`
      const response = await fetch(url).then(response => response.json())
      setData(response)
    } catch (error) {
      setError(error)
      setIsError(true)
      console.error('Error fetching data from API:', error)
    }
    setIsSearching(false)
  }

  return (
    <>
      <Stack spacing={2} direction='column' align='center' m='1rem'>
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </Stack>
      {isError && (
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
      {/* You can now use apiResult here in the Home component */}
      {data && !isError && (
        <div>
          <VStack spacing={4} m='1rem'>
            <Alert
              status={data.total > 0 ? 'success' : 'warning'}
              variant='left-accent'
            >
              <AlertIcon />
              <Text>
                Search returned <b> {data.total.toLocaleString(undefined)} </b>{' '}
                results.
              </Text>
            </Alert>
            <Text align='start' w='100'></Text>
          </VStack>
        </div>
      )}
    </>
  )
}
