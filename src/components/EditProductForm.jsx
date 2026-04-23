
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';


function EditProductForm({ products, loadProducts }) {

    const {id} = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate();
    // Aquí podrías usar el ID para cargar los datos del producto desde el backend y prellenar el formulario

const initialState = {
         name: '',
         price: '',
         stock: '',
        
     };

     const [form, setForm] = useState(initialState);
     const [loading, setLoading] = useState(false);

     useEffect(()=> {
        const product = products.find(p => p._id === id);
        if (product) {
            setForm({
                name: product.name,
                price: product.price,
                stock: product.stock,
            });
        }
     }, [id, products])

     const handleChange = (event) => {
        

        const {name, value} = event.target
        //console.log(name, value);

        setForm({
            ...form,
            [name]: value
        });
    }

        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true);
            if (!form.name || !form.price || !form.stock) {
                setLoading(false);
                return;
            }  
            
            // Aquí iría la lógica para enviar los datos al backend y actualizar el producto

            const updatedProduct = {
                name: form.name,
                price: form.price,
                stock: form.stock,
            };


            try {
                const response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });
       
                if (!response.ok) {
                    throw new Error('Error al actualizar el producto');
                }

                
                await loadProducts(); // Recargar los productos después de la actualización
                setForm(initialState); // Limpiar el formulario después de la actualización
                navigate("/");
            } catch (error) {
                console.log(error);
            } finally {
                // Aquí podrías manejar el estado de carga o errores si lo deseas
                setLoading(false);
            }


            console.log('Producto actualizado:', updatedProduct);
             // Aquí podrías redirigir al usuario a la página de detalles del producto o mostrar un mensaje de éxito
        }

    const isDisabled = !form.name || !form.price || !form.stock || loading;

 return (
    <section>
        <h2>Editar Producto</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Nombre:</label>
                <input 
                type="text" 
                id="name" 
                name ="name" 
                value={form.name}
                onChange={handleChange}
                />
            </div>

             <div className='form-group'>
                <label htmlFor="price">Precio:</label>
                <input 
                type="text" 
                id="price" 
                name ="price" 
                value={form.price}
                onChange={handleChange}
                />
            </div>


             <div className='form-group'>
                <label htmlFor="stock">Stock:</label>
                <input 
                type="number" 
                min="0"
                id="stock" 
                name ="stock" 
                value={form.stock}
                onChange={handleChange}
                />
            </div>

           <div className='form-actions'>
                <button type="submit" disabled={isDisabled}> Guardar Producto</button>
                <button type="button" onClick={() => navigate("/")}>Cancelar</button>
           </div>

        </form>
    </section>
 );
}

export default EditProductForm;