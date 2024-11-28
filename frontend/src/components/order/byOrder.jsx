function byOneProduct({ idproduct }) {
    return (
        <div className="w-full h-full max-h-56 max-w-32">
            <a href={`/orderOne?idproduct=${idproduct}`}>
                <button className="btn btn-primary w-full h-full">Buy</button>
            </a>
        </div>
    );
}
function byProductCart({ products }) {
    return (
        <a href="/orderCart">
                  <button className="mt-4 p-2 bg-blue-500 text-white rounded-full float-end">
            <form>
                Buy All Cart
            </form>
        </button>  
        </a>

    );
}
export default {
    byOneProduct,
    byProductCart
}