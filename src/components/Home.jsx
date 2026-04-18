import ProductList from "./ProductList";



function Home({products}) {
    return(
         <section>
       <h2>Listado de productos</h2>

     {products.length === 0 && <p className="message">No hay productos disponibles</p>}
       
      <ProductList products= {products} />


       
        <p>Cantidad {products.length}</p>

    </section>
    );
}

export default Home;