import React, {useEffect} from 'react';
import {Link, useParams,} from "react-router-dom";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Card,
    Flex,
    Spacer,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";

import {AddIcon} from '@chakra-ui/icons';
import {GenericResponse} from "../../../utils/CommonResponses";
import {Category, DeleteCategoryCubit, LoadCategoriesCubit} from "./CategoriesCubits";
import {chainCubits} from "../../../utils/ContextCreator";

const CategoriesPage = () => {

    // const dispatch = useDispatch<AppDispatch>();
    // const select = useSelector((state: RootState) => state.categories);

    const deleteCubit = DeleteCategoryCubit.ctx.useCubitContext();
    const cubit = LoadCategoriesCubit.ctx.useCubitContext();

    const {id} = useParams<{ id: string }>();


    const fetchCategories = () => {
        if (id !== undefined) {
            cubit?.fetchData(
                {
                    id: id
                }
            )
        } else {
            cubit?.fetchData(
                {
                    id: null
                }
            )
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [id]);

    useEffect(
        () => {
            if (deleteCubit?.isSuccess) {
                let data = deleteCubit.data as GenericResponse<any>;
                if (data.success) {
                    fetchCategories();
                }
            }
        }, [deleteCubit?.response]
    )

    let content = (<>Loaded</>);

    if (cubit?.isLoading || deleteCubit?.isLoading) {

        content = (
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Spinner p={"5"} m={"10"}></Spinner>
            </Flex>
        );
    } else if (cubit?.isSuccess) {

        if (cubit.data.data.length < 1) {
            content = (
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Box p={"5"} m={"10"} fontSize={"24"}>
                        No Categories
                    </Box>
                </Flex>
            );
        } else {
            content = (
                < >
                    {cubit.data.data && (cubit.data.data).map((category: Category) => {
                        return (
                            <Flex m={"5"} key={category.id}>
                                <Box fontSize={"24"} fontWeight={"bold"}>
                                    {category.name}
                                </Box>
                                <Spacer/>
                                {
                                    id === undefined &&

                                    <Link to={"/categories/" + category.id}>
                                        <Button ml={"4"}>View</Button>
                                    </Link>
                                }
                                <Link
                                    to={"/category/update/" + category.id}>
                                    <Button ml={"4"}>Edit</Button>
                                </Link>
                                <DeleteCategory id={category.id}/>
                            </Flex>
                        )
                    })}
                </>
            );
        }
    } else if (cubit?.isError) {
        content = (
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Box p={"5"} m={"10"}>
                    Something went wrong
                </Box>
            </Flex>
        );
    }

    return (
        <Card p={'5'}>
            <Flex p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Categories
                </Box>
                <Spacer/>
                {id ? <Link to={"/category/create/" + (id)}>
                        <Button><AddIcon mr={"3"}></AddIcon>Create</Button>
                    </Link>
                    :
                    <Link to={"/category/create"}>
                        <Button><AddIcon mr={"3"}></AddIcon>Create</Button>
                    </Link>
                }
            </Flex>
            <Box>
                {content}
            </Box>
        </Card>
    );

}

function DeleteCategory({id}: { id: string }) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef<any>()
    // const dispatch = useDispatch<AppDispatch>();

    const deleteCubit = DeleteCategoryCubit.ctx.useCubitContext();
    return (
        <>
            <Button ml={"4"} colorScheme='red' onClick={onOpen}>Delete</Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this category?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onClose();
                                deleteCubit?.fetchData({id: id});
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}


export default chainCubits(
    CategoriesPage,
    [
        {
            ctx: DeleteCategoryCubit.ctx,
            instance: new DeleteCategoryCubit()
        },
        {
            ctx: LoadCategoriesCubit.ctx,
            instance: new LoadCategoriesCubit()
        }
    ],
);

export interface Categories {
    success: boolean
    data: Daum[]
    message: string
}

export interface Daum {
    name: string
    createdAt: string
    updatedAt: string
    id: string
}



