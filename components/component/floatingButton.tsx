import { IoLogoWhatsapp } from 'react-icons/io5';
import { LuInstagram } from "react-icons/lu";

export default function FloatingButton() {
    return (
        <div className='z-50'>
            <div className="fixed bottom-2 left-5 p-5 z-50">
                <a href="https://wa.me/message/MOVNUD7ZDN2IF1" target="_blank" rel="noopener noreferrer">
                    <button className="p-3 bg-green rounded-full text-white w-18 h-18">
                        <IoLogoWhatsapp size={40} />
                    </button>
                </a>
            </div>
            {/* instagram logo */}
            <div className="fixed bottom-20 left-5 p-5 z-50">
                <a href="https://www.instagram.com/rakitinlah.id/" target="_blank" rel="noopener noreferrer">
                    <button className="p-3 bg-gradient-to-r from-purple to-pink rounded-full text-white w-18 h-18">
                        <LuInstagram size={40} />
                    </button>
                </a>
            </div>

        </div>
    );
}