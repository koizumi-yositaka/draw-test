import type { FC } from 'react';
import { Handle } from '@xyflow/react';
import type { HandleProps } from '@xyflow/react';

export const CustomHandle: FC<HandleProps> = (props) => {
  return (
    <Handle
      {...props}
      style={{
        width: 6,
        height: 6,
        border: '2px solid #fff',
        backgroundColor: '#555',
        cursor: 'pointer',
      }}
    />
  );
};