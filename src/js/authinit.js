import { sign, verify } from 'jsonwebtoken';

function generateToken(payload, key) {
    var token = sign(payload, key, {
        expiresIn: "2h",
    })
    return token;
}
function verifyToken(token, key) {
    var decoded = verify(token, key);
    return decoded;

}
export default { generateToken, verifyToken }