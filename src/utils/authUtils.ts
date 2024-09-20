import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }

                resolve(hash);
            });
        });
    });
}

export function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}
