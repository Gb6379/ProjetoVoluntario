export class PasswordUtil {

    static REGEX_LOWER_CASE: RegExp = /[a-z]+/;
    static MIN_LENGTH: number = 10;
    static SPECIAL_CHARACTERS: string[] = [
        '$',
        '@',
        '£',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '+',
        '|',
        '~',
        '=',
        '`',
        '{',
        '}',
        '[',
        ']',
        ':',
        '"',
        ';',
        '\'',
        '<',
        '>',
        '?',
        ',',
        '.',
        '/',
        ' '
    ];

    static createPassword(): string {
        let password: string = '';

        // cria a senha
        while(!this.REGEX_LOWER_CASE.test(password)) {
            const min: number = 0.0000000000000001;
            password = ((Math.random() * 10000) + min).toString(36);
        }

        // 1 letra maiúscula
        password = password.replace(this.REGEX_LOWER_CASE, password.match(this.REGEX_LOWER_CASE)[0].toUpperCase());

        // 1 caractere especial
        const specialCharacter: string = this.SPECIAL_CHARACTERS[Math.floor(Math.random() * this.SPECIAL_CHARACTERS.length)];
        password = password.replace('.', specialCharacter);

        return password;
    }
}