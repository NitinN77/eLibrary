import React from 'react'
import useStyles from "./styles";

const News = () => {
    const classes = useStyles();
    return (
        <div className={classes.bg}>
            <h1>News</h1>
        </div>
    )
}

export default News
