import {
    AbsoluteCenter,
    Box,
    Button, Card, CardBody, CardHeader, Checkbox, Circle, Flex, Grid, GridItem, HStack, Image,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup, SimpleGrid,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useMediaList} from "./MediaQueries";
import {Media} from "../../../network/models/ResponseModels";
import {CardFooter} from "@chakra-ui/react";
import {AddIcon, CheckIcon} from "@chakra-ui/icons";
import {CiSquareRemove} from "react-icons/ci";

function MediaPickerPopUp(
    {
        selectedMedia,
        setSelectedMedia
    }
) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const mediaQuery = useMediaList();

    const btnRef = React.useRef(null)

    const [mediaList, setMediaList] = useState<Media[]>([]);


    const images = selectedMedia && selectedMedia.map((media) => {
        return (

            <Box
                key={media.id}
                p={"0"}
                m={"2"}
                border={"4px"}
                borderColor={"teal.400"}
                overflow="hidden"
                borderRadius="10%"
            >
                <Image
                    p={0}
                    m={0}
                    height={"100px"}
                    width={"100px"}
                    objectFit='cover'
                    src={'https://sagar-blog-bucket.s3.ap-south-1.amazonaws.com/' + media.fullName}
                    alt='Chakra UI'
                />
            </Box>

        )
    });

    // append add image button if less than 5 images
    if (images) {
        images.push(
            <Box
                key={"add-image"}
                p={"12"}
                m={"2"}
                border={"4px"}
                borderColor={"teal.400"}
                overflow="hidden"
                width={"100px"}
                height={"100px"}
                borderRadius="10%"
                position={"relative"}
                ref={btnRef}
                onClick={
                    () => {
                        onOpen();
                        setMediaList(selectedMedia);
                    }
                }
            >
                <AbsoluteCenter>
                    <AddIcon boxSize={"50px"} color={"teal.500"}/>
                </AbsoluteCenter>

            </Box>
        )
    }


    return (
        <>

            <Flex wrap={"wrap"}>
                {images}
            </Flex>

            <Modal
                size={"6xl"}
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior={"inside"}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Select Media</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <SimpleGrid minChildWidth='200px' spacing='20px' p={"6"}>
                            {mediaQuery.data && (mediaQuery.data).map((media: any) => {
                                //check by id
                                    const isSelected = mediaList.find((sm) => sm.id === media.id) !== undefined;

                                    return (
                                        <GridItem key={media.id}>
                                            <Card onClick={
                                                () => {
                                                    if (isSelected) {
                                                        setMediaList(mediaList.filter((sm) => sm.id !== media.id));
                                                    } else {
                                                        setMediaList([...mediaList, media]);
                                                    }
                                                }
                                            }>
                                                <CardHeader>
                                                    <Box height={"150px"} position={"relative"}>
                                                        <Image
                                                            height={"150px"}
                                                            width={"100%"}
                                                            objectFit='cover'
                                                            src={'https://sagar-blog-bucket.s3.ap-south-1.amazonaws.com/' + media.fullName}
                                                            alt='Chakra UI'
                                                        />
                                                        <AbsoluteCenter>
                                                            {
                                                                isSelected ? (
                                                                    <Circle size={"70px"} bg={"blackAlpha.700"}>
                                                                        <CheckIcon color={"white"} boxSize={"25px"}/>
                                                                    </Circle>
                                                                ) : (
                                                                    <></>
                                                                )
                                                            }
                                                        </AbsoluteCenter>
                                                    </Box>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text minHeight={35}
                                                          maxHeight={35}>
                                                        {media.originalName}
                                                    </Text>
                                                </CardBody>

                                                <CardFooter justify='right' p={2}>


                                                    {/*<Checkbox isChecked={isSelected}/>*/}


                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    )
                                }
                            )}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={
                            () => {
                                onClose();
                                setSelectedMedia(mediaList);
                            }
                        }>
                            {mediaList.length > 0 ? "Select" : "Cancel"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default MediaPickerPopUp;
