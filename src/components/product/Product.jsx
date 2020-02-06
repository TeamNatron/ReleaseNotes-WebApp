import React, { Component } from "react";
import {
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Paper,
  CardActionArea
} from "@material-ui/core";
import styled from "styled-components";

class Product extends Component {

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <ProductPaper elevation="6">
        <CardActionArea onClick={this.handleClick}>
          <Grid container spacing={1}>
            <Grid item>
              <CardImage component="img" image={this.props.img} title="Image" />
            </Grid>
            <Grid item xs container>
              <ProductCardContent>
                <Typography gutterBottom>Word of the Day</Typography>
                <Typography variant="h5" component="h2">
                  Cordel INNE
                </Typography>
                <Typography>adjective</Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </ProductCardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </ProductPaper>
    );
  }
}

export default Product;

const ProductPaper = styled(Paper)`
  margin: auto;
  background-color: ${props => props.theme.mainColor} !important;
  width: 100%;
`;

const ProductCardContent = styled(CardContent)`
  color: white;
`;

const CardImage = styled(CardMedia)`
  max-width: 400px;
  width: 100% !important;
`;
