import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createArticle,
    CreateArticleInput, createCategory, CreateCategoryInput, deleteCategory, loadCategories,
    loadParentCategories,
    loadSubCategories, updateCategory
} from "../../../network/NetworkService";

export const useCategories = (id) => {
    return useQuery(
        {
            queryKey: ["categories", id],
            queryFn: () => {
                if (id) {

                    return loadSubCategories({id: id});
                } else {
                    return loadParentCategories();
                }
            }
        }
    )
}


export const useDeleteCategory = () => {
    let client = useQueryClient();
    return useMutation(
        {
            mutationKey: ["deleteCategory"],
            mutationFn: (id: string) => {
                return deleteCategory({
                    id: id
                });
            },
            onSuccess: (data: any) => {
                // categoriesQuery.refetch();
                client.invalidateQueries(["categories"]);
            }
        }
    );
}

export const useLoadCategory = (id) => {
    return useQuery(
        {
            queryKey: ["categoryDetail", id],
            queryFn: () => {
                return loadCategories({id: id});
            },
        }
    )
}

export const useCreateCategory = (
    id,
    onSuccess: () => void
) => {

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationKey: ["createCategory"],
            mutationFn: (input: CreateCategoryInput) => {
                if(id) {
                    return updateCategory(input);
                }else {
                    return createCategory(input);
                }
            },
            onSuccess: (data: any) => {
                onSuccess();
                queryClient.invalidateQueries(["categories"]);
                queryClient.invalidateQueries(["categoryDetail", id]);
            }
        }
    );
}
