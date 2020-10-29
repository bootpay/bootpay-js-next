const AES = require('crypto-js/aes')
const Base64 = require('crypto-js/enc-base64')

export const encryptJSON = (data: any, key: string) => {
    const encrypted = AES.encrypt(JSON.stringify(data), key)
    return {
        data: encrypted.ciphertext.toString(Base64),
        session_key: `${encrypted.key.toString(Base64)}##${encrypted.iv.toString(Base64)}`
    }
}

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
        const r = Math.random() * 16 | 0
        const v = c == 'x' ? r : r & 0x3 | 0x8
        return v.toString(16)
    })
}