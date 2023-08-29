import { useRegisterEvents, useSigma } from '@react-sigma/core'
import Graph from 'graphology'
import { useState, useEffect } from 'react'

export const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents()
  const sigma = useSigma()
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [hoveredNode, setHovereddNode] = useState<string | null>(null)

  useEffect(() => {
    // Register the events
    registerEvents({
      enterNode: e => {
        setHovereddNode(e.node)
        console.log('enterNode', e.node)
        console.log('pointer', sigma.getContainer().style.cursor)
        // Change mouse cursor
        sigma.getContainer().style.cursor = 'pointer'
        sigma.getGraph().setNodeAttribute(e.node, 'highlighted', true)
      },
      leaveNode: e => {
        console.log('leaveNode', e.node)
        sigma.getGraph().setNodeAttribute(e.node, 'highlighted', false)
        sigma.getContainer().style.cursor = ''
        setHovereddNode(null)
      },
      downNode: e => {
        setDraggedNode(e.node)
        sigma.getGraph().setNodeAttribute(e.node, 'highlighted', true)
      },
      mouseup: e => {
        if (draggedNode) {
          setDraggedNode(null)
          sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted')
        }
      },
      mousedown: e => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox())
      },
      mousemove: e => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e)
          sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x)
          sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y)

          // Prevent sigma to move camera:
          e.preventSigmaDefault()
          e.original.preventDefault()
          e.original.stopPropagation()
        }
      },
      touchup: e => {
        if (draggedNode) {
          setDraggedNode(null)
          sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted')
        }
      },
      doubleClick: e => {
        if (hoveredNode) {
          console.log('click', hoveredNode)
          const url = getUrlBasedonNodeType(sigma.getGraph(), hoveredNode)
          window.open(url, '_blank')
        }
      },

      touchdown: e => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox())
      },
      touchmove: e => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e.touches[-1])
          sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x)
          sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y)

          // Prevent sigma to move camera:
          e.original.preventDefault()
          e.original.stopPropagation()
        }
      }
    })
  }, [registerEvents, sigma, draggedNode, hoveredNode])

  return null
}

function getUrlBasedonNodeType (graph: Graph, node: string) {
  const nodeType = graph.getNodeAttribute(node, 'nodeType')

  switch (nodeType) {
    case 'Document':
      return `https://digitallibrary.un.org/record/${node}`
    case 'Topic' || 'MetaTopic':
      return `https://metadata.un.org/thesaurus/${node}`
    case 'Country':
      return `https://www.un.org/en/about-us/member-states`
  }
}
