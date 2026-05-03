import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';




function ProductForm({ loadProducts, products }) {
    const {id} = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate();

    const isEditMode = Boolean(id);
   
    const initialState = {
        name: '',
        price: '',
        stock: '',
        
    }
   
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);


  
  
       useEffect(()=> {

        if (isEditMode){
          const product = products.find(p => p._id === id);
          if (product) {
              setForm({
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
              });
          }
        }else{
            setForm(initialState);
        }
       }, [id, isEditMode, products])

    const handleChange = (event) => {
        const {name, value} = event.target
        //console.log(name, value);

        setForm({
            ...form,
            [name]: value
        })
    }

    const validateForm = () => {
        if(!form.name){
                    
                    return ("El nombre del producto es obligatorio");
                }    

                if (form.name.trim().length < 3) {
                    return ("El nombre del producto debe tener al menos 3 caracteres");  
                }


            if (!form.price) {
                return ("El precio del producto es obligatorio");
            }

            if (isNaN(form.price)) {
                return ("El precio del producto debe ser un número válido");
            }

            if (Number(form.price) <= 0) {
                return ("El precio del producto debe ser mayor a cero");
            }

            if (!form.stock) {
                return ("El stock del producto es obligatorio");
            }

            if (isNaN(form.stock)) {
                return ("El stock del producto debe ser un número válido");
            }

            if (Number(form.stock) <= 0) {
                return ("El stock del producto debe ser mayor a cero");
               
            }

            return ""; // Si no hay errores, retornar null
        };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        
     /*  if (!form.name || !form.price || !form.stock) {
        
        setError("Todos los campos son obligatorios");
            //setSaving(false); */

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }
        


        setError('');
        setSaving(true);


        const productData = {
            //_id: crypto.randomUUID(),
            name: form.name.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
            };


            let url;
            let method;


            if(isEditMode) {
                // Aquí iría la lógica para enviar los datos al backend y actualizar el producto

                url = `http://localhost:3000/products/${id}`;
                 method = 'PUT';
            } else {
                // Aquí iría la lógica para enviar los datos al backend y crear un nuevo producto

                url = 'http://localhost:3000/products';
                method = 'POST';
            }

              

           
            try {
                 const response = await fetch (url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })

         console.log(response);

            if (!response.ok) {
                throw new Error(isEditMode ? 'Error al editar el producto' : 'Error al crear el producto');
            }


         await loadProducts();
         setForm(initialState);
         navigate('/');
            } catch (error) {
               
                setError(error.message);
            }finally{
                    setSaving(false);
            }
    };

     const isDisabled = !form.name || !form.price || !form.stock || saving;


    return (
        <section>
            <h2>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h2>

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
                min="0"
                name= "price"
                value={form.price} 
                onChange={handleChange} />
            </div>

            <div className='form-group'>
                <label htmlFor="stock">Stock:</label>
                <input 
                type="number" 
                id="stock" 
                min="0"
                name="stock"
                value={form.stock} 
                onChange={handleChange} />
            </div>
              {error && <p className= "error">{error}</p>}

            <div className='form-actions'>
                <button type="submit" disabled={isDisabled}> 
                    {saving && (isEditMode ? "Editando..." : "Creando...")}
                    {!saving && (isEditMode ? 'Editar' : 'Crear')} Producto
                
                </button>  


                {isEditMode && 
                (<button type="button" onClick={() => navigate("/")}>Cancelar</button>)
                }
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
