// https://github.com/wesbos/dump
import React from 'react';

interface Props {
  [key: string]: unknown;
}

const Error: React.FC<Props> = (props) => {
  return (
    <div>
      {Object.entries(props).map(([err, val]) => (
        <pre key={err}>
          <strong>{err}: </strong>
          {JSON.stringify(val, undefined, ' ')}
        </pre>
      ))}
    </div>
  );
};

export default Error;
