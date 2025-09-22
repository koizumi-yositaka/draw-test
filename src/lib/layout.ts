import type { Node, Edge } from '@xyflow/react';
import dagre from 'dagre';

// dagreを使ってレイアウトを計算する関数
export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ 
    rankdir: direction,
    ranksep: 200,  // 階層間の距離を大きくする
    nodesep: 100,  // ノード間の距離を大きくする
    edgesep: 10,   // エッジ間の距離
    marginx: 50,   // 左右のマージン
    marginy: 50    // 上下のマージン
  });

  nodes.forEach((node) => {
    // ノードタイプごとにサイズを調整
    let width = 280;
    let height = 180;
    
    if (node.type === 'experience') {
      width = 320;  // 経験ノードは少し大きく
      height = 220;
    } else if (node.type === 'action') {
      width = 280;
      height = 180;
    } else if (node.type === 'rationale') {
      width = 260;
      height = 160;
    }
    
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'left' as any;
    node.sourcePosition = 'right' as any;

    // ノードタイプごとのサイズに応じて位置を調整
    let width = 280;
    let height = 180;
    
    if (node.type === 'experience') {
      width = 320;
      height = 220;
    } else if (node.type === 'action') {
      width = 280;
      height = 180;
    } else if (node.type === 'rationale') {
      width = 260;
      height = 160;
    }

    // dagreで計算された位置を適用
    node.position = {
      x: nodeWithPosition.x - width / 2,
      y: nodeWithPosition.y - height / 2,
    };
  });

  return { nodes, edges };
};
