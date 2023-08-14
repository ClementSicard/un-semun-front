import { ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons'
import { ApiRecord } from '../types/ApiResponse'
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
  Spacer
} from '@chakra-ui/react'

interface ResultCardProps {
  record: ApiRecord
}

export const UNDLDoc: React.FC<ResultCardProps> = ({ record }) => {
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
        // w='l'
        w='100%'
      >
        <Stack maxH='150'>
          <CardBody>
            <Tag size={'sm'} key={'sm'} colorScheme='teal' variant='subtle'>
              <TagLeftIcon boxSize='12px' as={LinkIcon} />
              <TagLabel>{record.symbol}</TagLabel>
            </Tag>
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
            <Button variant='outline'>
              <Link
                isExternal
                variant='outline'
                colorScheme='blue'
                fontSize={'sm'}
                onClick={openDocLink}
              >
                View document <ExternalLinkIcon mx='2px' />
              </Link>
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </>
  )

  function openDocLink () {
    window.open(record.downloads.English, '_blank')
  }
}
