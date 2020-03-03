import React from "react";
import {
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Paper,
  CardActionArea,
  Grow
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const Product = props => {
  const history = useHistory();

  function handleClick() {
    history.push("/releases?product=" + props.item.id);
  }

  return (
    <Grow in={!props.loading}>
      <ProductPaper elevation="6">
        {props.loading ? (
          <React.Fragment>
            <Skeleton variant="rect" height={250} />
            <Skeleton variant="text" />
            ii
          </React.Fragment>
        ) : (
          <CardActionArea onClick={handleClick}>
            <Grid container spacing={1}>
              <Grid item>
                <CardImage component="img" image={props.img} title="Image" />
              </Grid>
              <Grid item xs container>
                <ProductCardContent>
                  <Typography variant="h4" component="h2">
                    {props.item.name}
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
        )}
      </ProductPaper>
    </Grow>
  );
};
export default Product;

Product.propTypes = {
  loading: PropTypes.bool
};

Product.defaultProps = {
  loading: false
};

const ProductPaper = styled(Paper)`
  margin: auto;
  background-color: ${props => props.theme.mainColor} !important;
  height: 250px;
  width: 100%;
`;

const ProductCardContent = styled(CardContent)`
  color: white;
`;

const CardImage = styled(CardMedia)`
  && {
    max-width: auto 400px;
    max-height: 250px;
  }
`;
