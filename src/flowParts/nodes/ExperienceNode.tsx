import type { Node, NodeProps } from '@xyflow/react';
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle, } from '@/components/base-node'
import type { Experience } from '../types'
import { Position } from '@xyflow/react'
import { LabeledHandle } from '@/components/labeled-handle'
import { Button } from '@/components/ui/button'

type ExperienceNodeData = Experience & {
    id: string;
}


type ExperienceNodeProps = NodeProps<Node<ExperienceNodeData>>;  
export const ExperienceNode = (props: ExperienceNodeProps) => {
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
        
        <div className="space-y-2">
          <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
            <div className="text-xs font-semibold text-red-700 mb-1">Before:</div>
            <div className="text-xs text-red-600">{data.before}</div>
          </div>
          
          <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
            <div className="text-xs font-semibold text-green-700 mb-1">After:</div>
            <div className="text-xs text-green-600">{data.after}</div>
          </div>
        </div>
      </BaseNodeContent>

      <BaseNodeFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Add rationale for this action")}
        >
          ＋行動を追加
        </Button>
        
        <div className="flex justify-between w-full">
          <LabeledHandle title="in" type="target" position={Position.Left} />
          <div className="flex flex-col gap-2">
            <LabeledHandle title="あなたの行動" type="source" id="action" position={Position.Right} />
          </div>
        </div>
      </BaseNodeFooter>
    </BaseNode>
  ); 
}