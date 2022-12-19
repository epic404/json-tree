import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

async function getTestData() {
  const raw = await fetch('https://raw.githubusercontent.com/epic404/json-tree/master/data/test1.json');
  const data = await raw.json();
  return data;
}

function Node() {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div>
      <span
        className={`material-symbols-outlined ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={() => setExpanded(!isExpanded)}>
          arrow_right
      </span>
    </div>
  )
}

function App() {
  useEffect(() => {
    const data = getTestData();
  }, []);

  return (
    <div className="app">
      <Node />
    </div>
  );
}

export default App;
