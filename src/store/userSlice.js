import {createSlice} from "@reduxjs/toolkit";

const defaultUser = {
    id: 0,
    username: '',
    role: '',
    access: '',
    email: '',
    roles: [],
    isAuth: false
}


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: defaultUser
    },
    reducers: {
        loginUser(state, action) {
            const user = action.payload;

            state.currentUser = {
                id: user.id,
                username: user.username,
                access: user.access,
                roles: user.roles,
                email: user.email,
                isAuth: true,
            }
        },
        logoutUser(state, action) {
            state.currentUser = defaultUser
        },
        updateRolesUser(state, action) {
            const roles = action.payload
            state.currentUser.roles = roles
        }

    },
})

export const {
    loginUser,
    logoutUser,
    updateRolesUser
} = userSlice.actions;

export default userSlice.reducer;