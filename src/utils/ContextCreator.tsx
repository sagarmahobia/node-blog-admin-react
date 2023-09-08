import React, {useContext} from "react";

// export class ContextCreator<T> {
//
//     context = React.createContext<T | undefined>(undefined);
//     useCubitContext = () => useContext(this.context);
//     withCubit = (Component: any, instance: T) => (props: any) => {
//         return (
//             <this.context.Provider value={instance}>
//                 <Component {...props}/>
//             </this.context.Provider>
//
//         )
//     }
// }

//
// export function chainCubits(element: any, cubits: {
//     ctx: ContextCreator<any>,
//     instance: any
// }[]) {
//
//     let currentElement = observer(element);
//
//     for (let i = 0; i < cubits.length; i++) {
//         currentElement = cubits[i].ctx.withCubit(currentElement, cubits[i].instance);
//     }
//
//     return currentElement;
// }


//const Test = LoginCubit.ctx.withCubit(()=>{
//     return (
//         <div>
//             Test
//         </div>
//     )
// }, new LoginCubit());

//snipped for re-usability
