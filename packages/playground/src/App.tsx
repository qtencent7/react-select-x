import React, { useState } from 'react';
import { Select, Option } from '@react-select-x/core';

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

function App() {
  const [singleValue, setSingleValue] = useState<Option | null>(null);
  const [multiValue, setMultiValue] = useState<Option[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto space-y-8 p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">React Select X Demo</h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Single Select</h2>
          <Select
            options={options}
            value={singleValue}
            onChange={(option) => setSingleValue(option as Option)}
            placeholder="选择一个喜欢的口味..."
            className="max-w-md"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Multi Select</h2>
          <Select
            options={options}
            value={multiValue}
            onChange={(value) => setMultiValue(value as Option[])}
            placeholder="可以选择多个口味..."
            isMulti
            className="max-w-md"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Disabled Select</h2>
          <Select
            options={options}
            value={null}
            placeholder="禁用状态的选择器"
            isDisabled
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
