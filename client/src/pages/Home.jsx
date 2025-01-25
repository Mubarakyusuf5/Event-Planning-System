import React, { useEffect } from 'react'
import { Hero } from '../components/Home/Hero'
import { Section1 } from '../components/Home/Section1'
import { Section2 } from '../components/Home/Section2'
import { BrowseSection } from '../components/Home/BrowseSection'
import { Footer } from '../components/Home/Footer'

export const Home = () => {
    useEffect(()=>{
        document.title= " Eventee - Discover The Best Events Around You"
    })
  return (
    <div className='text-zinc-800' >
      <Hero />
      <Section1 />
      <Section2 />
      {/* <BrowseSection /> */}
      <Footer/>
    </div>
  )
}
