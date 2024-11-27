import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function ListCategory({ data }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentCategoryId = searchParams.get("id");
    return (
        <div role="tablist" className="tabs tabs-bordered px-5 py-10 ">
            <Link role="tab" className={`tab ${!currentCategoryId ? 'tab-active' : ''}`} to='/product'>Tất cả sản phẩm </Link>
            {data.map((category) => (
                <Link
                    key={category.id}
                    to={`/product/category?id=${category.id}`}
                    role="tab"
                    className={`tab ${currentCategoryId === category.id.toString() ? 'tab-active' : ''}`}>
                    Category: {category.category_name} - {category.total_products} Product
                </Link>
            ))
            }
        </div >
    )
}
