import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "../../../network/models/ResponseModels";
import { useCreateCategory, useLoadCategory } from "./CategoriesQueries";

const CreateCategoryPage = () => {
    const [name, setName] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const navigate = useNavigate();
    const { id, parent } = useParams<{ id: string, parent: string }>();


    const loadQuery = useLoadCategory(id);

    const createMutation = useCreateCategory(
        id,
        () => {
            if (parent !== undefined) {
                navigate("/categories/" + parent);
                return;
            }
            navigate("/categories");
        }
    );

    useEffect(
        () => {
            if (loadQuery.isSuccess) {
                let data = loadQuery.data as Category;
                setName(data.name);
            }
        }, [loadQuery.isSuccess],
    )

    return (
        <Card p={'5'}>
            <Flex p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Create Category
                </Box>

            </Flex>
            <Box p={"5"}>
                <FormControl isInvalid={isError}>
                    <FormLabel htmlFor="name">Category Name</FormLabel>
                    <Input mt={"2"} id="name" type="name" placeholder={"Enter Category Name"}
                        value={name}
                        onChange={
                            (e) => {
                                setName(e.target.value)
                            }
                        } />
                    {!isError ? (

                        <FormHelperText>
                            Enter the name of the category.
                        </FormHelperText>

                    ) : (
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
                </FormControl>

                <Flex pt={"4"} justifyContent={"center"}>
                    <Button
                        width={"100vw"}
                        mt={"5"}
                        onClick={() => {
                            if (name === undefined || name === "") {
                                setIsError(true);
                                return;
                            }
                            createMutation?.mutateAsync({
                                name: name,
                                id: id,
                                parent: parent !== undefined ? parent : null,
                            });
                        }}
                        isLoading={createMutation?.isLoading}
                        loadingText={"Creating... tada"}
                    >
                        {id !== undefined ? "Update" : "Create"}
                    </Button>
                </Flex>
            </Box>
        </Card>
    );
}

export default CreateCategoryPage;
