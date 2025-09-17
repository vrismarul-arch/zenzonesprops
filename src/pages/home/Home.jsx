import React from 'react'
import Navbar from '../../components/Navbar'
import FormPage from "../FormPage";
import Hero from './hero/Hero';
import WhyChooseUs from './whychoose/WhyChooseUs';
import Curentproject from '../residence/curentproject';
import RealEstateSection from './residencevedio/RealEstateSection';
import FacilitiesData from '../facility/FacilitiesData';
import Footer from '../../components/Footer';
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Curentproject />
      <RealEstateSection />
      <FacilitiesData />
      <Footer />
    </>
  )
}

export default Home