const index = require('./index');
const fs = require("fs");


//const $ =jest.fn(() => ({ each: jest.fn()}));
const mockDataFn= () => {
  //var buffer= fs.readFileSync('./Pic_8-2-2021_17_41_25.txt');
// return Array.prototype.slice.call(buffer, 0);
 return 1;

};
//$.each.mock= 
 //const $ = jest.fn();
 const $ =jest.fn(() => ({ each: jest.fn(e => {return  fs.readFileSync('./Pic_8-2-2021_17_41_25.txt')})}))

//$.mockReturnValue(mockDataFn());




test('123 is not valid url', () => {
  console.log("Mock type "+ typeof mockDataFn() );
    expect(index.isValidUrl('123')).toBe(false);
  });

test('http://www.google.com is a valid url', () => {
    expect(index.isValidUrl('http://www.google.com')).toBe(true);
  });



   test('getDataInArrayFromWebPage function returns array', () => {
     
    expect( Array.isArray(index.getDataOfWebPageInArray($))).toBe(true);
   });

   test('getDataInArrayFromWebPage function returns defined', () => {
    expect(index.getDataOfWebPageInArray($)).toBeDefined();
  });
  


