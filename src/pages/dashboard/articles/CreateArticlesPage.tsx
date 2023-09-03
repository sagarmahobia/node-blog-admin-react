import {CreateArticleCubit} from "./ArticlesController";
import {observer} from "mobx-react";
import {
    Box,
    Button,
    Card,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input, Select
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {chainCubits} from "../../../utils/ContextCreator";
import {Category, LoadCategoriesCubit} from "../categories/CategoriesCubits";

export interface Props {
    onChange: (e: any) => void,
    selectedCategory: number
}

const CategoryOptions = observer((
    {
        onChange,
        selectedCategory
    }: Props
) => {

    const categoriesCubit = LoadCategoriesCubit.ctx.useCubitContext();

    useEffect(
        () => {
            categoriesCubit?.fetchData({
                id: null
            });
        }, []
    )

    const handleChange = (e: any) => {
        const {value} = e.target;

        onChange(e);
    };

    let options = (<>Error</>);

    if (categoriesCubit?.isLoading) {
        options = (
            <div>Loading</div>

        )
    } else if (categoriesCubit?.isSuccess) {

        options = (
            <Select placeholder="Select Category" onChange={handleChange} value={selectedCategory}>

                {categoriesCubit.data.data.map((category: Category) => {
                    return (
                        <option value={category.id}>{category.name}</option>
                    )
                })}
            </Select>

        )
    } else {
        options = (
            <div>Error Loading</div>
        )
    }


    return (
        <FormControl>
            <FormLabel>Select Category </FormLabel>
            {options}
        </FormControl>
    )
});

const CategoriesComponent = LoadCategoriesCubit.ctx.withCubit(CategoryOptions, new LoadCategoriesCubit());
const SubCategoriesComponent = LoadCategoriesCubit.ctx.withCubit(observer(({props}) => {

    const [selectedCategories, setSelectedCategories] = React.useState<any>([]);

    const categoriesCubit = LoadCategoriesCubit.ctx.useCubitContext();

    useEffect(
        () => {
            categoriesCubit?.fetchData({
                id: null
            });
        }, []
    )

    const handleChange = (e: any) => {
        const {value} = e.target;
        setSelectedCategories(
            [
                ...selectedCategories,
                value
            ]
        );
    };

    let options = (<>Error</>);


    if (categoriesCubit?.isLoading) {
        options = (
            <div>Loading</div>

        )
    } else if (categoriesCubit?.isSuccess) {

        options = (
            <Select placeholder="Select Category" onChange={handleChange} value={selectedCategories}>

                {categoriesCubit.data.data.map((category: any) => {
                    return (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )
                })}
            </Select>

        )
    } else {
        options = (
            <div>Error Loading</div>
        )
    }


    return (
        <FormControl>
            <FormLabel>Select Category </FormLabel>
            {options}
        </FormControl>
    )
}), new LoadCategoriesCubit());


const CreateArticlesPage = () => {

    const title = React.useRef("");
    const shortDescription = React.useRef("");
    const description = React.useRef('');
    const tags = React.useRef("");
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

    const [titleError, setTitleError] = React.useState(false);
    const [shortDescriptionError, setShortDescriptionError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [tagsError, setTagsError] = React.useState(false);
    const navigate = useNavigate();

    const {id} = useParams<{ id: string, parent: string }>();

    const createCubit = CreateArticleCubit.ctx.useCubitContext();
    const categoriesCubit = LoadCategoriesCubit.ctx.useCubitContext();


    useEffect(
        () => {

            if (createCubit?.isSuccess) {
                navigate("/");
                createCubit.reset();
            }

        }, [createCubit?.response]
    )

    useEffect(
        () => {
            categoriesCubit?.fetchData({
                id: null
            });
        }, []
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
                    let valid = true;
                    if (title === undefined || title.current === "") {
                        setTitleError(true);
                        valid = false;
                    } else {
                        setTitleError(false);
                    }
                    if (shortDescription === undefined || shortDescription.current === "") {
                        setShortDescriptionError(true);
                        valid = false;
                    } else {
                        setShortDescriptionError(false);
                    }
                    if (description === undefined || description.current === "") {
                        setDescriptionError(true);
                        valid = false;
                    } else {
                        setDescriptionError(false);
                    }
                    if (tags === undefined || tags.current === "") {
                        setTagsError(true);
                        valid = false;
                    } else {
                        setTagsError(false);
                    }
                    if (!valid) {
                        return;
                    }

                    createCubit?.fetchData({
                        title: title.current,
                        shortDescription: shortDescription.current,
                        description: description.current,
                        tags: tags.current.split(","),
                        media: [],
                        subCategories: [],
                        category: "64d7bdd137478ad8e197f141"

                    });

                }
            }>{id !== undefined ? "Update" : "Create"}</Button>
        )
    };

    return (
        <Card p={'5'}>
            <Flex p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Create Article
                </Box>

            </Flex>
            <Box p={"5"}>
                <FormControl isInvalid={titleError} pb={5}>
                    <FormLabel htmlFor="title">Article Title</FormLabel>
                    <Input id="title" type="name" placeholder={"Enter Article Title"}
                        // value={title.current}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   title.current = (e.target.value);
                                   console.log("setState");
                                   setTagsError(false);
                               }
                           }/>
                    {titleError && (

                        <FormErrorMessage>Title is required.</FormErrorMessage>

                    )}
                </FormControl>
                <FormControl isInvalid={shortDescriptionError} pb={5}>
                    <FormLabel htmlFor="shortDesc">Short Description</FormLabel>
                    <Input id="shortDesc" type="name" placeholder={"Enter Short Description"}
                        // value={shortDescription.current}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   shortDescription.current = (e.target.value)
                               }
                           }/>
                    {shortDescriptionError && (

                        <FormErrorMessage>Short Description is required.</FormErrorMessage>

                    )}
                </FormControl>


                <FormControl isInvalid={descriptionError} pb={5}>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Input id="desc" type="name" placeholder={"Enter Description"}
                        // value={description.current}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   description.current = (e.target.value)
                               }
                           }/>
                    {descriptionError && (

                        <FormErrorMessage>Description is required.</FormErrorMessage>

                    )}
                </FormControl>
                <FormControl isInvalid={tagsError} pb={5}>
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <Input id="tags" type="name" placeholder={"Enter Tags"}
                        // value={tags.current}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   tags.current = (e.target.value)
                               }
                           }/>
                    {tagsError && (

                        <FormErrorMessage>Tags is required.</FormErrorMessage>

                    )}
                </FormControl>
                <CategoriesComponent onChange={
                    (e: any) => {
                        setSelectedCategory(e.target.value)
                    }
                } selectedCategory={selectedCategory}
                />
                <SubCategoriesComponent/>

                <Flex pt={"4"} justifyContent={"center"}>
                    {createButtonBloc()}
                </Flex>
            </Box>
        </Card>
    );
}
export default chainCubits(
    CreateArticlesPage,
    [
        {
            ctx: CreateArticleCubit.ctx,
            instance: new CreateArticleCubit()
        },
        {
            ctx: LoadCategoriesCubit.ctx,
            instance: new LoadCategoriesCubit()
        }
    ]
)
