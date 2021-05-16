import React from 'react'
import useStyles from './styles';
import readsvg from '../../assets/undraw_Reading.svg'


const Profile = () => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.bg}>
            <div className={classes.root}>
                <h1 style={{marginTop: 'auto', marginBottom: 'auto', 'fontSize': '50px'}}>Your Profile</h1>
                <img src={readsvg} style={{height: '250px',margin: 'auto', paddingLeft: '1100px'}}/>
            </div>
        </div>
        </>

    )
}

export default Profile
