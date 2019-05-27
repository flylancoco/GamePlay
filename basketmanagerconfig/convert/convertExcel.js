var fs = require('fs')
var path = require('path')
var xlsx = require('xlsx')
var workbook
var sheetNames
var dirOutPath = 'E:/GameplayFramework/basketmanagerconfig/output'
var excelFilePath = 'E:/GameplayFramework/basketmanagerconfig/'
function getLastChar(str) {
	let len = str.length
	if (!len || len < 1) {
		return -1
	}
	for (let i = len - 1; i >= 0; --i) {
		let ch = str[i]
		if ((ch >= 'a' && ch <= 'z')
			|| (ch >= 'A' && ch <= 'Z')) {
			return i
		}
	}

	return -1
}


function clearDir(dir) {
	if (fs.existsSync(dir)) {
		fs.readdirSync(dir).forEach((file) => {
			let curPath = path.join(dir, file);
			if (fs.statSync(curPath).isDirectory()) {
				clearDir(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
	}
}

let Class = {
	keys: [],
}

function loadExcelFile(workbookArg, sheetname) {
	let worksheet = workbookArg.Sheets[sheetname];
	Class = {
		keys: [],
	}
	for (z in worksheet) {
		if (z[0] === '!') {
			delete worksheet[z]
			continue
		}
		let lastChar = getLastChar(z)
		if (lastChar == -1) {
			console.log('error data', sheetname)
		}
		let row = parseInt(z.substring(lastChar + 1), 10)
		let value = worksheet[z].v;
		if (row == 1) {
			let ls = value.indexOf('[')
			let le = value.indexOf(']')
			let oclient = false
			let oserver = false
			if (ls != -1 && le != -1 && le > ls + 1) {
				let s = value.substring(ls + 1, le)
				value = value.substring(0, ls)
				for (let i = 0; i < s.length; i++) {
					if (s[i] == 'c') {
						oclient = true
					} else if (s[i] == 's') {
						oserver = true
					}
				}
			}
			Class.keys.push({ name: value, outputclient: oclient, outputserver: oserver })
			delete worksheet[z];
		} else {
			break
		}
	}
}
function getObj(values) {
	let cobj = {}
	let sobj = {}
	for (let i = 0; i < values.length; i++) {
		if (Class.keys[i].outputclient) {
			cobj[Class.keys[i].name] = values[i]
		}
		if (Class.keys[i].outputserver) {
			sobj[Class.keys[i].name] = values[i]
		}
	}
	return {
		c: cobj,
		s: sobj,
	}
}
function creatObj(workbookArg, sheetname) {
	let worksheet = workbookArg.Sheets[sheetname]
	let cobjlist = []
	let sobjlist = []
	let currentrow = 2
	let values = []
	for (let z in worksheet) {
		if (z[0] === '!') {
			// 处理最后一行
			if (values.length > 0) {
				if (Class.keys.length != values.length) throw new Error(`Error: Excal Name: ${z[0]} at Line :最后一行`)
				let obj = getObj(values)
				cobjlist.push(obj.c)
				sobjlist.push(obj.s)
				values = []
			}
			continue
		}
		let lastChar = getLastChar(z)
		if (lastChar == -1) {
			console.log('error data', sheetname)
		}
		let row = parseInt(z.substring(lastChar + 1), 10)
		if (row != currentrow) {
			currentrow = row
			if (Class.keys.length != values.length) throw new Error(`Error: Excal Name: ${z[0]} at Line :${row}`)
			let obj = getObj(values)
			cobjlist.push(obj.c)
			sobjlist.push(obj.s)
			values = []
		}
		let value = worksheet[z].v;
		values.push(value)
	}
	return {
		jsobj: cobjlist,
		csvobj: sobjlist,
	}
}
function saveToClientJSFile(jsobj, filename, configData) {
	let s = ''
	for (let i = 0; i < jsobj.length; i++) {
		s += '\n\t\t{'
		for (let j in jsobj[i]) {
			s += '\n\t\t\t'
			let value = jsobj[i][j]
			if (typeof value == 'string' && value != 'false' && value != 'true') {
				value = `'${jsobj[i][j]}'`
			}
			s += `${j}: ${value},`
		}
		s += '\n\t\t},'
	}

	let index = filename.indexOf('Object')
	if (index != -1) {
		filename = filename.slice(0, index)
		return `${configData}\t${filename}:${s}\n`
	}
	return `${configData}\t${filename}: [${s}\n\t],\n`
}

function saveClassTSFile(jsobj, filename, TStsr) {
	let index = filename.indexOf('Object')
	if (index >= 0) {
		filename = filename.slice(0, index)
	}
	let s = `export class ${filename}`
	s += '\n{\n'
	for (let j in jsobj[0]) {
		s += `\tpublic ${j}: ${typeof jsobj[0][j]};\n`
	}
	s += '}\n'
	TStsr += s
	return TStsr
}

function saveConfigTSFile(jsobj, filename, TStsr) {
	var s = ''
	for (let i = 0; i < jsobj.length; i++) {
		s += '\n\t\t{'
		for (let j in jsobj[i]) {
			let value = jsobj[i][j]
			if (typeof value == 'string' && value != 'false' && value != 'true') {
				value = `'${jsobj[i][j]}'`
			}
			s += `${j}: ${value},`
		}
		s = s.slice(0, s.length - 1)
		s += '}'
		if (i != jsobj.length - 1) {
			s += ','
		}
	}
	let index = filename.indexOf('Object')
	if (index != -1) {
		filename = filename.slice(0, index)
		return `${TStsr}\n\tpublic static ${filename}: ${filename} = ${s};\n`
	}
	return `${TStsr}\n\tpublic static ${filename}: ${filename}[] = [${s}\n\t];`
}

function saveToServerCsvFile(csvobj, filename, newpath) {
	var s = ''
	for (let i = 0; i < csvobj.length; i++) {
		let arr = Object.values(csvobj[i])
		for (let j = 0; j < arr.length; j++) {
			if (j == arr.length - 1) {
				s = `${s + arr[j]}\n`
			} else {
				s = `${s + arr[j]},`
			}
		}
	}

	let newfilepath = path.join(newpath, `${filename}.csv`)
	fs.writeFileSync(newfilepath, s)
}
function saveToServerHsvFile(csvobj, filename, newpath) {
	var s = ''
	for (let i = 0; i < csvobj.length; i++) {
		let arr
		if (i == 0) {
			arr = Object.keys(csvobj[i])
		} else {
			arr = Object.values(csvobj[i])
		}
		for (let j = 0; j < arr.length; j++) {
			if (j == arr.length - 1) {
				s = `${s + arr[j]}\n`
			} else {
				s = `${s + arr[j]},`
			}
		}
	}

	let newfilepath = path.join(newpath, `${filename}.hsv`)
	fs.writeFileSync(newfilepath, s)
}
function convertExcel() {
	clearDir(dirOutPath)
	let files = fs.readdirSync(excelFilePath);
	let excelfile = []
	files.forEach((file) => {
		if (file.indexOf('.xlsx') != -1 && file.indexOf('~$')) {
			excelfile.push(file)
		}
	});
	let objDatas = []
	for (let i = 0; i < excelfile.length; i++) {
		workbook = xlsx.readFile(path
			.join(excelFilePath, excelfile[i]), { cellStyles: true, bookFiles: true })
		sheetNames = workbook.SheetNames;
		loadExcelFile(workbook, sheetNames[0])
		let tmp = creatObj(workbook, sheetNames[0])
		tmp.sheetName = sheetNames[0]
		objDatas.push(tmp)
	}
	// Config.js
	let newfilepath = path.join(dirOutPath, 'Config.js')
	let writerStream = fs.createWriteStream(newfilepath)
	let configData = 'module.exports = {\n'
	for (let i = 0; i < objDatas.length; i++) {
		let jsobj = objDatas[i].jsobj
		if (jsobj.length > 0 && JSON.stringify(jsobj[0]) != '{}') {
			configData = saveToClientJSFile(jsobj, objDatas[i].sheetName, configData)
		}
	}
	writerStream.write(configData, 'utf-8')
	writerStream.end('}\n')
	writerStream.on('finish', () => {
		console.log('Config.js is finished')
	});

	for (let i = 0; i < objDatas.length; i++) {
		let csvobj = objDatas[i].csvobj
		if (csvobj.length > 0 && JSON.stringify(csvobj[0]) != '{}') {
			saveToServerCsvFile(csvobj, objDatas[i].sheetName, dirOutPath)
			saveToServerHsvFile(csvobj, objDatas[i].sheetName, dirOutPath)
		}
	}
	// Config.ts
	let TSstr = ''
	let newTSfilepath = path.join(dirOutPath, 'Config.ts')
	let tsWriterStream = fs.createWriteStream(newTSfilepath)
	for (let i = 0; i < objDatas.length; i++) {
		let jsobj = objDatas[i].jsobj
		if (jsobj.length > 0 && JSON.stringify(jsobj[0]) != '{}') {
			TSstr = saveClassTSFile(jsobj, objDatas[i].sheetName, TSstr)
		}
	}
	TSstr += 'export class Config\n{'
	for (let i = 0; i < objDatas.length; i++) {
		let jsobj = objDatas[i].jsobj
		if (jsobj.length > 0 && JSON.stringify(jsobj[0]) != '{}') {
			TSstr = saveConfigTSFile(jsobj, objDatas[i].sheetName, TSstr)
		}
	}
	TSstr += '}'
	tsWriterStream.write(TSstr, 'utf-8')
	tsWriterStream.on('finish', () => {
		console.log('Config.ts is finished')
	});
}
convertExcel()
