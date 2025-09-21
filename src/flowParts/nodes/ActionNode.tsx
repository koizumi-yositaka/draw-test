import type { Node, NodeProps } from '@xyflow/react';
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle, } from '@/components/base-node'
import type { BaseNodeData } from '../types'
import { Position } from '@xyflow/react'
import { LabeledHandle } from '@/components/labeled-handle'
import { Button } from '@/components/ui/button'

type ActionNodeData = BaseNodeData & {
    // custom data
}


type ActionNodeProps = NodeProps<Node<ActionNodeData>>;  
export const ActionNode = (props: ActionNodeProps) => {
const { data } = props;

return (
    <BaseNode>
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>
          {data.title}
        </BaseNodeHeaderTitle>
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
          <LabeledHandle title="in" type="target" position={Position.Left} />
          <LabeledHandle title="out" type="source" position={Position.Right} />
        </div>
      </BaseNodeFooter>
    </BaseNode>
  ); 
}