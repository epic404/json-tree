import { useEffect, useState } from 'react';
import './App.css';

function Node({nodeKey, nodeValue, nodeType, autoExpand=false}) {
  const [isExpanded, setExpanded] = useState(autoExpand);
  const caretClass = `material-symbols-outlined ${isExpanded ? 'expanded' : 'collapsed'}`;

  console.log('nodeKey:', nodeKey)
  console.log('nodeValue:', nodeValue)
  console.log('nodeType:', nodeType)

  switch (nodeType) {
    case 'array':
      return (
        <div>
          array
        </div>
      );
    case 'object':
      return [
        <div className={!isExpanded && 'preview-block'}>
          <span className={caretClass} onClick={() => setExpanded(!isExpanded)}>arrow_right</span>
          {!isExpanded && <code>{`{...}`}</code> }
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
        </div>
      ];
    default:
      return (
        <div className="node">
          <code>{nodeKey}: {nodeValue}</code>
        </div>
      );
  }
  // return (
  //   <div>
  //     {/* <span className={caretClass} onClick={() => setExpanded(!isExpanded)}>arrow_right</span> */}
  //     <code>{nodeKey}: {nodeValue}</code>
  //   </div>
  // );
}

function App() {
  const [jsonData, setJsonData] = useState(null);

  // const getJsonData = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     setJsonData(result);
  //   } catch (error) {
  //     console.error('Fetch Error:', error);
  //   }
  // };

  const renderNodes = (data) => {
    return Object.keys(data).map((key, index) => {
      return <Node
        key={index}
        nodeKey={key}
        nodeValue={data[key]}
        nodeType={typeof data[key]} />;
    });
  };

  useEffect(() => {
    const testUrl = 'https://raw.githubusercontent.com/epic404/json-tree/master/data/test1.json';
    const getJsonData = async () => {
      try {
        const response = await fetch(testUrl);
        const result = await response.json();
        setJsonData(result);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    getJsonData();
  },[]);

  return (jsonData &&
    <div className="app">
      <Node nodeValue={jsonData} nodeType={typeof jsonData} autoExpand={true} />
    </div>
  );
}

export default App;
