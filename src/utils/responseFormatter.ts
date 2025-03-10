export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;

}

export const responseFormatter = <T>(status: boolean, message: string, data: T): ApiResponse<T> => {
    return {
        status,
        message,
        data
    }
}