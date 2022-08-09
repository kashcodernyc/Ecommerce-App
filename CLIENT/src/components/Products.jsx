import {React, useState, useEffect} from 'react'
import Product from './product'
import styled from 'styled-components';
import axios from  'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() =>{
    const getProducts = async () =>{
      try{
        // fetching data from the localhost api 
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}`: `http://localhost:5000/api/products`);
        setProducts(res.data);
      }catch(err){
        
      }
    }
    getProducts();
  }, [cat])

  // set filtered products if category exist
  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    );
  },[products, cat, filters])

  // sort products
  useEffect(() =>{
    // it will display the newest one first
    if(sort === 'newest'){
      setFilteredProducts(prev => [...prev].sort((a,b) => a.createdAt - b.createdAt))
    }else if((sort === 'asc')){
      setFilteredProducts((prev) => {
        [...prev].sort((a,b) => a.price - b.price)
      })
    }else{
      setFilteredProducts((prev) => {
        [...prev].sort((a,b) => b.price - a.price)
      })
    }
  },[sort])


  return (
    
    // getting all the filtered products and maping through to display products
    <Container>
        {filteredProducts.map((item) => (
            <Product item = {item} key = {item.id}/>
        ))}
    </Container>
  )
}

export default Products