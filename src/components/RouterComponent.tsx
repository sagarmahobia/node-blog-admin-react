import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthGuardComponent from "./AuthGuardComponent";
import DashboardComponent from "../pages/dashboard/DashboardComponent";
import CategoriesPage from "../pages/dashboard/categories/CategoriesPage";
import LoginComponent from "../pages/login/LoginComponent";
import CategoryCreate from "../pages/dashboard/categories/CreateCategoryPage";
import ArticlesListPage from "../pages/dashboard/articles/ArticlesListPage";
import CreateArticlesPage from "../pages/dashboard/articles/CreateArticlesPage";

RouterComponent.propTypes = {};

function RouterComponent(props: PropTypes.InferProps<typeof RouterComponent.propTypes>) {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthGuardComponent component={<DashboardComponent/>}/>}>
                    <Route index element={<ArticlesListPage/>}/>
                    <Route key={"create"} path="/articles/create" element={<CreateArticlesPage/>}/>


                    <Route key={"create"} path="/category/create" element={<CategoryCreate/>}/>
                    <Route key={"createChild"} path="/category/create/:parent" element={<CategoryCreate/>}/>
                    <Route key={"update"} path="/category/update/:id" element={<CategoryCreate/>}/>

                    <Route key={"categories"} path="/categories" element={<CategoriesPage/>}/>
                    <Route key={"subcategories"} path="/categories/:id" element={<CategoriesPage/>}/>

                </Route>
                <Route path="/login" element={<LoginComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouterComponent;
