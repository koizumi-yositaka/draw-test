// inputとoutputを表示する
import type { EdgeProps, Edge } from "@xyflow/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
} from "@xyflow/react";
import type { FC } from "react";

type CustomEdgeProps = EdgeProps<Edge<any>>;

export const CustomEdge: FC<CustomEdgeProps> = (props) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
//getSmoothStepPath
  return (
  <>
  <BaseEdge id={id} path={edgePath} />
  <EdgeLabelRenderer>
        <span
          style={{
            fontSize: 8,
            backgroundColor: "#fff",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${sourceX}px,${
              sourceY + 10
            }px)`,
          }}
        >
          inputLabel
        </span>
        <span
          style={{
            fontSize: 8,
            backgroundColor: "#fff",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${targetX}px,${
              targetY - 10
            }px)`,
          }}
        >
          outputLabel
        </span>
      </EdgeLabelRenderer>
  </>
  )
};