import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { theme } from './theme'
import { Home } from './Home'
import {} from '@chakra-ui/react'

export const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </>
  )
  return (
    <ChakraProvider>
      <Flex width='100%' height='100vh'>
        <Box flex='1' bg='tomato' p={4}>
          This is 1/3
        </Box>
        <Box flex='2' bg='cyan' p={4}>
          This is 2/3
        </Box>
      </Flex>
    </ChakraProvider>
  )
}
