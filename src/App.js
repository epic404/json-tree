import { useState } from 'react';
import './App.css';

function Node({nodeKey, nodeValue, nodeType, autoExpand=false}) {
  const [isExpanded, setExpanded] = useState(autoExpand);
  const isArray = Array.isArray(nodeValue);
  const caretClass = `material-symbols-outlined ${isExpanded ? 'expanded' : 'collapsed'}`;
  const openingBracket = isArray ? '[' : '{';
  const closingBracket = isArray ? ']' : '}';
  const collapsedPreview = isArray ? '[...]' : '{...}';

  if (nodeType === 'object' && nodeValue !== null) {
    return [
      <div className="preview-block">
        <span className={caretClass} onClick={() => setExpanded(!isExpanded)}>arrow_right</span>
        {nodeKey && <span><code>{nodeKey}</code>:&nbsp;</span>}
        <code>{isExpanded ? openingBracket : collapsedPreview}</code>
      </div>,
      isExpanded && <div className="node-block">
        {
          Object.keys(nodeValue).map((key, index) => {
            return (
              <Node
                key={`${index}-${nodeValue[key]}`}
                nodeKey={key}
                nodeValue={nodeValue[key]}
                nodeType={typeof nodeValue[key]} />
            );
          })
        }
      </div>,
      isExpanded && <div className="closing-bracket">
        <code>{closingBracket}</code>
      </div>
    ];
  } else {
    return (
      <div className="node">
        <code>{nodeKey}</code>:&nbsp;<code>{nodeValue || 'null'}</code>
      </div>
    );
  }
}

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [jsonSrc, setJsonSrc] = useState(null);
  const testUrl = 'https://raw.githubusercontent.com/epic404/json-tree/master/data/test3.json';

  const getJson = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setError(null);
      setJsonData(result);
    } catch (error) {
      setError(`Error fetching JSON! Please verify your URL and try again.`);
    }
  };

  return [
    <div className="input-wrapper">
      <input onChange={({target}) => setJsonSrc(target.value)} />
      <button onClick={() => getJson(jsonSrc)}>GET DATA</button>
      <button onClick={() => getJson(testUrl)}>TRY TEST DATA</button>
    </div>,
    error && <div className="input-error">
      {error}
    </div>,
    jsonData &&
    <div className="app">
      <Node nodeValue={jsonData} nodeType={typeof jsonData} autoExpand={true} />
    </div>
  ];
}

export default App;
