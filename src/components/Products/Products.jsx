import React, { useState } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
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
              <Typography variant="h5" >Filter</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}
