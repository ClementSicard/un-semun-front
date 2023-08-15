import { ApiResponse } from '../types/ApiResponse'
import { UNDLDoc } from '../components/UNDLDoc'
import Graph from 'graphology'
import randomLayout from 'graphology-layout/random'

async function querySearchApi (
  queryString: string
): Promise<ApiResponse | null> {
  const url = `/search?q=${queryString}`
  return queryApi(url)
}

async function queryApi (url: string): Promise<any | null> {
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}${url}`)
    .then(response => response.json())
    .catch(error => console.error(error))

  return response
}

function getCardsFromApiResponse (response: ApiResponse): JSX.Element[] {
  return response.records.map((record, _) => {
    return <UNDLDoc record={record} />
  })
}

function getApiBaseUrl (): string {
  // Get UN_SEMUN_API_URL from environment variables
  const url = process.env.UN_SEMUN_API_URL || 'http://localhost:80'

  console.warn(`Using API URL: ${url}`)

  return url
}

async function queryGraph (query: string): Promise<Graph> {
  const graphResponse = await queryApi(`/graph?q=${query}`)
  const graph = Graph.from(graphResponse)

  randomLayout.assign(graph, { scale: 1 })

  // Update node sizes
  graph.forEachNode(node => {
    graph.setNodeAttribute(node, 'size', 20)
    const title = graph.getNodeAttribute(node, 'title')
    graph.setNodeAttribute(node, 'label', title)
  })

  console.debug(graph.nodes())

  return graph
}

export { querySearchApi, getCardsFromApiResponse, queryGraph }
