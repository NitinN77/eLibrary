import {React, useState, useEffect} from "react";
import useStyles from "./styles";
import readsvg from "../../assets/undraw_Reading.svg";
import {Tabs, Tab, AppBar} from '@material-ui/core'
import { useStateValue } from "../../StateProvider";
import {Link} from 'react-router-dom'
import { db } from '../../firebase'

const Profile = () => {
  const classes = useStyles();
  const [{ user }, ] = useStateValue();
  const [value, setValue] = useState(0);
  const [bhistory, setBhistory] = useState([]);
  const handleTabs = (e,val) => {
      setValue(val)
  }

  const fetchbhistory = async () => {
    let rdata = await db.collection("bhistory").doc(user.email).get();
    rdata = rdata.data().history
    setBhistory(rdata)
  }

  useEffect(() => {
    if (user) {
      fetchbhistory();
    }
  }, [user])


  return (
    <>
      <div className={classes.bg}>
        <div className={classes.root}>
          <h1
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              fontSize: "50px",
            }}
          >
            Your Profile
          </h1>
          <img
            src={readsvg}
            style={{ height: "250px", margin: "auto", paddingLeft: "1100px" }}
          />
        </div>
      </div>
      {user? 
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                    <Tab label="BORROWING HISTORY" />
                    <Tab label="PREFERRED TAGS" />
                    <Tab label="item 3" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {bhistory && bhistory.map(book => (<p>{book.name}</p>))}
            </TabPanel>
            <TabPanel value={value} index={1}>
          
            </TabPanel>
            <TabPanel value={value} index={2}>
              
            </TabPanel>
        </div>
        : <div><h3>You must <Link to="/login">Log in</Link></h3></div> }

    </>
  );
};

const TabPanel = (props) => {
    const {children, value, index} = props
    return(
        <div>
            {
                value===index && (
                    <h1>{children}</h1>
                )
            }
        </div>
    )
}

export default Profile;
