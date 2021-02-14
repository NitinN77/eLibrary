import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@material-ui/core";
import Product from "./Product/Product";
import SearchBar from "material-ui-search-bar";

import useStyles from "./styles";
import { useStateValue } from "../../StateProvider";

export default function Products() {
  const [{ products }] = useStateValue();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const dynamicSearch = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} className={classes.searchbar}/>
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
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={()=>{}} name="gilad" />}
                    label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={()=>{}} name="jason" />}
                    label="Jason Killian"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={()=>{}} name="antoine" />}
                    label="Antoine Llorca"
                  />
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}
