import {React, useState, useEffect} from 'react'
import axios from 'axios';

const Recommender = () => {

    const [apiret, setApiret] = useState({});
    const [title, setTitle] = useState("Insurgent");
    const [genre, setGenre] = useState("Non-Fiction");

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/?key1=${title}&key2=${genre}`)
        .then(res => {
            const resp = res.data.data[2];
            setApiret(resp)
        })
        console.log(apiret);
    }, []);

    return (
        <div style={{marginTop: '120px', marginLeft: '50px'}}>
            <h1>Recommender</h1>
            {apiret.title ? <p>{Object.values(apiret.title).map(title=><p>{title}</p>)}</p> : <div></div>}
        </div>
    )
}

export default Recommender
