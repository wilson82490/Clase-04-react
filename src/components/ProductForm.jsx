import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function ProductForm({ loadProducts }) {
    const navigate = useNavigate();
   
    const initialState = {
        name: '',
        price: '',
        stock: '',
        
    }
   
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        

        const {name, value} = event.target
        //console.log(name, value);

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //setError(false);
         setLoading(true);
      if (!form.name || !form.price || !form.stock) {
        
        setError("Todos los campos son obligatorios");
            setLoading(false);
        return;
      }


        const newProduct = {
            //_id: crypto.randomUUID(),
            name: form.name,
            price: form.price,
            stock: form.stock,
            };

           
            try {
                 const response = await fetch ('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })

         console.log(response);

            if (!response.ok) {
                throw new Error("Error al guardar el producto");
            }


         await loadProducts();
         setForm(initialState);
         navigate('/');
            } catch (error) {
                console.log(error);
                setError(error.message);
            }

         setLoading(false);
    }

    return (
        <section>
            <h2>Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Nombre:</label>
                <input 
                type="text" 
                id="name" 
                name="name"
                value={form.name} 
                onChange={handleChange} />
            </div>


            <div className='form-group'>
                <label htmlFor="price">Precio:</label>
                <input 
                type="number" 
                id="price" 
                name= "price"
                value={form.price} 
                onChange={handleChange} />
            </div>

            <div className='form-group'>
                <label htmlFor="stock">Stock:</label>
                <input 
                type="number" 
                id="stock" 
                name="stock"
                value={form.stock} 
                onChange={handleChange} />
            </div>
              {error && <p className= "error">{error}</p>}

            <div className='form-actions'>
                <button type="submit" disabled={loading}> Guardar Producto</button>  
            </div>
           </form>


           {/*  <p>{form.name}</p>
            <p>{form.price}</p>
            <p>{form.stock}</p>
            <p>{form.description}</p>
            <p>{form.category}</p>  */}
        </section>
    )
}


export default ProductForm;
