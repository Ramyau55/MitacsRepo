import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"
import './displayFeatures.css';


const DisplayFeatures = () => {
    const location = useLocation();
    const [y, setY] = React.useState([]);
    const [x, setX] = React.useState([]);
    const [selectedTable, setSelectedTable] = React.useState("");
    const [selectedAlert, setSelectedAlert] = React.useState(null);
    const [selectedFeature, setSelectedFeature] = React.useState([]);
    const [msg, setMsg] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
        console.log(location); 
        if (location.state) {
            setSelectedTable(location.state.selectedTable);
            setX([]);
            setY([]);
            setMsg([]);
            fetch('http://ml.cs.smu.ca:5000/fetchXandY?tableName=' +location.state.selectedTable).
            then(res =>  
                res.json()               
            ).then(               
                data => {               
                setX(data.X.map((x) => ({ label: x, id: x })));
                setY(data.Y.map((y) => ({ label: y, value: y })));
            });          
        }

    }, [location]);

    
    const displayHome = (e) => {
        history.push({
            pathname: '/'
        });
    }

    const handleAlertChange =  e => {
        setSelectedAlert(e);
      };

    const handleFeaturesChange =  e => {
        setSelectedFeature(e);
    };

    const [toggle, setToggle] = React.useState(false);

    const triggerToggle = () => {
        debugger;
        setToggle( !toggle )
    };
    const processValues = (e) => {
        let selectedX = [];
        let selectedY = [];
        setMsg([]);
            selectedAlert.map((y)=> selectedY.push(y.label))
            selectedFeature.map((x)=> selectedX.push(x.label))
        const data = {
            selectedTable: selectedTable,
            selectedX: selectedX,
            selectedY: selectedY,
            processClean: toggle
        };
        

        if (selectedY.length > 0 && selectedX.length > 0) {
            debugger;
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
                        state: { auc: data.auc, vimp: JSON.parse(data.vimp),selectedTable:selectedTable }
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
                {  x.length >= 1 &&  
                    <MultiSelect
                    className="multi_select"
                            items={x}
                            selectedItems={selectedFeature}
                            onChange={e => handleFeaturesChange(e)}
                    />
                } 
            </div>
            <div className="alert_select">
                { y.length >= 1 &&
                    <Select
                    isMulti={true}
                    value={selectedAlert}
                    onChange={e => handleAlertChange(e)}
                    options={y}
                    />
                }
            </div>
            <div className="clean_data_div">
                <span>Do you like to Clean the Data? </span>
                <div onClick={triggerToggle} className={`wrg-toggle ${toggle ? 'wrg-toggle--checked' : ''}` }>
                    <div className="wrg-toggle-container">
                        <div className="wrg-toggle-check">
                            <span>🌜</span>
                        </div>
                        <div className="wrg-toggle-uncheck">
                            <span>🌞</span>
                        </div>
                    </div>
                    <div className="wrg-toggle-circle"></div>
                    <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
                </div>                                        
            </div>
            <button className="process_btn btn btn-primary" onClick={e => processValues()}>
                    Process
            </button>
        </div>
        
    )
 
}

export default DisplayFeatures;