import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <View />
      <View2/>
    </div>
  );
}

function View() {
  const [inputs, setInputs] = useState([])
  const prevLengthRef = useRef(inputs.length)
  const containerRef = useRef(null)

  const prevLength = prevLengthRef.current
  useEffect(() => {
    if (prevLength < inputs.length) {
      const container = containerRef.current
      container.scrollTop = container.scrollHeight
    }
    prevLengthRef.current = inputs.length
  }, [inputs.length])

  const addInput = () => {
    setInputs(inputs => [
      ...inputs,
      { label: `Input number ${inputs.length}` }
    ])
  }

  return (
    <div className="view-container">
      <div ref={containerRef} className="inputs-container">
        {inputs.map(({ label }) => (
          <div key={label} className="input-container">
            <label>{label}</label>
            <input />
          </div>
        ))}
      </div>
      <div className="add-input-btn" onClick={addInput}>
        Add Input
      </div>
    </div>
  )
}

function View2() {
  const [dropdowns, setDropdowns] = useState([])
  const containerRef = useAutoScroll(dropdowns.length)

  const addDropdown = () => {
    setDropdowns(dropdowns => [
      ...dropdowns,
      { label: `Dropdown number ${dropdowns.length}` }
    ])
  }

  return (
    <div className="view-container">
      <div ref={containerRef} className="inputs-container">
        {dropdowns.map(({ label }) => (
          <div key={label} className="input-container">
            <label>{label}</label>
            <select>
              <option>opt 1</option>
              <option>opt 2</option>
            </select>
          </div>
        ))}
      </div>
      <div className="add-input-btn" onClick={addDropdown}>
        Add Input
      </div>
    </div>
  )
}

function useAutoScroll(length) {
  const element = useRef(null);
  const prevLengthRef = useRef(length);
  const prevLength = prevLengthRef.current;
  useEffect(() => {
    prevLengthRef.current = length;
    if (prevLength < length && element.current) {
      element.current.scrollTop = element.current.scrollHeight;
    };
  }, [length]);

  return element;
}


export default App;