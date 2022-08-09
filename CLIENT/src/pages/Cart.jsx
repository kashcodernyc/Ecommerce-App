import React from 'react'
import Footer from '../components/Footer';
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import {Add,Remove} from '@material-ui/icons';
import {mobile} from '../responsive';

const Container = styled.div`
   
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: '10px'})}
`

const Title = styled.h1`
    font-weight: bold;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && 'none'};
    background-color: ${(props) => props.type === "filled" ? 'black': 'transparent'};
    color: ${(props) => props.type === "filled" && 'white'};
    
`


const TopTexts = styled.div`
    display: flex;
    flex-direction: row;
    ${mobile({display: 'none'})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: 'column'})}
`
const Info = styled.div`
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: 'column'})}
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductDetail = styled.div`
    display: flex;
    flex:2
`
const Image = styled.img`
    width: 200px;
`
const ProductName = styled.span`
`
const B = styled.span`
    font-weight: bold;
`
const ProductId = styled.span`
`
const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
`
const PriceDetail = styled.span`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({margin: '5px 15px'})}
`
const ProductPrice = styled.div`
    font-size: 20px;
    font-weight: 200;
    ${mobile({marginBottom: '20px'})}
`

const Hr = styled.hr`
    background-color: lightgray;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;

`

const SummaryTitle = styled.h1`
    font-weight: bold;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && 'bold'};
    font-size: ${props => props.type === 'total' && '20px'};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const SummaryButton = styled.button`
    width: 100%;padding: 10px;
    background-color: black;
    color:white;
    font-weight: 500;
`


const Cart = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOUR CART</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag (2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type = "filled">CHECKOUT</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image src = 'img/prada.jpg'/>
                            <Details>
                                <ProductName>
                                    <B>Product:</B> Nike Airmax
                                </ProductName>
                                <ProductId>
                                    <B>ID:</B> 4390439078
                                </ProductId>
                                <ProductColor color = 'black'/>
                                <ProductSize> 
                                    <B>Size:</B> 9 
                                </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                    <ProductAmount>2</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice><B>$ 70</B></ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image src = 'img/prada.jpg'/>
                            <Details>
                                <ProductName>
                                    <B>Product:</B> Nike Airmax
                                </ProductName>
                                <ProductId>
                                    <B>ID:</B> 4390439078
                                </ProductId>
                                <ProductColor color = 'black'/>
                                <ProductSize> 
                                    <B>Size:</B> 9 
                                </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                    <ProductAmount>2</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice><B>$ 70</B></ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ 140</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 7.50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -7.50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type = 'total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ 140</SummaryItemPrice>
                        </SummaryItem>
                    <SummaryButton>CHECKOUT</SummaryButton>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart