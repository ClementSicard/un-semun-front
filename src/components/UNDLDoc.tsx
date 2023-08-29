import {
  CalendarIcon,
  ExternalLinkIcon,
  InfoIcon,
  LinkIcon
} from '@chakra-ui/icons'
import {
  Card,
  CardBody,
  Text,
  Stack,
  Button,
  Heading,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  Spacer,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react'
import { ApiRecord } from '../types/ApiResponse'

interface UNDLDocCard {
  record: ApiRecord
  summary: string
}

export const UNDLDoc: React.FC<UNDLDocCard> = ({ record, summary }) => {
  const enableSummaryButton =
    summary === null ||
    summary === undefined ||
    summary === 'None' ||
    summary === ''

  const bodiesTags = record.collections.un_bodies.map((type, index) => (
    <Tag size={'sm'} key={'sm'} colorScheme='orange' variant='subtle'>
      {type}
    </Tag>
  ))
  const subjectsTags = record.subjects.unbist.map((type, index) => (
    <Tag size={'sm'} key={'sm'} colorScheme='green' variant='subtle'>
      {type}
    </Tag>
  ))

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='ellipsis'
        variant='filled'
        align='center'
        border={1}
        borderRadius={20}
        colorScheme='gray'
        key={record.id}
        // w='l'
        w='100%'
      >
        <Stack>
          <CardBody>
            <HStack spacing={2} pb={2}>
              <Tag size={'sm'} key={'sm'} colorScheme='teal' variant='subtle'>
                <TagLeftIcon boxSize='12px' as={LinkIcon} />
                <TagLabel>{record.symbol}</TagLabel>
              </Tag>
              <Tag
                size={'sm'}
                key={'sm'}
                colorScheme='linkedin'
                variant='subtle'
              >
                <TagLeftIcon boxSize='12px' as={CalendarIcon} />
                <TagLabel>{record.publication_date}</TagLabel>
              </Tag>
              <Tag
                size={'sm'}
                key={'sm'}
                colorScheme='linkedin'
                variant='subtle'
              >
                <TagLeftIcon boxSize='12px' as={InfoIcon} />
                <TagLabel>{record.id}</TagLabel>
              </Tag>
            </HStack>
            <Heading size='xs'>
              <Link
                isExternal
                variant='solid'
                colorScheme='blue'
                onClick={openDocLink}
              >
                <Text noOfLines={[1, 2]}>{record.title}</Text>
              </Link>
            </Heading>
            <Spacer h='15' />
            <HStack>{bodiesTags}</HStack>
            <Spacer h='15' />
            <HStack>
              <Button onClick={openDocLink}>
                <Link
                  isExternal
                  colorScheme='blue'
                  fontSize={'sm'}
                  onClick={openDocLink}
                >
                  Read PDF <ExternalLinkIcon mx='2px' />
                </Link>
              </Button>
              <Popover placement='right'>
                <PopoverTrigger>
                  <Button variant='outline' isDisabled={enableSummaryButton}>
                    Summary
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight='semibold'>Summary</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>{summary}</PopoverBody>
                </PopoverContent>
              </Popover>

              <Popover placement='bottom'>
                <PopoverTrigger>
                  <Button
                    variant='outline'
                    isDisabled={bodiesTags.length === 0}
                  >
                    Subjects
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight='semibold'>Subjects</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>{subjectsTags}</PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </CardBody>
        </Stack>
      </Card>
    </>
  )

  function openDocLink () {
    window.open(`https://digitallibrary.un.org/record/${record.id}`, '_blank')
  }
}
