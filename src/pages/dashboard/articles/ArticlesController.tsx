import ApiWrapper from "../../../utils/ApiController";
import {GenericResponse} from "../../../utils/CommonResponses";
import {createArticle, CreateArticleInput, loadArticles} from "../../../network/NetworkService";
import {makeObservable} from "mobx";
import {ContextCreator} from "../../../utils/ContextCreator";

export interface Article {
    subCategories: string[]
    media: string[]
    tags: string[]
    title: string
    shortDescription: string
    description: string
    createdAt: string
    updatedAt: string
    id: string
    category?: string
}


export class ListArticlesCubit extends ApiWrapper<any, GenericResponse<Article[]>> {
    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: any): Promise<any> {
        return loadArticles();
    }

    static ctx = new ContextCreator<ListArticlesCubit>();


}


export class CreateArticleCubit extends ApiWrapper<CreateArticleInput, GenericResponse<Article>> {
    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: any): Promise<any> {
        return createArticle(input);
    }

    static ctx = new ContextCreator<CreateArticleCubit>();
}
