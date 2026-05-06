


import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { loginUser } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    if (form.password.trim().length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    const user = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      const data = await loginUser(user);

      localStorage.setItem("token", data.token);

      setError(null);
      setSuccess("Se inició la sesión correctamente");
      setForm(initialState);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 2000);

      return () => clearTimeout(timer);  
    }
  }, [success]);


  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  }, []);

  const isDisabled = !form.email || !form.password || loading;

  return (
    <section className="auth-section">
      <div className="auth-title">
        <h2>Iniciar sesión</h2>
      </div>
      <p>Iniciar sesión para poder acceder a la aplicación.</p>

      {success && <p className="success">{success}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña: </label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="icon" />
              ) : (
                <EyeIcon className="icon" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isDisabled}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </section>
  );
}

export default Login;
