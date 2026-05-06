import { useState, useEffect } from "react";
import { getProfile } from "../services/AuthServices";
import {useNavigate} from "react-router-dom"



function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                
                setUser(data);
            } catch (error) {
                    console.log(error)
                    if (error.status == 401){
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if(loading){
        return <p className="message">Cargando perfil...</p>
    }

    if(error){
        return <p className="error">{error}</p>
    }


    return (
        <section>
        <h2>Perfil de usuario</h2>
        <p>{user.email}</p>
        </section>
    )
}

export default Profile;
