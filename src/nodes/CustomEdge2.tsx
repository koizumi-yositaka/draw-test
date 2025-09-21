// inputとoutputを表示する
import type { EdgeProps, Edge } from "@xyflow/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import type { FC } from "react";

type CustomEdgeProps = EdgeProps<Edge<any>>;

export const CustomEdge2: FC<CustomEdgeProps> = (props) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const { deleteElements } = useReactFlow();
  return (
  <>
  <BaseEdge id={id} path={edgePath} />
  <EdgeLabelRenderer>
    <button
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          pointerEvents: 'all',
        }}
        className="nodrag nopan"
        onClick={() => deleteElements({ edges: [{ id }] })}
      >
        delete
      </button>
    </EdgeLabelRenderer>
  </>
  )
};