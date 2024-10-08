'use client'
import React from 'react'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map/Map').then((mod) => mod.Map), {
    ssr: false,
})

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
                <Map />
            </main>
            <Footer />
        </div>
    )
}

