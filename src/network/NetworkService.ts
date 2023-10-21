import axios, {catchError} from "../utils/AxiosProvider";
import {GenericResponse} from "../utils/CommonResponses";
import {Article, ArticleInfo, Category} from "./models/ResponseModels";

export interface CategoryDetailsInput {
    id: string | null | undefined;
}

export interface CreateCategoryInput extends CategoryDetailsInput {
    name: string;
    parent: string | null;
}

export interface CreateArticleInput {
    title: string
    shortDescription: string
    description: string
    category: string
    subCategories: string[]
    media: string[]
    tags: string[]
    id?: string
}


export const login = (email: string, password: string) => {
    let promise = axios.get("auth/login", {
        params: {
            email: email,
            password: password
        }
    });
    return catchError(promise);
}

export const loadCategories = (input: CategoryDetailsInput) => {
    let promise = axios.get("category/detail",
        {
            params: input
        }
    );

    return catchError(promise);
};


export const createCategory = (input: CreateCategoryInput) => {
    let url = "category/create";
    return axios.post(url, input);
}


export const updateCategory = (input: CreateCategoryInput) => {
    let url = "category/update";

    return axios.post(url, input);
}


export const deleteCategory = (input: CategoryDetailsInput) => {
    let deleteCategory = axios.get("category/delete",
        {
            params: input
        }
    );

    return catchError(deleteCategory);
}


///articles/list


export function loadArticles(): Promise<Article[]> {
    let promise = axios.get<GenericResponse<Article[]>>("articles/list");
    return catchError(promise);
}


export function loadArticleInfo(id: string): Promise<ArticleInfo> {
    let promise = axios.get<GenericResponse<Article>>("articles/info",
        {
            params: {
                id: id
            }
        }
    );

    return catchError(promise);
}

export const loadParentCategories = (): Promise<Category[]> => {
    let promise = axios.get("category/parents");
    return catchError(promise);
}

export const loadSubCategories = (input: CategoryDetailsInput): Promise<Category[]> => {
    let promise = axios.get("category/children",
        {
            params: input
        }
    );
    return catchError(promise);
}


export const createArticle = (
    createArticleInput: CreateArticleInput
) => {
    let url = "articles/create";
    if (createArticleInput.id) {
        url = "articles/update";
    }

    let promise = axios.post(url, createArticleInput);
    return catchError(promise);
}

export const deleteArticle = (id: string) => {

    let deleteArticle = axios.post("articles/delete",
        {},
        {
            params: {
                id: id
            }
        }
    );

    return catchError(deleteArticle);
}

//media calls

//media/list
//media/delete
//media/create
//media/info

export const loadMedia = () => {
    let promise = axios.get("media/list");
    return catchError(promise);
}

export const deleteMedia = (id: string) => {
    let promise = axios.get("media/delete",
        {
            params: {
                id: id
            }
        }
    );
    return catchError(promise);
}

export const uploadMedia = (file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data', 
            
        },
    };
    let promise = axios.post("media/create", formData,config);
    return catchError(promise);
}
