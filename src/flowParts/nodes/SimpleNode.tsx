import type { Node, NodeProps } from '@xyflow/react';
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle, } from '@/components/base-node'
import type { BaseNodeData, Experience } from '../types'
import { Position } from '@xyflow/react'
import { LabeledHandle } from '@/components/labeled-handle'
import { Button } from '@/components/ui/button'

type SimpleNodeData = BaseNodeData & {
    id: string;
}


type SimpleNodeProps = NodeProps<Node<SimpleNodeData>>;  
export const SimpleNode = (props: SimpleNodeProps) => {
const { data } = props;

return (
    <BaseNode>
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>
          {data.title}
        </BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent>
        <div className="text-sm text-gray-700 whitespace-pre-wrap mb-3">
          {data.description}
        </div>
        
      </BaseNodeContent>

      <BaseNodeFooter>
        <div className="flex justify-between w-full">
          <LabeledHandle title="in" type="target" position={Position.Left} />
          <div className="flex flex-col gap-2">

          </div>
        </div>
      </BaseNodeFooter>
    </BaseNode>
  ); 
}