import { ApiResponse } from '../types/ApiResponse'
import { UNDLDoc } from '../components/UNDLDoc'
import Graph from 'graphology'
import randomLayout from 'graphology-layout/random'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import { unColor } from '../theme'

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

  return response ?? {}
}

function getCardsFromApiResponse (response: ApiResponse): JSX.Element[] {
  return response.records.map((record, _) => {
    return <UNDLDoc record={record} key={record.id} />
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

  randomLayout.assign(graph, { scale: 10 })
  forceAtlas2.assign(graph, {
    iterations: 50,
    settings: { barnesHutOptimize: true }
  })

  // Update node sizes
  graph.forEachNode(node => updateNode(graph, node))

  console.debug(graph.nodes())

  return graph
}

function updateNode (graph: Graph, node: string): Graph {
  const nodeType = graph.getNodeAttribute(node, 'nodeType')

  var nodeSize: number
  var nodeColor: string
  var labelKey: string

  switch (nodeType) {
    case 'Document':
      nodeSize = 10
      nodeColor = unColor
      labelKey = 'title'
      break
    case 'Country':
      nodeSize = 4
      nodeColor = 'orange'
      labelKey = 'labelEn'

      break
    case 'Topic':
      nodeSize = 3
      nodeColor = 'tomato'
      labelKey = 'labelEn'
      break
    case 'MetaTopic':
      nodeSize = 4
      nodeColor = 'red'
      labelKey = 'labelEn'
      break
    default:
      console.warn(`Unknown node type: ${nodeType}`)
      nodeSize = 2
      nodeColor = 'gray'
      labelKey = 'label'
  }

  graph.setNodeAttribute(node, 'size', nodeSize * 5)
  graph.setNodeAttribute(node, 'color', nodeColor)

  const title = graph.getNodeAttribute(node, labelKey)
  console.info('Setting node title to: ' + title)
  graph.setNodeAttribute(node, 'label', title)

  return graph
}

export { querySearchApi, getCardsFromApiResponse, queryGraph }
