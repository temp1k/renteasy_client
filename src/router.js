import {Home, ProfilePage} from "./pages/index.js";
import {HOME_ROUTE, RENT_SCENE_ROUTE, PROFILE_ROUTE} from "./utils/consts/paths.js";
import {Arenda} from "./scences/Arenda";

export const rentRoutes = [
    {
        path: RENT_SCENE_ROUTE,
        element: Arenda
    }
]


export const homeRoutes = [
    {
        path: HOME_ROUTE,
        element: Home
    },
    {
        path: PROFILE_ROUTE,
        element: ProfilePage
    },
    // {
    //     path: LOGIN_ROUTE,
    //     element: null
    // },
    // {
    //     path: REGISTRATION_ROUTE,
    //     element: null
    // },
    // {
    //     path: PUBLISH_HOUSING_ROUTE + "/:id",
    //     element: null
    // }
]