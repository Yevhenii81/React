import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../../features/context/AppContext";
import './ProductCard.css';

export default function ProductCard({ product, isAssociation }) {
    const context = useContext(AppContext);
    const navigate = useNavigate();

    if (!context) {
        console.error("AppContext is not provided for ProductCard!");
        return null;
    }

    const { cart, request, updateCart } = context;
    const isInCart = cart?.cartItems?.some(ci => ci.productId === product.id) ?? false;

    const addToCartClick = async (e) => {
        e.preventDefault();
        try {
            await request("/api/cart/" + product.id, { method: 'POST' });
            updateCart();
        } catch (err) {
            console.error("Failed to add product to cart:", err);
        }
    };

    const goToCartClick = (e) => {
        e.preventDefault();
        navigate("/cart");
    };

    return (
        <div className="col">
            <Link to={"/product/" + (product.slug || product.id)} className="nav-link h-100">
                <div className={"card h-100" + (isAssociation ? " association" : "")}>
                    <img 
                        src={product.imageUrl || '/fallback.png'} 
                        className="card-img-top" 
                        alt={product.name || "Product"} 
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.name || "Unnamed Product"}</h5>
                        <p className="card-text">{product.description || ""}</p>
                    </div>
                    <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                        <span>₴ {product.price?.toFixed(2) ?? "0.00"}</span>
                        <div data-in-cart={isInCart}>
                            {isInCart ? (
                                <button 
                                    onClick={goToCartClick} 
                                    className="in-cart btn btn-success"
                                >
                                    <i className="bi bi-cart-check"></i>
                                </button>
                            ) : (
                                <button 
                                    onClick={addToCartClick} 
                                    className="not-in-cart btn btn-outline-success"
                                >
                                    <i className="bi bi-cart"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
