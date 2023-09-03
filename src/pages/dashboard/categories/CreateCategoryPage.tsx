import React, {useEffect, useMemo} from 'react';
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
import {CategoriesCubits, Category, CreateCategoryCubit} from "./CategoriesCubits";
import {useNavigate, useParams} from "react-router-dom";
import {GenericResponse} from "../../../utils/CommonResponses";
import {chainCubits} from "../../../utils/ContextCreator";


const CreateCategoryPage = () => {
    const [name, setName] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const navigate = useNavigate();
    const {id, parent} = useParams<{ id: string, parent: string }>();

    const cubit = CategoriesCubits.ctx.useCubitContext();
    const createCubit = CreateCategoryCubit.ctx.useCubitContext();

    useEffect(
        () => {

            if (id !== undefined) {
                cubit?.fetchData({
                    id: id
                });
            }
        }, []
    )

    useEffect(
        () => {
            if (id === undefined) {
                return;
            }

            if (cubit?.isSuccess) {
                let data = cubit.data as GenericResponse<Category>;
                setName(data.data.name);
            }
        }, [cubit?.response]
    )

    useEffect(
        () => {

            if (createCubit?.isSuccess) {
                navigate("/categories");
                createCubit.reset();
            }

        }, [createCubit?.response]
    )


    const createButtonBloc = () => {

        if (createCubit?.isLoading) {
            return (
                <Button isLoading={true} width={"100vw"} mt={"5"} loadingText={"Creating..."}>Sign in</Button>
            )
        }

        return (
            <Button width={"100vw"} mt={"5"} onClick={
                () => {
                    if (name === undefined || name === "") {
                        setIsError(true);
                        return;
                    }
                    createCubit?.fetchData({
                            name: name,
                            id: id,
                            parent: parent !== undefined ? parent : null,
                        }
                    );

                }
            }>{id !== undefined ? "Update" : "Create"}</Button>
        )
    };

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
                                   // setName(e.target.value)
                                   setName(e.target.value)
                               }
                           }/>
                    {!isError ? (

                        <FormHelperText>
                            Enter the name of the category.
                        </FormHelperText>

                    ) : (
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
                </FormControl>

                <Flex pt={"4"} justifyContent={"center"}>
                    {createButtonBloc()}
                </Flex>
            </Box>
        </Card>
    );
}

export default chainCubits(
    CreateCategoryPage,
    [
        {
            ctx: CategoriesCubits.ctx,
            instance: new CategoriesCubits()
        },
        {
            ctx: CreateCategoryCubit.ctx,
            instance: new CreateCategoryCubit()
        },
    ],
)
