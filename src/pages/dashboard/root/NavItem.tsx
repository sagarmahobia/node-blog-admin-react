import {Box, Flex, FlexProps, Icon} from "@chakra-ui/react";
import React from "react";
import {IconType} from "react-icons";
interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}
const NavItem = ({icon, children, ...rest}: NavItemProps) => {
    return (
        <Box
            style={{textDecoration: 'none'}}
            _focus={{boxShadow: 'none'}}>
            <Flex
                align="center" px="4" py="2" my="2" mx="4" borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'teal.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

export default NavItem;
