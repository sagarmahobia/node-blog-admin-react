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

export type ArticleInfo = {

    title: string
    shortDescription: string
    description: string
    category: {
        name: string
        createdAt: string
        updatedAt: string
        parent: any
        id: string
    }
    subCategories: Array<{
        name: string
        parent: string
        createdAt: string
        updatedAt: string
        id: string
    }>
    media: Array<Media>
    tags: Array<string>
    createdAt: string
    updatedAt: string
    id: string

}
export type Media = {
    originalName: string
    size: number
    extension: string
    fullName: string
    id: string
}
