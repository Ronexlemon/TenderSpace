import React from 'react'
import {useContext} from "react"
import Explore from '../components/Explore'
import Features from '../components/Features'
import Footer from '../components/Footer'
import HeroText from '../components/HeroText'
import Navbar from '../components/Navbar'
import Subscription from '../components/Subscription'
import Volunteer from '../components/Volunteer'
import backgroundImage from "../assets/images/HeroBackgroundImage.svg";
import { AppContext } from '../contexts/AppContexts'

const LandingPage = () => {
  const {
    userAccount,
    kit,
    TenderAddressContract,
    contract,
    connectWallet,
    notification,
  } = useContext(AppContext);
  return (
    <div>
      <header
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="min-h-screen h-[100%] bg-no-repeat bg-cover bg-top bg-slate-100 flex flex-col"
      >
        <Navbar />
        <HeroText />
      </header>
      <section id="features">
        <Features />
      </section>
      <section className="h-screen mb-10">
        <Explore />
      </section>
      <section className="h-screen pt-10 bg-light-purple">
        <h1 className="text-center font-jakarta text-indigo-900 text-3xl font-bold w-[100%] py-12">
          Users Around The World
        </h1>
        <Volunteer />
      </section>
      <footer id="contact">
        <Subscription />
        <Footer />
      </footer>
    </div>
  )
}

export default LandingPage