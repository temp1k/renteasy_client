import {useContext} from "react";
import {AuthContext} from "../hoc";


export function useAuth() {
    return useContext(AuthContext);
}