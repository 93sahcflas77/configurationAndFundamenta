const express = require("express");
const crypto = require("crypto");
const { buffer } = require("stream/consumers");
const app = express();
const PORT = 3000

// hashing
const hashing = crypto.createHash('sha256').update("password").digest("hex");
// console.log(hashing)

const sercetKey = "chandan"
const hamc = crypto.createHmac("sha256", sercetKey).update("paswword jss").digest("hex");
// console.log(hamc);


// generate random (token, OTP)
const OTPHashing = crypto.randomBytes(16).toString("hex");
// console.log(OTPHashing);

const OTP = crypto.randomInt(1000, 9999);
// console.log(OTP)

const UUID = crypto.randomUUID();
// console.log(UUID)


// Encryption/Decryption
const algorithm = "aes-256-gcm";
const key = crypto.randomBytes(32)
const vi = crypto.randomBytes(16)
const aad = Buffer.from('user-id-101');
const cipher = crypto.createCipheriv(algorithm, key, vi);
cipher.setAAD(aad);

const data = "my name is chandan thakur and age 24"
let encrypted = cipher.update(data, "utf8", "hex")
encrypted += cipher.final("hex");
const authTag = cipher.getAuthTag();

// console.log(`${encrypted}`)

const decipher = crypto.createDecipheriv(algorithm, key, vi);
decipher.setAAD(aad);
decipher.setAuthTag(authTag)
let decrypted = decipher.update(encrypted, "hex", "utf8")
decrypted += decipher.final("utf8")
// console.log(`${decrypted}`)


// password hash and verfiy password
const password = "chafgfgfj12@thakur";
const salt = crypto.randomBytes(16).toString("hex")
// crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
// 	if (err) throw err;

// 	console.log("Salt:");
// 	console.log(salt);

// 	console.log("\nHash:");

// 	console.log(
// 		derivedKey.toString("hex")
// 	);
// });

const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
// console.log(`hash password: ${hash}`);

const enterPassword = "chafgfgfj12@thakur";
const verfiyHash = crypto.pbkdf2Sync(enterPassword, salt, 100000, 64, "sha512").toString("hex");
// console.log(verfiyHash);

// if(verfiyHash ===hash){
// 	console.log("Password Correct")
// }


// Generates: Public Key  Private Key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 2048,
	// publicKeyEncoding: {
	// 	type: 'spki',
	// 	format: 'pem',
	// },
	// privateKeyEncoding: {
	// 	type: 'pkcs8',
	// 	format: 'pem',
	// },
})
// console.log(publicKey);
// console.log(privateKey);


// Digital Signature
const data1 = "Transfer ₹5000 to account 101";

const sign = crypto.createSign("SHA256");
sign.update(data1);
sign.end()
const signature  = sign.sign(privateKey, "hex");
// console.log(signature);

const verfiy = crypto.createVerify("SHA256");
verfiy.update(data1);
verfiy.end()
const isValid = verfiy.verify(publicKey, signature, "hex")
// console.log(isValid);


// RSA Encryption & Decryption

const message = "My ATM PIN is 1234"

// publicEncrypt() + privateDecrypt()
// const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(message))
// console.log(  'Encrypted:\n',  encryptedData.toString('hex'));

// const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
// console.log(   '\nDecrypted:\n',   decryptedData.toString());

// privateEncrypt() + publicDecrypt()
const encryptedData = crypto.privateEncrypt(privateKey, Buffer.from(message));
console.log(  'Encrypted:\n',  encryptedData.toString('hex'));

const decryptedData = crypto.publicDecrypt(publicKey, encryptedData);
console.log(   '\nDecrypted:\n',   decryptedData.toString());

app.get("/", (req, res) => {
	res.json({ message: "ok" })
})

app.listen(PORT, () => {
	console.log("Server is runing in port 3000")
})
