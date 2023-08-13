import { ApiResponse } from '../types/ApiResponse'
import { UNDLDoc } from '../components/UNDLDoc'

async function queryApi (queryString: string): Promise<ApiResponse | null> {
  const url = getApiUrl()
  const response = await fetch(`${url}/search?q=${queryString}`)
    .then(response => response.json())
    .catch(error => console.error(error))

  return response
}

function getCardsFromApiResponse (response: ApiResponse): JSX.Element[] {
  return response.records.map((record, _) => {
    return <UNDLDoc record={record} />
  })
}

function getApiUrl (): string {
  // Get UN_SEMUN_API_URL from environment variables
  const url = process.env.UN_SEMUN_API_URL || 'http://localhost:80'

  console.warn(`Using API URL: ${url}`)

  return url
}

export { queryApi, getCardsFromApiResponse }
