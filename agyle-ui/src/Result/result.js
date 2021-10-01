import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './result.css';
// import { BarChart, Bar, PieChart, Pie, Tooltip, Cell, Legend, XAxis, YAxis} from 'recharts';
import { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
// import {
//     ComposedChart,
//     Line,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     Area
//   } from "recharts";

import TooltipRC from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const auc_styles = {
    height: '100px',
    width: '500px',
    display: 'inline-block',
    fontSize:'16px'
  };
const AUC_text = <span style={auc_styles}>
AUC or ROC curve is a plot of the proportion of true positives (events correctly predicted to be events) versus the proportion of false positives (nonevents wrongly predicted to be events) at different probability cutoffs. 
True Positive Rate is also called Sensitivity. False Positive Rate is also called (1-Specificity). 
Sensitivity is on Y-axis and (1-Specificity) is on X-axis. Higher the AUC score, better the model.
</span>;

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
        history.push({
            pathname: '/DisplayFeatures',
            state: { selectedTable: table}
        });
    }

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    return (
        <div style={{ paddingTop:"10%" }}>
             <button className="btn btn-secondary" onClick={e => backToFeatures()}>
                    Back
            </button>
            <div style={{ width:"100%", display:"flex",flexDirection: "row" }}>
            <div style={{ width:"70%" ,marginLeft:"2%"}}>
            {/* <PieChart width={600} height={500}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={importance}
                            cx="50%"
                            cy="50%"
                           
                            label
                        >
                            {importance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'#' + Math.floor(Math.random() * 16777215).toString(16)} />
                            ))}
                        </Pie>
                        
                        <Tooltip />
                    </PieChart> */}
                          
        <ComposedChart
          layout="vertical"
          width={800}
          height={500}
          data={importance}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={300} scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
                            {importance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={'#' + Math.floor(Math.random() * 16777215).toString(16)} />
                            ))}
                        </Bar> 
        </ComposedChart>
     
                    
            </div>
            <div style={{ width:"50%" }}>
                <div className="imp_info">
                <p>AUC : {formatter.format(Number(auc))}<TooltipRC
                    placement="left"
                    overlay={AUC_text}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <a href="#"> ?</a>
                </TooltipRC></p>
                <p>Highest Importance: {Math.max(...importance.map((a) => a.value))}</p>
                <div>Lowest Importance: {Math.min(...importance.map((a) => a.value))}</div>
                </div>
            
            </div>
            </div>
        </div>
    );
}
export default Result;
