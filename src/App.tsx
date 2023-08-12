import { useState } from 'react'
import { Box, VStack, Flex } from '@chakra-ui/react'
import Search from './components/Search'
import ResultsCard from './components/ResultCard'
import React from 'react'

const App: React.FC = () => {
  const [results, setResults] = useState<string[]>([])
  const [searchFocus, setSearchFocus] = useState<boolean>(false)

  const handleSearch = (query: string) => {
    const mockData = ['Result 1', 'Result 2', 'Result 3']
    setResults(mockData)
    setSearchFocus(true)
  }

  return (
    <VStack spacing={4} align='center' width='100vw' height='100vh' padding={4}>
      <Flex
        direction='column'
        align='center'
        justify={searchFocus ? 'flex-start' : 'center'}
        height='100%'
        width='100%'
      >
        <Search onSearch={handleSearch} />
        {results.map((result, index) => (
          <ResultsCard key={index} result={result} />
        ))}
      </Flex>
    </VStack>
  )
}

export default App
