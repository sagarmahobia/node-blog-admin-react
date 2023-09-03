import {Box, Button, Card, Flex, Spacer, Spinner} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons";
import React, {useEffect} from "react";
import {Article, ListArticlesCubit} from "./ArticlesController";
import {Category} from "../categories/CategoriesCubits";
import {observer} from "mobx-react";

const ArticlesListPage = () => {

    const cubit: ListArticlesCubit | undefined = ListArticlesCubit.ctx.useCubitContext();

    useEffect(
        () => {
            cubit?.fetchData("");
            console.log("fetching");
        }, []
    );

    var content = (<>Loading</>);

    if (cubit?.isLoading) {

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
                        No Articles
                    </Box>
                </Flex>
            );
        } else {
            content = (
                < >
                    {cubit.data.data && (cubit.data.data).map((article: Article) => {
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
                                    to={"/article/update/" + article.id}>
                                    <Button ml={"4"}>Edit</Button>
                                </Link>
                                {/*<DeleteCategory id={category.id}/>*/}
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

export default ListArticlesCubit.ctx.withCubit(
    observer(ArticlesListPage),
    new ListArticlesCubit()
);
