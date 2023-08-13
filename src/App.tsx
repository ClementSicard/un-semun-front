import { ChakraProvider } from '@chakra-ui/react'
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
}
