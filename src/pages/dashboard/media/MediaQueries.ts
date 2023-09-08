import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteMedia, loadMedia, uploadMedia} from "../../../network/NetworkService";




export const useMediaList = () => {
    return useQuery(
        {
            queryKey: ["mediaList"],
            queryFn: () => {
                return loadMedia();
            }
        }
    )
}

// export const useMediaInfo = (id: string | undefined) => {
//     return useQuery(
//         {
//             queryKey: ["mediaInfo", id],
//             enabled: id !== undefined,
//             queryFn: () => {
//                 if (id) {
//                     return loadMedia();
//                 }
//             },
//         }
//     )
// }

export const useDeleteMedia = () => {
    const client = useQueryClient();
    return useMutation(
        {
            mutationKey: ["deleteMedia"],
            mutationFn: (id: string) => {
                return deleteMedia(id);
            },
            onSuccess: (data: any) => {
                client.invalidateQueries(["mediaList"]);
                client.invalidateQueries(["mediaInfo"]);
            }
        }
    );
}

export const useUploadMedia = (
    onUploadSuccess: () => void
) => {
    const client = useQueryClient();
    return useMutation(
        {
            mutationKey: ["uploadMedia"],
            mutationFn: (file: File) => {
                return uploadMedia(file);
            },
            onSuccess: (data: any) => {
                client.invalidateQueries(["media_list"]);
                onUploadSuccess();
            }
        }
    );
}
