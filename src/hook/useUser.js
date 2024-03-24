import {useSelector, useDispatch} from "react-redux";
import {loginUser, logoutUser, updateRolesUser} from "../store/userSlice.js";
import {jwtDecode} from "jwt-decode";
import {getUserById} from "../http/api/authAPI.js";


export function useUser () {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    function userAPIToUserRedux(userAPI) {
        return {
            id: userAPI.id,
            username: userAPI.username,
            email: userAPI.email,
            isAuth: userAPI.is_active,
            roles: userAPI.groups,
        }
    }

    function login(jwt, callback) {
        const jwt_decode = jwtDecode(jwt.access)
        const user = {
            id: jwt_decode.user_id,
            username: jwt_decode.login,
            email: '',
            access: jwt.access,
            roles: jwt_decode.roles,
            isAuth: true
        }

        dispatch(loginUser(user))
        callback()
    }

    function updateUserByJwt(jwt) {
        const jwt_decode = jwtDecode(jwt.access)
        getUserById(jwt_decode.user_id)
            .then(data => {
                console.log(data)
                const user = userAPIToUserRedux(data)

                dispatch(loginUser(user))
            })
            .catch(err => {
                console.error(err)
            })

    }

    function updateRoles(roles) {
        dispatch(updateRolesUser(roles))
    }

    function logoutFn(){
        localStorage.setItem('refresh', '')
        localStorage.setItem('access', '')
        dispatch(logoutUser())
    }

    return {
        currentUser,
        login,
        logoutFn,
        updateRoles,
        updateUserByJwt
    }
}