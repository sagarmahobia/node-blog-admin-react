import {
    Avatar,
    Box,
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {FiBell, FiChevronDown, FiMenu} from "react-icons/fi";
import React from "react";

interface MobileProps extends FlexProps {
    onOpen: () => void,
}

const MobileNav = ({onOpen, ...rest}: MobileProps) => {

    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontWeight="bold">
                Blog Admin
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                {/*<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell/>}/>*/}
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Admin</Text>

                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            {/*<MenuItem>Profile</MenuItem>*/}
                            {/*<MenuItem>Settings</MenuItem>*/}
                            {/*<MenuItem>Billing</MenuItem>*/}
                            {/*<MenuDivider/>*/}
                            <MenuItem onClick={
                                () => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }
                            }>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default MobileNav;
