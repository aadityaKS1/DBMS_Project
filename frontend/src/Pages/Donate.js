import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import qrImage from '../Assets/esewa.jpeg'
function Donate() {
    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-1/2 max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Scan the QR Code
        </h1>
        <img
          src={qrImage}
          alt="QR Code"
          className="w-60 h-60 mx-auto mb-6 object-contain"
        />
        <p className="text-gray-600 text-base">
          Thank you for your contribution!
        </p>
      </div>
    </div>
        <Footer/>
        </>
    )
}

export default Donate
