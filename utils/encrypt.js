import CryptoJS from 'crypto-js'
import pako from 'pako'
import {
	key
} from '@/static/config.js'

const KEY = CryptoJS.enc.Hex.parse(key);
const encrypted = (data, url) => {
	if (url == 'productList' && typeof data == 'string' && data.includes('type'))
		data.replaceAll('%2C', ',')
	else
		data = JSON.stringify(data)
	const rs = CryptoJS.AES.encrypt(data, KEY, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	}).toString()

	return btoa(rs)
}

const decrypted = (data) => {
	let rs = CryptoJS.AES.decrypt(data, KEY, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});
	return JSON.parse(rs.toString(CryptoJS.enc.Utf8))
}

const unzip = (data) => {
	// console.log(data)
	var uint8Array = new Uint8Array(Array.from(atob(data), char => char.charCodeAt(0)));
	var inflatedData = pako.inflateRaw(uint8Array, {
		to: 'string'
	});
	// 显示解压缩后的数据
	return inflatedData
}
export {
	encrypted,
	decrypted,
	unzip
}