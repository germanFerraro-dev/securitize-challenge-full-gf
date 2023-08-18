export interface ApiResponse {
    success: boolean;
    message: string;
    error?: {
        error: string;
        status: string
    }
}