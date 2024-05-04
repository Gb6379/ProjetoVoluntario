export class StringUtil {
    static getUsernameFromEmail(email: string): string {
        const atIndex = email.indexOf('@');
        if (atIndex !== -1) {
            return email.substring(0, atIndex);
        } else {
            throw new Error('Invalid email format');
        }
    }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    static generateRandomRegistrationNumber(): string {
        const usedRegistrationNumbers = new Set<string>();
        let randomSuffix = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        let registrationNumber = `REG-${randomSuffix}`;
    
        while (usedRegistrationNumbers.has(registrationNumber)) {
            randomSuffix = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
            registrationNumber = `REG-${randomSuffix}`;
        }
    
        usedRegistrationNumbers.add(registrationNumber);
        return registrationNumber;
    }
    
    
}