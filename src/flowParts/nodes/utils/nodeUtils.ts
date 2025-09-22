import { type XYPosition } from "@xyflow/react";
import { nodeTypes } from "../types/nodeTypes";

export const getNodeTemplate = (nodeType: keyof typeof nodeTypes,newNodeId: string, position: XYPosition) => {
    switch (nodeType) {
        case 'experience':
            return {
                id: newNodeId,
                position: position,
                type: 'experience',
                data: {
                    title: '新しい経験',
                    description: '新しい経験の説明'
                }
            }
        case 'action':
            return {
                id: newNodeId,
                position: position,
                type: 'action',
                data: {
                    title: '新しい行動',
                    description: '新しい行動の説明'
                }
            }
        case 'rationale':
            return {
                id: newNodeId,
                position: position,
                type: 'rationale',
                data: {
                    title: '新しい根拠',
                    description: '新しい根拠の説明'
                }
            }
        
        case 'ability':
            return {
                id: newNodeId,
                position: position,
                type: 'ability',
                data: {
                    title: '新しい能力',
                    description: '新しい能力の説明',
                    kind: 'skill'
                }
            }
        default:
            return {
                id: newNodeId,
                position: position,
                type: "simple",
                data: {
                    title: '新しいノード',
                    description: '新しいノードの説明'
                }
            }
    }
}