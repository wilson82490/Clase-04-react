import "./ProductCard.css";
import { useNavigate } from "react-router-dom";


function ProductCard({product}) {
    const navigate = useNavigate();

    return (
       <article className="product-card" 
       onClick={() => navigate(`/products/${product._id}`)}>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        
       </article>
    );

}

export default ProductCard