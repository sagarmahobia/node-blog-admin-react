import axios from "../utils/AxiosProvider";

export interface CategoryDetailsInput {
    id: string | null | undefined;
}

export interface CreateCategoryInput extends CategoryDetailsInput {
    name: string;
    parent: string | null;
}


export const login = (
    email: string,
    password: string
) => {
    return axios.get("auth/login", {
        params: {
            email: email,
            password: password
        }
    })
}


export const loadCategories = (input: CategoryDetailsInput) => {
    return axios.get("category/detail",
        {
            params: input
        }
    );
};

export const loadParentCategories = () => {
    return axios.get("category/parents");
}

export const loadSubCategories = (input: CategoryDetailsInput) => {
    return axios.get("category/children",
        {
            params: input
        }
    );
}

export const createCategory = (input: CreateCategoryInput) => {
    let url = "category/create";
    return axios.post(url, input);
}

export const updateCategory = (input: CreateCategoryInput) => {
    let url = "category/update";

    return axios.post(url, input);
}


export const deleteCategory = (input: CategoryDetailsInput) => {
    return axios.get("category/delete",
        {
            params: input
        }
    );
}


///articles/list

export const loadArticles = () => {
    return axios.get("articles/list");
}



export interface CreateArticleInput {
    title: string
    shortDescription: string
    description: string
    category: string
    subCategories: string[]
    media: string[]
    tags: string[]
}
export const createArticle = (
    createArticleInput: CreateArticleInput
) => {
    return axios.post("articles/create", createArticleInput);
}
