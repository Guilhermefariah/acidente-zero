import React, { useState } from "react";
import Link from "next/link";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMenuOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-full">
            <button
                onClick={isMenuOpen}
                className="w-full flex justify-between items-center bg-gradient-to-r from-gray-300 to-gray-500 px-4 py-2 text-left text-xl text-white font-serif hover:from-gray-400 hover:to-gray-600 focus:outline-none md:hidden"
            >
                Menu
            </button>
            <div className={`flex-col md:flex md:flex-row md:justify-between items-start bg-gray-100 md:bg-transparent space-y-4 md:space-y-0 md:space-x-4 py-4 md:py-0 ${isOpen ? 'flex' : 'hidden'}`}>
                <Link href="/Novidades" className="block text-gray-700 font-serif hover:text-gray-900 text-xl hover:underline">Novidades</Link>
                <Link href="/Eventos" className="block text-gray-700 font-serif hover:text-gray-900 text-xl hover:underline">Eventos</Link>
                <Link href="/Apoio" className="block text-gray-700 font-serif hover:text-gray-900 text-xl hover:underline">Apoio</Link>
            </div>
        </div>
    );
}

export default Menu;
