import React, { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

interface SearchBarProps {
  onSearch: (query: string) => void
  isSearching?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isSearching
}) => {
  const [query, setQuery] = useState('')

  const handleSearchClick = () => {
    onSearch(query)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <>
      <InputGroup borderRadius={5} size='sm'>
        <InputLeftElement
          pointerEvents='none'
          children={<Search2Icon color='gray.600' />}
        />
        <Input
          type='text'
          placeholder='Search...'
          border='1px solid #949494'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputRightAddon p={0} border='none'>
          {isSearching ? (
            <Button
              isLoading
              loadingText='Searching'
              size='sm'
              colorScheme='blue'
              variant='fill'
              borderLeftRadius={0}
              borderRightRadius={3.3}
              border='1px solid #949494'
              onClick={handleSearchClick}
            />
          ) : (
            <Button
              size='sm'
              colorScheme='blue'
              variant='outline'
              borderLeftRadius={0}
              borderRightRadius={3.3}
              border='1px solid #949494'
              onClick={handleSearchClick}
            >
              Search
            </Button>
          )}
        </InputRightAddon>
      </InputGroup>
    </>
  )
}
