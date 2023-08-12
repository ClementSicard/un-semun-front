import { Box } from '@chakra-ui/react'
import React from 'react'

interface ResultsCardProps {
  result: string
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => (
  <Box borderWidth='1px' borderRadius='lg' padding='4' margin='2' width='300px'>
    {result}
  </Box>
)

export default ResultsCard
