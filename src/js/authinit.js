//import { sign, verify } from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken'
export function generateToken(payload, key) {
    var token = jsonwebtoken.sign(payload, key)
    
    return token;
}
export function verifyToken(token, key) {
    var decoded = jsonwebtoken.verify(token, key);
    return decoded;

}
//debug log console.log({token:generateToken("kabecha","1234"),payload:verifyToken(generateToken("kabecha","1234"),"1234")})