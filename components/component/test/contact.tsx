"use client";

import { FaInstagram, FaTiktok, FaPhone } from 'react-icons/fa'; // Import social media icons from react-icons

export default function Contact() {

    
    return (
        <div className="flex flex-col md:flex-row bg-[#141218]">
            {/* Map Location Section */}
            <div className="bg-[#424549] p-5 w-full md:w-1/3 h-full">
                <h1 className="text-white font-bold text-xl md:text-2xl mb-5 md:mb-10">Find us on the map and visit our store!</h1>
                <iframe
                    className="m-auto w-full h-64 md:h-80"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15863.72694017698!2d106.6370525!3d-6.2727072!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d3db8c84b71%3A0x13e5cf86a48d0c6!2sRAKITINLAHID%20%7C%20Rakit%20%26%20Upgrade%20PC%20Tangerang%20Gading%20Serpong!5e0!3m2!1sen!2sid!4v1733230023354!5m2!1sen!2sid"
                    loading="lazy"
                ></iframe>
                <p className="text-white text-center mt-5 md:mt-10 text-sm md:text-base">
                    Ruko Maggiore Grande Blok D-21, Gading, Kec. Serpong, Tangerang Selatan, Banten 15332
                </p>
            </div>

            {/* Social Media and Contact Information Section */}
            <div className="bg-[#31363F] p-5 w-full md:w-1/3">
                <h1 className="text-white font-bold text-xl md:text-2xl mb-5 md:mb-10">Connect with us and get in touch!</h1>
                <div className="text-white space-y-4" >
                    <div className="flex items-center">
                        <FaPhone className="text-xl mr-3" />
                        <a href="https://wa.me/6281381024919" className="hover:underline text-sm md:text-base">
                            <span className="text-sm md:text-base"  >0813-8102-4919</span>
                        </a>
                        
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="text-xl mr-3" />
      
                        <a href="https://wa.me/6287862585962" className="hover:underline text-sm md:text-base">
                            <span className="text-sm md:text-base"  >0878-62-5859-62</span>
                        </a>
                        
                    </div>
                    <div className="flex items-center">
                        <FaInstagram className="text-xl mr-3" />
                        <a
                            href="https://instagram.com/rakitinlah.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-sm md:text-base"
                        >
                            rakitinlah.id
                        </a>
                    </div>
                    <div className="flex items-center">
                        <FaTiktok className="text-xl mr-3" />
                        <a
                            href="https://www.tiktok.com/@rakitinlah.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-sm md:text-base"
                        >
                            @rakitinlah.id
                        </a>
                    </div>
                </div>
            </div>

            {/* E-commerce Links Section */}
            <div className="bg-[#282B30] p-5 w-full md:w-1/3">
                <h1 className="text-white font-bold text-xl md:text-2xl mb-5 md:mb-10">Shop our PC builds and accessories online!</h1>
                <div className="flex flex-row md:flex-col justify-around md:justify-start items-center md:items-start space-y-0 md:space-y-5">
                    {/* Tokopedia Link */}
                    <a
                        href="https://www.tokopedia.com/rakitinlahid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <img
                            src="/images/tokopedia-logo.png"
                            alt="Tokopedia"
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                        <span className="text-white text-sm md:text-base">Tokopedia</span>
                    </a>

                    
                </div>
            </div>
        </div>
    );
}

