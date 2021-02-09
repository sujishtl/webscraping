const index = require('./index');
const fs = require("fs");

const $ = jest.fn(() => ({ each: jest.fn(e => { return Array.prototype }) }));
const writeFileSpy = jest.spyOn(fs, "writeFileSync");
writeFileSpy.mockReturnValue('mocked');



test('123 is not valid url', () => {
  expect(index.isValidUrl('123')).toBe(false);
});

test('http://www.google.com is a valid url', () => {
  expect(index.isValidUrl('http://www.google.com')).toBe(true);
});

test('getDataInArrayFromWebPage function returns array', () => {
  expect(Array.isArray(index.getDataOfWebPageInArray($))).toBe(true);
});

test('getDataInArrayFromWebPage function returns defined', () => {
  expect(index.getDataOfWebPageInArray($)).toBeDefined();
});

test('createImage function called the fs.writefile', () => {
  index.createImage([1, 2]);
  expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
});


