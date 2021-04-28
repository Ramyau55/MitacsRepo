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
        //setSelectedTable(e.target.value)
    }

    const onAddingX = (i) => (event) => {
        this.setState((state, props) => {
            x[i].isChecked = !x[i].isChecked;
            setX(x)
            
        })
    }

    return (
        <div className="App">
            { items.length > 1 && <select onChange={e => tableChange(e)}>
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
                                        <div class="checkbox checkbox-circle checkbox-color-scheme">
                                            <label class="checkbox-checked">
                                                <input type="checkbox" value={field.name} checked={field.isChecked} onChange={ e => onAddingX(i)} /> <span class="label-text"></span>
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
                                        <div class="checkbox checkbox-circle checkbox-color-scheme">
                                            <label class="checkbox-checked">
                                                <input type="checkbox" value={field.name} checked={field.isChecked} /> <span class="label-text"></span>
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

        </div>
        
    );
 
 }
export default App;
