import React from 'react'
import LockPointNavbar from '../../components/LockPointNavbar'
import HeroBanner from './HeroBanner'
import AboutUsSection from './AboutUsSection'
import OurServices from './OurServices'

const Masterpage = () => {
  return (
    <div className='master'>
      <LockPointNavbar/>
      <HeroBanner style={{ minHeight: '80vh' }}/>
      <AboutUsSection/>
      <OurServices/>
    </div>
  )
}

export default Masterpage