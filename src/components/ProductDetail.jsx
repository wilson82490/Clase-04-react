import { Link, useNavigate, useParams } from "react-router-dom";



function ProductDetail({ products }) {
    const {id} = useParams();
    const navigate = useNavigate();

    const product = products.find(product => product._id === id);

   

    if(!product) {
        return(
            <section className="product-detail" >
                <h2>Producto no encontrado</h2>
                <Link to="/">Volver al inicio</Link>
            </section>
        )
    }
    
    /* return(
        <>
        <h2>Product detail </h2>
        <Link to="/">Volver al inicio</Link>
        <button onClick={() => navigate("/")}>Volver al inicio</button>

        </>
) */
        return(
            <>
            <section className="product-detail">
                <h2>Detalle del Producto</h2>
                <article>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                </article>
                <button onClick={() => navigate("/")}>Volver</button>
                

            </section>
            </>
        );
}

export default ProductDetail