import { useState } from "react"
import { signIn } from "../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utilities/localStorage";
import { createUser } from "../../redux/states/user";
import { useDispatch } from "react-redux";
export default function Login(){
    let img = "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [data,setData] = useState({
        username: "",
        clave: ""
    })
    const handleData = (e)=>{
        const {name, value} = e.target
        setData({...data, [name]:value})
    }
    const onSubmit = async()=>{
        if(data.username.trim().length < 4 || data.clave.trim().length < 4) {
            toast.error("El tamaño minimo debe ser de 5 caracteres")
            return
        }
        try {
            const result = await signIn(data)
            if(result.login){
                dispatch(createUser({ ...result }));
                navigate("/transactions", {replace: true})
                return
            }
            throw new Error("Usuario o contraseña incorrectos")
        } catch (error) {
            toast.error(error.message || "Ha ocurrido un error")
        }
    }

    
    return (
        <section className="w-100 d-flex min-vh-100">
            <article className="px-5 text-start gap-3 w-50 d-flex justify-content-center flex-column">
                <h3 className="mb-0">Iniciar sesion</h3>
                <div className="w-100">
                    <label>User</label>
                    <input name="username" className="form-control border-secondary" type="text" onChange={handleData} />
                </div>

                <div className="w-100">
                    <label>Password</label>
                    <input name="clave" className="form-control border-secondary" type="password"  onChange={handleData} />
                </div>

                <button className="btn btn-primary" onClick={onSubmit}>Login</button>
            </article>
            <article className="w-50">
                <img className="w-100 h-100 " style={{objectFit: "cover"}} src={img}/>
            </article>
        </section>
    )
}