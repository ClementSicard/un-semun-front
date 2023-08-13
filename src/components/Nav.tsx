'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Link
} from '@chakra-ui/react'
import {
  ExternalLinkIcon,
  InfoOutlineIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'

const repoUrl = 'https://github.com/ClementSicard/un-semun'

interface NavProps {
  children?: React.ReactNode
}

export const Nav: React.FC<NavProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Text fontSize={'lg'}>SemUN</Text>
          </Box>
          {children}
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              {infoButton()}
              {lightModeButton()}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )

  function lightModeButton () {
    return (
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    )
  }

  function infoButton () {
    return (
      <>
        <Button onClick={onOpen}>
          <InfoOutlineIcon />
        </Button>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                This project was made as part of a collaboration between{' '}
                <Link isExternal color='teal.500' href={'https://ethz.ch/'}>
                  ETH Zurich
                  <ExternalLinkIcon mx='2px' />
                </Link>{' '}
                and the{' '}
                <Link isExternal color='teal.500' href={'https://ethz.ch/'}>
                  United Nations Peacekeeping Operations
                  <ExternalLinkIcon mx='2px' />
                </Link>{' '}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button leftIcon={<FaGithub />} variant='ghost'>
                <Link isExternal href={repoUrl}>
                  View code on Github
                  <ExternalLinkIcon mx='2px' />
                </Link>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
