import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuardComponent = (props: AuthGuardProps) => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to={"/login"}/>;
    }

    return <React.Fragment>{props.component}</React.Fragment>; // You can use an empty JSX fragment shorthand
}

export default AuthGuardComponent;


