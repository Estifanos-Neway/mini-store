import * as EmailValidator from 'email-validator';
import ValidationResult from '../types/validation-result';

const minPasswordLength: number = 6
export default {
    isValidEmail(email: string): ValidationResult {
        const result: ValidationResult = {
            isValid: true,
            message: ""
        }
        if (!EmailValidator.validate(email)) {
            result.isValid = false
            result.message = "Invalid email"
        }
        return result
    },
    isValidPassword(password: string): ValidationResult {
        const result: ValidationResult = {
            isValid: true,
            message: ""
        }
        if (password.length < minPasswordLength) {
            result.isValid = false
            result.message = `Password must be at least ${minPasswordLength} letters`
        }
        return result
    }
}