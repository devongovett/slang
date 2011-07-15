var slang = require('./slang'),
    assert = require('assert');
    
// Test **slang.isString**
assert.ok(slang.isString('test'), 'slang.isString failed.');
assert.equal(false, slang.isString(true), 'slang.isString failed.');

// Test **slang.capitalize**
assert.equal('Hello world!', slang.capitalize('hello world!'));

// Test **slang.uncapitalize**
assert.equal('hello world!', slang.uncapitalize('Hello world!'));

// Test **slang.capitalizeWords**
assert.equal('Hello World!', slang.capitalizeWords('hello world!'));

// Test **slang.uncapitalizeWords**
assert.equal('hello world!', slang.uncapitalizeWords('Hello World!'));

// Test **slang.isUpperCaseAt**
assert.ok(slang.isUpperCaseAt('teSting', 2), 'slang.isUpperCaseAt failed');
assert.equal(false, slang.isUpperCaseAt('teSting', 0), 'slang.isUpperCaseAt failed');

// Test **slang.isLowerCaseAt**
assert.ok(slang.isLowerCaseAt('teSting', 5), 'slang.isLowerCaseAt failed');
assert.equal(false, slang.isLowerCaseAt('teSting', 2), 'slang.isLowerCaseAt failed');

// Test **slang.swapcase**
assert.equal('aaBBccDD', slang.swapcase('AAbbCCdd'));

// Test **slang.camelize**
assert.equal('camelCase', slang.camelize('camel case'));
assert.equal('camelCase', slang.camelize('camel-case'));

// Test **slang.dasherize**
assert.equal('this-is-dashed', slang.dasherize('this is dashed'));
assert.equal('this-is-dashed', slang.dasherize('thisIsDashed'));

// Test **slang.repeat**
assert.equal('Ho! Ho! Ho! ', slang.repeat('Ho! ', 3));

// Test **slang.insert**
assert.equal('this is really cool!', slang.insert('this is cool!', 'really ', 8));

// Test **slang.remove**
assert.equal('this is cool!', slang.remove('this is really cool!', 8, 15));

// Test **slang.chop**
assert.equal('hell', slang.chop('hello'));

// Test **slang.trim**
assert.equal('hello', slang.trim('hello '));

// Test **slang.trimLeft**
assert.equal('hello ', slang.trimLeft(' hello '));

// Test **slang.trimRight
assert.equal(' hello', slang.trimRight(' hello '));

// Test **slang.join**
assert.equal('red, blue and green', slang.join(['red', 'blue', 'green']));
assert.equal('red, blue or green', slang.join(['red', 'blue', 'green'], 'or'));

// Test **slang.contains**
assert.ok(slang.contains('hello world', 'world'), 'slang.contains failed');
assert.equal(false, slang.contains('hello world', 'unicorn'), 'slang.contains failed');

// Test **slang.startsWith**
assert.ok(slang.startsWith('hello world', 'hello'), 'slang.startsWith failed');
assert.equal(false, slang.startsWith('hello world', 'rainbow'));

// Test **slang.endsWith**
assert.ok(slang.endsWith('hello world', 'world'), 'slang.endsWith failed');
assert.equal(false, slang.endsWith('hello world', 'rainbow'));

// Test **slang.isBlank**
assert.ok(slang.isBlank(''), 'slang.isBlank failed');
assert.ok(slang.isBlank(' '), 'slang.isBlank failed')
assert.equal(false, slang.isBlank('hello'), 'slang.isBlank failed');

// Test **slang.successor**
assert.equal('abce', slang.successor('abcd'));
assert.equal('THX1139', slang.successor('THX1138'));
assert.equal('<<koalb>>', slang.successor('<<koala>>'));
assert.equal('2000aaa', slang.successor('1999zzz'));
assert.equal('AAAA0000', slang.successor('ZZZ9999'));

// Test **slang.guid**
assert.equal(32, slang.guid().length, 'slang.guid failed');
assert.equal(16, slang.guid(16).length, 'slang.guid failed')

console.log(slang.guid(15))