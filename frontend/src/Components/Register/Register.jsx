import "./register.css";
import {useState} from "react";
import {registerUser} from "../../redux/Apirequest";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const Register = () => {
    const [email,setEmail] = useState();
    const [useName,setUserName] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRegister = (e) =>{
        e.preventDefault();
        const newUser ={
            email:email,
            password:password,
            userName:useName,
        };
        registerUser(newUser,dispatch,navigate)
    }
    return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your email"
                onChange={(e) =>setEmail(e.target.value)}
                />
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit"> Create account </button>
            </form>
        </section>
        
     );
}
 
export default Register;