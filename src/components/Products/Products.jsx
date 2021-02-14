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

  const dynamicSearch = () => {
    return products.filter((product) => {
      if (searchTerm) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      else {
        const cats = product.categories.map(cat => cat.name).sort().join('')
        return cats.toLowerCase().includes(selectedtags.sort().join('').toLowerCase());
      }
    }
    );
  };

  const handlefilterchange = (cat) => {
    if (selectedtags.includes(cat)) {
      setSelectedTags(selectedtags.filter(tag => tag !== cat))
    }
    else {
      setSelectedTags([...selectedtags, cat])
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <SearchBar
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        className={classes.searchbar}
      />
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
                <FormLabel component="legend" style={{paddingBottom: '15px'}}>
                  <Typography variant="h5">Filter by Tags</Typography>
                </FormLabel>
                <FormGroup>
                  {categories.map((cat) => (
                    <FormControlLabel
                      control={<Checkbox onChange={() => handlefilterchange(cat)}/>}
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
