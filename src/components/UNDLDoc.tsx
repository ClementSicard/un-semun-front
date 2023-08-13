import { ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons'
import { ApiRecord } from '../types/ApiResponse'
import {
  Card,
  Text,
  CardBody,
  CardFooter,
  Stack,
  Button,
  Heading,
  Link,
  Icon,
  CardHeader
} from '@chakra-ui/react'

interface ResultCardProps {
  record: ApiRecord
}

export const UNDLDoc: React.FC<ResultCardProps> = ({ record }) => {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='filled'
        align='center'
        border={1}
        borderRadius={20}
        colorScheme='gray'
        w='xl'
      >
        <Stack>
          <CardHeader>
            <Heading size='md'>
              <Link
                isExternal
                variant='solid'
                colorScheme='blue'
                onClick={openDocLink}
              >
                {record.title}
              </Link>
            </Heading>
          </CardHeader>
          <CardBody>
            <Text py='2'>
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
          </CardBody>

          <CardFooter>
            <Button>
              <Link
                isExternal
                variant='solid'
                colorScheme='blue'
                onClick={openDocLink}
              >
                View document <ExternalLinkIcon mx='2px' />
              </Link>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  )

  function openDocLink () {
    window.open(record.downloads.English, '_blank')
  }
}
