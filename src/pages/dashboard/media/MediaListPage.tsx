import React from "react";
import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader, Text,
    Flex,
    Grid,
    GridItem,
    Image, SimpleGrid,
    Spacer,
    useDisclosure, CardFooter
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import {useDeleteMedia, useMediaList} from "./MediaQueries";
import {BiTrash} from "react-icons/bi";


function DeleteMedia({id}: { id: string }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef<any>();


    const deleteMutation = useDeleteMedia();

    if (deleteMutation.isLoading) {
        return (
            <Button variant='ghost' colorScheme={"red"} leftIcon={<BiTrash/>} isLoading={true}>
                Delete
            </Button>
        )
    }

    return (
        <>

            <Button variant='ghost' colorScheme={"red"} leftIcon={<BiTrash/>}
                    onClick={onOpen}
            >
                Delete
            </Button>
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
                            Are you sure you want to delete this media?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} variant='ghost'>
                                Cancel
                            </Button>

                            <Button variant='ghost' colorScheme={"red"} leftIcon={<BiTrash/>}
                                    onClick={() => {
                                        onClose();
                                        deleteMutation.mutateAsync(id);
                                    }}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export const MediaListPage = () => {


    const mediaQuery = useMediaList();

    return (
        <Card>
            <Flex p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Media
                </Box>
                <Spacer/>

                <Link to={"/medias/create/"}>
                    <Button><AddIcon mr={"3"}></AddIcon>Create</Button>
                </Link>
            </Flex>

            <SimpleGrid minChildWidth='200px' spacing='20px' p={"6"}>
                {mediaQuery.data && (mediaQuery.data).map((media: any) => {
                        return (
                            <GridItem key={media.id}>
                                <Card maxW='sm'>
                                    <CardHeader>
                                        <Image
                                            height={"150px"}
                                            width={"100%"}
                                            objectFit='contain'
                                            src={'https://sagar-blog-bucket.s3.ap-south-1.amazonaws.com/' + media.fullName}
                                            alt='Chakra UI'
                                        />
                                    </CardHeader>
                                    <CardBody py={2}>
                                        <Text minHeight={35}
                                              maxHeight={35}
                                        >
                                            {media.originalName}
                                        </Text>
                                    </CardBody>

                                    <CardFooter justify='right' p={2}>
                                        <DeleteMedia id={media.id}/>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        )
                    }
                )}
            </SimpleGrid>

        </Card>
    );
};
