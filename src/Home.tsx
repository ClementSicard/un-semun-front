import React, { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { SearchBar } from './components/SearchBar'

export const Home: React.FC = () => {
  const [apiResult, setApiResult] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string): Promise<void> => {
    console.log('Search query:', query)

    try {
      setIsSearching(true)
      const url = `http://localhost:80/search?q=${query}`
      const response = await fetch(url)
        .then(res => res.text())
        .then(text => setApiResult(text))
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
    setIsSearching(false)
  }

  return (
    <>
      <Stack spacing={4} direction='row' align='center' m='1rem'>
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </Stack>
      {/* You can now use apiResult here in the Home component */}
      {apiResult && <div>Received data: {apiResult}</div>}
    </>
  )
}
