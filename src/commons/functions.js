import * as EmailValidator from 'email-validator';

export default {
    isValidEmail(email) {
        return EmailValidator.validate(email);
    }
}