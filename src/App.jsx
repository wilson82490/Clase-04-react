

/* import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');

  function loadProducts() {
    setError('');
    setLoadingProducts(true);
    fetch('http://localhost:3000/products')
      .then(response =>{
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data)
        setLoadingProducts(false)
      })
      .catch(error => {
        console.error(error.message);
        setError(error.message);
        setLoadingProducts(false);
      });
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loadingProducts == true) {
    console.log('Verdadero')
  } else {
    console.log('falso')
  }

  return (
    <>
      <h1>Clase 04 React</h1>

      <button onClick={loadProducts}>Cargar Productos</button>

      <section>
        <h2>Products</h2>

        {error && <p>{error}</p>}

        {loadingProducts && <p>Cargando productos...</p>}

        <div>
          {products.map(product => (
            <div key={product._id}>{product.name}</div>
          ))}
        </div>

        <p>Cantidad {products.length}</p>
      </section>
    </>
  ) */

  /* const fakeProducts = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' },
  ];


  const fakeSeries = [
    { id: 1, name: 'Serie 1' },
    { id: 2, name: 'Serie 2' },
    { id: 3, name: 'Serie 3' },
  ];
    
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [counterProducts, setCounterProducts] = useState(0);

  const [series, setSeries] = useState([]);
  const [loadingSeries, setLoadingSeries] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      console.log('Productos cargados');
      setProducts(fakeProducts);
      
       setLoadingProducts(false);
    }, 5000);
  }, []);

  useEffect(() => {
    console.log('Estado de productos', products);
  }, [products]);


  useEffect(() => {
    console.log('Productos actualizados:', products);
    if (products.length > 0) {
      console.log('Productos cargados');
     
    }
   setCounterProducts(products.length);
 */
  /*  if(!loadingProducts){

    if (products.length === 0) {
      setMessage('No hay productos disponibles');
    } else {
      setMessage(`Hay ${products.length} productos disponibles`);
    }
  } */

  /* }, [products]);

  useEffect(() => {
    setTimeout(() => {
      console.log('Series cargadas');
      setSeries(fakeSeries);
      setLoadingSeries(false);

    }, 2000);
  }, []);


  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: 'Producto 4'
    };
    console.log(newProduct);

    setProducts([...products, newProduct]);


   console.log(products);

  }

  return (
    <>
     <h1>Clase 04 React</h1>

     <section>
      <h2>Productos</h2>

    {message && <p>{message}....</p>}

      {loadingProducts && <p>Cargando productos...</p>}

      {!loadingProducts && products.length === 0 && <p>No hay productos disponibles</p>}

      <button onClick={() => setProducts([])}>Vaciar Productos</button>

      <button onClick={addProduct}>Agregar un producto</button>
      
      {products.map(product => (
        <p key={product.id}>{product.name}</p>
      ))}

     {!loadingProducts && products.length > 0 && (
     <p>Total: {products.length}</p>
     )}
     </section>

      <section>
        <h2>Series</h2>
        {loadingSeries && <p>Cargando series...</p>}

        {!loadingSeries && series.length === 0 && <p>No hay series disponibles</p>}

        <button onClick={() => setSeries([])}>Vaciar Series</button>
         

        {series.map(serie => (
          <p key={serie.id}>{serie.name}</p>
        ))}

        <p>Total: {series.length}</p>
      </section>
    </>
  ) */
/* export default App */

import { useState, useEffect} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css';
//import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import NotFound from './components/NotFound';
import Home from './components/Home';
import ProductForm from './components/ProductForm';
import EditProductForm from './components/EditProductForm';
import Register from './components/Register';

function App() {
const [products, setProducts] = useState([]);
const [loadingProducts, setLoadingProducts] = useState(true);
const [error, setError] = useState(null);
const [success , setSuccess] = useState(null);



const loadProducts =  async () => {
   
  try {
    setLoadingProducts(true);
    const response = await fetch('http://localhost:3000/products');

    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    const data = await response.json();

    setProducts(data);
    
    setError(null);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
      setError(error.message);
     
  }
  finally{
    setLoadingProducts(false);
  }
  /* fetch('http://localhost:3000/products')
    .then(response => {
      if (!response.ok) 
        throw new Error('Error al cargar los productos');
      
      return response.json();
    })
    .then(data => {
      setProducts(data);
      setLoadingProducts(false);
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
      setError(error.message);
      setLoadingProducts(false);
    }); */
}

  const handleDelete = async (id) => {
        const confirmDelete = confirm ('estas seguro que quiere borrar el producto');
    
        //console.log(confirmDelete);
    
        if(!confirmDelete) return;
    
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
        });
    
          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }
    
         //await loadProducts();

         setProducts(products.filter(product => product._id !== id));
          setSuccess('Producto eliminado correctamente');
    
        } catch (error) {
          console.log(error)
        }
    
        
      };


useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

if (loadingProducts) {
  return <h1 className='message'>Cargando productos...</h1>;
}

 if (error) {
  return <p className='error'>{error}</p>;
 } 




  return (
   <main className='container'>
     <h1>Clase 04 React</h1>

     <nav className='main-nav'>
      <Link to="/" >Inicio</Link>
      <Link to="/products/new">Nuevo Producto</Link>
      <Link to="/register">Registro usuario</Link>
    </nav>

    {success && <p className='success'>{success}</p>}

    

     <Routes>
      <Route path="/"  element={<Home products={products} handleDelete={handleDelete} />} />

      <Route path="/products/:id" element={<ProductDetail products={products} />} />

      <Route path="/products/new" element={<ProductForm products={products} loadProducts= {loadProducts} />} /> 

      <Route path="/products/:id/edit" element={<ProductForm products ={products} loadProducts= {loadProducts} />} />
    
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
     </Routes>

   </main>
    
  )
}

export default App