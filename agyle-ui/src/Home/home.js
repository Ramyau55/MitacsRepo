import React from 'react';
import { useHistory } from 'react-router-dom';

import './home.css';

const Home = () => {
    const [items, setItems] = React.useState([]);
    let history = useHistory();

    React.useEffect(() => {
        async function getTables() {
            const response = await fetch("http://ml.cs.smu.ca:5000/getTables");
            const data = await response.json();
            setItems(data.X.map((x) => ({ label: x, value: x })));
        }
        getTables();
    }, []);

    const tableValues = (tableValue) => {
        debugger;
        history.push({
            pathname: '/DisplayFeatures',
            state: { selectedTable: tableValue}
        });
    }

    return (
        <div className="list_view_component">
            {items.length >= 1 &&
            <div  className="list-group">
            {items.map(data => (
                <button onClick={e => tableValues(data.value)} className="list-group-item list-group-item-action" key={data.value}> {data.value}</button>
            ))}
        </div>}
    </div>)

}
export default Home;