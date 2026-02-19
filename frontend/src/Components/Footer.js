import logo from '../Assets/punanirman_logo.png'
import facebook from '../Assets/facebook.png'
import instagram from '../Assets/social.png'
import linkedin from '../Assets/linkedin.png'
import Youtube from '../Assets/Youtube_logo.png'


const Footer = () => {
    return (
        <footer className="  bg-[#004D7CFF] w-full py-20">
            <div className="max-w-[98%] mx-auto flex justify-between gap-8 p-9">

                {/* Column 1: Rotaract Club Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">

                        <img
                            src={logo}
                            alt="Rotaract Club of Kathmandu Logo"
                            className="w-12 h-auto"
                        />


                        <h1 className="font-bold text-xl text-[#FFFFFF]">
                            पुनर्निर्माण
                        </h1>
                    </div>
                    <p className="text-[#D1D5DB] font-open-sans text-[14px] leading-[23px] mb-4">
                        AI powered reporting for coordination and faster recovery
                    </p>

                </div>

                {/* Column 2: Quick Links */}
                <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-[18px] leading-[28px] font-bold text-white mb-4">
                        Company
                    </p>
                    <ul className="space-y-2 text-[#D1D5DB] font-open-sans text-[14px] leading-[20px]">
                        <li>About Us </li>
                        <li>Contact Us</li>
                        <li>Donate</li>
                    </ul>
                </div>

                {/* Column 3: Quick Links Duplicate */}
                <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-[18px] leading-[28px] font-bold text-white mb-4">
                        Resources
                    </p>
                    <ul className="space-y-2 text-[#D1D5DB] font-open-sans text-[14px] leading-[20px]">
                      
                        <li>Support</li>
                        <li>FAQ</li>

                    </ul>
                </div>

                {/* Column 4: Get Involved */}
                <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-[18px] leading-[28px] font-bold text-white mb-4">
                        Follow Us
                    </p>
                    <div className="flex space-x-2 mt-4">
                        <a href="#"><img src={facebook} alt="Facebook" className="w-9 h-9 rounded-full cursor-pointer" /></a>
                        <a href="#"><img src={instagram} alt="Instagram" className="w-9 h-9 rounded-full cursor-pointer" /></a>
                        <a href="#"><img src={linkedin} alt="LinkedIn" className="w-9 h-9 rounded-full cursor-pointer" /></a>
                        <a href="#"><img src={Youtube} alt="Youtube" className="w-9 h-9 rounded-full cursor-pointer" /></a>
                    </div>
                </div>

            </div>

            {/* Divider */}
            <div className="mt-10 w-[98%] border-t border-[#FFFFFF] mx-auto"></div>

            {/* Footer Bottom */}
            <div className="max-w-[98%] mx-auto flex items-center justify-between mt-7">
                <p className="text-[#FFFFFF] font-open-sans text-[14px]">&copy; 2025 पुनर्निर्माण. All Rights Reserved.</p>
                <div className="flex gap-8">
                    <p className="text-[#FFFFFF] font-open-sans text-[14px]">Privacy Policy</p>
                    <p className="text-[#FFFFFF] font-open-sans text-[14px]">Terms of Service</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
