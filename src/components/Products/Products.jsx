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
} from "@material-ui/core";
import Product from "./Product/Product";
import SearchBar from "material-ui-search-bar";

import useStyles from "./styles";
import { useStateValue } from "../../StateProvider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconButton, Badge } from "@material-ui/core";
import { Mic, MicNone, Replay } from "@material-ui/icons";

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
  const [{ products }] = useStateValue();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtags, setSelectedTags] = useState([]);
  const [listening, setListening] = useState(false);

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
      command: "open *",
      callback: (website) => {
        window.open("https://" + website.split(" ").join(""));
      },
    },
    {
      command: "filter by *",
      callback: (filter) => {
        setSearchTerm(filter);
      },
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <SearchBar
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        className={classes.searchbar}
      />
      <div className="va">
        <IconButton color="inherit" onClick={() => {handleListening()}}>
          <Badge>
            {listening ? <Mic /> : <MicNone />}
          </Badge>
        </IconButton>
      </div>
      <br />
      <Grid container spacing={3}>
        <Grid item container justify="center" spacing={3} lg={10}>
          {dynamicSearch().map((product) => (
            <Grid item key={product.id} lg={12}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <Grid item container lg={2}>
          <Card className={classes.filtersection}>
            <CardContent>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" style={{ paddingBottom: "15px" }}>
                  <Typography variant="h5">Filter by Tags</Typography>
                </FormLabel>
                <FormGroup>
                  {categories.map((cat) => (
                    <FormControlLabel
                      control={
                        <Checkbox onChange={() => handlefilterchange(cat)} />
                      }
                      label={cat}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}
