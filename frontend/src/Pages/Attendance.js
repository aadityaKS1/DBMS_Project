import React from 'react'
import Attendance_table from '../Components/Attendance/Attendance_table.jsx'
import Attendance_hero from '../Components/Attendance/Hero_component1.jsx'
import Navbar from '../Components/Navbar.js'
import Footer from '../Components/Footer.js'

const Attendance = () => {
  return (
    <>
        <Navbar />
      <Attendance_hero />
      <Attendance_table />
        <Footer />
    </>
  )
}

export default Attendance
