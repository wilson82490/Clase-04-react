

import { useState, useEffect} from 'react'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import './App.css';
//import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import NotFound from './components/NotFound';
import Home from './components/Home';
import ProductForm from './components/ProductForm';
import EditProductForm from './components/EditProductForm';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
const navigate = useNavigate();
const [products, setProducts] = useState([]);
const [loadingProducts, setLoadingProducts] = useState(true);
const [error, setError] = useState(null);
const [success , setSuccess] = useState(null);

const token = localStorage.getItem("token");



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
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(response.status === 401){
            localStorage.removeItem("token");
            navigate("/login");
            return;
           }
    
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


  const handleLogout = () => {
    localStorage.removeItem("token");
    setSuccess("Sesión cerrada correctamente");
    navigate("/login");
  };

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
      {token && <Link to="/products/new">Nuevo Producto</Link>}
      {!token ?
     (
     <>
     <Link to="/register">Crear cuenta</Link>
      <Link to="/login">Iniciar sesión</Link></>)
     :
      (<><Link to="/profile">Perfil</Link>
      <button type='button' onClick={handleLogout}>Cerrar sesión</button>
      </>
      )}
  
    </nav>

    {success && <p className='success'>{success}</p>}

    

     <Routes>
      <Route path="/"  element={<Home products={products} handleDelete={handleDelete} />} />

      <Route path="/products/:id" element={<ProductDetail products={products} />} />
     
      <Route path="/products/new" element={<ProtectedRoute element={<ProductForm products={products} loadProducts= {loadProducts} />} />} /> 

      <Route path="/products/:id/edit" element={<ProtectedRoute element={<ProductForm products ={products} loadProducts= {loadProducts} />} />} />
    
      <Route path="/register" element={<Register />} />

     {/*  {!token && <Route path="/login" element={<Login />} />} */}

      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="*" element={<NotFound />} />
     </Routes>

   </main>
    
  )
}

export default App
