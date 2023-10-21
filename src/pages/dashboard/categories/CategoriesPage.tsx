import React from 'react';
import { Link, useParams, } from "react-router-dom";
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

import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../network/models/ResponseModels";
import { useCategories, useDeleteCategory } from "./CategoriesQueries";

const CategoriesPage = () => {

    const { id } = useParams<{ id: string }>();

    const categoriesQuery = useCategories(id);


    let content = (<>Loaded</>);

    if (categoriesQuery?.isLoading) {

        content = (
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Spinner p={"5"} m={"10"}></Spinner>
            </Flex>
        );
    } else if (categoriesQuery?.isSuccess) {

        if (categoriesQuery.data.length < 1) {
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
                    {categoriesQuery.data && (categoriesQuery.data).map((category: Category) => {
                        return (
                            <Flex m={"5"} key={category.id}>
                                <Box fontSize={"24"} fontWeight={"bold"}>
                                    {category.name}
                                </Box>
                                <Spacer />
                                {
                                    id === undefined &&

                                    <Link to={"/categories/" + category.id}>
                                        <ViewIcon
                                            boxSize={6}
                                            color={"teal.500"}
                                            m={2}
                                        />
                                    </Link>
                                }
                                <Link
                                    to={"/category/update/" + category.id + (id !== undefined ? "/" + id : "")}>
                                    <EditIcon
                                        boxSize={6}
                                        color={"teal.500"}
                                        m={2}
                                    />
                                </Link>
                                <DeleteCategory id={category.id} />
                            </Flex>
                        )
                    })}
                </>
            );
        }
    } else if (categoriesQuery?.isError) {
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
                <Spacer />
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

function DeleteCategory({ id }: { id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<any>();


    const deleteMutation = useDeleteCategory();
    return (
        <>
            <Box as="button" onClick={onOpen} m={2}>
                <DeleteIcon boxSize={6} color="red.500" />
            </Box>
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
                                deleteMutation.mutateAsync(id);
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


export default CategoriesPage;

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



