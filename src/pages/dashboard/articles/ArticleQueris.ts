import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createArticle,
    CreateArticleInput,
    deleteArticle,
    loadArticleInfo,
    loadArticles
} from "../../../network/NetworkService";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import axios from "axios";


export function useArticles() {
    return useQuery<any, Error>(
        {
            queryKey: ["articles"],
            queryFn: loadArticles,
        },
    )
}

export const useCreateArticle = (
    onSuccess: () => void
) => {
    const client = useQueryClient();
    return useMutation(
        {
            mutationKey: ["createArticle"],
            mutationFn: (input: CreateArticleInput) => {
                return createArticle(input);
            }
            , onSuccess: (data) => {
                onSuccess();
                client.invalidateQueries(["articleInfo"]);
                client.invalidateQueries(["articles"]);
            }
        });
}


export const useArticleInfo = (id: string | undefined) => {
    return useQuery(
        {
            queryKey: ["articleInfo", id],
            enabled: id !== undefined,
            queryFn: () => {
                if (id) {
                    return loadArticleInfo(id);
                }
            },
        }
    )
}


export const useDeleteArticle = () => {

    const client = useQueryClient();
    return useMutation(
        {
            mutationKey: ["deleteArticle"],
            mutationFn: (id: string) => {
                return deleteArticle(id);
            },
            onSuccess: (data: any) => {
                client.invalidateQueries(["articles"]);
            }
        }
    );

}
