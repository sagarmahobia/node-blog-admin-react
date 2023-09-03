export interface GenericResponse<Type> {
    success: boolean,
    data: Type,
    message: string,
}
