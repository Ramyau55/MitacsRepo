import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Tooltip, Cell, Legend, XAxis, YAxis} from 'recharts';


function Result() {
    const location = useLocation();
    const [auc, setAuc] = React.useState("");
    const [table, setTable] = React.useState("");
    const [importance, setImportance] = React.useState([]);
    let history = useHistory();
    useEffect(() => {
        console.log(location); 
        if (location.state) {
            setAuc(location.state.auc);
            setTable(location.state.selectedTable)
            let data = [];           
            Object.keys(location.state.vimp.importance).map(key => data.push({ name: key, value: location.state.vimp.importance[key] }))
            setImportance(data);
        }

    }, [location]);

    const backToFeatures = () => {
        debugger;
        history.push({
            pathname: '/DisplayFeatures',
            state: { selectedTable: table}
        });
    }

    return (
        <div style={{ marginLeft: "200px", paddingTop:"10%" }}>
             <button className="btn btn-secondary" onClick={e => backToFeatures()}>
                    Back
            </button>
            {/* <label style={{ color: "blue", fontSize: "26px" }}> auc value: {auc} </label> */}
            <h3 style={{ textDecorationLine: 'underline' }}> Pie Chart Representation of Selected Columns Vs Importance</h3>
            <div style={{ paddingBottom:"10%"}} >
            <PieChart style={{ paddingTop: "100px" }} width={1000} height={500}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={importance}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    label
                >
                    {importance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={'#' + Math.floor(Math.random() * 16777215).toString(16)} />
                    ))}
                </Pie>
                
                <Tooltip />
            </PieChart>
            </div>
            <h3 style={{ textDecorationLine: 'underline' }}> Bar chart Representation of Selected Columns Vs Importance</h3>

            <BarChart width={1000} height={500} data={importance}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              
                <Bar dataKey="value">
                    {importance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={'#' + Math.floor(Math.random() * 16777215).toString(16)} />
                    ))}
                </Bar>
                
            </BarChart>
        </div>
    );
}
export default Result;
