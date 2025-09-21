import type { Experience } from "@/flowParts/types";
import { ReactFlow, Background, Controls, type Edge, useNodesState, useEdgesState, addEdge, type Connection, MiniMap, type Node} from '@xyflow/react';
import { nodeTypes } from "@/flowParts/nodes/nodeTypes";
import { edgeTypes } from "@/flowParts/edges/edgeTypes";
import '@xyflow/react/dist/style.css';
import { useCallback } from "react";

const testExperience: Experience = {
    title: "海外留学の経験",
    description: "大学時代にアメリカへ1年間留学した経験。",
    before: "英語を学びたいと思っていたが、自信がなく実践経験も乏しかった。",
    after: "英語で日常会話やディスカッションができるようになり、自信もついた。",
    actions: [
      {
        title: "現地の学生と積極的に交流した",
        description: "授業以外でも学生寮やイベントで話すようにした。",
        rationales: [
          {
            kind: "value",
            title: "挑戦を恐れない",
            description: "新しい環境に飛び込むことで、自分を成長させたいという価値観。",
            experiences: [] // 後からこのValueを得た経験を紐づけられる
          },
          {
            kind: "lesson",
            title: "失敗を恐れて黙っていると成長できない",
            description: "最初に黙って授業を受けていたときは全く伸びなかったので、積極的に話す必要があると学んだ。",
            experiences: []
          }
        ]
      },
      {
        title: "プレゼンテーションに挑戦した",
        description: "英語でのプレゼン授業を履修し、現地学生の前で発表した。",
        rationales: [
          {
            kind: "value",
            title: "伝える力を大切にする",
            description: "言葉や文化の壁があっても、自分の考えを相手に届けたいという価値観。",
            experiences: []
          }
        ]
      }
    ]
};

// testExperienceからノードとエッジを生成する関数
const generateNodesAndEdges = (experience: Experience) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // 経験ノードを作成
  const experienceNode: Node = {
    id: 'experience-1',
    type: 'experience',
    position: { x: 100, y: 100 },
    data: {
      ...experience,
      id: 'experience-1'
    }
  };
  nodes.push(experienceNode);
  
  // 各行動ノードを作成
  experience.actions.forEach((action, actionIndex) => {
    const actionNode: Node = {
      id: `action-${actionIndex + 1}`,
      type: 'action',
      position: { x: 400, y: 100 + (actionIndex * 200) },
      data: {
        title: action.title,
        description: action.description,
        id: `action-${actionIndex + 1}`
      }
    };
    nodes.push(actionNode);
    
    // 経験から行動へのエッジ
    edges.push({
      id: `experience-to-action-${actionIndex + 1}`,
      source: 'experience-1',
      target: `action-${actionIndex + 1}`,
      type: 'straight'
    });
    
    // 各根拠ノードを作成
    action.rationales.forEach((rationale, rationaleIndex) => {
      const rationaleNode: Node = {
        id: `rationale-${actionIndex + 1}-${rationaleIndex + 1}`,
        type: 'rationale',
        position: { x: 700, y: 100 + (actionIndex * 200) + (rationaleIndex * 150) },
        data: {
          title: rationale.title,
          description: rationale.description,
          kind: rationale.kind,
          id: `rationale-${actionIndex + 1}-${rationaleIndex + 1}`
        }
      };
      nodes.push(rationaleNode);
      
      // 行動から根拠へのエッジ
      edges.push({
        id: `action-${actionIndex + 1}-to-rationale-${actionIndex + 1}-${rationaleIndex + 1}`,
        source: `action-${actionIndex + 1}`,
        target: `rationale-${actionIndex + 1}-${rationaleIndex + 1}`,
        type: 'straight'
      });
    });
  });
  
  return { nodes, edges };
};

const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(testExperience);
export const ExperienceTest = () => {
    const [nodes, , onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge({...params, type: 'straight'}, edgesSnapshot)),
        [],
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
          snapToGrid={true}
          snapGrid={[10, 10]}
        >
          <MiniMap />
          <Background />
          <Controls />
        </ReactFlow>
      );
}