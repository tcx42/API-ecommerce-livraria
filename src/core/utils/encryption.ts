import { pbkdf2Sync, randomBytes } from "node:crypto";

const saltSize = 16;
const iterations = 1000;
const keylen = 64;
const digest = "sha512";

export default class Encryption {
    static hashPassword(password: string) {
        const salt = randomBytes(saltSize).toString("hex");
        const hash = pbkdf2Sync(
            password,
            salt,
            iterations,
            keylen,
            digest
        ).toString("hex");
        return `${salt}:${hash}`;
    }

    static isPasswordValid(password: string, storedHash: string) {
        const [salt, hash] = storedHash.split(":");
        return (
            hash ===
            pbkdf2Sync(password, salt, iterations, keylen, digest).toString(
                "hex"
            )
        );
    }
}
