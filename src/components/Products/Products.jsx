import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  IconButton, Badge, Button, Tooltip, Fab
} from "@material-ui/core";
import Product from "./Product/Product";
import SearchBar from "material-ui-search-bar";

import useStyles from "./styles";
import { useStateValue } from "../../StateProvider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, MicNone } from "@material-ui/icons";
import { commerce } from "../../lib/commerce";
import { useHistory, Link} from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import DeleteIcon from '@material-ui/icons/Delete';

const categories = [
  "AI/ML",
  "OOP",
  "Guide Book",
  "Python",
  "C/C++",
  "Programming",
  "Mathematics",
  "Data Structures and Algorithms",
  "Javascript",
  "CSS",
  "HTML",
];

export default function Products() {
  let history = useHistory();
  const [{ products }, dispatch] = useStateValue();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtags, setSelectedTags] = useState([]);
  const [listening, setListening] = useState(false);

  const { speak } = useSpeechSynthesis();

  const dynamicSearch = () => {
    return products.filter((product) => {
      if (searchTerm) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        const cats = product.categories
          .map((cat) => cat.name)
          .sort()
          .join("");
        return cats
          .toLowerCase()
          .includes(selectedtags.sort().join("").toLowerCase());
      }
    });
  };

  const handlefilterchange = (cat) => {
    if (selectedtags.includes(cat)) {
      setSelectedTags(selectedtags.filter((tag) => tag !== cat));
    } else {
      setSelectedTags([...selectedtags, cat]);
    }
  };

  const handleListening = () => {
    if(!listening) {
      setListening(!listening)
      SpeechRecognition.startListening()
    } else {
      setListening(!listening)
      SpeechRecognition.stopListening()
    }
  }

  const commands = [
    {
      command: "filter by *",
      callback: (filter) => {
        handlefilterchange(filter);
        speak({ text: `Filtered by ${filter}`});
      },
    },
    {
      command: "clear cart",
      callback: async () => {
        const { cart } = await commerce.cart.empty();
        dispatch({type: 'SET_CART', data: cart});
        speak({ text: "Cart has been cleared"});
      },
    },
    {
      command: "show borrowed",
      callback: () => {
        history.push('/borrowed')
        speak({ text: "Here are the books you have currently borrowed"});
      },
    },
    {
      command: "clear filters",
      callback: () => {
        setSelectedTags([])
        speak({ text: "Filters cleared"});

      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  return (
    <main className={classes.content} >
      <div className={classes.toolbar} />
      <SearchBar
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        className={classes.searchbar}
      />
      <div style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between'}}>
        {transcript}
      </div>
      <br />
      <Grid container spacing={3} md={12}>
        <Grid item container justify="center" spacing={3} lg={10}>
          {dynamicSearch().map((product) => (
            <Grid item key={product.id} lg={12}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <Grid item lg={2}>
          <Card className={classes.filtersection} variant="outlined">
            <CardContent>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ paddingBottom: "15px" }}>
                  <h2 style={{color: 'grey'}}>Filter</h2>
                </FormLabel>
                <FormGroup>
                  {categories.map((cat) => (
                    <FormControlLabel
                      control={
                        <Checkbox onChange={() => handlefilterchange(cat)} />
                      }
                      label={cat}
                      key={cat.id}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Tooltip title="Delete" style={{position: 'fixed', right: '15px', bottom: '20px'}}>
        <IconButton color="inherit" onClick={() => {handleListening()}}>
          <Fab color="primary" style={{height:80, width: 80}}>
            {listening ? <Mic style={{height:40, width: 40}}/> : <MicNone style={{height:40, width: 40}}/>}
          </Fab>
        </IconButton>
      </Tooltip>
    </main>
  );
}
