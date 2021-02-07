const rp = require('request-promise');
var promise= require('promise');
const cheerio = require('cheerio');
const port = 3000;
const fs = require("fs"),
    { createCanvas } = require("canvas");
var d = new Date,
    dformat = [d.getDate(),
			   d.getMonth()+1,
               d.getFullYear()].join('-')+'_'+
              [d.getHours(),
               d.getMinutes(),
			   d.getSeconds()].join('_');

let chartData =[];
var chartNumData =[];
let url= process.argv[2];
console.log(`url is ${url}`);

// if(isValidUrl(url)) {
	getDataInArrayFromWebPage(url);
// }
// else {
// 	console.log('Please provide a valid url');
// }

function isValidUrl(url)
{
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (url.match(regex)) {
	  console.log("Successfully matched URL Pattern");
	  return true;	  
	} else {
	  console.log("URL Pattern is not matching");
	  return false;
	}
	
}

function getDataInArrayFromWebPage(url) {	

			var options = {
			//	url: 'https://en.wikipedia.org/wiki/List_of_highest_individual_scores_in_One_Day_International_cricket',
				url:url,
				transform: body => cheerio.load(body)
			}
			
			rp(options)
				.then(function ($) {
					 htmlpage= $.html();
			$('td').each(function () {
				if ($(this).html().match(/^\s*\d[\d,\.]*\s*$/)) {
					$(this).css('background-color', 'red');					
					chartData.push($(this).text());
				}
			});
			for (let data of chartData) {
			 	chartNumData.push(parseFloat(data));
			}
			chartNumData=chartNumData.sort((a, b) => a - b);
			console.log("Inside rp"+chartNumData.length);
		})
		.then(()=>{
				console.log("Inside secound then"+chartNumData.length);
				createImage(chartNumData);
		});	

	
	
}


function createImage(dataFeed) {
	const WIDTH = 1000;
	const HEIGHT = 800;
	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext("2d");
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#f2f2f2";
	ctx.font = "12px Arial";
	let y=10;
	for ( let d of dataFeed) {
		var x;
		let line='|';
		 for ( x=0; x<d; x++)
		 {
            line = line +'|';
		 }
		ctx.fillText(d+line,5,y);
		y=y+10;
	}
	const buffer = canvas.toBuffer("image/png");
	fs.writeFileSync(`Pic_${dformat}.png`, buffer);
}

module.exports = { getDataInArrayFromWebPage: getDataInArrayFromWebPage, createImage: createImage,isValidUrl:isValidUrl} 
