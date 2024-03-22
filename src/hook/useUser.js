import {useSelector, useDispatch} from "react-redux";
import {loginUser, logoutUser} from "../store/userSlice.js";
import {jwtDecode} from "jwt-decode";


export function useUser () {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    function login(jwt, callback) {
        const jwt_decode = jwtDecode(jwt.access)
        const user = {
            id: jwt_decode.user_id,
            username: jwt_decode.login,
            email: '',
            access: jwt.access,
            isAuth: true,
        }
        dispatch(loginUser(user))
        callback()
    }

    function logout(){
        dispatch(logoutUser())
    }

    return {
        currentUser,
        login,
        logout
    }
}