import React from 'react';
import './App.css';

function App() {
    const [items, setItems] = React.useState(['']);
    const [y, setY] = React.useState(['']);
    const [x, setX] = React.useState(['']);
   
    React.useEffect(() => {
        async function getTables() {
            const response = await fetch("http://ml.cs.smu.ca:5000/getTables");
            const data = await response.json();
            setItems(data.X.map((x) => ({ label: x, value: x })));
        }
        getTables();
    }, []);

    const tableChange = (e) => {
        fetch('http://ml.cs.smu.ca:5000/fetchXandY?tableName=' + e.target.value).then(res => res.json()).then(data => {
            setX(data.X.map((x) => ({ name: x, isChecked: false })));
            setY(data.Y.map((y) => ({ name: y, isChecked: false })));
        });
    }
    const processXandY = (e) => {
        let selectedX = [];
        let selectedY = [];
        x.filter(x => x.isChecked === true).map(x => selectedX.push(x.name));
        y.filter(y => y.isChecked === true).map(y => selectedY.push(y.name))
        let selectedTable = document.getElementById('tableSelect').value;
        const data = {
            selectedTable: selectedTable,
            selectedX: selectedX,
            selectedY: selectedY
        };
        fetch('http://ml.cs.smu.ca:5000/processXandY', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => alert('success'));
    }
    
    const onAddingX = (e) => {   
        x[e].isChecked = !x[e].isChecked;
        setX(x);
    }

    const onAddingY = (e) => {
        y[e].isChecked = !y[e].isChecked;
        setY(y);
    }

    return (
        <div className="App">
            { items.length > 1 && <select id="tableSelect" onChange={e => tableChange(e)}>
                <option > Select a Table</option>
                {items.map(item => (
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.value}
                    </option>
                ))}
            </select> }
            <div style={{ marginBottom: "50px" }}>
                
            </div>
            <tr>
                {x.length > 1 &&
                    <td style={{ paddingRight:"250px" }}>
                        <span> <b>Column Values </b></span>
                        {x.map((field, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{field.name}</td>
                                    <td>
                                        <div >
                                            <label >
                                                <input type="checkbox" value={field.name} defaultChecked={field.isChecked} onChange={ e => onAddingX(i)} /> <span ></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </td>
                }
                {y.length > 1 &&
                    <td>
                        <span> <b>Alert Types</b> </span>
                        {y.map((field, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{field.name}</td>
                                    <td>
                                        <div >
                                            <label >
                                                <input type="checkbox" value={field.name} defaultChecked={field.isChecked} onChange={e => onAddingY(i)}/> <span ></span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                            )}
                    </td>
                }
                
            </tr>
            {(x.length > 1 || y.length > 1) && <button onClick={e => processXandY(e)}>
                Process
            </button>
            }
            
        </div>
        
    );
 
 }
export default App;
