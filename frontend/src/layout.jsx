import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

export default function Layout() {
    return (
        <div>
            <NavBar />
            <main className='py-16'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
