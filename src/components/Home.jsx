import ProductList from "./ProductList";



function Home({products, handleDelete}) {
    return(
         <section>
       <h2>Listado de productos</h2>

     {products.length === 0 && <p className="message">No hay productos disponibles</p>}
       
      <ProductList products= {products} handleDelete={handleDelete} />


       
        <p>Cantidad {products.length}</p>

    </section>
    );
}

export default Home;