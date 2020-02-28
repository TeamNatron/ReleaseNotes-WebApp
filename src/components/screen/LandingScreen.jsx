import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import Product from "../product/Product";
import List from "@material-ui/core/List";
import { ListItem, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productActions";

const LandingScreen = props => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  // https://blog.bitsrc.io/using-react-redux-hooks-97654aff01e4
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <WelcomeContainer maxWidth="false">
        <div>
          <h1>Velkommen til Release Notes System</h1>
          <p>Her kan du finne ut hva som er nytt med ditt produkt!</p>
          <p>Dette gjør du ved å velge ditt produkt nedenfor.</p>
        </div>
      </WelcomeContainer>
      <PageContainer>
        <ProductDisplay>
            <React.Fragment>
              {products.error ? (
                <p>ERROR: {[products.error.toString()]}</p>
              ) : (
                products.items.map(item => (
                  <ListItem>
                    <Product
                      img="https://constructionaccidentlawfirms.com/files/2019/08/AdobeStock_192077668.jpg"
                      item={item}
                      loading={products.loading}
                    />
                  </ListItem>
              )))}
            </React.Fragment>
        </ProductDisplay>
      </PageContainer>
    </React.Fragment>
  );
};

export default LandingScreen;

const WelcomeContainer = styled(Container)`
  margin: 0 0 6vw 0;
  padding: 2vw 0 2vw 0;
  height: 100%;
  background-color: ${props => props.theme.secondaryColor};
  text-align: center;
  color: white;
  display: flex;
  align-items: center;

  div {
    width: inherit;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  p,
  h1 {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }

  @media only screen and (max-width: 360px) {
    h1 {
      font-size: 1.25rem;
    }
    p {
      width: 70%;
      font-size: 0.75rem;
    }
  }
`;

const ProductDisplay = styled(List)`
  flex-direction: row;
`;
