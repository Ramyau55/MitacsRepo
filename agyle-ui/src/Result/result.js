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
                <p>AUC: {formatter.format(Number(auc))}</p>
                <p>Highest Importance</p>
                <div>Lowest Importance</div>
                </div>
            
            </div>
            </div>
        </div>
    );
}
export default Result;
