import React from 'react'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import SectionCollection from '../components/SectionCollection'
import SectionListProduct from '../components/SectionListProduct'
import CardItem from '../components/CardItem'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <SectionCollection/>
      <SectionListProduct/>
      <Footer/>
    </div>
  )
}

export default Home
