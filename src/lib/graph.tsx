import Graph from 'graphology'
import randomLayout from 'graphology-layout/random'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import { unColor } from '../theme'

function jsonToGraphology (g: any) {
  const graph = Graph.from(g)

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
      nodeSize = 5
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

  graph.setNodeAttribute(node, 'size', nodeSize)
  graph.setNodeAttribute(node, 'color', nodeColor)

  const title = graph.getNodeAttribute(node, labelKey)
  console.info('Setting node title to: ' + title)
  graph.setNodeAttribute(node, 'label', title)

  return graph
}

export { jsonToGraphology }
