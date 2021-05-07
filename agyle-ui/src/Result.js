import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {
    const location = useLocation();
    const [auc, setAuc] = React.useState("");
    useEffect(() => {
        console.log(location); 
        if(location.state)
        setAuc(location.state.auc);
    }, [location]);

    return (
        <div>
            {auc}
        </div>
    );
}
export default Result;
