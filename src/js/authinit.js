//import { sign, verify } from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken'
export function generateToken(payload, key) {
    var token = jsonwebtoken.sign(payload, key, {
        expiresIn: "2h",
    })
    return token;
}
export function verifyToken(token, key) {
    var decoded = jsonwebtoken.verify(token, key);
    return decoded;

}
