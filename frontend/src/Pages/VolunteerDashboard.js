import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Vol_dashboard_overview from '../Components/DashboardComponents/VolunteerDashboard/vol_dashboard_overview'
import VolMainSection from '../Components/DashboardComponents/VolunteerDashboard/vol_main_section'

const VolunteerDashboard = () => {
  return (
    <div>
        <Navbar />
        <Vol_dashboard_overview />
        <VolMainSection />
        <Footer />
    </div>
  )
}

export default VolunteerDashboard
