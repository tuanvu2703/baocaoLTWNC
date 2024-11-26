function byOneProduct({ idproduct }) {
    return (
        <div className="w-full h-full max-h-56 max-w-32">
            <a href={`/orderOne?idproduct=${idproduct}`}>
                <button className="btn btn-primary w-full h-full">Buy</button>
            </a>
        </div>
    );
}
function byProductCart({ idproducts }) {
    return (
        <div>
            <form>
                
            </form>
        </div>
    );
}
export default {
    byOneProduct,
    byProductCart
}