import type { Node, NodeProps } from '@xyflow/react';
import { BaseNode, BaseNodeContent, BaseNodeFooter, BaseNodeHeader, BaseNodeHeaderTitle, } from '@/components/base-node'
import type { BaseNodeData } from '../types'
import { Position } from '@xyflow/react'
import { LabeledHandle } from '@/components/labeled-handle'
import { Button } from '@/components/ui/button'

type RationaleNodeData = BaseNodeData & {
    // custom data
    kind: "value" | "lesson";
}


type RationaleNodeProps = NodeProps<Node<RationaleNodeData>>;  
export const RationaleNode = (props: RationaleNodeProps) => {
const { data } = props;

return (
    <BaseNode>
      <BaseNodeHeader>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${data.kind === "value" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
            {data.kind === "value" ? "価値観" : "教訓"}
          </span>
          <BaseNodeHeaderTitle className={`text-lg font-bold ${data.kind === "value" ? "text-blue-500" : "text-green-500"}`}>
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
          ＋経験を追加
        </Button>
        
        <div className="flex justify-between w-full">
          <LabeledHandle title="in" type="target" id="in" position={Position.Left} />
          <LabeledHandle title="元となった経験" type="source" id="experience" position={Position.Right} />
        </div>
      </BaseNodeFooter>
    </BaseNode>
  ); 
}