import React, {useEffect} from 'react';
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useLogin} from "./LoginQueries";

interface LoginState {
    email: string;
    password: string;
}

// child component with a mathrandom text


const LoginComponent = () => {

    const state = React.useRef<LoginState>({} as LoginState);
    const navigate = useNavigate();

    // const cubit = LoginCubit.ctx.useCubitContext();

    const loginQuery = useLogin(
        () => {
            navigate("/");
        }
    );

    useEffect(
        () => {
            if (localStorage.getItem("token") != null) {
                navigate("/")
            }
        }, []
    )

    const loginButtonBloc = () => {

        if (loginQuery?.isLoading) {
            return (
                <Button isLoading={true} loadingText={"Signing in..."}>Sign in</Button>
            )
        }

        return (
            <Button onClick={
                () => {
                    loginQuery?.mutateAsync(
                        {
                            email: state.current.email,
                            password: state.current.password
                        }
                    );
                }
            }>Sign in</Button>
        )
    };

    return (

        <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"} bg={"gray.100"}>

            <Box py={'8'} px={'8'} boxShadow={'md'} borderRadius={'md'} bg={"white"}>

                <Stack spacing="6" align={"center"}>
                    <Heading size={{base: 'xs', md: 'sm'}}>Admin Panel Login</Heading>

                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="email" onChange={
                                (e) => {
                                    state.current.email = e.target.value;
                                }
                            }/>
                        </FormControl>


                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password"
                                   onChange={
                                       (e) => {
                                           state.current.password = e.target.value;
                                       }
                                   }
                            />
                        </FormControl>

                    </Stack>
                    {loginButtonBloc()}
                </Stack>
            </Box>

        </Flex>

    );
};

export default LoginComponent;
