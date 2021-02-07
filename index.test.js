const index = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(index.sum(1, 2)).toBe(3);
});

test('123 is not valid url', () => {
    expect(index.isValidUrl('123')).toBe(false);
  });

  test('http://www.google.com is a valid url', () => {
    expect(index.isValidUrl('http://www.google.com')).toBe(true);
  });