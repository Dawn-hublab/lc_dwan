const fs = require('fs');
const path = require('path');

const langDir = './locale/lang'; // 原始多语言文件目录
const outputDir = './locale/lang-encrypted'; // 加密后的输出目录

function encodeBase64(text) {
	return Buffer.from(text, 'utf8').toString('base64');
}

// 递归遍历目录并编码文件
function processDirectory(directory, outputBase) {
	if (!fs.existsSync(outputBase)) {
		fs.mkdirSync(outputBase, {
			recursive: true
		});
	}

	fs.readdir(directory, (err, files) => {
		if (err) {
			console.error(`Error reading directory ${directory}:`, err);
			return;
		}

		files.forEach(file => {
			const filePath = path.join(directory, file);
			const outPath = path.join(outputBase, file);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error(`Error stating file ${filePath}:`, err);
					return;
				}

				if (stats.isDirectory()) {
					// 递归处理子目录
					processDirectory(filePath, outPath);
				} else if (stats.isFile() && path.extname(file) === '.json') {
					// 读取文件内容
					fs.readFile(filePath, 'utf8', (err, content) => {
						if (err) {
							console.error(`Error reading file ${filePath}:`, err);
							return;
						}
						try {
							// Base64 编码内容
							const encodedContent = encodeBase64(content);
							// 以模块形式导出编码后的内容
							const moduleContent = `{"content":"${encodedContent}"}`;
							// 保存编码后的内容
							fs.writeFile(outPath, moduleContent, 'utf8', (err) => {
								if (err) {
									console.error(
										`Error writing file ${outPath}:`,
										err);
								} else {
									console.log(
										`Encoded: ${filePath} -> ${outPath}`
									);
								}
							});
						} catch (err) {
							console.error(`Error encoding content from ${filePath}:`,
								err);
						}
					});
				}
			});
		});
	});
}

// 开始处理主目录
processDirectory(langDir, outputDir);