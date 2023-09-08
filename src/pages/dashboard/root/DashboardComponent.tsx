import React from 'react';
import PropTypes from 'prop-types';

import NavItem from "./NavItem";

import {
    Avatar,
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react'
import {FiBell, FiChevronDown, FiHome, FiImage, FiMenu,} from 'react-icons/fi'
import {IconType} from 'react-icons'
import {Link, Outlet} from "react-router-dom";
import MobileNav from "./MobileNav";

DashboardComponent.propTypes = {};

function DashboardComponent(props: PropTypes.InferProps<typeof DashboardComponent.propTypes>) {
    return (
        <SidebarWithHeader/>
    );
}

export default DashboardComponent;


interface LinkItemProps {
    name: string
    icon: IconType
}




interface SidebarProps extends BoxProps {
    onClose: () => void
}
const SidebarWithHeader = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{base: 'none', md: 'block'}}/>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                <Outlet/>
            </Box>
        </Box>
    )
}


const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontWeight="bold">
                    Blog Admin
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>

            <Link to={"/"} style={{textDecoration: 'none'}}
                  onClick={
                      onClose
                  }
            >
                <NavItem icon={FiHome}

                         onClick={
                             onClose
                         }>
                    Posts
                </NavItem>
            </Link>


            <Link to={"/categories"} style={{textDecoration: 'none'}}
                  onClick={
                      onClose
                  }>
                <NavItem icon={FiMenu}>Categories</NavItem>
            </Link>

            <Link to={"/medias"} style={{textDecoration: 'none'}}
                  onClick={
                      onClose
                  }>
                <NavItem icon={FiImage}>
                    Media
                </NavItem>
            </Link>

        </Box>
    )
}


