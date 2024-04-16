import {useDispatch, useSelector} from "react-redux";
import {loginUser, logoutUser, updateRolesUser} from "../store/userSlice.js";
import {jwtDecode} from "jwt-decode";
import {getUserByIdAPI, refreshTokenAPI, virifyTokenAPI} from "../http/api/authAPI.js";


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

    function jwtToUserRedux(jwt) {
        const jwt_decode = jwtDecode(jwt.access)
        const user = {
            id: jwt_decode.user_id,
            username: jwt_decode.login,
            email: '',
            access: jwt.access,
            roles: jwt_decode.roles,
            isAuth: true
        }
        return user
    }

    async function reloadUser(jwtAccess) {
        console.log('Обновление пользователя')
        try{
            const result = await verifyToken(jwtAccess)
            if (result) await updateUserByAPI({access: jwtAccess}).catch(err => console.error(err))
            else {
                const refreshToken = localStorage.getItem('refresh')

                if (refreshToken) {
                    console.log('refresh токен')
                    await refreshTokenAPI(refreshToken)
                        .then(async newJwtAccess => {
                            localStorage.setItem('access', newJwtAccess)
                            await updateUserByAPI({access: newJwtAccess}).catch(err => console.log(err))
                        })
                        .catch(err => {
                            console.warn(err)
                            localStorage.removeItem('refresh')
                            localStorage.removeItem('access')
                        })
                }
            }
        }
        catch(err) {
            console.warn(err)
        }
    }

    function login(jwt, callback) {
       const user = jwtToUserRedux(jwt)

        dispatch(loginUser(user))
        callback()
    }

    async function updateUserByAPI(jwt) {
        console.log('Обновление пользователя через API')
        const jwt_decode = jwtDecode(jwt.access)
        try {
            const data = await getUserByIdAPI(jwt_decode.user_id)
            console.log(data)
            const user = userAPIToUserRedux(data)

            dispatch(loginUser(user))
        }
        catch (error){
            console.error(error)
        }
    }

    function updateUser(user) {
        try {
            const validUser = userAPIToUserRedux(user)

            dispatch(loginUser(validUser))
        }
        catch {
            
        }

    }

    function updateUserByJwt(jwtAccess) {
        console.log('Обновление пользователя по токену')
        const jwt = {access: jwtAccess}
        const user = jwtToUserRedux(jwt)
        dispatch(loginUser(user))
    }


    function updateUser(userFromAPI) {
        const user = userAPIToUserRedux(userFromAPI)
        dispatch(loginUser(user))
    }

    async function verifyToken(jwt) {
        console.log('Верификация токена')
        try {
            await virifyTokenAPI(jwt)
            return true
        }
        catch(err) {
            console.warn(err)
            return false
        }
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
        updateUserByJwt,
        verifyToken,
        updateUser,
        reloadUser
    }
}