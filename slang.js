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
    slang.version = '0.1.1';
    
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
    
    // Converts a string of words or a camelCased string into a series of words
    // separated by a dash (`-`)
    slang.dasherize = function dasherize(input) {
        return input.replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                    .toLowerCase();
    }
    
    // Concatinates the string `count` times
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
        return input.trimLeft ? input.trimLeft() : input.replace(/^s+/, '');
    }
    
    // Remove the trailing whitespace from `input`
    slang.trimRight = function trimRight(input) {
        return input.trimRight ? input.trimRight() : input.replace(/s+$/, '');
    }
    
    // Joins an array into a humanized list.  The last element is joined 
    // by "and" by default, but you can change it.
    slang.join = function join(array, last) {
        var lastItem = array.pop(),
            last = last || 'and';
        
        return array.join(', ') + ' ' + last + ' ' + lastItem;
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
        return input.indexOf(string) === input.length - string.length;
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
    
    // Adds the methods from the slang object to String.prototype
    slang.addToPrototype = function protoize() {
        for (key in slang) {
            if (key === 'guid' || key === 'isString' || key === 'version' || key === 'addToPrototype')
                continue;
            
            (function(key) {
                String.prototype[key] = function() {
                    var args = Array.prototype.slice.call(arguments)
                    return slang[key].apply(slang, [this].concat(args));
                }
            })(key);
        }
    }

})();