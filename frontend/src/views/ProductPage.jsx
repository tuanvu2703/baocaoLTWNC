import React from 'react'
import { Outlet } from 'react-router-dom'
import ListCategory from '../components/ListCategory'

export default function ProductPage() {
    return (
        <div>
            <ListCategory />
            <Outlet />
        </div>
    )
}
