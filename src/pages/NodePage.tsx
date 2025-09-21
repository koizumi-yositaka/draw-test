import { ReactFlow, Background, Controls, type Edge, useNodesState, useEdgesState, addEdge, type Connection, MiniMap, useReactFlow, type OnConnectEnd, ReactFlowProvider, type Node} from '@xyflow/react';
import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import { CustomNode } from '../nodes/CustomNode';
import { CustomEdge } from '../nodes/CustomEdge';
import { CustomEdge2 } from '../nodes/CustomEdge2';
  // // 親ノード（グループとして機能させる）
  // {
  //   id: "group1",
  //   type: "group",        // type を "group" にすることでグループ見た目にできる
  //   data: { label: "Group 1" },
  //   position: { x: 100, y: 100 },
  //   style: { width: 300, height: 200, backgroundColor: "#f0f0f0" },
  // },
  // {
  //   id: 'n1',
  //   parent: "group1",
  //   position: { x: 10, y: 10 },
  //   data: { label: 'Node 1' },
  //   type: 'input',
  // },
  // {
  //   id: 'n2',
  //   position: { x: 100, y: 100 },
  //   data: { label: 'Node 2' },
  //   type: 'textUpdater',
  // },
  // {
  //   id: 'n3',
  //   position: { x: 0, y: 100 },
  //   data: { label: 'Node 3' },
  //   type: 'output',
  //   targetPosition: Position.Left,
  // },
const initialNodes = [
    // 親ノード1
    {
      id: "parent-1",
      type: "group",  
      data: { label: "原因ブロック" },
      position: { x: 100, y: 100 },
      style: { width: 300, height: 200, backgroundColor: "#f0f8ff" }
    },
    // 親ノード2
    {
      id: "parent-2",
      type: "group",
      data: { label: "結果ブロック" },
      position: { x: 500, y: 100 },
      style: { width: 300, height: 200, backgroundColor: "#fff0f5" }
    },
    // 親1の子
    {
      id: "child-1a",
      parentId: "parent-1",
      data: { label: "原因 A" },
      position: { x: 40, y: 50 },
      extent: "parent" as const
    },
    {
      id: "child-1b",
      parentId: "parent-1",
      data: { label: "原因 B" },
      position: { x: 160, y: 100 },
      extent: "parent" as const
    },
    // 親2の子
    {
      id: "child-2a",
      parentId: "parent-2",
      data: { label: "結果 A" },
      position: { x: 40, y: 60 },
      extent: "parent" as const
    },
    {
      id: "child-2b",
      parentId: "parent-2",
      data: { label: "結果 B" },
      position: { x: 160, y: 110 },
      extent: "parent" as const
    }
];

const initialEdges: Edge[] = [
  // 親ノード同士をつなぐ
  { id: "e-parent", source: "parent-1", target: "parent-2" },
  // 子ノード同士もつなげられる
  { id: "e-child", source: "child-1b", target: "child-2a" }

  // { id: "e1", source: "child-a1", target: "child-a2" },
  // { id: "e2", source: "child-a2", target: "node-outside" }
  // {
  //   id: 'n1-n2',
  //   source: 'n1',
  //   target: 'n2',
  //   type: 'custom2',
  //   label: 'connects with',
  // },
  // {
  //   id: 'n1-n3',
  //   source: 'n1',
  //   target: 'n3',
  //   type: 'custom',
  //   label: 'connects to n3',
  // },
];

// const nodeTypes = {
//     default: DefaultNode, // デフォルト値。上下にハンドルがあるノード
//     input: InputNode, // 下にハンドルがある開始ノード
//     output: OutputNode, // 上にハンドルがある終了ノード
//     group: GroupNode // ノードをグルーピングするためのノード
//   }
  
//   const edgeTypes = {
//     default: BezierEdge, 
//     straight: StraightEdge, 
//     step: StepEdge,
//     smoothstep: SmoothStepEdge, 
//     simplebezier: SimpleBezier
//   }
const nodeTypes = {
  textUpdater: CustomNode,
};
const edgeTypes = {
  custom: CustomEdge,
  custom2: CustomEdge2,
};

let id = 1;
const getId = () => `${id++}`;
const NodeFlowInner = () => { 
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge({...params, type: 'custom'}, edgesSnapshot)),
    [],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid && connectionState.fromNode?.id) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const newNodeId = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        
        const newNode = {
          id: newNodeId,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${newNodeId}` },
          type: 'textUpdater' as const,
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) =>
          [...eds, { 
            id: `edge-${connectionState.fromNode!.id}-${newNodeId}`, 
            source: connectionState.fromNode!.id, 
            target: newNodeId,
            type: 'custom'
          }],
        );
      }
    },
    [screenToFlowPosition],
  );

  return (
    <ReactFlow 
      selectionKeyCode="Shift"
      nodes={nodes} 
      edges={edges} 
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange} 
      onEdgesChange={onEdgesChange} 
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      snapToGrid={true}
      snapGrid={[10, 10]}
    >
      <MiniMap />
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export const NodePage = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlowProvider>
        <NodeFlowInner />
      </ReactFlowProvider>
    </div>
  );
};