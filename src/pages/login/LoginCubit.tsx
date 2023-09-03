import ApiWrapper from "../../utils/ApiController";
import {makeObservable} from "mobx";
import {login} from "../../network/NetworkService";
import {ContextCreator} from "../../utils/ContextCreator";

export class LoginCubit extends ApiWrapper<{ email: string, password: string }, any> {

    constructor() {
        super();
        makeObservable(this);
    }

    getPromise(input: { email: string, password: string }): Promise<any> {
        return login(input.email, input.password);
    }

    postSuccess(data: any): void {
        localStorage.setItem("token", data.data.token);
    }

    static ctx = new ContextCreator<LoginCubit>();

}

