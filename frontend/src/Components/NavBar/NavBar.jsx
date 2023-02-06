import {NavLink, useNavigate} from "react-router-dom";
import "./navbar.css";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/Apirequest";

const NavBar = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const hangdleLogOut = () => {
    // logout(dispatch,id,accessToken)
    }
    return (
        <nav className="navbar-container">
            <NavLink to="/" className="navbar-home"> Home </NavLink>
            {user ? (
                <>
                    <p className="navbar-user">Hi, <span> {user.userName}  </span></p>
                    <NavLink to="/logout" className="navbar-logout"> Log out</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="navbar-login"> Login </NavLink>
                    <NavLink to="/register" className="navbar-register"
                             onClick={() => hangdleLogOut}
                    > Register</NavLink>
                </>
            )}
        </nav>
    );
};

export default NavBar;
