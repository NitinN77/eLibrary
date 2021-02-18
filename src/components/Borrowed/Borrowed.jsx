import React from 'react'
import { useStateValue } from "../../StateProvider";


function Borrowed() {

    const [{ borrowed }] = useStateValue();

    return (
        <div style={{'margin-top': '200px'}}>
            {borrowed.map(book => book.name)}
        </div>
    )
}

export default Borrowed
