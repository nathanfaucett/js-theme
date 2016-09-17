(function(dependencies, chunks, undefined, global) {
    
    var cache = [],
        cacheCallbacks = {};
    

    function Module() {
        this.id = null;
        this.filename = null;
        this.dirname = null;
        this.exports = {};
        this.loaded = false;
    }

    Module.prototype.require = require;

    function require(index) {
        var module = cache[index],
            callback, exports;

        if (module !== undefined) {
            return module.exports;
        } else {
            callback = dependencies[index];

            cache[index] = module = new Module();
            exports = module.exports;

            callback.call(exports, require, exports, module, undefined, global);
            module.loaded = true;

            return module.exports;
        }
    }

    require.resolve = function(path) {
        return path;
    };

    
    require.async = function async(index, callback) {
        var module = cache[index],
            callbacks, node;

        if (module) {
            callback(module.exports);
        } else if ((callbacks = cacheCallbacks[index])) {
            callbacks[callbacks.length] = callback;
        } else {
            node = document.createElement("script");
            callbacks = cacheCallbacks[index] = [callback];

            node.type = "text/javascript";
            node.charset = "utf-8";
            node.async = true;

            function onLoad() {
                var i = -1,
                    il = callbacks.length - 1;

                while (i++ < il) {
                    callbacks[i](require(index));
                }
                delete cacheCallbacks[index];
            }

            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0)) {
                node.attachEvent("onreadystatechange", onLoad);
            } else {
                node.addEventListener("load", onLoad, false);
            }

            node.src = chunks[index];

            document.head.appendChild(node);
        }
    };

    global["pk6AmM6n-1SMq-43kB-NzAL-C5IsDREjkRgqX"] = function(asyncDependencies) {
        var i = -1,
            il = asyncDependencies.length - 1,
            dependency, index;

        while (i++ < il) {
            dependency = asyncDependencies[i];
            index = dependency[0];

            if (dependencies[index] === null) {
                dependencies[index] = dependency[1];
            }
        }
    };

    

    if (typeof(define) === "function" && define.amd) {
        define([], function() {
            return require(0);
        });
    } else if (typeof(module) !== "undefined" && module.exports) {
        module.exports = require(0);
    } else {
        
        require(0);
        
    }
}([
function(require, exports, module, undefined, global) {
/*@=-/var/www/html/node/_css/theme/example/src/index.js-=@*/
var Theme = require(1);


var SomeThemePrototype;


function SomeTheme() {
    Theme.call(this);
}
Theme.extend(SomeTheme, "SomeTheme");
SomeThemePrototype = SomeTheme.prototype;

SomeThemePrototype.getSpacing = function() {
    var spacing = {};

    spacing.desktopSize = 4;

    return spacing;
};

SomeThemePrototype.getPalette = function() {
    var palette = {};

    palette.color0 = "#ff0000";
    palette.color1 = "#00ff00";

    return palette;
};

SomeThemePrototype.getStyles = function(palette, spacing) {
    var style = {};

    style.button = {
        minWidth: (spacing.desktopSize * 16) + "px",
        height: (spacing.desktopSize * 8) + "px"
    };

    return style;
};


console.log(new SomeTheme());

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/theme@0.0.2/src/index.js-=@*/
var extend = require(2),
    inherits = require(3);


var ThemePrototype;


module.exports = Theme;


function Theme() {
    this.fontFamily = "Arial, Helvetica, sans-serif";
    this.spacing = this.getSpacing();
    this.palette = this.getPalette();
    this.styles = this.getStyles(this.palette, this.spacing);
}
ThemePrototype = Theme.prototype;

Theme.extend = function extend(child, displayName) {
    inherits(child, this);
    child.prototype.displayName = displayName || "Theme";
    child.extend = extend;
    return child;
};

ThemePrototype.displayName = "Theme";

ThemePrototype.setSpacing = function(newSpacing) {
    extend(this.spacing, newSpacing);
    extend(this.styles, this.getStyles(this.palette, this.spacing));
    return this;
};

ThemePrototype.getSpacing = function() {
    return {};
};

ThemePrototype.setPalette = function(newPalette) {
    extend(this.palette, newPalette);
    extend(this.styles, this.getStyles(this.palette, this.spacing));
    return this;
};

ThemePrototype.getPalette = function() {
    return {};
};

ThemePrototype.setStyle = function(styles) {
    extend(this.styles, styles);
    return this;
};

ThemePrototype.getStyles = function( /* palette, spacing */ ) {
    return {};
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/extend@0.0.2/src/index.js-=@*/
var keys = require(4),
    isNative = require(5);


var nativeAssign = Object.assign,
    extend, baseExtend;


if (isNative(nativeAssign)) {
    extend = nativeAssign;
} else {
    extend = function extend(out) {
        var i = 0,
            il = arguments.length - 1;

        while (i++ < il) {
            baseExtend(out, arguments[i]);
        }

        return out;
    };
    baseExtend = function baseExtend(a, b) {
        var objectKeys = keys(b),
            i = -1,
            il = objectKeys.length - 1,
            key;

        while (i++ < il) {
            key = objectKeys[i];
            a[key] = b[key];
        }
    };
}


module.exports = extend;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/inherits@0.0.2/src/index.js-=@*/
var create = require(16),
    extend = require(2),
    mixin = require(17),
    defineProperty = require(18);


var descriptor = {
    configurable: true,
    enumerable: false,
    writable: true,
    value: null
};


module.exports = inherits;


function inherits(child, parent) {

    mixin(child, parent);

    if (child.__super) {
        child.prototype = extend(create(parent.prototype), child.__super, child.prototype);
    } else {
        child.prototype = extend(create(parent.prototype), child.prototype);
    }

    defineNonEnumerableProperty(child, "__super", parent.prototype);
    defineNonEnumerableProperty(child.prototype, "constructor", child);

    child.defineStatic = defineStatic;
    child.super_ = parent;

    return child;
}
inherits.defineProperty = defineNonEnumerableProperty;

function defineNonEnumerableProperty(object, name, value) {
    descriptor.value = value;
    defineProperty(object, name, descriptor);
    descriptor.value = null;
}

function defineStatic(name, value) {
    defineNonEnumerableProperty(this, name, value);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/keys@0.0.1/src/index.js-=@*/
var has = require(6),
    isNative = require(5),
    isNullOrUndefined = require(7),
    isObject = require(8);


var nativeKeys = Object.keys;


module.exports = keys;


function keys(value) {
    if (isNullOrUndefined(value)) {
        return [];
    } else {
        return nativeKeys(isObject(value) ? value : Object(value));
    }
}

if (!isNative(nativeKeys)) {
    nativeKeys = function keys(value) {
        var localHas = has,
            out = [],
            i = 0,
            key;

        for (key in value) {
            if (localHas(value, key)) {
                out[i++] = key;
            }
        }

        return out;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_native@0.0.2/src/index.js-=@*/
var isFunction = require(10),
    isNullOrUndefined = require(7),
    escapeRegExp = require(11);


var reHostCtor = /^\[object .+?Constructor\]$/,

    functionToString = Function.prototype.toString,

    reNative = RegExp("^" +
        escapeRegExp(Object.prototype.toString)
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ),

    isHostObject;


module.exports = isNative;


function isNative(value) {
    return !isNullOrUndefined(value) && (
        isFunction(value) ?
        reNative.test(functionToString.call(value)) : (
            typeof(value) === "object" && (
                (isHostObject(value) ? reNative : reHostCtor).test(value) || false
            )
        )
    ) || false;
}

try {
    String({
        "toString": 0
    } + "");
} catch (e) {
    isHostObject = function isHostObject() {
        return false;
    };
}

isHostObject = function isHostObject(value) {
    return !isFunction(value.toString) && typeof(value + "") === "string";
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/has@0.0.1/src/index.js-=@*/
var isNative = require(5),
    getPrototypeOf = require(9),
    isNullOrUndefined = require(7);


var nativeHasOwnProp = Object.prototype.hasOwnProperty,
    baseHas;


module.exports = has;


function has(object, key) {
    if (isNullOrUndefined(object)) {
        return false;
    } else {
        return baseHas(object, key);
    }
}

if (isNative(nativeHasOwnProp)) {
    baseHas = function baseHas(object, key) {
        if (object.hasOwnProperty) {
            return object.hasOwnProperty(key);
        } else {
            return nativeHasOwnProp.call(object, key);
        }
    };
} else {
    baseHas = function baseHas(object, key) {
        var proto = getPrototypeOf(object);

        if (isNullOrUndefined(proto)) {
            return key in object;
        } else {
            return (key in object) && (!(key in proto) || proto[key] !== object[key]);
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null_or_undefined@0.0.1/src/index.js-=@*/
var isNull = require(12),
    isUndefined = require(13);


module.exports = isNullOrUndefined;

/**
  isNullOrUndefined accepts any value and returns true
  if the value is null or undefined. For all other values
  false is returned.
  
  @param {Any}        any value to test
  @returns {Boolean}  the boolean result of testing value

  @example
    isNullOrUndefined(null);   // returns true
    isNullOrUndefined(undefined);   // returns true
    isNullOrUndefined("string");    // returns false
**/
function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_object@0.0.1/src/index.js-=@*/
var isNull = require(12);


module.exports = isObject;


function isObject(value) {
    var type = typeof(value);
    return type === "function" || (!isNull(value) && type === "object") || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_prototype_of@0.0.1/src/index.js-=@*/
var isObject = require(8),
    isNative = require(5),
    isNullOrUndefined = require(7);


var nativeGetPrototypeOf = Object.getPrototypeOf,
    baseGetPrototypeOf;


module.exports = getPrototypeOf;


function getPrototypeOf(value) {
    if (isNullOrUndefined(value)) {
        return null;
    } else {
        return baseGetPrototypeOf(value);
    }
}

if (isNative(nativeGetPrototypeOf)) {
    baseGetPrototypeOf = function baseGetPrototypeOf(value) {
        return nativeGetPrototypeOf(isObject(value) ? value : Object(value)) || null;
    };
} else {
    if ("".__proto__ === String.prototype) {
        baseGetPrototypeOf = function baseGetPrototypeOf(value) {
            return value.__proto__ || null;
        };
    } else {
        baseGetPrototypeOf = function baseGetPrototypeOf(value) {
            return value.constructor ? value.constructor.prototype : null;
        };
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_function@0.0.1/src/index.js-=@*/
var objectToString = Object.prototype.toString,
    isFunction;


if (objectToString.call(function() {}) === "[object Object]") {
    isFunction = function isFunction(value) {
        return value instanceof Function;
    };
} else if (typeof(/./) === "function" || (typeof(Uint8Array) !== "undefined" && typeof(Uint8Array) !== "function")) {
    isFunction = function isFunction(value) {
        return objectToString.call(value) === "[object Function]";
    };
} else {
    isFunction = function isFunction(value) {
        return typeof(value) === "function" || false;
    };
}


module.exports = isFunction;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/escape_regexp@0.0.1/src/index.js-=@*/
var toString = require(14);


var reRegExpChars = /[.*+?\^${}()|\[\]\/\\]/g,
    reHasRegExpChars = new RegExp(reRegExpChars.source);


module.exports = escapeRegExp;


function escapeRegExp(string) {
    string = toString(string);
    return (
        (string && reHasRegExpChars.test(string)) ?
        string.replace(reRegExpChars, "\\$&") :
        string
    );
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null@0.0.1/src/index.js-=@*/
module.exports = isNull;


function isNull(value) {
    return value === null;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_undefined@0.0.1/src/index.js-=@*/
module.exports = isUndefined;


function isUndefined(value) {
    return value === void(0);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/to_string@0.0.1/src/index.js-=@*/
var isString = require(15),
    isNullOrUndefined = require(7);


module.exports = toString;


function toString(value) {
    if (isString(value)) {
        return value;
    } else if (isNullOrUndefined(value)) {
        return "";
    } else {
        return value + "";
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_string@0.0.1/src/index.js-=@*/
module.exports = isString;


function isString(value) {
    return typeof(value) === "string" || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/create@0.0.1/src/index.js-=@*/
var isNull = require(12),
    isNative = require(5),
    isPrimitive = require(19);


var nativeCreate = Object.create;


module.exports = create;


function create(object) {
    return nativeCreate(isPrimitive(object) ? null : object);
}

if (!isNative(nativeCreate)) {
    nativeCreate = function nativeCreate(object) {
        var newObject;

        function F() {
            this.constructor = F;
        }

        if (isNull(object)) {
            F.prototype = null;
            newObject = new F();
            newObject.constructor = newObject.__proto__ = null;
            delete newObject.__proto__;
            return newObject;
        } else {
            F.prototype = object;
            return new F();
        }
    };
}


module.exports = create;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/mixin@0.0.1/src/index.js-=@*/
var keys = require(4),
    isNullOrUndefined = require(7);


module.exports = mixin;


function mixin(out) {
    var i = 0,
        il = arguments.length - 1;

    while (i++ < il) {
        baseMixin(out, arguments[i]);
    }

    return out;
}

function baseMixin(a, b) {
    var objectKeys = keys(b),
        i = -1,
        il = objectKeys.length - 1,
        key, value;

    while (i++ < il) {
        key = objectKeys[i];

        if (isNullOrUndefined(a[key]) && !isNullOrUndefined((value = b[key]))) {
            a[key] = value;
        }
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/define_property@0.0.1/src/index.js-=@*/
var isObject = require(8),
    isFunction = require(10),
    isPrimitive = require(19),
    isNative = require(5),
    has = require(6);


var nativeDefineProperty = Object.defineProperty;


module.exports = defineProperty;


function defineProperty(object, name, descriptor) {
    if (isPrimitive(descriptor) || isFunction(descriptor)) {
        descriptor = {
            value: descriptor
        };
    }
    return nativeDefineProperty(object, name, descriptor);
}

defineProperty.hasGettersSetters = true;

if (!isNative(nativeDefineProperty) || !(function() {
        var object = {},
            value = {};

        try {
            nativeDefineProperty(object, "key", {
                value: value
            });
            if (has(object, "key") && object.key === value) {
                return true;
            } else {
                return false;
            }
        } catch (e) {}

        return false;
    }())) {

    defineProperty.hasGettersSetters = false;

    nativeDefineProperty = function defineProperty(object, name, descriptor) {
        if (!isObject(object)) {
            throw new TypeError("defineProperty(object, name, descriptor) called on non-object");
        }
        if (has(descriptor, "get") || has(descriptor, "set")) {
            throw new TypeError("defineProperty(object, name, descriptor) this environment does not support getters or setters");
        }
        object[name] = descriptor.value;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_primitive@0.0.1/src/index.js-=@*/
var isNullOrUndefined = require(7);


module.exports = isPrimitive;


function isPrimitive(obj) {
    var typeStr;
    return isNullOrUndefined(obj) || ((typeStr = typeof(obj)) !== "object" && typeStr !== "function") || false;
}

}], {}, void(0), (new Function("return this;"))()));
