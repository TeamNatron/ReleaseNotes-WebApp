import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Link } from "react-router-dom";
//import LinkedinLogo from '../../public/LinkedinLogo';

const Footer = () => {
  return (
    <Div>
      <FlexContainer>
        <SectionSocials>
          <MyButton>
            <FacebookIcon />
          </MyButton>
          <MyButton>
            <InstagramIcon />
          </MyButton>
          <MyButton>
            <LinkedinLogo />
          </MyButton>
          <MyButton>
            <YouTubeIcon />
          </MyButton>
        </SectionSocials>

        <Section>
          <SectionTitle>Produkter</SectionTitle>
          <SectionInfo>Cordel ONE</SectionInfo>
          <SectionInfo>Cordel PROFF</SectionInfo>
          <SectionInfo>Cordel TOTAL</SectionInfo>
          <SectionInfo>Cordel UTE</SectionInfo>
          <SectionInfo>Cordel Anbudskalkulasjon</SectionInfo>
        </Section>

        <Section>
          <SectionTitle>Nyttige sider</SectionTitle>
          <SectionInfo>Kurs og webinarer</SectionInfo>
          <SectionInfo>Videor</SectionInfo>
          <SectionInfo>Ordbok</SectionInfo>
          <SectionInfo>Kundesider</SectionInfo>
        </Section>

        <Section>
          <SectionTitle>Cordel Norge</SectionTitle>
          <SectionInfo>Kontakt</SectionInfo>
          <SectionInfo>Om oss</SectionInfo>
          <SectionInfo>Samarbeidspartnere</SectionInfo>
          <SectionInfo>Jobb i Cordel</SectionInfo>
        </Section>

        <Section>
          <SectionTitle>Sentralbord</SectionTitle>
          <SectionInfo>Borgrundfjorden 80</SectionInfo>
          <SectionInfo>firmapost@cordel.no</SectionInfo>
          <SectionTitle>Bestill demo</SectionTitle>
          <SectionInfo>(+47) 70 17 84 10</SectionInfo>
          <SectionInfo>info@cordel.no</SectionInfo>
        </Section>

        <Link to="/login/">
          <LoginButton>Logg inn</LoginButton>
        </Link>
      </FlexContainer>
    </Div>
  );
};

export default Footer;

const LinkedinLogo = styled.span``;

const SectionSocials = styled.article`
  margin-bottom: 3rem;
  @media only screen and (min-width: 990px) {
    margin-bottom: 5rem;
  }
`;

const MyButton = styled(IconButton)`
  && {
    width: 45px;
    height: 45px;
    margin: 4rem 0.35rem 0.4rem 0.35rem;
    background-color: #ec6707;
    border-color: transparent;
    border-radius: 0.2rem;
    color: #ffffff;
    :hover {
      background: #b54e0d;
    }
  }
`;

const LoginButton = styled(Button)`
  && {
    margin: 1rem auto;
    background-color: #ec6707;
    border-color: transparent;
    border-radius: 0.2rem;
    color: #ffffff;
    :hover {
      background: #b54e0d;
    }
    @media only screen and (max-width: 990px) {
      flex-direction: column;
    }
  }
`;

const Section = styled.section`
  font-size: 0.9375rem;
`;

const SectionTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const SectionInfo = styled.p``;

const Div = styled.footer`
  margin-top: 350px;
  width: 100vw;
  background: ${props => props.theme.mainColor};
  font-size: 1.4rem;
  color: white;
`;

const FlexContainer = styled.div`
  max-width: ${props => props.theme.contentWidth};
  display: flex;
  margin: auto;
  flex-direction: row;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  flex-basis: 12.5rem;
  flex-wrap: wrap;
  text-align: center;
  height: 100%;
  & > * {
    height: 100%;
  }
  @media only screen and (max-width: 990px) {
    flex-direction: column;
  }
`;
