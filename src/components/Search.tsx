import { Box, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

interface SearchProps {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  const handleSearch = () => onSearch(query)

  return (
    <Box display='flex'>
      <Input
        placeholder='Search...'
        value={query}
        onChange={handleChange}
        marginRight='1rem'
      />
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  )
}

export default Search
