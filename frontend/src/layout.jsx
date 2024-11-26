import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

export default function Layout() {
    return (
        <div className='grid min-h-screen'>
            <header>
                <NavBar />
            </header>
            <main className='py-16'>
                <Outlet />
            </main>
            <footer className='content-end'>
                <Footer />
            </footer>
        </div>
    )
}
