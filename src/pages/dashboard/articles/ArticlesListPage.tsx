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
import {Link} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons";
import React from "react";
import {Article} from "../../../network/models/ResponseModels";
import {useArticles, useDeleteArticle} from "./ArticleQueris";

function DeleteArticle({id}: { id: string }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef<any>();


    const deleteMutation = useDeleteArticle();
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
                            Delete Article
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this Article?
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
const ArticlesListPage = () => {

    const articleListQuery = useArticles();
    
    var content = (<>Loading</>);

    if (articleListQuery?.isSuccess) {

        if (articleListQuery.data.length < 1) {
            content = (
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Box p={"5"} m={"10"} fontSize={"24"}>
                        No Articles
                    </Box>
                </Flex>
            );
        } else {
            content = (
                < >
                    {articleListQuery.data && (articleListQuery.data).map((article: Article) => {
                        return (
                            <Flex m={"5"} key={article.id}>
                                <Box fontSize={"24"} fontWeight={"normal"}>
                                    {article.title}
                                </Box>
                                <Spacer/>

                                <Link to={"/article/" + article.id}>
                                    <Button ml={"4"}>View</Button>
                                </Link>

                                <Link
                                    to={"/articles/update/" + article.id}>
                                    <Button ml={"4"}>Edit</Button>
                                </Link>
                                <DeleteArticle id={article.id}/>
                            </Flex>
                        )
                    })}
                </>
            );
        }
    } else if (articleListQuery?.isError) {
        content = (
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Box p={"5"} m={"10"}>
                    <>{articleListQuery?.error.message?? "Something went wrong"}</>
                </Box>
            </Flex>
        );
    } else {
        content = (
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Spinner p={"5"} m={"10"}></Spinner>
            </Flex>
        );
    }

    return (
        <Card p={'5'}>
            <Flex p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Articles
                </Box>
                <Spacer/>
                <Link to={"/articles/create/"}>
                    <Button><AddIcon mr={"3"}></AddIcon>Create</Button>
                </Link>
            </Flex>
            <Box>
                {content}
            </Box>
        </Card>
    );
}

export default ArticlesListPage;
