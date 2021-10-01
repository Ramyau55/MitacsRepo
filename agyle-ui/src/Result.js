import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Tooltip, Cell, Legend, XAxis, YAxis} from 'recharts';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const auc_styles = {
    height: '100px',
    width: '500px',
    display: 'inline-block',
    fontSize:'18px'
  };
const AUC_text = <span style={auc_styles}>
AUC or ROC curve is a plot of the proportion of true positives (events correctly predicted to be events) versus the proportion of false positives (nonevents wrongly predicted to be events) at different probability cutoffs. 
True Positive Rate is also called Sensitivity. False Positive Rate is also called (1-Specificity). 
Sensitivity is on Y-axis and (1-Specificity) is on X-axis. Higher the AUC score, better the model.
</span>;


function Result() {
    const location = useLocation();
    const [auc, setAuc] = React.useState("");
    const [importance, setImportance] = React.useState([]);

    useEffect(() => {
        console.log(location); 
        if (location.state) {
            setAuc(location.state.auc);
            let data = [];           
            Object.keys(location.state.vimp.importance).map(key => data.push({ name: key, value: location.state.vimp.importance[key] }))
            setImportance(data);
        }

    }, [location]);

    return (
        <div style={{ marginLeft: "200px" }}>
            <label style={{ color: "blue", fontSize: "26px" }}> auc value: {auc} </label> <Tooltip
                    placement="left"
                    overlay={AUC_text}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <a href="#">? </a>
                </Tooltip> 
            <h3 style={{ textDecorationLine: 'underline' }}> Pie Chart Representation of Selected Columns Vs Importance</h3>
            
            <PieChart style={{ paddingTop: "100px" }} width={1000} height={400}>
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

            <h3 style={{ textDecorationLine: 'underline' }}> Bar chart Representation of Selected Columns Vs Importance</h3>

            <BarChart style={{ paddingTop: "100px" }} width={1000} height={500} data={importance}>
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
