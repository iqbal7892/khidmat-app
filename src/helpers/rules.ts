export function emailValidator(email: string) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email can't be empty."
    if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
}

export function nameValidator(name: string) {
    if (!name) return "Name can't be empty."
    return ''
}

export function passwordValidator(password: string) {
    if (!password) return "Password can't be empty."
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    return ''
}


export class Rules {
    public static Email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    public static Password = '(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$';
    // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" // '.{8,50}';
    public static Code = '[0-9]{6,6}';
    public static CodeMaxLength = 6;
    public static Phone = '[0-9]{7,15}';
    public static PhoneMaxLength = 15;
    public static AntiPhishingcode = '^([0-9a-zA-Z]{4,16})$';
    public static ZipCode = '^(?=.{4,16}$)(?!.*[.!@()+&{}^%$#><:"|,?])[\\s\\S]+(?<![.!@()+&{}^%$#><:"|,?])$';
    public static Street = '^(?=.{5,150}$)(?!.*[_.!@()+&{}^%$><:"|?])[\\s\\S]+(?<![_.!@()+&{}^%$><:"|?])$';
}

  