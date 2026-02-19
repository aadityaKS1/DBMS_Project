import React from 'react'
import bg_img from '../../Assets/Selection.jpg'

function Container1() {
    return (
        <div className="relative top-[52px] w-full h-[1482px] bg-transparent">

            {/* Background Container */}
            <div className="relative w-full h-[750px] flex flex-col items-center">
                
                {/* Background Image with low opacity */}
                <img
                    src={bg_img}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />

                {/* Gradient overlay (optional) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00000000] to-[#00000066]"></div>

                {/* Title */}
                 <h1 className="relative top-[327px] font-poppins text-[48px] leading-[48px] font-extrabold text-black text-center z-10">
                    Create Impact with Your Organization
                </h1>

                {/* Subtitle */}
                <p className="relative top-[375px] font-poppins text-[20px] leading-[28px] font-normal text-[#000000] text-center z-10">
                    Transform communities through organized volunteer efforts
                </p>

            </div>
        </div>
    )
}

export default Container1
