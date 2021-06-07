import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './displayFeatures.css';


const DisplayFeatures = () => {
    const location = useLocation();
    const [y, setY] = React.useState([]);
    const [x, setX] = React.useState([]);
    const[tableData,setData] =  React.useState({});
    const [selectedTable, setSelectedTable] = React.useState("");
    const [alertName, setAlertName] = React.useState("");
    const [msg, setMsg] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
        console.log(location); 
        if (location.state) {
            setSelectedTable(location.state.selectedTable);
            setX([]);
            setY([]);
            setMsg([]);
            setAlertName("");
            fetch('http://ml.cs.smu.ca:5000/fetchXandY?tableName=' +location.state.selectedTable).
            then(res =>  
                res.json()               
            ).then(               
                data => {               
                setX(data.X.map((x) => ({ name: x, isChecked: false })));
                setY(data.Y.map((y) => ({ name: y, isChecked: false })));
                setData(data);
            });          
        }

    }, [location]);

    
    const displayHome = (e) => {
        history.push({
            pathname: '/'
        });
    }

    const selectAllX = (e) => {  
        setX([]);      
        fetch('http://ml.cs.smu.ca:5000/fetchXandY?tableName=' + selectedTable).then(res => res.json()).then(data => {
            setX(data.X.map((x) => ({
                name: x, isChecked: true
        })));
           
        });                  
    }

    const onAddingX = (e) => {
        x[e].isChecked = !x[e].isChecked;
        setX(x);
    }

    const onAddingY = (e) => {
        y[e].isChecked = !y[e].isChecked;
        setY(y);
    }

    const processValues = (e) => {
        let selectedX = [];
        let selectedY = [];
        setMsg([]);
        x.filter(x => x.isChecked === true).map(x => selectedX.push(x.name));
        y.filter(y => y.isChecked === true).map(y => selectedY.push(y.name))
        let processClean = document.getElementById('processClean').checked;

        const data = {
            selectedTable: selectedTable,
            selectedX: selectedX,
            selectedY: selectedY,
            processClean: processClean
        };
        

        if (selectedY.length > 0 && selectedX.length > 0) {
            if (!selectedX.includes('alert_name')) selectedX.push('alert_name')
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
                    if (messageString !== "{}") window.confirm(messageString);
                    setMsg(messageString);
                    history.push({
                        pathname: '/Result',
                        state: { auc: data.auc, vimp: JSON.parse(data.vimp) }
                    });
                });
        } else {
            alert("Please select minimum of one column names and one alert types ")
        }
    }
    return (
        <div className="display_component_header">
           <button  onClick={e => displayHome()} type="button" className="btn btn-secondary select_table_buton">Select Different Table</button>
           <div className="features_container">
            {
                x.length >= 1 && 
                <div className="columns_container">
                    <span> <b>Columns</b></span> 
                    <div>
                        <input onClick={e => selectAllX(e)} type="checkbox" defaultChecked={false}  />
                        <label className="display_checkbox_label">Select All</label>
                    </div>
                    {x.map((field, i) => {
                        return (   
                            <div >
                            <input type="checkbox" key={i} onChange={e => onAddingX(i)} value={field.name} defaultChecked={field.isChecked}  />
                            <label className="display_checkbox_label">{field.name}</label>
                            </div>)
                    })}              
                </div>
            }
            {
                y.length >= 1 && 
                <div className="alerttypes_container">
                    <span> <b>Alert Types</b></span> 
                    {y.map((field, i) => {
                    return (   
                        <div >
                        <input type="checkbox" key={i} onChange={e => onAddingY(i)} value={field.name} defaultChecked={field.isChecked}  />
                        <label className="display_checkbox_label">{field.name}</label>
                        </div>)
                    })}           
                </div>
            }
            </div>
            <div>
                <span> Prefer Cleaning the Data</span>
                <input id="processClean" type="checkbox" defaultChecked={true} /> <span ></span>
            
                <button onClick={e => processValues()}>
                    Process
                </button>
            </div>
        </div>
    )
 
}

export default DisplayFeatures;