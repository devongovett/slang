(function() {
    
    // Module Setup
    // -----
    
    // Define the internal slang variable
    var slang = {};
    
    // Export the slang object as either a CommonJS module, or to the global object
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = slang;
    } else {
        this.slang = slang;
    }
    
    // Set the slang version
    slang.version = '0.3.0';
    
    // String utility functions
    // ------------------------
    
    // Returns whether `input` is a string
    slang.isString = function isString(input) {
        return Object.prototype.toString.call(input) === '[object String]';
    }
    
    // Capitalizes the first character of a string
    slang.capitalize = function capitalize(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    
    // Uncapitalizes the first character of a string
    slang.uncapitalize = function uncapitalize(input) {
        return input.charAt(0).toLowerCase() + input.slice(1);
    }
    
    // Capitalizes each word in the string
    slang.capitalizeWords = function capitalizeWords(input) {
        return input.replace(/\w+/g, function(word) {
            return slang.capitalize(word);
        });
    }
    
    // Uncapitalizes each word in the string
    slang.uncapitalizeWords = function uncapitalizeWords(input) {
        return input.replace(/\w+/g, function(word) {
            return slang.uncapitalize(word);
        });
    }
    
    // Returns whether the character at the provided character index
    // is upper case.
    slang.isUpperCaseAt = function isUpperCaseAt(input, index) {
        return input.charAt(index).toUpperCase() === input.charAt(index);
    }
    
    // Returns whether the character at the provided character index
    // is lower case.
    slang.isLowerCaseAt = function isLowerCaseAt(input, index) {
        return input.charAt(index).toLowerCase() === input.charAt(index);
    }
    
    // Inverts the case for each letter in the string
    slang.swapcase = function swapcase(input) {
        return input.replace(/([a-z]+)|([A-Z]+)/g, function(match, lower, upper) {
            return lower ? match.toUpperCase() : match.toLowerCase();
        });
    }
    
    // Converts a string of words seperated by dashes or spaces to camelCase
    slang.camelize = function camelize(input) {
        return input.replace(/\W+(.)/g, function(match, letter) {
            return letter.toUpperCase();
        });
    }
    
    // Converts a camelCased string into a series of words separated
    // by `separator` or a space by default
    slang.uncamelize = function uncamelize(input, separator) {
        return input.replace(/([a-z\d])([A-Z])/g, '$1' + (separator || ' ') + '$2');
    }
    
    // Converts a string of words or a camelCased string into a series of words
    // separated by a dash (`-`)
    slang.dasherize = function dasherize(input) {
        return input.replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                    .toLowerCase();
    }
    
    // Concatenates the string `count` times
    slang.repeat = function repeat(input, count) {
        return count < 1 ? '' : new Array(count + 1).join(input);
    }
    
    // Inserts `string` in `input` at `index`
    slang.insert = function insert(input, string, index) {
        return input.slice(0, index) + string + input.slice(index);
    }
    
    // Removes the characters between the `start` and `end` indexes
    slang.remove = function remove(input, start, end) {
        return input.slice(0, start) + input.slice(end);
    }
    
    // Removes the last character of `input`
    slang.chop = function chop(input) {
        return input.slice(0, -1);
    }
    
    // Removes leading and trailing whitespace from `input`
    slang.trim = function strip(input) {
        return input.trim ? input.trim() : input.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    
    // Removes the leading whitespace from `input`
    slang.trimLeft = function trimLeft(input) {
        return input.trimLeft ? input.trimLeft() : input.replace(/^\s+/, '');
    }
    
    // Removes the trailing whitespace from `input`
    slang.trimRight = function trimRight(input) {
        return input.trimRight ? input.trimRight() : input.replace(/\s+$/, '');
    }
    
	// Truncates `input` to `args.limit` or 10 and adds `args.omission` or "..."
    slang.truncate = function truncate(input, args) {
        var limit = args && args.limit || 10,
            omission = args && args.omission || '...';

        return input.length <= limit ? input : input.slice(0, limit) + omission;
    }
	
    // Joins an array into a humanized list.  The last element is joined 
    // by "and" by default, but you can change it.
    slang.join = function join(array, last) {
        var lastItem = array.pop(),
            last = last || 'and';
        
        return array.join(', ') + ' ' + last + ' ' + lastItem;
    }
    
    // Returns a humanized number with the correct suffix
    // such as 1st, 2nd, 3rd or 4th
    slang.humanize = function humanize(number) {
        if(number % 100 >= 11 && number % 100 <= 13)
            return number + "th";
        
        switch(number % 10) {
            case 1: return number + "st";
            case 2: return number + "nd";
            case 3: return number + "rd";
        }
        
        return number + "th";
    }
    
    // Returns whether `input` contains `string`
    slang.contains = function contains(input, string) {
        return input.indexOf(string) > -1;
    }
    
    // Returns whether `input` starts with `string`
    slang.startsWith = function startsWith(input, string) {
        return input.indexOf(string) === 0;
    }
    
    // Returns whether `input` ends with `string`
    slang.endsWith = function endsWith(input, string) {
        var index = input.length - string.length;
        return index >= 0 && input.indexOf(string, index) > -1;
    }
    
    // Returns whether `input` is empty or only contains whitespace
    slang.isBlank = function isBlank(input) {
        return /^\s*$/.test(input);
    }
    
    // Returns the successor to str. The successor is calculated by incrementing characters starting 
    // from the rightmost alphanumeric (or the rightmost character if there are no alphanumerics) in the
    // string. Incrementing a digit always results in another digit, and incrementing a letter results in
    // another letter of the same case.
    //
    // If the increment generates a carry, the character to the left of it is incremented. This 
    // process repeats until there is no carry, adding an additional character if necessary.
    //
    //     slang.successor("abcd")      == "abce"
    //     slang.successor("THX1138")   == "THX1139"
    //     slang.successor("<<koala>>") == "<<koalb>>"
    //     slang.successor("1999zzz")   == "2000aaa"
    //     slang.successor("ZZZ9999")   == "AAAA0000"
    slang.successor = function successor(input) {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz',
            length = alphabet.length,
            result = input,
            i = input.length;

        while(i >= 0) {
            var last = input.charAt(--i),
                next = '',
                carry = false;

            if (isNaN(last)) {
                index = alphabet.indexOf(last.toLowerCase());

                if (index === -1) {
                    next = last;
                    carry = true;
                }
                else {
                    var isUpperCase = last === last.toUpperCase();
                    next = alphabet.charAt((index + 1) % length);
                    if (isUpperCase) {
                        next = next.toUpperCase();
                    }

                    carry = index + 1 >= length;
                    if (carry && i === 0) {
                        var added = isUpperCase ? 'A' : 'a';
                        result = added + next + result.slice(1);
                        break;
                    }
                }
            }
            else {
                next = +last + 1;
                if(next > 9) {
                    next = 0;
                    carry = true
                }

                if (carry && i === 0) {
                    result = '1' + next + result.slice(1);
                    break;
                }
            }

            result = result.slice(0, i) + next + result.slice(i + 1);
            if (!carry) {
                break;
            }
        }
        return result;
    }
    
    // Returns a unique guid of the specified length, or 32 by default
    slang.guid = function guid(length) {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length,
            length = length || 32;
            
        for (var i = 0; i < length; i++) {
            buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
        }
        
        return buf.join('');
    }
    
    // Inflection
    // ----------
    
    // Set default language for inflection methods
    slang.lang = 'en';
    
    // Object to hold languages for inflection
    // Add slang.Language objects to this
    slang.languages = {};
    
    // Define object to hold information about a language
    function Language() {
        this.plural = [];
        this.singular = [];
        this.uncountable = [];
        this.irregular = {
            plural: {},
            singular: {}
        };
    }
    
    slang.Language = Language;
    
    // Adds an array of irregular words to the language.
    // Provide an array of arrays containing the singular
    // and plural versions of the word
    Language.prototype.addIrregular = function(irregular) {
        for (var i = 0, len = irregular.length; i < len; i++) {
            var item = irregular[i];
            this.irregular.plural[item[0]] = item[1];
            this.irregular.singular[item[1]] = item[0];
        }
    }
    
    // Inflects a word by the specified type ('singular' or 'plural')
    Language.prototype.inflect = function(word, type) {
        // Check if this word is uncountable
        if (~this.uncountable.indexOf(word.toLowerCase()))
            return word;
        
        // Check if this word is irregular
        var irregular = this.irregular[type][word];
        if (irregular)
            return irregular;
        
        // Check rules until a match is found
        var rules = this[type];
        for (var i = 0, len = rules.length; i < len; i++) {
            var regexp = rules[i][0];
            if (regexp.test(word))
                return word.replace(regexp, rules[i][1]);
        }
        
        return word;
    }
    
    // Pluralize a word in the specified language
    // or `slang.lang` by default
    slang.pluralize = function(word, lang) {
        lang || (lang = slang.lang);
        lang = slang.languages[lang];
        
        if (!lang)
            return word;
        
        return lang.inflect(word, 'plural');
    }
    
    // Singularize a word in the specified language
    // or `slang.lang` by default
    slang.singularize = function(word, lang) {
        lang || (lang = slang.lang);
        lang = slang.languages[lang];
        
        if (!lang)
            return word;
            
        return lang.inflect(word, 'singular');
    }
    
    // Adds the methods from the slang object to String.prototype
    slang.addToPrototype = function addToPrototype() {
        for (key in slang) {
            if (key === 'guid' || 
                key === 'lang' ||
                key === 'languages' ||
                key === 'Language' ||
                key === 'humanize' ||
                key === 'isString' || 
                key === 'version' || 
                key === 'addToPrototype') {
                    continue;
            }
            
            (function(key) {
                String.prototype[key] = function() {
                    var args = Array.prototype.slice.call(arguments)
                    return slang[key].apply(slang, [this].concat(args));
                }
            })(key);
        }
    }
    
    // English Inflector
    // -----------------
    
    // Define language for English
    var en = slang.languages['en'] = new slang.Language();
    
    en.plural = [
        [/(todo)$/i, "$1s"],
        [/(matr|vert|ind)(?:ix|ex)$/i, "$1ices"],
        [/(octop|vir)us$/i, "$1i"],
        [/(alias|status)$/i, "$1es"],
        [/(cris|ax|test)is$/i, "$1es"],
        [/(s|ss|sh|ch|x|o)$/i, "$1es"],
        [/y$/i, "ies"],
        [/(o|e)y$/i, "$1ys"],
        [/([ti])um$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:([^f])fe|([lr])f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([m|l])ouse$/i, "$1ice"],
        [/^(ox)$/i, "$1en"],
        [/(quiz)$/i, "$1zes"],
        [/$/, "s"]
    ];

    en.singular = [
        [/(bu|mis|kis)s$/i, "$1s"],
        [/([ti])a$/i, "$1um"],
        [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis"],
        [/(^analy)ses$/i, "$1sis"],
        [/([^f])ves$/i, "$1fe"],
        [/([lr])ves$/i, "$1f"],
        [/([^aeiouy]|qu)ies$/i, "$1y"],
        [/ies$/i, "ie"],
        [/(x|ch|ss|sh)es$/i, "$1"],
        [/([m|l])ice$/i, "$1ouse"],
        [/(bus)es$/i, "$1"],
        [/(shoe)s$/i, "$1"],
        [/(o)es$/i, "$1"],
        [/(cris|ax|test)es$/i, "$1is"],
        [/(octop|vir)i$/i, "$1us"],
        [/(alias|status)es$/i, "$1"],
        [/^(ox)en/i, "$1"],
        [/(vert|ind)ices$/i, "$1ex"],
        [/(matr)ices$/i, "$1ix"],
        [/(quiz)zes$/i, "$1"],
        [/s$/i, ""]
    ];

    en.addIrregular([
        ['i', 'we'],
        ['person', 'people'],
        ['man', 'men'],
        ['child', 'children'],
        ['move', 'moves'],
        ['she', 'they'],
        ['he', 'they'],
        ['myself', 'ourselves'],
        ['yourself', 'ourselves'],
        ['himself', 'themselves'],
        ['herself', 'themselves'],
        ['themself', 'themselves'],
        ['mine', 'ours'],
        ['hers', 'theirs'],
        ['his', 'theirs'],
        ['its', 'theirs'],
        ['theirs', 'theirs'],
        ['sex', 'sexes'],
        ['this', 'that']
    ]);

    en.uncountable = [
        'advice',
        'enegery',
        'excretion',
        'digestion',
        'cooperation',
        'health',
        'justice',
        'jeans',
        'labour',
        'machinery',
        'equipment',
        'information',
        'pollution',
        'sewage',
        'paper',
        'money',
        'species',
        'series',
        'rain',
        'rice',
        'fish',
        'sheep',
        'moose',
        'deer',
        'bison',
        'proceedings',
        'shears',
        'pincers',
        'breeches',
        'hijinks',
        'clippers',
        'chassis',
        'innings',
        'elk',
        'rhinoceros',
        'swine',
        'you',
        'news'
    ];

})();
