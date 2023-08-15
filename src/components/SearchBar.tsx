import React, { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { BeatLoader } from 'react-spinners'

const borderRadius = '20'

interface SearchBarProps {
  onSearch: (query: string) => void
  isSearching?: boolean
  size?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isSearching = false,
  size = 'md'
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
      <InputGroup size={size} borderRadius={borderRadius} maxW='80%'>
        <InputLeftElement children={<Search2Icon color='gray.600' />} />
        <Input
          type='text'
          placeholder='Search...'
          border='1px solid #949494'
          value={query}
          size={size}
          fontWeight={'thin'}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          borderRadius={borderRadius} // Top left and bottom left rounded
        />
        <InputRightAddon p={0} border='none'>
          {isSearching ? (
            <Button
              isLoading
              size={size}
              spinner={<BeatLoader size={8} color='blue' />}
              colorScheme='blue'
              borderLeftRadius={0}
              borderRightRadius={borderRadius} // Top right and bottom right rounded
              border='1px solid #949494'
              onClick={handleSearchClick}
            />
          ) : (
            <Button
              size={size}
              colorScheme='blue'
              variant='outline'
              borderLeftRadius={0}
              borderRightRadius={borderRadius} // Top right and bottom right rounded
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

export default SearchBar
