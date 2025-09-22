import type { Experience, Personality } from "@/flowParts/types";
import { ReactFlow, Background, Controls, type Edge, useNodesState, useEdgesState, addEdge, type Connection, MiniMap, type Node, type OnConnectEnd, useReactFlow} from '@xyflow/react';
import { nodeTypes } from "@/flowParts/nodes/types/nodeTypes";
import { edgeTypes } from "@/flowParts/edges/edgeTypes";
import '@xyflow/react/dist/style.css';
import { useCallback } from "react";
import { getLayoutedElements } from "@/lib/layout";
import { getNodeTemplate } from "@/flowParts/nodes/utils/nodeUtils";

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
        ],
        abilities: [
          {
            type: "skill",
            title: "英語力",
            description: "英検2級",
            experiences: []
          },
          {
            type: "personality",
            level: "high",
            kind: "strength",
            title: "外向性",
            description: "外向性が高い",
            experiences: []
          } as Personality
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
        ],
        abilities: []
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
    position: { x: 0, y: 0 }, // 一時的な位置、dagreで計算される
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
      position: { x: 0, y: 0 }, // 一時的な位置、dagreで計算される
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
      sourceHandle: 'action',
      type: 'step'
    });
    
    // 各根拠ノードを作成
    action.rationales.forEach((rationale, rationaleIndex) => {
      const rationaleNode: Node = {
        id: `rationale-${actionIndex + 1}-${rationaleIndex + 1}`,
        type: 'rationale',
        position: { x: 0, y: 0 }, // 一時的な位置、dagreで計算される
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
        type: 'step',
        sourceHandle: 'rationale',
      });
    });

    // 各能力ノードを作成
    action.abilities.forEach((ability, abilityIndex) => {
      const abilityNode: Node = {
        id: `ability-${actionIndex + 1}-${abilityIndex + 1}`,
        type: 'ability',
        position: { x: 0, y: 0 }, // 一時的な位置、dagreで計算される
        data: {
          title: ability.title,
          description: ability.description,
          id: `ability-${actionIndex + 1}-${abilityIndex + 1}`,
          kind: ability.type
        }
      };
      nodes.push(abilityNode);
      
      // 行動から能力へのエッジ
      edges.push({
        id: `action-${actionIndex + 1}-to-ability-${actionIndex + 1}-${abilityIndex + 1}`,
        source: `action-${actionIndex + 1}`,
        target: `ability-${actionIndex + 1}-${abilityIndex + 1}`,
        type: 'step',
        sourceHandle: 'ability',
      });
    });
  });
  
  // dagreでレイアウトを計算
  return getLayoutedElements(nodes, edges);
};

const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(testExperience);
export const ExperienceTest = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const onConnect = useCallback(
      (params: Connection) => setEdges((edgesSnapshot) => addEdge({...params, type: 'straight'}, edgesSnapshot)),
      [],
    );
    const onConnectEnd: OnConnectEnd = useCallback(
      (event, connectionState) => {
        console.log(connectionState);
        // when a connection is dropped on the pane it's not valid
        if (!connectionState.isValid && connectionState.fromNode?.id) {
          const nextNode= connectionState.fromHandle?.id as keyof typeof nodeTypes;
          // we need to remove the wrapper bounds, in order to get the correct position
          const newNodeId = `${connectionState.fromNode?.id}-new-node`;
          const { clientX, clientY } =
            'changedTouches' in event ? event.changedTouches[0] : event;
          
          const newNode = getNodeTemplate(nextNode,newNodeId,screenToFlowPosition({
            x: clientX,
            y: clientY,
          }));
  
          setNodes((nds) => [...nds, newNode]);
          setEdges((eds) =>
            [...eds, { 
              id: `edge-${connectionState.fromNode!.id}-${newNodeId}`, 
              source: connectionState.fromNode!.id, 
              sourceHandle: connectionState.fromHandle!.id,
              target: newNodeId,
              type: 'step'
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
}