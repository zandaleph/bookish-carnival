// https://github.com/wesbos/dump
import React from 'react';

interface Props {
  [key: string]: any;
}

export default function Error(props: Props) {
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
}
