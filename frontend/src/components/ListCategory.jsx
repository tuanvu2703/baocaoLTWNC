import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function ListCategory({ data }) {
    const location = useLocation();
    const currentTab = data.find((category) => location.pathname === category.id);
    return (
        <div role="tablist" className="tabs tabs-bordered px-5 py-10 sticky top-0">
            <Link role="tab" className="tab" to='/product'>Tất cả sản phẩm</Link>
            {data.map((category) => (
                <Link key={category.id} to={`/product/category?id=${category.id}`} role="tab" className={`tab ${currentTab?.id === category.id ? 'tab-active' : ''} `}>{category.category_name}-{category.total_products}</Link>
            ))}
        </div>
    )
}
