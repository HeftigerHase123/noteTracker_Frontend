export interface FieldValidationError {
    field: string;
    error: string;
}

export interface ApiError {
    status: number;
    message: string;
    fieldErrors: FieldValidationError[];
}