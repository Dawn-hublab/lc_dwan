import zhHans from './lang-encrypted/zh-Hans.json';
import zhHant from './lang-encrypted/zh-Hant.json';
import en from './lang-encrypted/en.json';
import ja from './lang-encrypted/ja.json';
import langZhHans from './lang/zh-Hans.json';
import langZhHant from './lang/zh-Hant.json';
import langEn from './lang/en.json';
import langJa from './lang/ja.json';
import {
	is_test
} from '@/static/config.js'
let zh ;
let zht ;
let en_lang;
let ja_lang;
if(is_test){
	zh = langZhHans
	zht = langZhHant
	en_lang = langEn
	ja_lang = langJa
}else{
	function decodeBase64(encodedText) {
		return decodeURIComponent(escape(atob(encodedText))); // 解码 Base64 并处理 UTF-8 字符
	}
	// 读取并解密语言包
	function loadLanguage(langPath) {
		let encryptedContent;
		switch (langPath) {
			case 'zh-Hant':
				encryptedContent = zhHant;
				break;
			case 'en':
				encryptedContent = en;
				break;
			case 'ja':
				encryptedContent = ja;
				break;
			default:
				encryptedContent = zhHans;
		}
		// 解码内容
		const decodedContent = decodeBase64(encryptedContent['content']);
		// 清理解码后的内容
		return JSON.parse(decodedContent);
	}
	
	console.log(loadLanguage('zh-Hans'),"222")
	// 加载解密后的语言包
			zh = loadLanguage('zh-Hans');
			 zht = loadLanguage('zh-Hant');
			 en_lang = loadLanguage('en');
			 ja_lang = loadLanguage('ja');
}

	export default {
		'en': en_lang,
		'zh-Hans': zh,
		'zh-Hant': zht,
		'ja': ja_lang
	}
