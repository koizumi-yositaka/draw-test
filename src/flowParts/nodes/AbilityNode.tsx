import type { Node, NodeProps } from '@xyflow/react';
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle, } from '@/components/base-node'
import type { BaseNodeData } from '../types'
import { Position } from '@xyflow/react'
import { LabeledHandle } from '@/components/labeled-handle'
import { Button } from '@/components/ui/button'

type AbilityNodeData = BaseNodeData & {
    // custom data
    kind: "personality" | "skill";
}


type AbilityNodeProps = NodeProps<Node<AbilityNodeData>>;  
export const AbilityNode = (props: AbilityNodeProps) => {
    const { data } = props;

    return (
        <BaseNode>
        <BaseNodeHeader>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${data.kind === "personality" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
                {data.kind === "personality" ? "性格" : "スキル"}
              </span>
              <BaseNodeHeaderTitle className={`text-lg font-bold ${data.kind === "personality" ? "text-purple-500" : "text-orange-500"}`}>
                {data.title}
              </BaseNodeHeaderTitle>
            </div>
        </BaseNodeHeader>

        <BaseNodeContent>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {data.description}
            </div>
        </BaseNodeContent>

        <BaseNodeFooter>
            <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Add rationale for this action")}
            >
            ＋根拠を追加
            </Button>
            
            <div className="flex justify-between w-full">
            <LabeledHandle title="in" type="target" id="in" position={Position.Left} />
            <LabeledHandle title="how to get" type="source" id="experience" position={Position.Right} />
            </div>
        </BaseNodeFooter>
        </BaseNode>
    ); 
}