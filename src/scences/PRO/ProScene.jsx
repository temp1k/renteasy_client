import {Navigate, Route, Routes} from "react-router-dom";
import ProLayout from "./components/Layout/ProLayout.jsx";
import {
    CREATE_ROUTE,
    MY_HOUSING_ROUTE,
    MY_PUBLISH_HOUSING_ROUTE,
    MY_REQUESTS_ROUTE,
    NEWS_ROUTE
} from "../../utils/consts/paths.js";
import {ErrorPage, NotFoundPage, PublishHousingViewPage} from "../../pages/index.js";
import {
    HousingCreatePage,
    HousingViewPage,
    MyHousingsPage,
    MyPublishHousingsPage,
    RequestPage,
    RequestsPage
} from "./pages/index.js";

const ProScene = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProLayout/>}>
                <Route index element={<Navigate to={MY_HOUSING_ROUTE} replace/>} />
                <Route path={MY_HOUSING_ROUTE} element={<MyHousingsPage />} />
                <Route path={`${MY_HOUSING_ROUTE}/${CREATE_ROUTE}`} element={<HousingCreatePage/> } />
                <Route path={MY_HOUSING_ROUTE + '/:id'} element={<HousingViewPage/> } />
                <Route path={MY_REQUESTS_ROUTE} element={<RequestsPage/>} />
                <Route path={MY_REQUESTS_ROUTE + '/:id'} element={<RequestPage />} />

                <Route path={MY_PUBLISH_HOUSING_ROUTE} element={<MyPublishHousingsPage/> } />
                <Route path={MY_PUBLISH_HOUSING_ROUTE + '/:id'} element={<PublishHousingViewPage/> } />

                <Route path={NEWS_ROUTE} element={<ErrorPage errorMessage={'Страница с новостями еще в разработке...'}/> } />
                <Route path={NEWS_ROUTE + '/:id'} element={<NotFoundPage text={'Такой новости не существует'}/>} />

                <Route path={"*"} element={<NotFoundPage/>} />
            </Route>
        </Routes>
    );
};

export default ProScene;