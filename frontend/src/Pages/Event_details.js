import React from 'react'
import EventDetails from '../Components/Event_details/About_event.jsx'
import Event_card from '../Components/Event_details/Hero_component.jsx'
import Footer from '../Components/Footer.js'
import Navbar from '../Components/Navbar.js'

const Event_details = () => {
  return (
    <>
        <Navbar />
        <Event_card />
        <EventDetails />
        <Footer />
    </>
  )
}

export default Event_details
