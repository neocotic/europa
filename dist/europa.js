/*
 * Copyright (C) 2016 Alasdair Mercer, Skelp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('europa', factory) :
	(global.europa = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var __moduleExports$3 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var __moduleExports$4 = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

	var __moduleExports$6 = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction = __moduleExports$6;
	var __moduleExports$5 = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

	var __moduleExports$10 = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject = __moduleExports$10;
	var __moduleExports$9 = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

	var __moduleExports$13 = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var __moduleExports$12 = !__moduleExports$13(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

var 	isObject$1 = __moduleExports$10;
var 	document$1 = __moduleExports$3.document;
	var is = isObject$1(document$1) && isObject$1(document$1.createElement);
	var __moduleExports$14 = function(it){
	  return is ? document$1.createElement(it) : {};
	};

	var __moduleExports$11 = !__moduleExports$12 && !__moduleExports$13(function(){
	  return Object.defineProperty(__moduleExports$14('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject$2 = __moduleExports$10;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var __moduleExports$15 = function(it, S){
	  if(!isObject$2(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject       = __moduleExports$9;
	var IE8_DOM_DEFINE = __moduleExports$11;
	var toPrimitive    = __moduleExports$15;
var 	dP$1             = Object.defineProperty;
	var f = __moduleExports$12 ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP$1(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

	var __moduleExports$8 = {
		f: f
	};

	var __moduleExports$16 = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

	var dP         = __moduleExports$8;
	var createDesc = __moduleExports$16;
	var __moduleExports$7 = __moduleExports$12 ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

var 	global$1    = __moduleExports$3;
	var core      = __moduleExports$4;
	var ctx       = __moduleExports$5;
	var hide      = __moduleExports$7;
	var PROTOTYPE = 'prototype';
	var $export$1 = function(type, name, source){
	  var IS_FORCED = type & $export$1.F
	    , IS_GLOBAL = type & $export$1.G
	    , IS_STATIC = type & $export$1.S
	    , IS_PROTO  = type & $export$1.P
	    , IS_BIND   = type & $export$1.B
	    , IS_WRAP   = type & $export$1.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export$1.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library` 
	var __moduleExports$2 = $export$1;

	var hasOwnProperty = {}.hasOwnProperty;
	var __moduleExports$20 = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

	var toString = {}.toString;

	var __moduleExports$23 = function(it){
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __moduleExports$23;
	var __moduleExports$22 = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var __moduleExports$24 = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

var 	IObject$1 = __moduleExports$22;
	var defined = __moduleExports$24;
	var __moduleExports$21 = function(it){
	  return IObject$1(defined(it));
	};

	// 7.1.4 ToInteger
	var ceil  = Math.ceil;
	var floor = Math.floor;
	var __moduleExports$27 = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var toInteger = __moduleExports$27;
	var min       = Math.min;
	var __moduleExports$26 = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

var 	toInteger$1 = __moduleExports$27;
	var max       = Math.max;
var 	min$1       = Math.min;
	var __moduleExports$28 = function(index, length){
	  index = toInteger$1(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

var 	toIObject$1 = __moduleExports$21;
	var toLength  = __moduleExports$26;
	var toIndex   = __moduleExports$28;
	var __moduleExports$25 = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject$1($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

var 	global$2 = __moduleExports$3;
	var SHARED = '__core-js_shared__';
	var store  = global$2[SHARED] || (global$2[SHARED] = {});
	var __moduleExports$30 = function(key){
	  return store[key] || (store[key] = {});
	};

	var id = 0;
	var px = Math.random();
	var __moduleExports$31 = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = __moduleExports$30('keys');
	var uid    = __moduleExports$31;
	var __moduleExports$29 = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

	var has          = __moduleExports$20;
	var toIObject    = __moduleExports$21;
	var arrayIndexOf = __moduleExports$25(false);
	var IE_PROTO     = __moduleExports$29('IE_PROTO');
	var __moduleExports$19 = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var __moduleExports$32 = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var $keys       = __moduleExports$19;
	var enumBugKeys = __moduleExports$32;
	var __moduleExports$18 = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var __moduleExports$33 = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var __moduleExports$34 = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)
	var defined$1 = __moduleExports$24;
	var __moduleExports$35 = function(it){
	  return Object(defined$1(it));
	};

	var getKeys  = __moduleExports$18;
	var gOPS     = __moduleExports$33;
	var pIE      = __moduleExports$34;
	var toObject = __moduleExports$35;
	var IObject  = __moduleExports$22;
	var $assign  = Object.assign;
	// should work with symbols and should have deterministic property order (V8 bug)
	var __moduleExports$17 = !$assign || __moduleExports$13(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)
	var $export = __moduleExports$2;

	$export($export.S + $export.F, 'Object', {assign: __moduleExports$17});

	var __moduleExports = __moduleExports$4.Object.assign;

	var assign = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign);

	var __moduleExports$40 = function(){ /* empty */ };

	var __moduleExports$41 = function(done, value){
	  return {value: value, done: !!done};
	};

	var __moduleExports$42 = {};

	var __moduleExports$44 = true;

	var __moduleExports$45 = __moduleExports$7;

var 	dP$2       = __moduleExports$8;
var 	anObject$2 = __moduleExports$9;
var 	getKeys$1  = __moduleExports$18;
	var __moduleExports$48 = __moduleExports$12 ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject$2(O);
	  var keys   = getKeys$1(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP$2.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var __moduleExports$49 = __moduleExports$3.document && document.documentElement;

var 	anObject$1    = __moduleExports$9;
	var dPs         = __moduleExports$48;
var 	enumBugKeys$1 = __moduleExports$32;
var 	IE_PROTO$1    = __moduleExports$29('IE_PROTO');
	var Empty       = function(){ /* empty */ };
var 	PROTOTYPE$1   = 'prototype';
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __moduleExports$14('iframe')
	    , i      = enumBugKeys$1.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __moduleExports$49.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE$1][enumBugKeys$1[i]];
	  return createDict();
	};

	var __moduleExports$47 = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE$1] = anObject$1(O);
	    result = new Empty;
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var __moduleExports$51 = createCommonjsModule(function (module) {
	var store      = __moduleExports$30('wks')
	  , uid        = __moduleExports$31
	  , Symbol     = __moduleExports$3.Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = __moduleExports$8.f;
var 	has$2 = __moduleExports$20;
	var TAG = __moduleExports$51('toStringTag');
	var __moduleExports$50 = function(it, tag, stat){
	  if(it && !has$2(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

	var create         = __moduleExports$47;
	var descriptor     = __moduleExports$16;
var 	setToStringTag$1 = __moduleExports$50;
	var IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__moduleExports$7(IteratorPrototype, __moduleExports$51('iterator'), function(){ return this; });

	var __moduleExports$46 = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag$1(Constructor, NAME + ' Iterator');
	};

var 	has$3         = __moduleExports$20;
var 	toObject$1    = __moduleExports$35;
var 	IE_PROTO$2    = __moduleExports$29('IE_PROTO');
	var ObjectProto = Object.prototype;
	var __moduleExports$52 = Object.getPrototypeOf || function(O){
	  O = toObject$1(O);
	  if(has$3(O, IE_PROTO$2))return O[IE_PROTO$2];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var LIBRARY        = __moduleExports$44;
var 	$export$2        = __moduleExports$2;
	var redefine       = __moduleExports$45;
var 	hide$2           = __moduleExports$7;
var 	has$1            = __moduleExports$20;
var 	Iterators$2      = __moduleExports$42;
	var $iterCreate    = __moduleExports$46;
	var setToStringTag = __moduleExports$50;
	var getPrototypeOf = __moduleExports$52;
	var ITERATOR       = __moduleExports$51('iterator');
	var BUGGY          = !([].keys && 'next' in [].keys());
	var FF_ITERATOR    = '@@iterator';
	var KEYS           = 'keys';
	var VALUES         = 'values';
	var returnThis = function(){ return this; };

	var __moduleExports$43 = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has$1(IteratorPrototype, ITERATOR))hide$2(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide$2(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators$2[NAME] = $default;
	  Iterators$2[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export$2($export$2.P + $export$2.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var addToUnscopables = __moduleExports$40;
	var step             = __moduleExports$41;
var 	Iterators$1        = __moduleExports$42;
var 	toIObject$2        = __moduleExports$21;
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var __moduleExports$39 = __moduleExports$43(Array, 'Array', function(iterated, kind){
	  this._t = toIObject$2(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators$1.Arguments = Iterators$1.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

var 	global$3        = __moduleExports$3;
var 	hide$1          = __moduleExports$7;
	var Iterators     = __moduleExports$42;
	var TO_STRING_TAG = __moduleExports$51('toStringTag');
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global$3[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide$1(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

var 	toInteger$2 = __moduleExports$27;
var 	defined$2   = __moduleExports$24;
	// true  -> String#at
	// false -> String#codePointAt
	var __moduleExports$54 = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined$2(that))
	      , i = toInteger$2(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var $at  = __moduleExports$54(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__moduleExports$43(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

var 	cof$1 = __moduleExports$23;
var 	TAG$1 = __moduleExports$51('toStringTag');
	var ARG = cof$1(function(){ return arguments; }()) == 'Arguments';
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	var __moduleExports$56 = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof$1(O)
	    // ES3 arguments fallback
	    : (B = cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var classof   = __moduleExports$56;
var 	ITERATOR$1  = __moduleExports$51('iterator');
var 	Iterators$3 = __moduleExports$42;
	var __moduleExports$55 = __moduleExports$4.isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR$1] !== undefined
	    || '@@iterator' in O
	    || Iterators$3.hasOwnProperty(classof(O));
	};

	var __moduleExports$37 = __moduleExports$55;

	var __moduleExports$36 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$37, __esModule: true };
	});

	unwrapExports(__moduleExports$36);

var 	classof$1   = __moduleExports$56;
var 	ITERATOR$2  = __moduleExports$51('iterator');
var 	Iterators$4 = __moduleExports$42;
	var __moduleExports$60 = __moduleExports$4.getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators$4[classof$1(it)];
	};

var 	anObject$3 = __moduleExports$9;
	var get      = __moduleExports$60;
	var __moduleExports$59 = __moduleExports$4.getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject$3(iterFn.call(it));
	};

	var __moduleExports$58 = __moduleExports$59;

	var __moduleExports$57 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$58, __esModule: true };
	});

	var _getIterator = unwrapExports(__moduleExports$57);

	var slicedToArray = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __moduleExports$36;

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __moduleExports$57;

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = unwrapExports(slicedToArray);



	var es6_object_toString = Object.freeze({

	});

	var hide$3 = __moduleExports$7;
	var __moduleExports$64 = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide$3(target, key, src[key]);
	  } return target;
	};

	var __moduleExports$65 = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error
	var anObject$4 = __moduleExports$9;
	var __moduleExports$67 = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject$4(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject$4(ret.call(iterator));
	    throw e;
	  }
	};

var 	Iterators$5  = __moduleExports$42;
var 	ITERATOR$3   = __moduleExports$51('iterator');
	var ArrayProto = Array.prototype;
	var __moduleExports$68 = function(it){
	  return it !== undefined && (Iterators$5.Array === it || ArrayProto[ITERATOR$3] === it);
	};

	var __moduleExports$66 = createCommonjsModule(function (module) {
	var ctx         = __moduleExports$5
	  , call        = __moduleExports$67
	  , isArrayIter = __moduleExports$68
	  , anObject    = __moduleExports$9
	  , toLength    = __moduleExports$26
	  , getIterFn   = __moduleExports$60
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;
	});

var 	global$4      = __moduleExports$3;
var 	core$1        = __moduleExports$4;
var 	dP$4          = __moduleExports$8;
var 	DESCRIPTORS$1 = __moduleExports$12;
	var SPECIES     = __moduleExports$51('species');
	var __moduleExports$69 = function(KEY){
	  var C = typeof core$1[KEY] == 'function' ? core$1[KEY] : global$4[KEY];
	  if(DESCRIPTORS$1 && C && !C[SPECIES])dP$4.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

	var __moduleExports$70 = createCommonjsModule(function (module) {
	var META     = __moduleExports$31('meta')
	  , isObject = __moduleExports$10
	  , has      = __moduleExports$20
	  , setDesc  = __moduleExports$8.f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__moduleExports$13(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};
	});

var 	dP$3          = __moduleExports$8.f;
var 	create$1      = __moduleExports$47;
	var redefineAll = __moduleExports$64;
var 	ctx$1         = __moduleExports$5;
	var anInstance  = __moduleExports$65;
var 	defined$3     = __moduleExports$24;
	var forOf       = __moduleExports$66;
	var $iterDefine = __moduleExports$43;
var 	step$1        = __moduleExports$41;
	var setSpecies  = __moduleExports$69;
	var DESCRIPTORS = __moduleExports$12;
	var fastKey     = __moduleExports$70.fastKey;
	var SIZE        = DESCRIPTORS ? '_s' : 'size';
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	var __moduleExports$63 = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create$1(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP$3(C.prototype, 'size', {
	      get: function(){
	        return defined$3(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step$1(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step$1(0, entry.k);
	      if(kind == 'values')return step$1(0, entry.v);
	      return step$1(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

	// 7.2.2 IsArray(argument)
	var cof$2 = __moduleExports$23;
	var __moduleExports$75 = Array.isArray || function isArray(arg){
	  return cof$2(arg) == 'Array';
	};

var 	isObject$4 = __moduleExports$10;
	var isArray  = __moduleExports$75;
var 	SPECIES$1  = __moduleExports$51('species');
	var __moduleExports$74 = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject$4(C)){
	      C = C[SPECIES$1];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __moduleExports$74;

	var __moduleExports$73 = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

var 	ctx$2      = __moduleExports$5;
var 	IObject$2  = __moduleExports$22;
var 	toObject$2 = __moduleExports$35;
var 	toLength$1 = __moduleExports$26;
	var asc      = __moduleExports$73;
	var __moduleExports$72 = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject$2($this)
	      , self   = IObject$2(O)
	      , f      = ctx$2(callbackfn, that, 3)
	      , length = toLength$1(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

var 	global$5         = __moduleExports$3;
var 	$export$3        = __moduleExports$2;
	var meta           = __moduleExports$70;
	var fails          = __moduleExports$13;
var 	hide$4           = __moduleExports$7;
var 	redefineAll$1    = __moduleExports$64;
var 	forOf$1          = __moduleExports$66;
var 	anInstance$1     = __moduleExports$65;
var 	isObject$3       = __moduleExports$10;
var 	setToStringTag$2 = __moduleExports$50;
var 	dP$5             = __moduleExports$8.f;
	var each           = __moduleExports$72(0);
var 	DESCRIPTORS$2    = __moduleExports$12;
	var __moduleExports$71 = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global$5[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS$2 || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll$1(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance$1(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf$1(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide$4(C.prototype, KEY, function(a, b){
	        anInstance$1(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject$3(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP$5(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag$2(C, NAME);

	  O[NAME] = C;
	  $export$3($export$3.G + $export$3.W + $export$3.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var strong = __moduleExports$63;

	// 23.1 Map Objects
	var __moduleExports$62 = __moduleExports$71('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

	var forOf$2 = __moduleExports$66;

	var __moduleExports$78 = function(iter, ITERATOR){
	  var result = [];
	  forOf$2(iter, false, result.push, result, ITERATOR);
	  return result;
	};

var 	classof$2 = __moduleExports$56;
	var from    = __moduleExports$78;
	var __moduleExports$77 = function(NAME){
	  return function toJSON(){
	    if(classof$2(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export$4  = __moduleExports$2;

	$export$4($export$4.P + $export$4.R, 'Map', {toJSON: __moduleExports$77('Map')});

	var __moduleExports$61 = __moduleExports$4.Map;

	var map = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$61, __esModule: true };
	});

	var _Map = unwrapExports(map);

	var classCallCheck = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var $export$5 = __moduleExports$2;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$5($export$5.S + $export$5.F * !__moduleExports$12, 'Object', {defineProperty: __moduleExports$8.f});

	var $Object = __moduleExports$4.Object;
	var __moduleExports$80 = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

	var __moduleExports$79 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$80, __esModule: true };
	});

	unwrapExports(__moduleExports$79);

	var createClass = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _defineProperty = __moduleExports$79;

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	var $defineProperty = __moduleExports$8;
var 	createDesc$1      = __moduleExports$16;
	var __moduleExports$84 = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc$1(0, value));
	  else object[index] = value;
	};

var 	ITERATOR$4     = __moduleExports$51('iterator');
	var SAFE_CLOSING = false;
	try {
	  var riter = [7][ITERATOR$4]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	var __moduleExports$85 = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR$4]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR$4] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

var 	ctx$3            = __moduleExports$5;
var 	$export$6        = __moduleExports$2;
var 	toObject$3       = __moduleExports$35;
	var call           = __moduleExports$67;
	var isArrayIter    = __moduleExports$68;
var 	toLength$2       = __moduleExports$26;
	var createProperty = __moduleExports$84;
	var getIterFn      = __moduleExports$60;
	$export$6($export$6.S + $export$6.F * !__moduleExports$85(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject$3(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx$3(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength$2(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var __moduleExports$82 = __moduleExports$4.Array.from;

	var from$1 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$82, __esModule: true };
	});

	var _Array$from = unwrapExports(from$1);

var 	$export$7 = __moduleExports$2;
var 	core$2    = __moduleExports$4;
var 	fails$1   = __moduleExports$13;
	var __moduleExports$88 = function(KEY, exec){
	  var fn  = (core$2.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export$7($export$7.S + $export$7.F * fails$1(function(){ fn(1); }), 'Object', exp);
	};

var 	toObject$4 = __moduleExports$35;
var 	$keys$1    = __moduleExports$18;
	__moduleExports$88('keys', function(){
	  return function keys(it){
	    return $keys$1(toObject$4(it));
	  };
	});

	var __moduleExports$86 = __moduleExports$4.Object.keys;

	var keys = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$86, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys);

var 	getKeys$2   = __moduleExports$18;
var 	toIObject$3 = __moduleExports$21;
	var isEnum    = __moduleExports$34.f;
	var __moduleExports$91 = function(isEntries){
	  return function(it){
	    var O      = toIObject$3(it)
	      , keys   = getKeys$2(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

var 	$export$8  = __moduleExports$2;
	var $entries = __moduleExports$91(true);
	$export$8($export$8.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

	var __moduleExports$89 = __moduleExports$4.Object.entries;

	var entries = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$89, __esModule: true };
	});

	var _Object$entries = unwrapExports(entries);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * Contains contextual information for a single transformation process.
	 *
	 * @public
	 */
	var Transformation = function () {

	  /**
	   * Creates an instance of {@link Transformation} for the specified <code>transformer</code> and using the
	   * <code>options</code> provided.
	   *
	   * @param {Transformer} transformer - the {@link Transformer} responsible for this transformation
	   * @param {Transformation~Options} options - the options to be used
	   * @public
	   */
	  function Transformation(transformer, options) {
	    _classCallCheck(this, Transformation);

	    /**
	     * The {@link Transformation} responsible for this {@link Transformation}.
	     *
	     * @public
	     * @type {Transformer}
	     */
	    this.transformer = transformer;

	    /**
	     * The options for this {@link Transformation}.
	     *
	     * @public
	     * @type {Transformation~Options}
	     */
	    this.options = options;

	    /**
	     * Indicates whether the buffer is at the start of the current line.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.atLeft = true;

	    /**
	     * Indicates whether any white space should be removed from the start of the next output.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.atNoWhiteSpace = true;

	    /**
	     * Indicates whether the buffer is at the start of a paragraph.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.atParagraph = true;

	    /**
	     * The transformation output buffer to which the Markdown will be written.
	     *
	     * @public
	     * @type {string}
	     */
	    this.buffer = '';

	    /**
	     * Indicates whether the buffer is currently within a code block.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.inCodeBlock = false;

	    /**
	     * Indicates whether the buffer is currently within an ordered list.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.inOrderedList = false;

	    /**
	     * Indicates whether the buffer is currently within a preformatted block.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.inPreformattedBlock = false;

	    /**
	     * The last string to be output next to the buffer.
	     *
	     * @public
	     * @type {string}
	     */
	    this.last = null;

	    /**
	     * The start of the current line.
	     *
	     * @public
	     * @type {string}
	     */
	    this.left = '\n';

	    /**
	     * The depth of nested lists.
	     *
	     * @public
	     * @type {number}
	     */
	    this.listDepth = 0;

	    /**
	     * The one-based index for the current list item within the current list.
	     *
	     * @public
	     * @type {number}
	     */
	    this.listIndex = 1;

	    /**
	     * The current stack of plugins.
	     *
	     * @public
	     * @type {Plugin[]}
	     */
	    this.pluginStack = [];

	    /**
	     * Indicates whether transformation of the children of the current element should be skippped.
	     *
	     * @public
	     * @type {boolean}
	     */
	    this.skipChildren = false;

	    /**
	     * The current document for this {@link Transformation}.
	     *
	     * @private
	     * @type {HTMLDocument}
	     */
	    this._document = transformer.document;

	    /**
	     * The current element for this {@link Transformation}.
	     *
	     * @private
	     * @type {Element}
	     */
	    this._element = null;

	    /**
	     * The name of the tag for the current element for this {@link Transformation}.
	     *
	     * @private
	     * @type {string}
	     */
	    this._tagName = null;

	    /**
	     * The current window for this {@link Transformation}.
	     *
	     * @private
	     * @type {Window}
	     */
	    this._window = transformer.window;
	  }

	  /**
	   * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
	   *
	   * @param {string} string - the string to be appended
	   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	   * @public
	   */


	  _createClass(Transformation, [{
	    key: 'append',
	    value: function append(string) {
	      if (this.last != null) {
	        this.buffer += this.last;
	      }

	      this.last = string;

	      return this;
	    }

	    /**
	     * Appends a paragraph to the output buffer.
	     *
	     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: 'appendParagraph',
	    value: function appendParagraph() {
	      if (this.atParagraph) {
	        return this;
	      }

	      if (!this.atLeft) {
	        this.append(this.left);

	        this.atLeft = true;
	      }

	      this.append(this.left);

	      this.atNoWhiteSpace = true;
	      this.atParagraph = true;

	      return this;
	    }

	    /**
	     * Outputs the specified <code>string</code> to the buffer.
	     *
	     * Optionally, <code>string</code> can be "cleaned" before being output. Doing so will replace any certain special
	     * characters as well as some white space.
	     *
	     * @param {string} string - the string to be output
	     * @param {boolean} [clean=false] - <code>true</code> to clean <code>string</code>; otherwise <code>false</code>
	     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: 'output',
	    value: function output(string, clean) {
	      if (!string) {
	        return this;
	      }

	      string = string.replace(/\r\n/g, '\n');

	      if (clean) {
	        string = string.replace(/\n([ \t]*\n)+/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]+/g, ' ');

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _getIterator(_Object$entries(Transformation.REPLACEMENTS)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);

	            var key = _step$value[0];
	            var expression = _step$value[1];

	            string = string.replace(Transformation.REPLACEMENTS_REGEXP[key], expression);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }

	      if (!this.inPreformattedBlock) {
	        if (this.atNoWhiteSpace) {
	          string = string.replace(/^[ \t\n]+/, '');
	        } else if (/^[ \t]*\n/.test(string)) {
	          string = string.replace(/^[ \t\n]+/, '\n');
	        } else {
	          string = string.replace(/^[ \t]+/, ' ');
	        }
	      }

	      if (!string) {
	        return this;
	      }

	      this.atLeft = /\n$/.test(string);
	      this.atNoWhiteSpace = /[ \t\n]$/.test(string);
	      this.atParagraph = /\n{2}$/.test(string);

	      return this.append(string.replace(/\n/g, this.left));
	    }

	    /**
	     * Replaces the start of the current line with the <code>string</code> provided.
	     *
	     * @param {string} string - the string to replace the start of the current line
	     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: 'replaceLeft',
	    value: function replaceLeft(string) {
	      if (!this.atLeft) {
	        this.append(this.left.replace(/[ ]{2,4}$/, string));

	        this.atLeft = true;
	        this.atNoWhiteSpace = true;
	        this.atParagraph = true;
	      } else if (this.last) {
	        this.last = this.last.replace(/[ ]{2,4}$/, string);
	      }

	      return this;
	    }

	    /**
	     * Returns the HTML document for this {@link Transformation}.
	     *
	     * This may not be the same document as is associated with the {@link Transformer} as this document may be nested
	     * (e.g. a frame).
	     *
	     * @return {HTMLDocument} The HTML document.
	     * @public
	     */

	  }, {
	    key: 'document',
	    get: function get() {
	      return this._document;
	    }

	    /**
	     * Returns the element for this {@link Transformation}.
	     *
	     * @return {Element} The element.
	     * @public
	     */

	  }, {
	    key: 'element',
	    get: function get() {
	      return this._element;
	    }

	    /**
	     * Sets the element for this {@link Transformation} to <code>value</code>.
	     *
	     * @param {Element} value - the element to be set
	     * @public
	     */
	    ,
	    set: function set(value) {
	      this._element = value;
	      this._tagName = value && value.tagName ? value.tagName.toLowerCase() : null;
	    }

	    /**
	     * Returns the name of the tag for this {@link Transformation}.
	     *
	     * This will be the lower case tag name.
	     *
	     * @return {string} The tag name.
	     * @public
	     */

	  }, {
	    key: 'tagName',
	    get: function get() {
	      return this._tagName;
	    }

	    /**
	     * Returns the window for this {@link Transformation}.
	     *
	     * This may not be the same window as is associated with the {@link Transformer} as this window may be nested (e.g. a
	     * frame).
	     *
	     * @return {Window} The window.
	     * @public
	     */

	  }, {
	    key: 'window',
	    get: function get() {
	      return this._window;
	    }

	    /**
	     * Sets the window for this {@link Transformation} to <code>value</code>.
	     *
	     * @param {Window} value - the window to be set
	     * @public
	     */
	    ,
	    set: function set(value) {
	      this._window = value;
	      this._document = value ? value.document : null;
	    }
	  }]);

	  return Transformation;
	}();

	/**
	 * A map of special characters and their replacements.
	 *
	 * @public
	 * @static
	 * @type {Object<string, string>}
	 */


	Transformation.REPLACEMENTS = {
	  '\\\\': '\\\\',
	  '\\[': '\\[',
	  '\\]': '\\]',
	  '>': '\\>',
	  '_': '\\_',
	  '\\*': '\\*',
	  '`': '\\`',
	  '#': '\\#',
	  '([0-9])\\.(\\s|$)': '$1\\.$2',
	  '©': '(c)',
	  '®': '(r)',
	  '™': '(tm)',
	  ' ': ' ',
	  '·': '\\*',
	  ' ': ' ',
	  ' ': ' ',
	  ' ': ' ',
	  '‘': '\'',
	  '’': '\'',
	  '“': '"',
	  '”': '"',
	  '…': '...',
	  '–': '--',
	  '—': '---'
	};

	/**
	 * A map of special characters and the regular expression used to identify them.
	 *
	 * @public
	 * @static
	 * @type {Object<string, RegExp>}
	 */
	Transformation.REPLACEMENTS_REGEXP = {};
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
	  for (var _iterator2 = _getIterator(_Object$keys(Transformation.REPLACEMENTS)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	    var key = _step2.value;

	    Transformation.REPLACEMENTS_REGEXP[key] = new RegExp(key, 'g');
	  }
	} catch (err) {
	  _didIteratorError2 = true;
	  _iteratorError2 = err;
	} finally {
	  try {
	    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	      _iterator2.return();
	    }
	  } finally {
	    if (_didIteratorError2) {
	      throw _iteratorError2;
	    }
	  }
	}

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * Transforms an HTML string or DOM element into Markdown.
	 *
	 * @public
	 */

	var Transformer = function () {

	  /**
	   * Creates an instance of {@link Transformer} using the specified <code>window</code> and <code>plugins</code>.
	   *
	   * @param {Window} window - the <code>Window</code> to be used
	   * @param {Map<string, Plugin>} plugins - the plugins to be used
	   * @public
	   */
	  function Transformer(window, plugins) {
	    _classCallCheck(this, Transformer);

	    /**
	     * The <code>Window</code> for this {@link Transformer}.
	     *
	     * @public
	     * @type {Window}
	     */
	    this.window = window;

	    /**
	     * The <code>HTMLDocument</code> for this {@link Transformer}.
	     *
	     * @public
	     * @type {HTMLDocument}
	     */
	    this.document = window.document;

	    /**
	     * The plugins for this {@link Transformer}.
	     *
	     * @private
	     * @type {Map<string, Plugin>}
	     */
	    this._plugins = plugins;
	  }

	  /**
	   * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
	   *
	   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
	   * Markdown.
	   *
	   * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
	   * @param {Transformation~Options} options - the options to be used
	   * @return {string} The transformed Markdown.
	   * @public
	   */


	  _createClass(Transformer, [{
	    key: 'transform',
	    value: function transform(html, options) {
	      if (!html) {
	        return '';
	      }

	      var root = void 0;
	      if (typeof html === 'string') {
	        root = this.document.createElement('div');
	        root.innerHTML = html;
	      } else {
	        root = html;
	      }

	      var transformation = new Transformation(this, options);

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = _getIterator(this._plugins.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var plugin = _step.value;

	          plugin.beforeAll(transformation);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      this.transformElement(root, transformation);

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = _getIterator(this._plugins.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _plugin = _step2.value;

	          _plugin.afterAll(transformation);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return transformation.append('').buffer.trim();
	    }

	    /**
	     * Transforms the specified <code>element</code> and it's children into Markdown using the <code>transformation</code>
	     * provided.
	     *
	     * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
	     *
	     * @param {Element} element - the element to be transformed into Markdown as well as it's children
	     * @param {Transformation} transformation - the current {@link Transformation}
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: 'transformElement',
	    value: function transformElement(element, transformation) {
	      if (!element) {
	        return;
	      }

	      if (element.nodeType === this.window.Node.ELEMENT_NODE) {
	        if (!this._isVisible(element)) {
	          return;
	        }

	        transformation.element = element;

	        var context = new _Map();
	        var plugin = this._plugins.get(transformation.tagName);
	        if (plugin) {
	          transformation.pluginStack.push(plugin);

	          plugin.before(transformation, context);
	          plugin.transform(transformation, context);
	        }

	        if (!transformation.skipChildren) {
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;

	          try {
	            for (var _iterator3 = _getIterator(_Array$from(element.childNodes)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              var child = _step3.value;

	              this.transformElement(child, transformation);
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }
	        }

	        if (plugin) {
	          plugin.after(transformation, context);

	          transformation.pluginStack.pop();
	        }
	      } else if (element.nodeType === this.window.Node.TEXT_NODE) {
	        var value = element.nodeValue || '';

	        if (transformation.inPreformattedBlock) {
	          transformation.output(value);
	        } else if (transformation.inCodeBlock) {
	          transformation.output(value.replace(/`/g, '\\`'));
	        } else {
	          transformation.output(value, true);
	        }
	      }
	    }

	    /**
	     * Checks whether the specified <code>element</code> is currently visible.
	     *
	     * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
	     * cases.
	     *
	     * @param {Element} element - the element whose visibility is to be checked
	     * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
	     * @private
	     */

	  }, {
	    key: '_isVisible',
	    value: function _isVisible(element) {
	      var style = this.window.getComputedStyle(element);

	      return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
	    }
	  }]);

	  return Transformer;
	}();

var 	toObject$5        = __moduleExports$35;
	var $getPrototypeOf = __moduleExports$52;
	__moduleExports$88('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject$5(it));
	  };
	});

	var __moduleExports$93 = __moduleExports$4.Object.getPrototypeOf;

	var __moduleExports$92 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$93, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(__moduleExports$92);

	var f$3 = __moduleExports$51;

	var __moduleExports$98 = {
		f: f$3
	};

	var __moduleExports$97 = __moduleExports$98.f('iterator');

	var __moduleExports$96 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$97, __esModule: true };
	});

	unwrapExports(__moduleExports$96);

var 	global$7         = __moduleExports$3;
var 	core$3           = __moduleExports$4;
var 	LIBRARY$1        = __moduleExports$44;
var 	wksExt$1         = __moduleExports$98;
var 	defineProperty$1 = __moduleExports$8.f;
	var __moduleExports$102 = function(name){
	  var $Symbol = core$3.Symbol || (core$3.Symbol = LIBRARY$1 ? {} : global$7.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$1($Symbol, name, {value: wksExt$1.f(name)});
	};

var 	getKeys$3   = __moduleExports$18;
var 	toIObject$5 = __moduleExports$21;
	var __moduleExports$103 = function(object, el){
	  var O      = toIObject$5(object)
	    , keys   = getKeys$3(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

var 	getKeys$4 = __moduleExports$18;
var 	gOPS$1    = __moduleExports$33;
var 	pIE$1     = __moduleExports$34;
	var __moduleExports$104 = function(it){
	  var result     = getKeys$4(it)
	    , getSymbols = gOPS$1.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE$1.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

var 	$keys$3      = __moduleExports$19;
	var hiddenKeys = __moduleExports$32.concat('length', 'prototype');
	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys$3(O, hiddenKeys);
	};

	var __moduleExports$106 = {
		f: f$5
	};

var 	toIObject$6 = __moduleExports$21;
var 	gOPN$1      = __moduleExports$106.f;
var 	toString$1  = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN$1(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	var f$4 = function getOwnPropertyNames(it){
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$6(it));
	};

	var __moduleExports$105 = {
		f: f$4
	};

var 	pIE$2            = __moduleExports$34;
var 	createDesc$3     = __moduleExports$16;
var 	toIObject$7      = __moduleExports$21;
var 	toPrimitive$2    = __moduleExports$15;
var 	has$5            = __moduleExports$20;
var 	IE8_DOM_DEFINE$1 = __moduleExports$11;
var 	gOPD$1           = Object.getOwnPropertyDescriptor;
	var f$6 = __moduleExports$12 ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
	  O = toIObject$7(O);
	  P = toPrimitive$2(P, true);
	  if(IE8_DOM_DEFINE$1)try {
	    return gOPD$1(O, P);
	  } catch(e){ /* empty */ }
	  if(has$5(O, P))return createDesc$3(!pIE$2.f.call(O, P), O[P]);
	};

	var __moduleExports$107 = {
		f: f$6
	};

var 	global$6         = __moduleExports$3;
var 	has$4            = __moduleExports$20;
var 	DESCRIPTORS$3    = __moduleExports$12;
var 	$export$9        = __moduleExports$2;
var 	redefine$1       = __moduleExports$45;
	var META           = __moduleExports$70.KEY;
	var $fails         = __moduleExports$13;
var 	shared$1         = __moduleExports$30;
var 	setToStringTag$3 = __moduleExports$50;
var 	uid$1            = __moduleExports$31;
	var wks            = __moduleExports$51;
	var wksExt         = __moduleExports$98;
	var wksDefine      = __moduleExports$102;
	var keyOf          = __moduleExports$103;
	var enumKeys       = __moduleExports$104;
var 	isArray$1        = __moduleExports$75;
var 	anObject$5       = __moduleExports$9;
var 	toIObject$4      = __moduleExports$21;
var 	toPrimitive$1    = __moduleExports$15;
var 	createDesc$2     = __moduleExports$16;
	var _create        = __moduleExports$47;
	var gOPNExt        = __moduleExports$105;
	var $GOPD          = __moduleExports$107;
	var $DP            = __moduleExports$8;
var 	$keys$2          = __moduleExports$18;
	var gOPD           = $GOPD.f;
var 	dP$6             = $DP.f;
	var gOPN           = gOPNExt.f;
	var $Symbol        = global$6.Symbol;
	var $JSON          = global$6.JSON;
	var _stringify     = $JSON && $JSON.stringify;
var 	PROTOTYPE$2      = 'prototype';
	var HIDDEN         = wks('_hidden');
	var TO_PRIMITIVE   = wks('toPrimitive');
var 	isEnum$1         = {}.propertyIsEnumerable;
	var SymbolRegistry = shared$1('symbol-registry');
	var AllSymbols     = shared$1('symbols');
	var OPSymbols      = shared$1('op-symbols');
var 	ObjectProto$1    = Object[PROTOTYPE$2];
	var USE_NATIVE     = typeof $Symbol == 'function';
	var QObject        = global$6.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS$3 && $fails(function(){
	  return _create(dP$6({}, 'a', {
	    get: function(){ return dP$6(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto$1, key);
	  if(protoDesc)delete ObjectProto$1[key];
	  dP$6(it, key, D);
	  if(protoDesc && it !== ObjectProto$1)dP$6(ObjectProto$1, key, protoDesc);
	} : dP$6;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty$1 = function defineProperty(it, key, D){
	  if(it === ObjectProto$1)$defineProperty$1(OPSymbols, key, D);
	  anObject$5(it);
	  key = toPrimitive$1(key, true);
	  anObject$5(D);
	  if(has$4(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has$4(it, HIDDEN))dP$6(it, HIDDEN, createDesc$2(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has$4(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc$2(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP$6(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject$5(it);
	  var keys = enumKeys(P = toIObject$4(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty$1(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum$1.call(this, key = toPrimitive$1(key, true));
	  if(this === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return false;
	  return E || !has$4(this, key) || !has$4(AllSymbols, key) || has$4(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject$4(it);
	  key = toPrimitive$1(key, true);
	  if(it === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has$4(AllSymbols, key) && !(has$4(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject$4(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has$4(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto$1
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject$4(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has$4(AllSymbols, key = names[i++]) && (IS_OP ? has$4(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid$1(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto$1)$set.call(OPSymbols, value);
	      if(has$4(this, HIDDEN) && has$4(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc$2(1, value));
	    };
	    if(DESCRIPTORS$3 && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine$1($Symbol[PROTOTYPE$2], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty$1;
	  __moduleExports$106.f = gOPNExt.f = $getOwnPropertyNames;
	  __moduleExports$34.f  = $propertyIsEnumerable;
	  __moduleExports$33.f = $getOwnPropertySymbols;

	  if(DESCRIPTORS$3 && !__moduleExports$44){
	    redefine$1(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export$9($export$9.G + $export$9.W + $export$9.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys$2(wks.store), i$1 = 0; symbols.length > i$1; )wksDefine(symbols[i$1++]);

	$export$9($export$9.S + $export$9.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has$4(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export$9($export$9.S + $export$9.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$1,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$9($export$9.S + $export$9.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray$1(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || __moduleExports$7($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag$3($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag$3(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag$3(global$6.JSON, 'JSON', true);

	__moduleExports$102('asyncIterator');

	__moduleExports$102('observable');

	var __moduleExports$100 = __moduleExports$4.Symbol;

	var __moduleExports$99 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$100, __esModule: true };
	});

	unwrapExports(__moduleExports$99);

	var __moduleExports$95 = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _iterator = __moduleExports$96;

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __moduleExports$99;

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	unwrapExports(__moduleExports$95);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _typeof2 = __moduleExports$95;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

var 	isObject$5 = __moduleExports$10;
var 	anObject$6 = __moduleExports$9;
	var check = function(O, proto){
	  anObject$6(O);
	  if(!isObject$5(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	var __moduleExports$113 = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __moduleExports$5(Function.call, __moduleExports$107.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export$10 = __moduleExports$2;
	$export$10($export$10.S, 'Object', {setPrototypeOf: __moduleExports$113.set});

	var __moduleExports$111 = __moduleExports$4.Object.setPrototypeOf;

	var __moduleExports$110 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$111, __esModule: true };
	});

	unwrapExports(__moduleExports$110);

	var $export$11 = __moduleExports$2
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$11($export$11.S, 'Object', {create: __moduleExports$47});

	var $Object$1 = __moduleExports$4.Object;
	var __moduleExports$115 = function create(P, D){
	  return $Object$1.create(P, D);
	};

	var __moduleExports$114 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$115, __esModule: true };
	});

	unwrapExports(__moduleExports$114);

	var inherits = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __moduleExports$110;

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __moduleExports$114;

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __moduleExports$95;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-empty-function: "off", no-unused-vars: "off" */

	/**
	 * A plugin that can tap into multiple parts in the transformation process.
	 *
	 * @public
	 */
	var Plugin = function () {
	  function Plugin() {
	    _classCallCheck(this, Plugin);
	  }

	  _createClass(Plugin, [{
	    key: "after",


	    /**
	     * Called after {@link Plugin#transform} <b>and</b> only once all children elements have been transformed as well,
	     * provided they weren't skipped, and intended for tidying up after the transformation.
	     *
	     * <code>context</code> can be used to receive any state for a single element transformation from
	     * {@link Plugin#before} and {@link Plugin#transform}.
	     *
	     * @param {Transformation} transformation - the current {@link Transformation}
	     * @param {Map<string, *>} context - the current context for this {@link Plugin}
	     * @return {void}
	     * @public
	     */
	    value: function after(transformation, context) {}

	    /**
	     * Called before any elements are transformed and intended to setup this {@link Plugin} initially.
	     *
	     * @param {Transformation} transformation - the current {@link Transformation}.
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: "afterAll",
	    value: function afterAll(transformation) {}

	    /**
	     * Called immediately before {@link Plugin#transform} and intended for preparing this {@link Plugin} for
	     * transformation.
	     *
	     * <code>context</code> can be used to pass any state for a single element transformation to {@link Plugin#transform}
	     * and then to {@link Plugin#after}.
	     *
	     * @param {Transformation} transformation - the current {@link Transformation}
	     * @param {Map<string, *>} context - the current context for this {@link Plugin}
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: "before",
	    value: function before(transformation, context) {}

	    /**
	     * Called after all elements have been transformed and intended to completing any steps for this {@link Plugin}.
	     *
	     * @param {Transformation} transformation - the current {@link Transformation}
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: "beforeAll",
	    value: function beforeAll(transformation) {}

	    /**
	     * Transforms the current element within the specified <code>transformation</code> which can be used to provide
	     * control over the transformation.
	     *
	     * <code>context</code> can be used to pass any state for a single element transformation from {@link Plugin#before}
	     * to {@link Plugin#after}.
	     *
	     * @param {Transformation} transformation - the current {@link Transformation}
	     * @param {Map<string, *>} context - the current context for this {@link Plugin}
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: "transform",
	    value: function transform(transformation, context) {}
	  }]);

	  return Plugin;
	}();

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
	 * text.
	 *
	 * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
	 * the URL will be exactly as it is in the <code>href</code> attribute.
	 *
	 * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
	 * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
	 * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var AnchorPlugin = function (_Plugin) {
	  _inherits(AnchorPlugin, _Plugin);

	  function AnchorPlugin() {
	    _classCallCheck(this, AnchorPlugin);

	    return _possibleConstructorReturn(this, (AnchorPlugin.__proto__ || _Object$getPrototypeOf(AnchorPlugin)).apply(this, arguments));
	  }

	  _createClass(AnchorPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      if (context.has('value')) {
	        transformation.output(']' + context.get('value'));
	      }
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'afterAll',
	    value: function afterAll(transformation) {
	      if (!this._anchors.length) {
	        return;
	      }

	      transformation.append('\n\n');

	      for (var i = 0; i < this._anchors.length; i++) {
	        transformation.append('[anchor' + i + ']: ' + this._anchors[i] + '\n');
	      }
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'beforeAll',
	    value: function beforeAll(transformation) {
	      /**
	       * The anchor values (which will contain the HREF and any title) mapped to their index.
	       *
	       * This is only used when the <code>inline</code> option is enabled.
	       *
	       * @private
	       * @type {Map<string, number>}
	       */
	      this._anchorMap = new _Map();

	      /**
	       * The indexed anchor values.
	       *
	       * This is only used when the <code>inline</code> option is enabled.
	       *
	       * @private
	       * @type {string[]}
	       */
	      this._anchors = [];
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      var element = transformation.element;
	      var options = transformation.options;

	      var href = options.absolute ? element.href : element.getAttribute('href');
	      if (!href) {
	        return;
	      }

	      var title = element.getAttribute('title');
	      var value = title ? href + ' "' + title + '"' : href;

	      if (options.inline) {
	        context.set('value', '(' + value + ')');
	      } else {
	        var index = this._anchorMap.get(value);
	        if (index == null) {
	          index = this._anchors.push(value) - 1;

	          this._anchorMap.set(value, index);
	        }

	        context.set('value', '[anchor' + index + ']');
	      }

	      transformation.output('[');

	      transformation.atNoWhiteSpace = true;
	    }
	  }]);

	  return AnchorPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs the contents in a block quote.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var BlockQuotePlugin = function (_Plugin) {
	  _inherits(BlockQuotePlugin, _Plugin);

	  function BlockQuotePlugin() {
	    _classCallCheck(this, BlockQuotePlugin);

	    return _possibleConstructorReturn(this, (BlockQuotePlugin.__proto__ || _Object$getPrototypeOf(BlockQuotePlugin)).apply(this, arguments));
	  }

	  _createClass(BlockQuotePlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.atLeft = false;
	      transformation.atParagraph = false;
	      transformation.left = context.get('previousLeft');

	      transformation.appendParagraph();
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousLeft', transformation.left);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      var value = '> ';

	      transformation.left += value;

	      if (transformation.atParagraph) {
	        transformation.append(value);
	      } else {
	        transformation.appendParagraph();
	      }
	    }
	  }]);

	  return BlockQuotePlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs an inline line break.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var BreakPlugin = function (_Plugin) {
	  _inherits(BreakPlugin, _Plugin);

	  function BreakPlugin() {
	    _classCallCheck(this, BreakPlugin);

	    return _possibleConstructorReturn(this, (BreakPlugin.__proto__ || _Object$getPrototypeOf(BreakPlugin)).apply(this, arguments));
	  }

	  _createClass(BreakPlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      transformation.append('  ' + transformation.left);

	      transformation.atLeft = true;
	      transformation.atNoWhiteSpace = true;
	    }
	  }]);

	  return BreakPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * A {@link Plugin} which outputs the contents in a code block.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var CodePlugin = function (_Plugin) {
	  _inherits(CodePlugin, _Plugin);

	  function CodePlugin() {
	    _classCallCheck(this, CodePlugin);

	    return _possibleConstructorReturn(this, (CodePlugin.__proto__ || _Object$getPrototypeOf(CodePlugin)).apply(this, arguments));
	  }

	  _createClass(CodePlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      if (!context.get('skipped')) {
	        transformation.inCodeBlock = context.get('previousInCodeBlock');

	        transformation.output('`');
	      }
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousInCodeBlock', transformation.inCodeBlock);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      if (transformation.inPreformattedBlock) {
	        context.set('skipped', true);
	      } else {
	        transformation.output('`');

	        transformation.inCodeBlock = true;
	      }
	    }
	  }]);

	  return CodePlugin;
	}(Plugin);

var 	toIObject$8                 = __moduleExports$21;
var 	$getOwnPropertyDescriptor$1 = __moduleExports$107.f;
	__moduleExports$88('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor$1(toIObject$8(it), key);
	  };
	});

	var $Object$2 = __moduleExports$4.Object;
	var __moduleExports$118 = function getOwnPropertyDescriptor(it, key){
	  return $Object$2.getOwnPropertyDescriptor(it, key);
	};

	var __moduleExports$117 = createCommonjsModule(function (module) {
	module.exports = { "default": __moduleExports$118, __esModule: true };
	});

	unwrapExports(__moduleExports$117);

	var get$1 = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __moduleExports$92;

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __moduleExports$117;

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};
	});

	var _get = unwrapExports(get$1);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs as strong text.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var StrongPlugin = function (_Plugin) {
	  _inherits(StrongPlugin, _Plugin);

	  function StrongPlugin() {
	    _classCallCheck(this, StrongPlugin);

	    return _possibleConstructorReturn(this, (StrongPlugin.__proto__ || _Object$getPrototypeOf(StrongPlugin)).apply(this, arguments));
	  }

	  _createClass(StrongPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.output('**');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      transformation.output('**');

	      transformation.atNoWhiteSpace = true;
	    }
	  }]);

	  return StrongPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * A {@link Plugin} which outputs a definition term as strong text.
	 *
	 * @public
	 * @extends {StrongPlugin}
	 */

	var DefinitionTermPlugin = function (_StrongPlugin) {
	  _inherits(DefinitionTermPlugin, _StrongPlugin);

	  function DefinitionTermPlugin() {
	    _classCallCheck(this, DefinitionTermPlugin);

	    return _possibleConstructorReturn(this, (DefinitionTermPlugin.__proto__ || _Object$getPrototypeOf(DefinitionTermPlugin)).apply(this, arguments));
	  }

	  _createClass(DefinitionTermPlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      transformation.appendParagraph();

	      _get(DefinitionTermPlugin.prototype.__proto__ || _Object$getPrototypeOf(DefinitionTermPlugin.prototype), 'transform', this).call(this, transformation, context);
	    }
	  }]);

	  return DefinitionTermPlugin;
	}(StrongPlugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs a details section.
	 *
	 * If the details has an <code>open</code> attribute then all of its children are transformed. Otherwise, only the
	 * nested <code>summary</code>, if any, will be transformed.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var DetailsPlugin = function (_Plugin) {
	  _inherits(DetailsPlugin, _Plugin);

	  function DetailsPlugin() {
	    _classCallCheck(this, DetailsPlugin);

	    return _possibleConstructorReturn(this, (DetailsPlugin.__proto__ || _Object$getPrototypeOf(DetailsPlugin)).apply(this, arguments));
	  }

	  _createClass(DetailsPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.skipChildren = context.get('previousSkipChildren');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousSkipChildren', transformation.skipChildren);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      var element = transformation.element;


	      transformation.appendParagraph();

	      if (!element.hasAttribute('open')) {
	        var summary = element.querySelector('summary');
	        transformation.transformer.transformElement(summary, transformation);

	        transformation.skipChildren = true;
	      }
	    }
	  }]);

	  return DetailsPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs as emphasised text.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var EmphasisPlugin = function (_Plugin) {
	  _inherits(EmphasisPlugin, _Plugin);

	  function EmphasisPlugin() {
	    _classCallCheck(this, EmphasisPlugin);

	    return _possibleConstructorReturn(this, (EmphasisPlugin.__proto__ || _Object$getPrototypeOf(EmphasisPlugin)).apply(this, arguments));
	  }

	  _createClass(EmphasisPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.output('_');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      transformation.output('_');

	      transformation.atNoWhiteSpace = true;
	    }
	  }]);

	  return EmphasisPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which simply ensures that all children elements are not transformed.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var EmptyPlugin = function (_Plugin) {
	  _inherits(EmptyPlugin, _Plugin);

	  function EmptyPlugin() {
	    _classCallCheck(this, EmptyPlugin);

	    return _possibleConstructorReturn(this, (EmptyPlugin.__proto__ || _Object$getPrototypeOf(EmptyPlugin)).apply(this, arguments));
	  }

	  _createClass(EmptyPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.skipChildren = context.get('previousSkipChildren');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousSkipChildren', transformation.skipChildren);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      transformation.skipChildren = true;
	    }
	  }]);

	  return EmptyPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs a heading of various levels.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var HeadingPlugin = function (_Plugin) {
	  _inherits(HeadingPlugin, _Plugin);

	  function HeadingPlugin() {
	    _classCallCheck(this, HeadingPlugin);

	    return _possibleConstructorReturn(this, (HeadingPlugin.__proto__ || _Object$getPrototypeOf(HeadingPlugin)).apply(this, arguments));
	  }

	  _createClass(HeadingPlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      var level = parseInt(transformation.tagName.match(/([1-6])$/)[1], 10);

	      transformation.appendParagraph();

	      var heading = '';
	      for (var i = 0; i < level; i++) {
	        heading += '#';
	      }

	      transformation.output(heading + ' ');
	    }
	  }]);

	  return HeadingPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs a horizontal rule.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var HorizontalRulePlugin = function (_Plugin) {
	  _inherits(HorizontalRulePlugin, _Plugin);

	  function HorizontalRulePlugin() {
	    _classCallCheck(this, HorizontalRulePlugin);

	    return _possibleConstructorReturn(this, (HorizontalRulePlugin.__proto__ || _Object$getPrototypeOf(HorizontalRulePlugin)).apply(this, arguments));
	  }

	  _createClass(HorizontalRulePlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      transformation.appendParagraph().output('---').appendParagraph();
	    }
	  }]);

	  return HorizontalRulePlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which extracts the URL from an image.
	 *
	 * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
	 * the URL will be exactly as it is in the <code>src</code> attribute.
	 *
	 * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
	 * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
	 * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var ImagePlugin = function (_Plugin) {
	  _inherits(ImagePlugin, _Plugin);

	  function ImagePlugin() {
	    _classCallCheck(this, ImagePlugin);

	    return _possibleConstructorReturn(this, (ImagePlugin.__proto__ || _Object$getPrototypeOf(ImagePlugin)).apply(this, arguments));
	  }

	  _createClass(ImagePlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.skipChildren = context.get('previousSkipChildren');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'afterAll',
	    value: function afterAll(transformation) {
	      if (!this._images.length) {
	        return;
	      }

	      transformation.append('\n\n');

	      for (var i = 0; i < this._images.length; i++) {
	        transformation.append('[image' + i + ']: ' + this._images[i] + '\n');
	      }
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousSkipChildren', transformation.skipChildren);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'beforeAll',
	    value: function beforeAll(transformation) {
	      /**
	       * The image values (which will contain the HREF) mapped to their index.
	       *
	       * This is only used when the <code>inline</code> option is enabled.
	       *
	       * @private
	       * @type {Map<string, number>}
	       */
	      this._imageMap = new _Map();

	      /**
	       * The indexed image values.
	       *
	       * This is only used when the <code>inline</code> option is enabled.
	       *
	       * @private
	       * @type {string[]}
	       */
	      this._images = [];
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      transformation.skipChildren = true;

	      var element = transformation.element;
	      var options = transformation.options;

	      var source = options.absolute ? element.src : element.getAttribute('src');
	      if (!source) {
	        return;
	      }

	      var alternativeText = element.getAttribute('alt') || '';
	      var title = element.getAttribute('title');
	      var value = title ? source + ' "' + title + '"' : source;

	      if (options.inline) {
	        value = '(' + value + ')';
	      } else {
	        var index = this._imageMap.get(value);
	        if (index == null) {
	          index = this._images.push(value) - 1;

	          this._imageMap.set(value, index);
	        }

	        value = '[image' + index + ']';
	      }

	      transformation.output('![' + alternativeText + ']' + value);
	    }
	  }]);

	  return ImagePlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * Contains utility methods that are useful throughout the library.
	 *
	 * @public
	 */
	var Utilities = function () {
	  function Utilities() {
	    _classCallCheck(this, Utilities);
	  }

	  _createClass(Utilities, null, [{
	    key: 'leftPad',


	    /**
	     * Left pads the <code>string</code> provided with the given padding string for the specified number of
	     * <code>times</code>.
	     *
	     * @param {string} [string=""] - the string to be padded
	     * @param {number} [times=0] - the number of times to pad <code>string</code>
	     * @param {string} [padding=" "] - the padding string
	     * @return {string} The padded <code>string</code>.
	     * @public
	     * @static
	     */
	    value: function leftPad() {
	      var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var times = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	      var padding = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

	      if (!padding) {
	        return string;
	      }

	      for (var i = 0; i < times; i++) {
	        string = padding + string;
	      }

	      return string;
	    }

	    /**
	     * Throws an error indicating that the a given method on a specific class has not been implemented.
	     *
	     * @param {string} className - the name of the class on which the method has not been implemented
	     * @param {string} methodName - the name of the method which has not been implemented
	     * @return {void}
	     * @throws {Error} The error describing the class method which has not been implemented.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'throwUnimplemented',
	    value: function throwUnimplemented(className, methodName) {
	      throw new Error('"' + methodName + '" method must be implemented on the ' + className + ' class');
	    }
	  }]);

	  return Utilities;
	}();

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
	 * item is contained within.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var ListItemPlugin = function (_Plugin) {
	  _inherits(ListItemPlugin, _Plugin);

	  function ListItemPlugin() {
	    _classCallCheck(this, ListItemPlugin);

	    return _possibleConstructorReturn(this, (ListItemPlugin.__proto__ || _Object$getPrototypeOf(ListItemPlugin)).apply(this, arguments));
	  }

	  _createClass(ListItemPlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      var value = transformation.inOrderedList ? transformation.listIndex++ + '. ' : '* ';

	      if (!transformation.atLeft) {
	        transformation.append(transformation.left.replace(/[ ]{2,4}$/, '\n'));

	        transformation.atLeft = true;
	        transformation.atNoWhiteSpace = true;
	        transformation.atParagraph = true;
	      } else if (transformation.last) {
	        transformation.last = transformation.last.replace(/[ ]{2,4}$/, '\n');
	      }

	      transformation.append(Utilities.leftPad(value, (transformation.listDepth - 1) * 2));
	    }
	  }]);

	  return ListItemPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs an ordered list.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var OrderedListPlugin = function (_Plugin) {
	  _inherits(OrderedListPlugin, _Plugin);

	  function OrderedListPlugin() {
	    _classCallCheck(this, OrderedListPlugin);

	    return _possibleConstructorReturn(this, (OrderedListPlugin.__proto__ || _Object$getPrototypeOf(OrderedListPlugin)).apply(this, arguments));
	  }

	  _createClass(OrderedListPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.inOrderedList = context.get('previousInOrderedList');
	      transformation.listIndex = context.get('previousListIndex');
	      transformation.listDepth--;
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousInOrderedList', transformation.inOrderedList);
	      context.set('previousListIndex', transformation.listIndex);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      if (transformation.listDepth === 0) {
	        transformation.appendParagraph();
	      }

	      transformation.inOrderedList = true;
	      transformation.listIndex = 1;
	      transformation.listDepth++;
	    }
	  }]);

	  return OrderedListPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs a paragraph.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var ParagraphPlugin = function (_Plugin) {
	  _inherits(ParagraphPlugin, _Plugin);

	  function ParagraphPlugin() {
	    _classCallCheck(this, ParagraphPlugin);

	    return _possibleConstructorReturn(this, (ParagraphPlugin.__proto__ || _Object$getPrototypeOf(ParagraphPlugin)).apply(this, arguments));
	  }

	  _createClass(ParagraphPlugin, [{
	    key: 'transform',


	    /**
	     * @override
	     */
	    value: function transform(transformation, context) {
	      transformation.appendParagraph();
	    }
	  }]);

	  return ParagraphPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs the contents in a preformatted block.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var PreformattedPlugin = function (_Plugin) {
	  _inherits(PreformattedPlugin, _Plugin);

	  function PreformattedPlugin() {
	    _classCallCheck(this, PreformattedPlugin);

	    return _possibleConstructorReturn(this, (PreformattedPlugin.__proto__ || _Object$getPrototypeOf(PreformattedPlugin)).apply(this, arguments));
	  }

	  _createClass(PreformattedPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.atLeft = false;
	      transformation.atParagraph = false;
	      transformation.inPreformattedBlock = context.get('previousInPreformattedBlock');
	      transformation.left = context.get('previousLeft');

	      transformation.appendParagraph();
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousInPreformattedBlock', transformation.inPreformattedBlock);
	      context.set('previousLeft', transformation.left);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      var value = '    ';

	      transformation.left += value;

	      if (transformation.atParagraph) {
	        transformation.append(value);
	      } else {
	        transformation.appendParagraph();
	      }
	    }
	  }]);

	  return PreformattedPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * A preset of plugins usually grouped for a specific purpose.
	 *
	 * @public
	 */
	var Preset = function () {

	  /**
	   * Creates an instance of {@link Preset}.
	   *
	   * @public
	   */
	  function Preset() {
	    _classCallCheck(this, Preset);

	    /**
	     * The plugins for this {@link Preset}.
	     *
	     * @private
	     * @type {Map<string[], Plugin>}
	     */
	    this._plugins = new _Map();
	  }

	  /**
	   * Sets the specified <code>plugin</code> for the <code>tags</code> provided.
	   *
	   * @param {string[]} tags - the tag names to which <code>plugin</code> will be registered
	   * @param {Plugin} plugin - the {@link Plugin} to be registered against <code>tags</code>
	   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
	   * @public
	   */


	  _createClass(Preset, [{
	    key: "set",
	    value: function set(tags, plugin) {
	      this._plugins.set(tags, plugin);

	      return this;
	    }

	    /**
	     * Sets all of the specified <code>plugins</code> to be registered against their mapped tag names.
	     *
	     * @param {Map<string[], Plugin>} plugins - a <code>Map</code> of plugins and tag names to which they are
	     * to be registered
	     * @return {Preset} A reference to this {@link Preset} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: "setAll",
	    value: function setAll(plugins) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = _getIterator(plugins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var tags = _step$value[0];
	          var plugin = _step$value[1];

	          this._plugins.set(tags, plugin);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return this;
	    }

	    /**
	     * Returns the plugins for this {@link Preset}.
	     *
	     * @return {Map<string[], Plugin>} The plugins.
	     * @public
	     */

	  }, {
	    key: "plugins",
	    get: function get() {
	      return new _Map(this._plugins);
	    }
	  }]);

	  return Preset;
	}();

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs as quoted text.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var QuotePlugin = function (_Plugin) {
	  _inherits(QuotePlugin, _Plugin);

	  function QuotePlugin() {
	    _classCallCheck(this, QuotePlugin);

	    return _possibleConstructorReturn(this, (QuotePlugin.__proto__ || _Object$getPrototypeOf(QuotePlugin)).apply(this, arguments));
	  }

	  _createClass(QuotePlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.output('"');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      transformation.output('"');

	      transformation.atNoWhiteSpace = true;
	    }
	  }]);

	  return QuotePlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A {@link Plugin} which outputs an unordered list.
	 *
	 * @public
	 * @extends {Plugin}
	 */

	var UnorderedListPlugin = function (_Plugin) {
	  _inherits(UnorderedListPlugin, _Plugin);

	  function UnorderedListPlugin() {
	    _classCallCheck(this, UnorderedListPlugin);

	    return _possibleConstructorReturn(this, (UnorderedListPlugin.__proto__ || _Object$getPrototypeOf(UnorderedListPlugin)).apply(this, arguments));
	  }

	  _createClass(UnorderedListPlugin, [{
	    key: 'after',


	    /**
	     * @override
	     */
	    value: function after(transformation, context) {
	      transformation.inOrderedList = context.get('previousInOrderedList');
	      transformation.listIndex = context.get('previousListIndex');
	      transformation.listDepth--;
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'before',
	    value: function before(transformation, context) {
	      context.set('previousInOrderedList', transformation.inOrderedList);
	      context.set('previousListIndex', transformation.listIndex);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'transform',
	    value: function transform(transformation, context) {
	      if (transformation.listDepth === 0) {
	        transformation.appendParagraph();
	      }

	      transformation.inOrderedList = false;
	      transformation.listIndex = 1;
	      transformation.listDepth++;
	    }
	  }]);

	  return UnorderedListPlugin;
	}(Plugin);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	var defaultPreset = new Preset().set(['a'], new AnchorPlugin()).set(['blockquote', 'dd'], new BlockQuotePlugin()).set(['br'], new BreakPlugin()).set(['code', 'kbd', 'samp'], new CodePlugin()).set(['dt'], new DefinitionTermPlugin()).set(['details'], new DetailsPlugin()).set(['cite', 'dfn', 'em', 'i', 'u', 'var'], new EmphasisPlugin()).set(['applet', 'area', 'audio', 'button', 'canvas', 'datalist', 'embed', 'head', 'input', 'map', 'menu', 'meter', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'style', 'textarea', 'title', 'video'], new EmptyPlugin()).set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], new HeadingPlugin()).set(['hr'], new HorizontalRulePlugin()).set(['img'], new ImagePlugin()).set(['li'], new ListItemPlugin()).set(['ol'], new OrderedListPlugin()).set(['address', 'article', 'aside', 'div', 'fieldset', 'footer', 'header', 'nav', 'p', 'section'], new ParagraphPlugin()).set(['pre'], new PreformattedPlugin()).set(['q'], new QuotePlugin()).set(['b', 'strong'], new StrongPlugin()).set(['ul'], new UnorderedListPlugin());

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * An HTML to Markdown transformation library that supports HTML strings and DOM elements.
	 *
	 * @public
	 */

	var Europa = function () {

	  /**
	   * Creates an instance of {@link Europa} using the window service provided.
	   *
	   * @param {WindowService} windowService - the {@link WindowService} to be used for HTML to Markdown transformation
	   * @public
	   */
	  function Europa(windowService) {
	    _classCallCheck(this, Europa);

	    /**
	     * The {@link WindowService} for this {@link Europa} instance.
	     *
	     * @private
	     * @type {WindowService}
	     */
	    this._windowService = windowService;

	    /**
	     * The <code>Window</code> to be used for HTML to Markdown transformation.
	     *
	     * @private
	     * @type {Window}
	     */
	    this._window = null;

	    /**
	     * The plugins for this {@link Europa} instance.
	     *
	     * @private
	     * @type {Map<string, Plugin>}
	     */
	    this._plugins = new _Map();

	    this.registerPreset(defaultPreset);
	  }

	  /**
	   * Destroys the <code>Window</code> used by this {@link Europa} instance.
	   *
	   * This allows closeable {@link WindowService} implementations to close the <code>Window</code> and free up resources.
	   * However, this instance can and will simply retrieve another <code>Window</code> from the {@link WindowService} the
	   * next time it is required.
	   *
	   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
	   * @public
	   */


	  _createClass(Europa, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this._window) {
	        this._windowService.closeWindow(this._window);
	        this._window = null;
	      }

	      return this;
	    }

	    /**
	     * Registers the specified <code>plugin</code> for the <code>tags</code> provided.
	     *
	     * <code>tags</code> can be an array of tag names or a single string containing white-space separated tag names.
	     *
	     * @param {string|string[]} tags - the tag names for which <code>plugin</code> is to be registered
	     * @param {Plugin} plugin - the {@link Plugin} to be registered
	     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: 'register',
	    value: function register(tags, plugin) {
	      if (typeof tags === 'string') {
	        tags = tags.trim().split(/\s+/);
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = _getIterator(tags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var tag = _step.value;

	          this._plugins.set(tag.toLowerCase(), plugin);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return this;
	    }

	    /**
	     * Registers all of the plugins within the specified <code>preset</code>.
	     *
	     * @param {Preset} preset - the {@link Preset} whose plugins are to be registered
	     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
	     * @public
	     */

	  }, {
	    key: 'registerPreset',
	    value: function registerPreset(preset) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = _getIterator(preset.plugins), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _step2$value = _slicedToArray(_step2.value, 2);

	          var tags = _step2$value[0];
	          var plugin = _step2$value[1];

	          this.register(tags, plugin);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return this;
	    }

	    /**
	     * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
	     *
	     * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
	     * Markdown.
	     *
	     * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
	     * @param {Transformation~Options} [options] - the options to be used
	     * @return {string} The transformed Markdown.
	     * @public
	     */

	  }, {
	    key: 'transform',
	    value: function transform(html, options) {
	      var window = this.window;

	      var transformer = new Transformer(window, this._plugins);

	      options = this._createTransformationOptions(options);

	      return transformer.transform(html, options);
	    }

	    /**
	     * Creates the options, including their default values, for the {@link Transformer#transform} method based on the
	     * <code>options</code> provided.
	     *
	     * @param {Transformation~Options} [options] - the options that were passed in
	     * @return {Transformation~Options} The complete options.
	     * @private
	     */

	  }, {
	    key: '_createTransformationOptions',
	    value: function _createTransformationOptions(options) {
	      return _Object$assign({
	        absolute: false,
	        baseUri: this._windowService.getBaseUri(this.window),
	        inline: false
	      }, options);
	    }

	    /**
	     * Returns the <code>Window</code> for this {@link Europa} instance.
	     *
	     * If no <code>Window</code> has been allocated, one is retrieved from the {@link WindowService} and allocated.
	     *
	     * @return {Window} The <code>Window</code>.
	     * @public
	     */

	  }, {
	    key: 'window',
	    get: function get() {
	      if (this._window == null) {
	        this._window = this._windowService.getWindow();
	      }

	      return this._window;
	    }
	  }]);

	  return Europa;
	}();

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/* eslint no-unused-vars: "off" */

	/**
	 * A service used to retrieve the <code>Window</code> object for transforming HTML to Markdown and, optionally, to close
	 * it upon destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an
	 * artificial browser environment.
	 *
	 * @public
	 */

	var WindowService = function () {
	  function WindowService() {
	    _classCallCheck(this, WindowService);
	  }

	  _createClass(WindowService, [{
	    key: 'closeWindow',


	    /**
	     * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
	     *
	     * @param {Window} window - the <code>Window</code> to be closed
	     * @return {void}
	     * @public
	     */
	    value: function closeWindow(window) {
	      if (this.isCloseable(window)) {
	        window.close();
	      }
	    }

	    /**
	     * Returns the base URI for the specified <code>window</code>.
	     *
	     * Implementations <b>must</b> override this method.
	     *
	     * @param {Window} window - the <code>Window</code> for which the base URI is to be returned
	     * @return {string} The base URI for <code>window</code>.
	     * @public
	     * @abstract
	     */

	  }, {
	    key: 'getBaseUri',
	    value: function getBaseUri(window) {
	      Utilities.throwUnimplemented('WindowService', 'getBaseUri');
	    }

	    /**
	     * Returns a <code>Window</code> to be used for transforming HTML to Markdown.
	     *
	     * Implementations <b>must</b> override this method.
	     *
	     * @return {Window} The <code>Window</code>.
	     * @public
	     * @abstract
	     */

	  }, {
	    key: 'getWindow',
	    value: function getWindow() {
	      Utilities.throwUnimplemented('WindowService', 'getWindow');
	    }

	    /**
	     * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
	     *
	     * @param {Window} window - the <code>Window</code> to be checked
	     * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
	     * @public
	     */

	  }, {
	    key: 'isCloseable',
	    value: function isCloseable(window) {
	      return false;
	    }
	  }]);

	  return WindowService;
	}();

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * A very simplistic implementation of {@link WindowService} that returns the global <code>Window</code> object to be
	 * used for transforming HTML into Markdown.
	 *
	 * @public
	 * @extends {WindowService}
	 */

	var NativeWindowService = function (_WindowService) {
	  _inherits(NativeWindowService, _WindowService);

	  function NativeWindowService() {
	    _classCallCheck(this, NativeWindowService);

	    return _possibleConstructorReturn(this, (NativeWindowService.__proto__ || _Object$getPrototypeOf(NativeWindowService)).apply(this, arguments));
	  }

	  _createClass(NativeWindowService, [{
	    key: 'getBaseUri',


	    /**
	     * @override
	     */
	    value: function getBaseUri(window) {
	      return window.document.baseURI;
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'getWindow',
	    value: function getWindow() {
	      return window;
	    }
	  }]);

	  return NativeWindowService;
	}(WindowService);

	/*
	 * Copyright (C) 2016 Alasdair Mercer, Skelp
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	var index = new Europa(new NativeWindowService());

	return index;

})));
//# sourceMappingURL=europa.js.map