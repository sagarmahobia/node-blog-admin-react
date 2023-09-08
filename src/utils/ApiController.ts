// import {action, computed, observable, runInAction} from 'mobx';
// import {
//     NetworkState,
//     NetworkStateError,
//     NetworkStateInitial,
//     NetworkStatePending,
//     NetworkStateSuccess
// } from "./StateWrapper";
//
//
// abstract class ApiWrapper<InputType, ResponseType> {
//
//     @observable response: NetworkState = new NetworkStateInitial();
//
//     @action
//     fetchData = async (input: InputType) => {
//         try {
//             this.response = new NetworkStatePending();
//             const response = await this.getPromise(input);
//             runInAction(() => {
//                     if (response.data.success) {
//                         this.postSuccess(response.data);
//                         this.response = new NetworkStateSuccess<ResponseType>(response.data);
//                     } else {
//                         this.response = new NetworkStateError(null, response.data.message);
//                     }
//                 }
//             );
//
//         } catch (error) {
//             this.response = new NetworkStateError(error, "Something went wrong");
//         }
//     };
//
//     @computed get isSuccess() {
//         return this.response instanceof NetworkStateSuccess;
//     }
//
//     @computed get isError() {
//         return this.response instanceof NetworkStateError;
//     }
//
//     @computed get isLoading() {
//         return this.response instanceof NetworkStatePending;
//     }
//
//     @computed get data() {
//         if (this.isSuccess) {
//             const response = this.response as NetworkStateSuccess<any>
//             return response.data;
//         }
//         return null;
//     }
//
//     @computed get error() {
//         if (this.isError) {
//             const response = this.response as NetworkStateError;
//             return response.error;
//         }
//
//         return null;
//     }
//
//
//     abstract getPromise(input: InputType): Promise<any>;
//
//     postSuccess(data: ResponseType) {
//
//     }
//
//     reset() {
//         runInAction(
//             () => {
//                 this.response = new NetworkStateInitial();
//             }
//         )
//     }
// }
class ApiWrapper {
}

export default ApiWrapper;


