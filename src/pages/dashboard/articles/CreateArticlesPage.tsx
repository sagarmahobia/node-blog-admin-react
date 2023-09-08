// import {CreateArticleCubit} from "./ArticlesController";
import {
    Box,
    Button,
    Card,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Tag,
    TagLabel,
    TagRightIcon,
    Textarea,
    useBoolean
} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Article, ArticleInfo, Category, Media} from "../../../network/models/ResponseModels";
import {MdAdd, MdClear} from "react-icons/md";
import {useCategories} from "../categories/CategoriesQueries";
import {useArticleInfo, useCreateArticle} from "./ArticleQueris";
import MediaPickerPopUp from "../media/MediaPickerPopUp";

export interface Props {
    onChange: (e: any) => void,
    parent?: string | null,
    letAdd?: boolean
}


const CreateArticlesPage = () => {

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<Category[]>([]);
    const [selectedSubCategory, setSubSelectedCategory] = React.useState<Category[][]>([]);


    const [titleError, setTitleError] = React.useState(false);
    const [shortDescriptionError, setShortDescriptionError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [tagsError, setTagsError] = React.useState(false);
    const navigate = useNavigate();

    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

    const {id} = useParams<{ id: string, parent: string }>();

    const createQuery = useCreateArticle(
        () => {
            navigate("/");
        }
    );

    const infoQuery = useArticleInfo(
        id
    )

    useEffect(
        () => {
            if (infoQuery.isSuccess) {
                let data = infoQuery.data as ArticleInfo;

                setTitle(
                    data.title
                );
                setShortDescription(
                    data.shortDescription
                );
                setDescription(
                    data.description
                );
                setTags(
                    data.tags.join(",")
                );


                setSelectedCategory(
                    data.category !== null ? [data.category] : []
                )

                setSubSelectedCategory(
                    data.subCategories !== null ? [data.subCategories] : []
                )
                setSelectedMedia(
                    data.media ?? []
                )

            }
        }, [infoQuery.isSuccess, id],
    )


    const createButtonBloc = () => {

        if (createQuery?.isLoading) {
            return (
                <Button isLoading={true} width={"100vw"} mt={"5"} loadingText={"Creating..."}>Sign in</Button>
            )
        }

        return (
            <Button width={"100vw"} mt={"5"} onClick={
                () => {
                    let valid = true;
                    if (title === undefined || title === "") {
                        setTitleError(true);
                        valid = false;
                    } else {
                        setTitleError(false);
                    }
                    if (shortDescription === undefined || shortDescription === "") {
                        setShortDescriptionError(true);
                        valid = false;
                    } else {
                        setShortDescriptionError(false);
                    }
                    if (description === undefined || description === "") {
                        setDescriptionError(true);
                        valid = false;
                    } else {
                        setDescriptionError(false);
                    }
                    if (tags === undefined || tags === "") {
                        setTagsError(true);
                        valid = false;
                    } else {
                        setTagsError(false);
                    }
                    if (!valid) {
                        return;
                    }

                    //get first category from selectedCategory if greater than 1
                    let category;
                    if (selectedCategory.length > 0) {
                        category = selectedCategory[0].id;
                    }

                    let firstSubCategory;
                    if (selectedSubCategory.length > 0) {
                        firstSubCategory = selectedSubCategory[0];
                    }

                    createQuery.mutateAsync({
                        title: title,
                        shortDescription: shortDescription,
                        description: description,
                        tags: tags.split(","),
                        subCategories: firstSubCategory?.map((item: any) => item.id) ?? [],
                        category: category ?? null,
                        media: selectedMedia.map((item: Media) => item.id) ?? [],
                        id: id,

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
                    <Input id="title" type="text" placeholder={"Enter Article Title"}
                           value={title}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   setTitle(e.target.value);
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
                    <Input id="shortDesc" type="text" placeholder={"Enter Short Description"}
                           value={shortDescription}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   setShortDescription(e.target.value);
                               }
                           }/>
                    {shortDescriptionError && (

                        <FormErrorMessage>Short Description is required.</FormErrorMessage>

                    )}
                </FormControl>


                <FormControl isInvalid={descriptionError} pb={5}>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Textarea id="desc" placeholder={"Enter Description"}
                              value={description}
                              onChange={
                                  (e) => {
                                      // setName(e.target.value)
                                      setDescription(e.target.value);
                                  }
                              }/>
                    {descriptionError && (

                        <FormErrorMessage>Description is required.</FormErrorMessage>

                    )}
                </FormControl>
                <FormControl isInvalid={tagsError} pb={5}>
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <Input id="tags" type="name" placeholder={"Enter Tags"}
                           value={tags}
                           onChange={
                               (e) => {
                                   // setName(e.target.value)
                                   setTags(e.target.value);
                               }
                           }/>
                    {tagsError && (

                        <FormErrorMessage>Tags is required.</FormErrorMessage>

                    )}
                </FormControl>

                <FormLabel>
                    Categories
                </FormLabel>

                <HStack spacing={4} pb={5} overflowX={"scroll"}>
                    ...{selectedCategory.map((category: Category, idx: number) => {
                        return (
                            <Tag p={"2"} m={"1"} variant='outline' key={category.id}>
                                <TagLabel>
                                    {category.name}
                                </TagLabel>
                                <TagRightIcon as={MdClear} onClick={
                                    () => {
                                        setSelectedCategory(selectedCategory.filter((item: any) => item.id !== category.id));

                                        //remove at  idx
                                        selectedSubCategory.splice(idx, 1);
                                        setSubSelectedCategory(
                                            selectedSubCategory
                                        )
                                    }
                                }/>
                            </Tag>
                        )
                    }
                )}
                    <CategoriesComponent onChange={
                        (e: any) => {
                            if (selectedCategory.filter((item: any) => item.id === e.id).length > 0) {
                                return;
                            }
                            setSelectedCategory([
                                ...selectedCategory,
                                e,
                            ])
                            setSubSelectedCategory(
                                [...selectedSubCategory, []]
                            )
                        }
                    } letAdd={
                        selectedCategory.length < 1
                    }/>

                </HStack>


                <FormLabel>
                    Sub Categories
                </FormLabel>

                {
                    selectedCategory.length < 1 && (
                        <>
                            Select a category to add sub categories
                        </>
                    )
                }

                {selectedCategory.map((category: Category, idx: number) => {
                        return (

                            <HStack spacing={4} pb={5} overflowX={"scroll"} key={category.id}>
                                   <span>
                                   {
                                       selectedCategory[idx].name
                                   }:
                               </span>
                                ...{selectedSubCategory[idx].map((category: any) => {
                                    return (
                                        <Tag p={"2"} m={"1"} variant='outline' key={category.id}>
                                            <TagLabel>
                                                {category.name}
                                            </TagLabel>
                                            <TagRightIcon as={MdClear} onClick={
                                                () => {

                                                    selectedSubCategory[idx] = selectedSubCategory[idx].filter((item: any) => item.id !== category.id);
                                                    setSubSelectedCategory(
                                                        [
                                                            ...selectedSubCategory
                                                        ]
                                                    );

                                                }
                                            }/>
                                        </Tag>
                                    )
                                }
                            )}
                                <CategoriesComponent onChange={
                                    (e: any) => {
                                        let sub = selectedSubCategory[idx];
                                        if (sub.filter((item: any) => item.id === e.id).length > 0) {
                                            return;
                                        }
                                        sub.push(e);
                                        setSubSelectedCategory(
                                            [...selectedSubCategory]
                                        )
                                    }
                                } parent={category.id}
                                />

                            </HStack>
                        )
                    }
                )}


                <FormLabel>
                    Media
                </FormLabel>

                <MediaPickerPopUp
                    selectedMedia={selectedMedia}
                    setSelectedMedia={setSelectedMedia}
                />

                <Flex pt={"4"} justifyContent={"center"}>
                    {createButtonBloc()}
                </Flex>
            </Box>
        </Card>
    );
}
export default CreateArticlesPage;

const CategoriesComponent = (
    {
        onChange,
        parent,
        letAdd = true
    }: Props
) => {
    const [isEditing, setIsEditing] = useBoolean()
    const categoriesQuery = useCategories(parent);
    const handleChange = (e: Category) => {
        // const {value} = e;
        onChange(e);

        // categoriesQuery.data?.forEach((category: Category) => {
        //         if (category.id === value) {
        //             return false;
        //         }
        //         return true;
        //     }
        // );
    };

    let options = (<>Error</>);

    if (categoriesQuery?.isLoading) {
        options = (
            <div>Loading</div>
        )
    } else if (categoriesQuery?.isSuccess) {

        options = (
            // <Select placeholder="Select Category" onChange={handleChange} value={-1}>
            //
            //     {categoriesQuery.data.map((category: Category) => {
            //         return (
            //             <option value={category.id}>{category.name}</option>
            //         )
            //     })}
            // </Select>
            <Popover
                isOpen={isEditing}
                onOpen={setIsEditing.on}
                onClose={setIsEditing.off}
                closeOnBlur={false}
            >
                <HStack>
                    {
                        letAdd && (
                            <PopoverTrigger>
                                <Tag p={"2"} m={"1"} variant='outline'>
                                    <TagLabel>Select</TagLabel>
                                    <TagRightIcon as={MdAdd}/>
                                </Tag>
                            </PopoverTrigger>
                        )
                    }

                </HStack>

                <PopoverContent>
                    <PopoverBody>
                        {categoriesQuery.data.length < 1 && (
                            <>
                                {parent !== null && parent !== undefined ? "No Sub Categories" : "No Categories"}
                            </>
                        )
                        }
                        {categoriesQuery.data.map((category: Category) => {
                            return (
                                <Tag key={category.id} p={"2"} m={"1"} variant='outline' onClick={
                                    () => {
                                        handleChange(category);
                                        setIsEditing.off();
                                    }
                                }>
                                    <TagLabel>
                                        {category.name}
                                    </TagLabel>
                                    <TagRightIcon as={MdAdd}/>

                                </Tag>
                            )
                        })}

                    </PopoverBody>
                </PopoverContent>
            </Popover>

        )
    } else {
        options = (
            <div>Error Loading Categories
                <span
                    onClick={
                        () => {
                            categoriesQuery.refetch();
                        }
                    }
                    color={"blue"}
                > Retry</span>
            </div>
        )
    }


    return (
        <>
            {options}
        </>
    )
};


