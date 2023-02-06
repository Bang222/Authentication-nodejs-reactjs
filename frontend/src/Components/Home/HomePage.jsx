import "./home.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deteleUser, getAllUser} from "../../redux/Apirequest";
import {useNavigate} from "react-router-dom";
import {createAxios} from "../../createInstance"
import {loginSuccess} from "../../redux/AuthSlice";


const HomePage = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const GetAllUsers = useSelector((state) => state.listUsers.users?.allUsers);
    const msg = useSelector((state) => state.listUsers.users?.msg);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user,dispatch,loginSuccess)

    const handleDelete = (id) => {
        deteleUser(user?.accessToken, dispatch,id, axiosJWT)
    }
    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }
        if (user?.accessToken) {
            getAllUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, [])

    return (
        <main className="home-container">
            <div className="home-title">User List</div>
            <div className="home-role">Your Role {user?.admin ? "admin" : "users"}</div>
            <div className="home-userlist">
                {GetAllUsers?.map((user) => {
                    return (
                        <div className="user-container">
                            <div className="home-user">{user.userName}</div>
                            <div className="delete-user"
                                 onClick={() => handleDelete(user._id)}
                            > Delete
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="err-masage">{msg}</div>
        </main>
    );
};

export default HomePage;
