import type { NodeProps } from "@xyflow/react";

import { Position, useReactFlow, type Node } from "@xyflow/react";
import { useCallback, type FC } from "react";
import { CustomHandle } from "./CustomHandle";
type CustomNodeProps = NodeProps<Node<any>>;   
export const CustomNode: FC<CustomNodeProps> = (props) => {
    const { getNodes, setNodes } = useReactFlow<any>();
    
    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        console.log(evt.target.value);
    }, []);
    const onTest = useCallback(() => {
        const nodes = getNodes();
        console.log(nodes);
    }, [getNodes, setNodes]);
    
    return (
        <> 
            <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 8 }}> 
                <button onClick={() => {
                    onTest();
                }}>test</button>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            <CustomHandle position={Position.Left} type="target" />
            <CustomHandle position={Position.Right} type="source" />
        </>
    );
};