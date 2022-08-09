import {React, useState} from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import {mobile} from '../responsive';
import { useLocation } from 'react-router-dom';


const Container = styled.div`
`
const Title = styled.h1`
    margin: 20px;
    font-weight: bold;

`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({margin: '0px 20px', display: 'flex', flexDirection: 'column'})}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 500;
    margin-right: 20px;
    ${mobile({marginRight: '0px'})}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({magin: '10px 0px'})}
`
const  Option = styled.option``

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState('newest');

  console.log(cat);

  const handleFilters = (e) => {
      const value = e.target.value;
      setFilter({
          ...filters,
          [e.target.name]: value
      })
  }
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>Designer Shoes</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products: </FilterText>
                <Select name = 'color' onChange={handleFilters}>
                    <Option disabled>
                        Color
                     </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>yellow</Option>
                    <Option>blue</Option>
                    <Option>red</Option>
                </Select>
                <Select name = 'size' onChange={handleFilters}>
                    <Option disabled>
                        Size
                     </Option>
                    <Option>7</Option>
                    <Option>8</Option>
                    <Option>9</Option>
                    <Option>10</Option>
                    <Option>11</Option>
                    <Option>12</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products: </FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option selected>
                        Newest
                     </Option>
                    <Option value = 'newest'>New Arrivals</Option>
                    <Option value = 'asc'>Price (low to high)</Option>
                    <Option value = 'dec'>Price (high to low)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat = {cat} filters = {filters} sort = {sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList