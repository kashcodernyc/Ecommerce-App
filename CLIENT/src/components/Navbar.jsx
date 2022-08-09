import React from 'react'
import styled from 'styled-components';
import { Badge } from '@material-ui/core';
import {Search, ShoppingCartOutlined} from '@material-ui/icons';
import {mobile} from '../responsive';

const Container = styled.div`
    height: 60px;
    ${mobile({height: '50px'})}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: '10px 0px'})}
`
const Left = styled.div`
    display: flex;
    flex:1;
    align-items: center;
`

const Language =  styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: 'none'})}
`
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
    padding: 5px;
     ${mobile({marginLeft: '15px;'})}
`

const Input = styled.input`
    border: none;
    ${mobile({width: '60px'})}
`
const Center = styled.div`
    flex:1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: '23px'})}
`
const Right = styled.div`
    display: flex;
    flex:1;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: 1.5, justifyContent: 'center'})}
`
const MenuItem = styled.div`
    font-size: 14px;
    margin-left: 25px;
    cursor: pointer;
    ${mobile({fontSize: '12px', marginLeft: '10px'})}
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>
                    EN
                </Language>
                <SearchContainer>
                    <Input placeholder = 'search'/>
                    <Search style = {{color: 'gray', fontSize: '16px'}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>SUBBA CO.</Logo></Center>
            <Right>
                <MenuItem>Register</MenuItem>
                <MenuItem>Log In</MenuItem>
                <MenuItem>
                    <Badge badgeContent = {4} color = 'primary'>
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar