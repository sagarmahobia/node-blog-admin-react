import ApiWrapper from "../../../utils/ApiController";
import {makeObservable} from "mobx";
import {GenericResponse} from "../../../utils/CommonResponses";
import {ContextCreator} from "../../../utils/ContextCreator";
import {
    CategoryDetailsInput, createCategory, CreateCategoryInput, deleteCategory,
    loadCategories,
    loadParentCategories,
    loadSubCategories, updateCategory
} from "../../../network/NetworkService";

export interface CategoryChildrenResponse {
    success: boolean,
    data: Category[],
    message: string,
}

export interface CategoryDetailResponse {
    success: boolean,
    data: Category,
    message: string,
}

export interface CategoriesResponse {
    success: boolean
    data: Category[],
    message: string
}

export interface Category {
    name: string
    parent: string
    createdAt: string
    updatedAt: string
    id: string
}

export class CategoriesCubits extends ApiWrapper<CategoryDetailsInput, GenericResponse<Category>> {

    // @observable
    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: CategoryDetailsInput): Promise<any> {
        if (!input.id) {
            throw new Error("Id is not defined");
        }
        return loadCategories(input);
    }


    static ctx = new ContextCreator<CategoriesCubits>();

}


export class LoadCategoriesCubit extends ApiWrapper<CategoryDetailsInput, GenericResponse<Category[]>> {

    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: CategoryDetailsInput): Promise<any> {
        if (input.id == null) {
            return loadParentCategories();
        }
        return loadSubCategories(input);
    }

    static ctx = new ContextCreator<LoadCategoriesCubit>();
}

export class DeleteCategoryCubit extends ApiWrapper<CategoryDetailsInput, GenericResponse<any>> {

    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: CategoryDetailsInput): Promise<any> {
        return deleteCategory(input);
    }

    static ctx = new ContextCreator<DeleteCategoryCubit>();
}


export class CreateCategoryCubit extends ApiWrapper<CreateCategoryInput, GenericResponse<any>> {

    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: CreateCategoryInput): Promise<any> {
        if (input.id === undefined || input.id === null || input.id === "") {
            return createCategory({
                    name: input.name,
                    id: null,
                    parent: input.parent
                }
            );
        }

        return updateCategory({
            name: input.name,
            id: input.id,
            parent: null
        });

    }

    static ctx = new ContextCreator<CreateCategoryCubit>();


}
