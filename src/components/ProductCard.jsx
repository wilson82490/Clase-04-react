import "./ProductCard.css";

import {Link} from "react-router-dom";



function ProductCard({product}) {
    
    return (
       <article className="product-card">
        <h3>{product.name}</h3>
        <p>${product.price}</p>


        <div className="card-actions">

        <Link to={`/products/${product._id}`}>Ver detalles</Link>

        <Link to={`/products/${product._id}/edit`}>Editar</Link>
        </div>
        
       </article>
    );

}

export default ProductCard;