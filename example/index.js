(function(dependencies, undefined, global) {
    var cache = [];

    function require(index) {
        var module = cache[index],
            callback, exports;

        if (module !== undefined) {
            return module.exports;
        } else {
            callback = dependencies[index];
            exports = {};

            cache[index] = module = {
                exports: exports,
                require: require
            };

            callback.call(exports, require, exports, module, global);
            return module.exports;
        }
    }

    require.resolve = function(path) {
        return path;
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
function(require, exports, module, global) {

var Theme = require(1);


var MaterialUIThemePrototype;


function MaterialUITheme() {
    Theme.call(this);
}
Theme.extend(MaterialUITheme, "MaterialUITheme");
MaterialUIThemePrototype = MaterialUITheme.prototype;

MaterialUIThemePrototype.getSpacing = function() {
    var spacing = {};

    spacing.desktopSize = 4;

    return spacing;
};

MaterialUIThemePrototype.getPalette = function() {
    var palette = {};

    palette.color0 = "#ff0000";
    palette.color1 = "#00ff00";

    return palette;
};

MaterialUIThemePrototype.getStyles = function(palette, spacing) {
    var style = {};

    style.button = {
        minWidth: (spacing.desktopSize * 16) + "px",
        height: (spacing.desktopSize * 8) + "px"
    };

    return style;
};


console.log(new MaterialUITheme());


},
function(require, exports, module, global) {

var extend = require(2),
    inherits = require(12);


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
function(require, exports, module, global) {

var keys = require(3);


module.exports = extend;


function extend(out) {
    var i = 0,
        il = arguments.length - 1;

    while (i++ < il) {
        baseExtend(out, arguments[i]);
    }

    return out;
}

function baseExtend(a, b) {
    var objectKeys = keys(b),
        i = -1,
        il = objectKeys.length - 1,
        key;

    while (i++ < il) {
        key = objectKeys[i];
        a[key] = b[key];
    }
}


},
function(require, exports, module, global) {

var has = require(4),
    isNative = require(5),
    isObject = require(11);


var nativeKeys = Object.keys;


module.exports = keys;


function keys(obj) {
    return nativeKeys(isObject(obj) ? obj : Object(obj));
}

if (!isNative(nativeKeys)) {
    nativeKeys = function keys(obj) {
        var localHas = has,
            out = [],
            i = 0,
            key;

        for (key in obj) {
            if (localHas(obj, key)) {
                out[i++] = key;
            }
        }

        return out;
    };
}


},
function(require, exports, module, global) {

var hasOwnProp = Object.prototype.hasOwnProperty;


module.exports = has;


function has(obj, key) {
    return hasOwnProp.call(obj, key);
}


},
function(require, exports, module, global) {

var isFunction = require(6),
    escapeRegExp = require(8);


var reHostCtor = /^\[object .+?Constructor\]$/,

    functionToString = Function.prototype.toString,

    reNative = RegExp("^" +
        escapeRegExp(Object.prototype.toString)
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ),

    isHostObject;


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


module.exports = isNative;


function isNative(obj) {
    return obj && (
        isFunction(obj) ?
        reNative.test(functionToString.call(obj)) : (
            typeof(obj) === "object" && (
                (isHostObject(obj) ? reNative : reHostCtor).test(obj) || false
            )
        )
    ) || false;
}


},
function(require, exports, module, global) {

var isNullOrUndefined = require(7);


var Object_toString = Object.prototype.toString,
    isFunction;


if (Object_toString.call(function() {}) === "[object Object]") {
    isFunction = function isFunction(value) {
        return !isNullOrUndefined(value) && value.constructor === Function;
    };
} else if (typeof(/./) === "function" || (typeof(Uint8Array) !== "undefined" && typeof(Uint8Array) !== "function")) {
    isFunction = function isFunction(value) {
        return Object_toString.call(value) === "[object Function]";
    };
} else {
    isFunction = function isFunction(value) {
        return typeof(value) === "function" || false;
    };
}


module.exports = isFunction;


},
function(require, exports, module, global) {

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
function isNullOrUndefined(obj) {

    return (obj === null || obj === void 0);

}


},
function(require, exports, module, global) {

var toString = require(9);


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
function(require, exports, module, global) {

var isString = require(10),
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
function(require, exports, module, global) {

module.exports = isString;


function isString(obj) {
    return typeof(obj) === "string" || false;
}


},
function(require, exports, module, global) {

module.exports = isObject;


function isObject(obj) {
    var type = typeof(obj);
    return type === "function" || (obj && type === "object") || false;
}


},
function(require, exports, module, global) {

var create = require(13),
    extend = require(2),
    mixin = require(14),
    defineProperty = require(15);


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
function(require, exports, module, global) {

var create, F;


if (Object.create) {
    create = Object.create;
} else {
    F = function F() {};
    create = function create(object) {
        F.prototype = object;
        return new F();
    };
}


module.exports = create;


},
function(require, exports, module, global) {

var keys = require(3),
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
function(require, exports, module, global) {

var isFunction = require(6),
    isObjectLike = require(16),
    isNative = require(5);


var defineProperty;


if (!isNative(Object.defineProperty) || (function() {
        try {
            Object.defineProperty({}, "key", {});
        } catch (e) {
            return true;
        }
        return false;
    }())) {
    defineProperty = function defineProperty(object, name, value) {
        if (!isObjectLike(object)) {
            throw new TypeError("defineProperty called on non-object");
        }
        object[name] = isObjectLike(value) ? (isFunction(value.get) ? value.get : value.value) : value;
    };
} else {
    defineProperty = Object.defineProperty;
}


module.exports = defineProperty;


},
function(require, exports, module, global) {

module.exports = isObjectLike;


function isObjectLike(obj) {
    return (obj && typeof(obj) === "object") || false;
}


}], void 0, (new Function("return this;"))()));
