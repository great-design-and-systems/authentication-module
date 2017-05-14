import passwordHash from 'password-hash';

const PASSWORD_ALGO = process.env.PASSWORD_ALGO;
const PASSWORD_SALT_LENGTH = process.env.PASSWORD_SALT_LENGTH;
const PASSWORD_ITERATIONS = process.env.PASSWORD_ITERATIONS || 1;

export default class HashPassword {
    constructor(password) {
        this.hashedPassword = passwordHash.generate(password, getOptions());
    }

    getHashed() {
        return this.hashedPassword;
    }
}
function getOptions() {
    let options = {};
    if (PASSWORD_ALGO) {
        options.algorithm = PASSWORD_ALGO;
    }
    if (PASSWORD_SALT_LENGTH) {
        options.saltLength = PASSWORD_SALT_LENGTH;
    }
    if (PASSWORD_ITERATIONS) {
        options.iterations = PASSWORD_ITERATIONS;
    }
}