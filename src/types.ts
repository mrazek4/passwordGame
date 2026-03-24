export interface PasswordData {
    password: string;
    createdAt: number | null;
}

export interface SequenceResult {
    isValid: boolean;
    count: number;
}

export interface TimeResult {
    isValid: boolean;
    seconds: number;
}