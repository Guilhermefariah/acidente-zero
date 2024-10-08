import React, { useRef } from 'react'
import Image from 'next/image'

export const Search: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const iconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className='relative flex items-center'>
            <input
                type='text'
                placeholder='Pesquisar...'
                ref={inputRef}
                className='px-2 py-2 pl-10 border text-xl text-gray-300 border-gray-700 bg-gray-900 rounded-md focus:outline-none focus:border-gray-600 w-full md:w-auto'
            />
            <button
                type='button'
                onClick={iconClick}
                className='absolute left-0 top-0 h-full flex items-center pl-2 text-gray-300'
            >
                <Image src='/img/search.png' alt='Search' width={25} height={25} />
            </button>
        </div>
    )
}
