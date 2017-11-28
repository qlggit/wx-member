var path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var moment = require("moment");
var package = require('./package.json');

// 构建名称
var archiveFilePath = path.join(__dirname, package.name + '-' + package.version + '-' + moment().format("YYYYMMDDHHmmss") + '.zip');
	// 设置打包路径
	var output = fs.createWriteStream(archiveFilePath);
	// 打包成zip
	var zipArchive = archiver('zip');
	zipArchive.pipe(output);

	//设置打包文件
	var zipList=['app.js','package.json', 'config/**', 'controller/**', 'models/**',  'dist/**'];
	zipArchive.bulk([
		{ src: zipList}
	]);
	zipArchive.finalize();
	console.log('打包路径：%s', archiveFilePath);
