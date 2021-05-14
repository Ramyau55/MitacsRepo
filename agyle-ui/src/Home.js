import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [y, setY] = React.useState([]);
    const [x, setX] = React.useState([]);
    const [alertName, setAlertName] = React.useState("");
    const [msg, setMsg] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
        async function getTables() {
            const response = await fetch("http://ml.cs.smu.ca:5000/getTables");
            const data = await response.json();
            setItems(data.X.map((x) => ({ label: x, value: x })));
        }
        getTables();
    }, []);

    const tableChange = (e) => {
        setX([]);
        setY([]);
        setMsg([]);
        setAlertName("");
        fetch('http://ml.cs.smu.ca:5000/fetchXandY?tableName=' + e.target.value).then(res => res.json()).then(data => {
            setX(data.X.map((x) => ({ name: x, isChecked: false })));
            setY(data.Y.map((y) => ({ name: y, isChecked: false })));
        });
    }
    const processXandY = (e) => {
        let selectedX = [];
        let selectedY = [];
        setMsg([]);
        x.filter(x => x.isChecked === true).map(x => selectedX.push(x.name));
        y.filter(y => y.isChecked === true).map(y => selectedY.push(y.name))
        if(!selectedX.includes('alert_name')) selectedX.push('alert_name')
        let selectedTable = document.getElementById('tableSelect').value;
        let processClean = document.getElementById('processClean').checked;

        const data = {
            selectedTable: selectedTable,
            selectedX: selectedX,
            selectedY: alertName,
            processClean: processClean
        };
       
        fetch('http://ml.cs.smu.ca:5000/processXandY', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => (res.json()))
            .then(data => {
                var messageString = JSON.stringify(data.message);
                console.log(data);
                if (messageString !== "{}") alert(messageString);
                setMsg(messageString);
                history.push({
                    pathname: '/Result',
                    state: { auc: data.auc, vimp: JSON.parse(data.vimp) }
                });
            });
    }

    const onAddingX = (e) => {
        x[e].isChecked = !x[e].isChecked;
        setX(x);
    }

    const onAddingY = (e) => {
        if (!y[e].isChecked) {
            setAlertName(y[e].name);
        }
    }

    return (

        <div>

            {items.length >= 1 && <select id="tableSelect" style={{marginLeft:"300px" }} onChange={e => tableChange(e)}>
                    <option > Select a Table</option>
                    {items.map(item => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.value}
                        </option>
                    ))}
                </select>}
                <div>
                    {msg}
                </div>
                <table>
                    <tbody>
                        <tr>
                            {
                                x.length >= 1 &&
                                <td style={{ paddingLeft: "250px" }}>
                                    <span> <b>Columns</b></span>
                                    {x.map((field, i) => {
                                        return (
                                            <tr key={i + 1}>
                                                <td>{field.name}</td>
                                                <td>
                                                    <div >
                                                        <label >
                                                            <input type="checkbox" value={field.name} defaultChecked={field.isChecked} onChange={e => onAddingX(i)} /> <span ></span>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </td>
                            }
                            {
                                y.length >= 1 &&
                                <td style={{ paddingLeft: "150px" }}>
                                    <span> <b>Alert Types</b> </span>
                                    {y.map((field, i) => {
                                        return (
                                            <tr key={i + 1}>
                                                <td>{field.name}</td>
                                                <td>
                                                    <div >
                                                        <label >
                                                            <input type="radio" value={field.name} checked={alertName === field.name} onChange={e => onAddingY(i)} /> <span ></span>
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
                    </tbody>
            </table>
            {(x.length >= 1 || y.length >= 1) &&
                <div style={{ marginLeft: "400px" }} >
                <span> Clean the data before processing</span>
                <input id="processClean" type="checkbox" defaultChecked={true} /> <span ></span>
                
                <button onClick={e => processXandY()}>
                    Process
            </button>
                </div>
                }
        </div>
        )
}

export default Home;