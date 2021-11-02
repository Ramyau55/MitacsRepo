import React from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './home.css';

const Home = () => {
    const [items, setItems] = React.useState([]);
    let history = useHistory();
    const[isLoading,setIsLoading] = React.useState(true);
    const[activePage,setActivePage] = React.useState(1);
    

    React.useEffect(() => {
        async function getTables() {
            const response = await fetch("http://ml.cs.smu.ca:5000/getTables");
            const data = await response.json();
            debugger;
            //setItems(data.X.map((x) => ({ label: x, value: x })));
            setItems(data.X.map((x) => ({ tabel: x.table_name, xcount: x.xtotal, ycount: x.ytotal })));
            setIsLoading(false);
        }
        getTables();
    }, []);

    const tableValues = (tableValue) => {
        history.push({
            pathname: '/DisplayFeatures',
            state: { selectedTable: tableValue}
        });
    }

    const handlePageChange = (e) => {
        setActivePage(e);
    }

    const getPaginatedData = () => {
        const startIndex = activePage * 10 - 10;
        const endIndex = startIndex + 10;
        return items.slice(startIndex, endIndex);
    };

    return (
        isLoading ? <div className="list_loading"> Please wait.......</div> : 
        <div className="list_view_component">
            {items.length >= 1 &&          
            <div  className="list-group">
                 <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount= {items.length}
                    pageRangeDisplayed={5}
                    onChange={e => handlePageChange(e)}
                />
                {getPaginatedData().map(data => (
                    <div><button onClick={e => tableValues(data.tabel)} className="list-group-item list-group-item-action" key={data.tabel}> {data.tabel + " ( Total X: " + data.xcount + ", Total Y: " + data.ycount +" )"}</button></div>
                ))}
        </div>}
    </div>

    )

}
export default Home;