import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import Chat from './components/chatbox/chat'
export default function Layout() {
    const themes = ["light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ]; // Danh sách theme
    const defaultTheme = "cupcake";
    const [theme, setTheme] = useState(defaultTheme);
    // Gán theme mặc định khi ứng dụng khởi chạy
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", defaultTheme);
    }, [defaultTheme]);
    // Hàm chuyển đổi theme
    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };
    return (
        <div className='grid min-h-screen' >
            <NavBar themes={themes} currentTheme={theme} changeTheme={changeTheme} />
            <main className='py-16'>
                <Outlet />
            </main>
            <Chat />
            <footer className='content-end'>
                <Footer />
            </footer>
        </div>
    )
}
