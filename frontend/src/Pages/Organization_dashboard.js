import React from 'react'
import Navbar from '../Components/Navbar.js'
import Footer from '../Components/Footer.js'
import Dashboard_overview from '../Components/DashboardComponents/Organization dashboard/dashboard_overview.js'
import MainSection from '../Components/DashboardComponents/Organization dashboard/main_section.js'


const Organization_dashboard = () => {
    return (
        <div>
            <Navbar />
            <Dashboard_overview />
            <MainSection />
            <Footer />
        </div>
    )
}

export default Organization_dashboard
