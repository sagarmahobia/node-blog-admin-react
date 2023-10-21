import { Box, Button, Card, Flex, FormControl, FormLabel, Heading, Image, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUploadMedia } from "./MediaQueries";

export const CreateMedia = () => {

    const controls = useAnimation();
    const [file, setFile] = useState<File>()
    const navigate = useNavigate();
    const createMutation = useUploadMedia(
        () => {
            navigate("/medias");
        }
    );
    const createButtonBloc = () => {

        if (createMutation?.isLoading) {
            return (
                <Button isLoading={true}
                    width={"100vw"}
                    mt={"5"}
                    loadingText={"Creating..."}>Create Media</Button>
            );
        }
        return (
            <Button width={"100vw"} mt={"5"} onClick={
                () => {
                    if (file === undefined) {
                        return;
                    }
                    createMutation?.mutateAsync(file);
                }
            }>Create</Button>
        )
    }

    return (
        <Card>
            <Box p={'5'}>
                <Box fontSize={"24"} fontWeight={"bold"}>
                    Create Media
                </Box>
                <Box py={"20"}>
                    <FormControl>
                        <FormLabel htmlFor="name">
                            <Flex justifyContent={"center"} border={"2px"} p={"10"} borderRadius={"5px"}
                                borderColor={"gray.200"} width={"300px"}>
                                {
                                    file ? (
                                        <Stack>
                                            <Image src={URL.createObjectURL(file)} />
                                        </Stack>

                                    ) : (
                                        <Heading size={"md"}>Select Image</Heading>
                                    )
                                }
                            </Flex>

                        </FormLabel>

                        <Input
                            type="file"
                            height="100%"
                            width="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity="0"
                            onChange={
                                (e) => {
                                    if (e.target.files) {
                                        setFile(e.target.files?.item(0) ?? undefined);
                                    }
                                }
                            }
                            aria-hidden="true"
                            accept="image/*"
                        />

                    </FormControl>

                    <Flex pt={"4"} justifyContent={"center"}>
                        {/* {createButtonBloc()} */}
                        <Button
                            width={"100vw"}
                            mt={"5"}
                            onClick={() => {
                                if (file === undefined) {
                                    return;
                                }
                                createMutation?.mutateAsync(file);
                            }}
                            isLoading={createMutation?.isLoading}
                            loadingText={"Creating..."}
                        >
                            {createMutation?.isLoading ? "Creating..." : "Create"}
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Card>
    );
};
