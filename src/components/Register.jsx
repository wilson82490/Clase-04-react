import { useState, useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { registerUser } from '../services/AuthServices';

const initialState = {
     email: '',
    password: '',
    
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



function Register(){
     
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target
        

        setForm({
            ...form,
            [name]: value
        })
    };
    

    const validateForm = () => {
      if (!form.email.trim()){
           return "El email es obligatorio";
            
        }

        if (!emailRegex.test(form.email.trim())){
            return "El email no es válido";
            
        }

        if(!form.password){
            return "La contraseña es obligatoria";
        }

        if(form.password.length < 6){
            return "La contraseña debe tener al menos 6 caracteres";
        }
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            setSuccess(null);
            return;
        }

        setSaving(true);

        const user ={
            email: form.email.trim(),
            password: form.password,
        }

       try {
            await registerUser(user);

        setError(null);
        setSuccess("Cuenta creada exitosamente");
        setForm(initialState);

       } catch (error) {
        setError(error.message);
        setSuccess(null);
       } finally {
        setSaving(false);
       }

        
    };

    useEffect(() => {
        if (success) {
           setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
    }, [success]);


    const isDisabled = !form.email || !form.password || saving;

    

    return(
       <section className="auth-section">
        <h2 className="auth-title">
            <UserPlusIcon className="icon" />
            Crear cuenta
        </h2>
        <p>Registrarse para acceder a la app</p>
         {success && <p className='success'>{success}</p>}

            

        <form className="auth-form" onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="email"
                value={form.email} 
                onChange={handleChange}
               />
            </div>
              <div className='form-group'>
                <label htmlFor="password">Contraseña:</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                value={form.password}
                onChange={handleChange}
               />
            </div>

            {error && <p className='error'>{error}</p>}
           

            <button type="submit" disabled={isDisabled}>Crear cuenta</button>
        </form>
       </section>
    )
}

export default Register;

