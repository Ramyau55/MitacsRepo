import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, XAxis, YAxis} from 'recharts';


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
        <div>
            <h2> auc value: { auc} </h2>
            <h2> Selected Columns and Importance </h2>
            <PieChart width={1000} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={importance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                
                <Tooltip />
            </PieChart>
            <BarChart width={700} height={500} data={importance}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
export default Result;
