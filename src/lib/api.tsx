import { ApiResponse } from '../types/ApiResponse'
import { UNDLDoc } from '../components/UNDLDoc'

async function querySearchApi (
  queryString: string
): Promise<ApiResponse | null> {
  const url = `/query?q=${queryString}`
  return queryApi(url)
}

async function queryApi (url: string): Promise<any | null> {
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}${url}`)
    .then(response => response.json())
    .catch(error => console.error(error))

  return response ?? {}
}

function getCardsFromApiResponse (response: ApiResponse): JSX.Element[] {
  return response.records.map((record, _) => {
    const correspondingRecord = response.graph.nodes.filter(
      node => node.key === record.id
    )[0]

    // Check if there is "summary" in the attributes
    const summary = correspondingRecord?.attributes?.summary
      ? correspondingRecord.attributes.summary
      : ''
    return <UNDLDoc record={record} summary={summary} key={record.id} />
  })
}

function getApiBaseUrl (): string {
  // Get UN_SEMUN_API_URL from environment variables
  const url = process.env.UN_SEMUN_API_URL || 'http://localhost:80'

  console.warn(`Using API URL: ${url}`)

  return url
}

export { querySearchApi, getCardsFromApiResponse }
