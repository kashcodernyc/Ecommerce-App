import { Facebook, Instagram, Twitter, Pinterest, Room, MailOutline, Phone  } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import {mobile} from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: 'column'})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
    font-weight: bold;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: 'none'})}
`
const Title = styled.h3`
    margin-botton: 30px;
    font-weight: bold;
    margin-bottom: 20px;


`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;

`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    font-size: 14px;
    ${mobile({backgroundColor: '#fcf5f5'})}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;


`
const Payment = styled.img`
    width: 40%;
`
const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>KASH CO.</Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tempore dolore sit nam, modi distinctio sequi asperiores ullam accusantium iste animi iusto consequatur aut neque quaerat, ab similique voluptatem! Natus?</Desc>
            <SocialContainer>
                <SocialIcon color = '3B5999'><Facebook/></SocialIcon>
                <SocialIcon color = 'E4405F'><Instagram/></SocialIcon>
                <SocialIcon color = '55ACEE'><Twitter/></SocialIcon>
                <SocialIcon color = 'E60023'><Pinterest/></SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Mens Shoes</ListItem>
                <ListItem>Womens Shoes</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>
                <ContactItem><Room style = {{marginRignt: '10px'}}/>424 Wooster Ave, Nantasket, Connecticut 06732</ContactItem>
                <ContactItem><Phone style = {{marginRignt: '10px'}}/>+1 543 964 1236</ContactItem>
                <ContactItem><MailOutline style = {{marginRignt: '10px'}}/>firekick@gmail.com</ContactItem>
                <Payment src = '/img/cards.png'></Payment>
            </Title>
        </Right>
    </Container>
  )
}

export default Footer