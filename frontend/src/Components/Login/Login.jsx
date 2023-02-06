import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginUser} from "../../redux/Apirequest";
import {useDispatch} from "react-redux";

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate   = useNavigate()
    const handleLogin = (e) =>{
        e.preventDefault();
        const newUser ={
            userName:userName,
            password:password,
        };
        loginUser(newUser, dispatch, navigate)
    }

    return (
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={handleLogin}>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username"
                       onChange={(e) => setUserName(e.target.value)}
                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit"> Continue</button>
            </form>
            <div className="login-register"> Don't have an account yet?</div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
    );
}

export default Login;