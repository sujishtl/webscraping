const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require("fs"),
	{ createCanvas } = require("canvas");

let chartData = [];
var chartNumData = [];

var d = new Date,
	dformat = [d.getDate(),
	d.getMonth() + 1,
	d.getFullYear()].join('-') + '_' +
		[d.getHours(),
		d.getMinutes(),
		d.getSeconds()].join('_');

main();


async function main() {
	let url = process.argv[2];
	console.log(`url is ${url}`);

	if (isValidUrl(url)) {
		let data = await getDataFromWebPage(url)
		chartNumData = getDataOfWebPageInArray(data);
		createImage(chartNumData);
	}
	else {
		console.log('Please provide a valid url');
	}
}

function isValidUrl(url) {
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var localhostExpression=/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
	var regex = new RegExp(expression);
	var localhostRegex= new RegExp(localhostExpression);
	if (typeof url !== 'undefined' && (url.match(regex)|| url.match(localhostRegex))) {
		console.log("Successfully matched URL Pattern");
		return true;
	} else {
		console.log("URL Pattern is not matching");
		return false;
	}

}

function getDataFromWebPage(url) {
	var options = {
		url: url,
		transform: body => cheerio.load(body)
	}
	return rp(options)
}

function getDataOfWebPageInArray($) {
	$('td').each(function () {
		if ($(this).html().match(/^\s*\d[\d,\.]*\s*$/)) {
			chartData.push($(this).text());
		}
	});
	for (let data of chartData) {
		chartNumData.push(parseFloat(data));
	}
	chartNumData = chartNumData.sort((a, b) => a - b);
	return chartNumData;
}


function createImage(dataFeed) {
	const WIDTH = 1000;
	const HEIGHT = 800;
	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext("2d");
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#f2f2f2";
	ctx.font = "12px Arial";
	let y = 10;
	for (let d of dataFeed) {
		var x;
		let line = '|';
		for (x = 0; x < d; x++) {
			line = line + '|';
		}
		ctx.fillText(d + line, 5, y);
		y = y + 10;
	}
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync(`Pic_${dformat}.png`, buffer);
	console.log(`Image saved as Pic_${dformat}.png`)
}

module.exports = { getDataOfWebPageInArray: getDataOfWebPageInArray, createImage: createImage, isValidUrl: isValidUrl, getDataFromWebPage: getDataFromWebPage } 
