import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { AlertCircle } from 'lucide-react';
import { emulate } from './Emulat';

const MASMSimulator = () => {
  const [code, setCode] = useState('mov ax, 65\nmov ah, 2\nmov dl, al\nint 21h');
  const [result, setResult] = useState(null);

  const handleCompile = () => {
    try {
      const simulationResult = emulate(code);
      setResult(simulationResult);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MASM x86 16-bit Simulator</h1>
      <div className="mb-4" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
        <Editor
          height="300px"
          defaultLanguage="plaintext"
          value={code}
          onChange={setCode}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleCompile}
      >
        Compile and Run
      </button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Execution Result:</h2>
          {result.error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{result.error}</span>
            </div>
          ) : (
            <div>
              <p><strong>Output:</strong> {result.output || '(No output)'}</p>
              <p><strong>Register Values:</strong></p>
              <ul>
                {Object.entries(result.registers).map(([reg, value]) => (
                  <li key={reg}>{reg.toUpperCase()}: {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MASMSimulator;