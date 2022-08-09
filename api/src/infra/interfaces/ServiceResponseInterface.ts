export default interface IServiceResponse {
    success: boolean;
    statusCode: number;
    description?: string;
    data?: object;
}