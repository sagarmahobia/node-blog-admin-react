import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthGuardComponent from "./AuthGuardComponent";
import DashboardComponent from "../pages/dashboard/root/DashboardComponent";
import CategoriesPage from "../pages/dashboard/categories/CategoriesPage";
import LoginComponent from "../pages/login/LoginComponent";
import CategoryCreate from "../pages/dashboard/categories/CreateCategoryPage";
import ArticlesListPage from "../pages/dashboard/articles/ArticlesListPage";
import CreateArticlesPage from "../pages/dashboard/articles/CreateArticlesPage";
import {MediaListPage} from "../pages/dashboard/media/MediaListPage";
import {CreateMedia} from "../pages/dashboard/media/CreateMedia";

RouterComponent.propTypes = {};

function RouterComponent(props: PropTypes.InferProps<typeof RouterComponent.propTypes>) {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthGuardComponent component={<DashboardComponent/>}/>}>
                    <Route index element={<ArticlesListPage/>}/>
                    <Route key={"createArticle"} path="/articles/create" element={<CreateArticlesPage/>}/>
                    <Route key={"updateArticle"} path="/articles/update/:id" element={<CreateArticlesPage/>}/>

                    <Route key={"createCategory"} path="/category/create" element={<CategoryCreate/>}/>
                    <Route key={"createChild"} path="/category/create/:parent" element={<CategoryCreate/>}/>
                    <Route key={"updatCategorye"} path="/category/update/:id" element={<CategoryCreate/>}/>

                    <Route key={"categories"} path="/categories" element={<CategoriesPage/>}/>
                    <Route key={"subcategories"} path="/categories/:id" element={<CategoriesPage/>}/>


                    <Route key={"mediaList"} path={"/medias"} element={<MediaListPage/>}/>

                    <Route key={"createMedia"} path={"/medias/create"} element={<CreateMedia/>}/>


                </Route>
                <Route path="/login" element={<LoginComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RouterComponent;
