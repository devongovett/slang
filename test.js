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

// Test **slang.uncamelize**
assert.equal('Camel Case', slang.uncamelize('CamelCase'));
assert.equal('camel Case', slang.uncamelize('camelCase'));

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

// Test **slang.truncate**
assert.equal('Lorem ipsu...', slang.truncate('Lorem ipsum dolor sit amet.'));
assert.equal('Lorem ipsum...', slang.truncate('Lorem ipsum dolor sit amet.', { limit: 11 }));
assert.equal('Lorem...(read more)', slang.truncate('Lorem ipsum dolor sit amet.', { limit: 5, omission: '...(read more)' }));
assert.equal('Lorem ipsu...(read more)', slang.truncate('Lorem ipsum dolor sit amet.', { omission: '...(read more)' }));

// Test **slang.join**
assert.equal('red, blue and green', slang.join(['red', 'blue', 'green']));
assert.equal('red, blue or green', slang.join(['red', 'blue', 'green'], 'or'));

// Test **slang.humanize**
assert.equal('1st', slang.humanize(1));
assert.equal('2nd', slang.humanize(2));
assert.equal('3rd', slang.humanize(3));
assert.equal('4th', slang.humanize(4));
assert.equal('11th', slang.humanize(11));
assert.equal('23rd', slang.humanize(23));
assert.equal('104th', slang.humanize(104));

// Test **slang.contains**
assert.ok(slang.contains('hello world', 'world'), 'slang.contains failed');
assert.equal(false, slang.contains('hello world', 'unicorn'), 'slang.contains failed');

// Test **slang.startsWith**
assert.ok(slang.startsWith('hello world', 'hello'), 'slang.startsWith failed');
assert.equal(false, slang.startsWith('hello world', 'rainbow'));

// Test **slang.endsWith**
assert.ok(slang.endsWith('hello world', 'world'), 'slang.endsWith failed');
assert.equal(false, slang.endsWith('hello world', 'rainbow'), 'slang.endsWith failed');
assert.ok(slang.endsWith('hello hello', 'lo'), 'slang.endsWith failed');

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
assert.equal(16, slang.guid(16).length, 'slang.guid failed');

// Test **slang.pluralize**
assert.equal(slang.pluralize('cooperation'), 'cooperation');
assert.equal(slang.pluralize('man'), 'men');
assert.equal(slang.pluralize('quiz'), 'quizzes');
assert.equal(slang.pluralize('battery'), 'batteries');
assert.equal(slang.pluralize('bus'), 'buses');
assert.equal(slang.pluralize('mouse'), 'mice');
assert.equal(slang.pluralize('alias'), 'aliases');
assert.equal(slang.pluralize('octopus'), 'octopi');
assert.equal(slang.pluralize('fox'), 'foxes');
assert.equal(slang.pluralize('matrix'), 'matrices');
assert.equal(slang.pluralize('update'), 'updates');
assert.equal(slang.pluralize('potato'), 'potatoes');
assert.equal(slang.pluralize('todo'), 'todos');
assert.equal(slang.pluralize('sheep'), 'sheep');
assert.equal(slang.pluralize('person'), 'people');
assert.equal(slang.pluralize('this'), 'that');
assert.equal(slang.pluralize('crisis'), 'crises');

// Test **slang.singularize**
assert.equal(slang.singularize('buses'), 'bus');
assert.equal(slang.singularize('wives'), 'wife');
assert.equal(slang.singularize('sheep'), 'sheep');
assert.equal(slang.singularize('lamps'), 'lamp');
assert.equal(slang.singularize('octopi'), 'octopus');
assert.equal(slang.singularize('crises'), 'crisis');
assert.equal(slang.singularize('mice'), 'mouse');
assert.equal(slang.singularize('families'), 'family');
assert.equal(slang.singularize('vertices'), 'vertex');
assert.equal(slang.singularize('men'), 'man');
assert.equal(slang.singularize('shoes'), 'shoe');
assert.equal(slang.singularize('synopses'), 'synopsis');
assert.equal(slang.singularize('batteries'), 'battery');
assert.equal(slang.singularize('updates'), 'update');
assert.equal(slang.singularize('people'), 'person');
assert.equal(slang.singularize('that'), 'this');
assert.equal(slang.singularize('foxes'), 'fox');
assert.equal(slang.singularize('todos'), 'todo');
assert.equal(slang.singularize('potatoes'), 'potato');

// Test **slang.language**
slang.lang = 'foo';
assert.equal(slang.pluralize('bus'), 'bus');
assert.equal(slang.pluralize('bus', 'en'), 'buses');
assert.equal(slang.singularize('men'), 'men');
assert.equal(slang.singularize('men', 'en'), 'man');