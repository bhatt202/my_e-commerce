import React from 'react'
import Header from '../../common/Header/Header'
import Slider from './slider/Slider'
import Product from '../Product/Product'
import Footer from '../../common/Footer/Footer'

const Home = () => {
  return (
   <>
    <Header/>
    <Slider/>
    <Product/>
    {/* <Footer/> */}
   </>
  )
}

export default Home
