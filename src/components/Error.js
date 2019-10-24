//https://github.com/wesbos/dump
import React from 'react';

export default function Error(props) {
  return (
    <div>
      {Object.entries(props).map(([err, val]) => (
        <pre key={err} err={err}>
          <strong>{err}: </strong>
          {JSON.stringify(val, '', ' ')}
        </pre>
      ))}
    </div>
  );
}
