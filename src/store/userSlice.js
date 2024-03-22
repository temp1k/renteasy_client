import {createSlice} from "@reduxjs/toolkit";

const defaultUser = {
    id: 0,
    username: '',
    role: '',
    access: '',
    email: '',
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
                role: user.role,
                email: user.email,
                isAuth: true,
            }
        },
        logoutUser(state, action) {
            state.currentUser = defaultUser
        },

    },
})

export const {loginUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;