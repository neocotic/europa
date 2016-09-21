(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('europa', factory) :
	(global.europa = factory());
}(this, (function () { 'use strict';

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	var funcTag = '[object Function]';
	var genTag = '[object GeneratorFunction]';
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	var nativeMax = Math.max;
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign$1 = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	var __moduleExports$2 = assign$1;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** `Object#toString` result references. */
var 	argsTag$1 = '[object Arguments]';
var 	funcTag$1 = '[object Function]';
var 	genTag$1 = '[object GeneratorFunction]';
	/** Used to detect unsigned integer values. */
	var reIsUint$1 = /^(?:0|[1-9]\d*)$/;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes$1(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg$1(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$1.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys$1 = overArg$1(Object.keys, Object);

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys$1(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray$1(value) || isArguments$1(value))
	    ? baseTimes$1(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$1.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex$1(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys$1);
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys$1(object) {
	  if (!isPrototype$1(object)) {
	    return nativeKeys$1(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$1.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex$1(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint$1.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype$1(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$1;

	  return value === proto;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments$1(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject$1(value) && hasOwnProperty$1.call(value, 'callee') &&
	    (!propertyIsEnumerable$1.call(value, 'callee') || objectToString$1.call(value) == argsTag$1);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$1 = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike$1(value) {
	  return value != null && isLength$1(value.length) && !isFunction$1(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject$1(value) {
	  return isObjectLike$1(value) && isArrayLike$1(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject$1(value) ? objectToString$1.call(value) : '';
	  return tag == funcTag$1 || tag == genTag$1;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength$1(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Iterates over own enumerable string keyed properties of an object and
	 * invokes `iteratee` for each property. The iteratee is invoked with three
	 * arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.3.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 * @see _.forOwnRight
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forOwn$1(object, iteratee) {
	  return object && baseForOwn(object, typeof iteratee == 'function' ? iteratee : identity);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys$1(object) {
	  return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys$1(object);
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	var __moduleExports$3 = forOwn$1;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var __moduleExports$4 = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define('oopsy', factory) :
	  (global.Oopsy = factory());
	}(commonjsGlobal, (function () { 'use strict';

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
	   * A bare-bones constructor for surrogate prototype swapping.
	   *
	   * @private
	   * @constructor Constructor
	   */
	  var Constructor = function() {}
	  /**
	   * A reference to <code>Object.prototype.hasOwnProperty</code>.
	   *
	   * @private
	   * @type {Function}
	   */
	  var hasOwnProperty = Object.prototype.hasOwnProperty
	  /**
	   * A reference to <code>Array.prototype.slice</code>.
	   *
	   * @private
	   * @type {Function}
	   */
	  var slice = Array.prototype.slice

	  /**
	   * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
	   *
	   * Nothing happens if <code>target</code> is <code>null</code> and if any source is <code>null</code> it will be
	   * ignored.
	   *
	   * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
	   * <code>target</code>; otherwise <code>false</code>
	   * @param {Object} [target] - the target object which should be extended
	   * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
	   * @return {void}
	   * @private
	   */
	  function extend(own, target, sources) {
	    if (target == null) {
	      return
	    }

	    sources = slice.call(arguments, 2)

	    var property
	    var source

	    for (var i = 0, length = sources.length; i < length; i++) {
	      source = sources[i]

	      for (property in source) {
	        if (!own || hasOwnProperty.call(source, property)) {
	          target[property] = source[property]
	        }
	      }
	    }
	  }

	  /**
	   * Creates an object which inherits the given <code>prototype</code>.
	   *
	   * Optionally, the created object can be extended further with the specified <code>properties</code>.
	   *
	   * @param {Object} prototype - the prototype to be inherited by the created object
	   * @param {Object} [properties] - the optional properties to be extended by the created object
	   * @return {Object} The newly created object.
	   * @private
	   */
	  function create(prototype, properties) {
	    var result
	    if (typeof Object.create === 'function') {
	      result = Object.create(prototype)
	    } else {
	      Constructor.prototype = prototype
	      result = new Constructor()
	      Constructor.prototype = null
	    }

	    if (properties) {
	      extend(true, result, properties)
	    }

	    return result
	  }

	  /**
	   * The base constructor from which all others should extend.
	   *
	   * @public
	   * @constructor Oopsy
	   */
	  function Oopsy() {}

	  /**
	   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
	   * <code>statics</code> provided.
	   *
	   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
	   * constructor which only calls the super constructor will be used instead.
	   *
	   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
	   *
	   * @param {Function} [constructor] - the constructor for the child
	   * @param {Object} [prototype] - the prototype properties to be defined for the child
	   * @param {Object} [statics] - the static properties to be defined for the child
	   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
	   * @public
	   * @static
	   */
	  Oopsy.extend = function(constructor, prototype, statics) {
	    var superConstructor = this

	    if (typeof constructor !== 'function') {
	      statics = prototype
	      prototype = constructor
	      constructor = function() {
	        return superConstructor.apply(this, arguments)
	      }
	    }

	    extend(false, constructor, superConstructor, statics)

	    constructor.prototype = create(superConstructor.prototype, prototype)
	    constructor.prototype.constructor = constructor

	    constructor.super_ = superConstructor

	    return constructor
	  }

	  var oopsy = Oopsy

	  return oopsy;

	})));

	});

	var Oopsy$1 = __moduleExports$4

	/**
	 * A plugin that can tap into multiple parts in the transformation process.
	 *
	 * @public
	 * @constructor Plugin
	 * @extends {Oopsy}
	 */
	var Plugin$1 = Oopsy$1.extend({

	  /**
	   * Called after {@link Plugin#transform} <b>and</b> only once all children elements have been transformed as well,
	   * provided they weren't skipped, and intended for tidying up after the transformation.
	   *
	   * <code>context</code> can be used to receive any state for a single element transformation from
	   * {@link Plugin#before} and {@link Plugin#transform}.
	   *
	   * @param {Transformation} transformation - the current {@link Transformation}
	   * @param {Object<string, *>} context - the current context for this {@link Plugin}
	   * @return {void}
	   * @public
	   */
	  after: function(transformation, context) {},

	  /**
	   * Called before any elements are transformed and intended to setup this {@link Plugin} initially.
	   *
	   * @param {Transformation} transformation - the current {@link Transformation}.
	   * @return {void}
	   * @public
	   */
	  afterAll: function(transformation) {},

	  /**
	   * Called immediately before {@link Plugin#transform} and intended for preparing this {@link Plugin} for
	   * transformation.
	   *
	   * <code>context</code> can be used to pass any state for a single element transformation to {@link Plugin#transform}
	   * and then to {@link Plugin#after}.
	   *
	   * @param {Transformation} transformation - the current {@link Transformation}
	   * @param {Object<string, *>} context - the current context for this {@link Plugin}
	   * @return {void}
	   * @public
	   */
	  before: function(transformation, context) {},

	  /**
	   * Called after all elements have been transformed and intended to completing any steps for this {@link Plugin}.
	   *
	   * @param {Transformation} transformation - the current {@link Transformation}
	   * @return {void}
	   * @public
	   */
	  beforeAll: function(transformation) {},

	  /**
	   * Transforms the current element within the specified <code>transformation</code> which can be used to provide
	   * control over the transformation and returns whether the children of the element should be transformed.
	   *
	   * <code>context</code> can be used to pass any state for a single element transformation from {@link Plugin#before}
	   * to {@link Plugin#after}.
	   *
	   * @param {Transformation} transformation - the current {@link Transformation}
	   * @param {Object<string, *>} context - the current context for this {@link Plugin}
	   * @return {boolean} <code>true</code> if the children of the current element should be transformed; otherwise
	   * <code>false</code>.
	   * @public
	   */
	  transform: function(transformation, context) {
	    return true
	  }

	})

	var Plugin_1 = Plugin$1

	var __moduleExports$7 = {
		Plugin: Plugin_1
	};

	var Plugin = __moduleExports$7.Plugin

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
	 * @constructor AnchorPlugin
	 * @extends {Plugin}
	 */
	var AnchorPlugin$1 = Plugin.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    if (context.value != null) {
	      transformation.output(']' + context.value)
	    }
	  },

	  /**
	   * @override
	   */
	  afterAll: function(transformation) {
	    var anchors = transformation.context.anchors
	    if (!anchors.length) {
	      return
	    }

	    transformation.append('\n\n')

	    for (var i = 0; i < anchors.length; i++) {
	      transformation.append('[anchor' + i + ']: ' + anchors[i] + '\n')
	    }
	  },

	  /**
	   * @override
	   */
	  beforeAll: function(transformation) {
	    transformation.context.anchorMap = {}
	    transformation.context.anchors = []
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var element = transformation.element
	    var options = transformation.options
	    var href = options.absolute ? element.href : element.getAttribute('href')
	    if (!href) {
	      return true
	    }

	    var anchorMap = transformation.context.anchorMap
	    var anchors = transformation.context.anchors
	    var index
	    var title = element.getAttribute('title')
	    var value = title ? href + ' "' + title + '"' : href

	    if (options.inline) {
	      context.value = '(' + value + ')'
	    } else {
	      index = anchorMap[value]
	      if (index == null) {
	        index = anchors.push(value) - 1

	        anchorMap[value] = index
	      }

	      context.value = '[anchor' + index + ']'
	    }

	    transformation.output('[')

	    transformation.atNoWhiteSpace = true

	    return true
	  }

	})

	var AnchorPlugin_1 = AnchorPlugin$1

	var __moduleExports$6 = {
		AnchorPlugin: AnchorPlugin_1
	};

	var Plugin$2 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs the contents in a block quote.
	 *
	 * @public
	 * @constructor BlockQuotePlugin
	 * @extends {Plugin}
	 */
	var BlockQuotePlugin$1 = Plugin$2.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.atLeft = false
	    transformation.atParagraph = false
	    transformation.left = context.previousLeft

	    transformation.appendParagraph()
	  },

	  /**
	   * @override
	   */
	  before: function(transformation, context) {
	    context.previousLeft = transformation.left
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var value = '> '

	    transformation.left += value

	    if (transformation.atParagraph) {
	      transformation.append(value)
	    } else {
	      transformation.appendParagraph()
	    }

	    return true
	  }

	})

	var BlockQuotePlugin_1 = BlockQuotePlugin$1

	var __moduleExports$8 = {
		BlockQuotePlugin: BlockQuotePlugin_1
	};

	var Plugin$3 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs an inline line break.
	 *
	 * @public
	 * @constructor BreakPlugin
	 * @extends {Plugin}
	 */
	var BreakPlugin$1 = Plugin$3.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.append('  ' + transformation.left)

	    transformation.atLeft = true
	    transformation.atNoWhiteSpace = true

	    return false
	  }

	})

	var BreakPlugin_1 = BreakPlugin$1

	var __moduleExports$9 = {
		BreakPlugin: BreakPlugin_1
	};

	var Plugin$4 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs the contents in a code block.
	 *
	 * @public
	 * @constructor CodePlugin
	 * @extends {Plugin}
	 */
	var CodePlugin$1 = Plugin$4.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    if (!context.skipped) {
	      transformation.inCodeBlock = context.previousInCodeBlock

	      transformation.output('`')
	    }
	  },

	  /**
	   * @override
	   */
	  before: function(transformation, context) {
	    context.previousInCodeBlock = transformation.inCodeBlock
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    if (transformation.inPreformattedBlock) {
	      context.skipped = true
	    } else {
	      transformation.output('`')

	      transformation.inCodeBlock = true
	    }

	    return true
	  }

	})

	var CodePlugin_1 = CodePlugin$1

	var __moduleExports$10 = {
		CodePlugin: CodePlugin_1
	};

	var Plugin$5 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs as strong text.
	 *
	 * @public
	 * @constructor StrongPlugin
	 * @extends {Plugin}
	 */
	var StrongPlugin$2 = Plugin$5.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.output('**')
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.output('**')

	    transformation.atNoWhiteSpace = true

	    return true
	  }

	})

	var StrongPlugin_1 = StrongPlugin$2

	var __moduleExports$12 = {
		StrongPlugin: StrongPlugin_1
	};

	var StrongPlugin$1 = __moduleExports$12.StrongPlugin

	/**
	 * A {@link Plugin} which outputs a definition term as strong text.
	 *
	 * @public
	 * @constructor DefinitionTermPlugin
	 * @extends {StrongPlugin}
	 */
	var DefinitionTermPlugin$1 = StrongPlugin$1.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.appendParagraph()

	    return DefinitionTermPlugin$1.super_.prototype.transform.call(this, transformation, context)
	  }

	})

	var DefinitionTermPlugin_1 = DefinitionTermPlugin$1

	var __moduleExports$11 = {
		DefinitionTermPlugin: DefinitionTermPlugin_1
	};

	var Plugin$6 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs a details section.
	 *
	 * If the details has an <code>open</code> attribute then all of its children are transformed. Otherwise, only the
	 * nested <code>summary</code>, if any, will be transformed.
	 *
	 * @public
	 * @constructor DetailsPlugin
	 * @extends {Plugin}
	 */
	var DetailsPlugin$1 = Plugin$6.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var element = transformation.element

	    transformation.appendParagraph()

	    if (element.hasAttribute('open')) {
	      return true
	    }

	    var summary = element.querySelector('summary')
	    transformation.transformer.transformElement(summary, transformation)

	    return false
	  }

	})

	var DetailsPlugin_1 = DetailsPlugin$1

	var __moduleExports$13 = {
		DetailsPlugin: DetailsPlugin_1
	};

	var Plugin$7 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs as emphasised text.
	 *
	 * @public
	 * @constructor EmphasisPlugin
	 * @extends {Plugin}
	 */
	var EmphasisPlugin$1 = Plugin$7.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.output('_')
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.output('_')

	    transformation.atNoWhiteSpace = true

	    return true
	  }

	})

	var EmphasisPlugin_1 = EmphasisPlugin$1

	var __moduleExports$14 = {
		EmphasisPlugin: EmphasisPlugin_1
	};

	var Plugin$8 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which simply ensures that all children elements are not transformed.
	 *
	 * @public
	 * @constructor EmptyPlugin
	 * @extends {Plugin}
	 */
	var EmptyPlugin$1 = Plugin$8.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    return false
	  }

	})

	var EmptyPlugin_1 = EmptyPlugin$1

	var __moduleExports$15 = {
		EmptyPlugin: EmptyPlugin_1
	};

	var Plugin$9 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs a heading of various levels.
	 *
	 * @public
	 * @constructor HeadingPlugin
	 * @extends {Plugin}
	 */
	var HeadingPlugin$1 = Plugin$9.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var level = parseInt(transformation.tagName.match(/([1-6])$/)[1], 10)

	    transformation.appendParagraph()

	    var heading = ''
	    for (var i = 0; i < level; i++) {
	      heading += '#'
	    }

	    transformation.output(heading + ' ')

	    return true
	  }

	})

	var HeadingPlugin_1 = HeadingPlugin$1

	var __moduleExports$16 = {
		HeadingPlugin: HeadingPlugin_1
	};

	var Plugin$10 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs a horizontal rule.
	 *
	 * @public
	 * @constructor HorizontalRulePlugin
	 * @extends {Plugin}
	 */
	var HorizontalRulePlugin$1 = Plugin$10.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation
	      .appendParagraph()
	      .output('---')
	      .appendParagraph()

	    return false
	  }

	})

	var HorizontalRulePlugin_1 = HorizontalRulePlugin$1

	var __moduleExports$17 = {
		HorizontalRulePlugin: HorizontalRulePlugin_1
	};

	var Plugin$11 = __moduleExports$7.Plugin

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
	 * @constructor ImagePlugin
	 * @extends {Plugin}
	 */
	var ImagePlugin$1 = Plugin$11.extend({

	  /**
	   * @override
	   */
	  afterAll: function(transformation) {
	    var images = transformation.context.images
	    if (!images.length) {
	      return
	    }

	    transformation.append('\n\n')

	    for (var i = 0; i < images.length; i++) {
	      transformation.append('[image' + i + ']: ' + images[i] + '\n')
	    }
	  },

	  /**
	   * @override
	   */
	  beforeAll: function(transformation) {
	    transformation.context.imageMap = {}
	    transformation.context.images = []
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var element = transformation.element
	    var options = transformation.options
	    var source = options.absolute ? element.src : element.getAttribute('src')
	    if (!source) {
	      return false
	    }

	    var alternativeText = element.getAttribute('alt') || ''
	    var imageMap = transformation.context.imageMap
	    var images = transformation.context.images
	    var index
	    var title = element.getAttribute('title')
	    var value = title ? source + ' "' + title + '"' : source

	    if (options.inline) {
	      value = '(' + value + ')'
	    } else {
	      index = imageMap[value]
	      if (index == null) {
	        index = images.push(value) - 1

	        imageMap[value] = index
	      }

	      value = '[image' + index + ']'
	    }

	    transformation.output('![' + alternativeText + ']' + value)

	    return false
	  }

	})

	var ImagePlugin_1 = ImagePlugin$1

	var __moduleExports$18 = {
		ImagePlugin: ImagePlugin_1
	};

	var Oopsy$2 = __moduleExports$4

	/**
	 * Contains utility methods that are useful throughout the library.
	 *
	 * @public
	 * @constructor Utilities
	 * @extends {Oopsy}
	 */
	var Utilities$1 = Oopsy$2.extend(null, {

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
	  leftPad: function(string, times, padding) {
	    if (string == null) {
	      string = ''
	    }
	    if (times == null) {
	      times = 0
	    }
	    if (padding == null) {
	      padding = ' '
	    }
	    if (!padding) {
	      return string
	    }

	    for (var i = 0; i < times; i++) {
	      string = padding + string
	    }

	    return string
	  },

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
	  throwUnimplemented: function(className, methodName) {
	    throw new Error('"' + methodName + '" method must be implemented on the "' + className + '" class')
	  }

	})

	var Utilities_1 = Utilities$1

	var __moduleExports$20 = {
		Utilities: Utilities_1
	};

	var Plugin$12 = __moduleExports$7.Plugin
	var Utilities = __moduleExports$20.Utilities

	/**
	 * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
	 * item is contained within.
	 *
	 * @public
	 * @constructor ListItemPlugin
	 * @extends {Plugin}
	 */
	var ListItemPlugin$1 = Plugin$12.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var value = transformation.inOrderedList ? transformation.listIndex++ + '. ' : '* '

	    if (!transformation.atLeft) {
	      transformation.append(transformation.left.replace(/[ ]{2,4}$/, '\n'))

	      transformation.atLeft = true
	      transformation.atNoWhiteSpace = true
	      transformation.atParagraph = true
	    } else if (transformation.last) {
	      transformation.last = transformation.last.replace(/[ ]{2,4}$/, '\n')
	    }

	    transformation.append(Utilities.leftPad(value, (transformation.listDepth - 1) * 2))

	    return true
	  }

	})

	var ListItemPlugin_1 = ListItemPlugin$1

	var __moduleExports$19 = {
		ListItemPlugin: ListItemPlugin_1
	};

	var Plugin$13 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs an ordered list.
	 *
	 * @public
	 * @constructor OrderedListPlugin
	 * @extends {Plugin}
	 */
	var OrderedListPlugin$1 = Plugin$13.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.inOrderedList = context.previousInOrderedList
	    transformation.listIndex = context.previousListIndex
	    transformation.listDepth--
	  },

	  /**
	   * @override
	   */
	  before: function(transformation, context) {
	    context.previousInOrderedList = transformation.inOrderedList
	    context.previousListIndex = transformation.listIndex
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    if (transformation.listDepth === 0) {
	      transformation.appendParagraph()
	    }

	    transformation.inOrderedList = true
	    transformation.listIndex = 1
	    transformation.listDepth++

	    return true
	  }

	})

	var OrderedListPlugin_1 = OrderedListPlugin$1

	var __moduleExports$21 = {
		OrderedListPlugin: OrderedListPlugin_1
	};

	var Plugin$14 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs a paragraph.
	 *
	 * @public
	 * @constructor ParagraphPlugin
	 * @extends {Plugin}
	 */
	var ParagraphPlugin$1 = Plugin$14.extend({

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.appendParagraph()

	    return true
	  }

	})

	var ParagraphPlugin_1 = ParagraphPlugin$1

	var __moduleExports$22 = {
		ParagraphPlugin: ParagraphPlugin_1
	};

	var Plugin$15 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs the contents in a preformatted block.
	 *
	 * @public
	 * @constructor PreformattedPlugin
	 * @extends {Plugin}
	 */
	var PreformattedPlugin$1 = Plugin$15.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.atLeft = false
	    transformation.atParagraph = false
	    transformation.inPreformattedBlock = context.previousInPreformattedBlock
	    transformation.left = context.previousLeft

	    transformation.appendParagraph()
	  },

	  /**
	   * @override
	   */
	  before: function(transformation, context) {
	    context.previousInPreformattedBlock = transformation.inPreformattedBlock
	    context.previousLeft = transformation.left
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    var value = '    '

	    transformation.left += value

	    if (transformation.atParagraph) {
	      transformation.append(value)
	    } else {
	      transformation.appendParagraph()
	    }

	    return true
	  }

	})

	var PreformattedPlugin_1 = PreformattedPlugin$1

	var __moduleExports$23 = {
		PreformattedPlugin: PreformattedPlugin_1
	};

	var assign$2 = __moduleExports$2
	var forOwn$2 = __moduleExports$3
	var Oopsy$3 = __moduleExports$4

	/**
	 * A preset of plugins usually grouped for a specific purpose.
	 *
	 * @public
	 * @constructor Preset
	 * @extends {Oopsy}
	 */
	var Preset$1 = Oopsy$3.extend(function() {
	  /**
	   * The plugins for this {@link Preset}.
	   *
	   * @private
	   * @type {Object<string, Plugin>}
	   */
	  this._plugins = {}
	}, {

	  /**
	   * Sets the specified <code>plugin</code> for the <code>tags</code> provided.
	   *
	   * <code>tags</code> can be an array of tag names or a single string containing white-space separated tag names.
	   *
	   * @param {string|string[]} tags - the tag names to which <code>plugin</code> will be registered
	   * @param {Plugin} plugin - the {@link Plugin} to be registered against <code>tags</code>
	   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
	   * @public
	   */
	  set: function(tags, plugin) {
	    if (typeof tags === 'string') {
	      tags = tags.trim().split(/\s+/)
	    }

	    for (var i = 0; i < tags.length; i++) {
	      this._plugins[tags[i].toLowerCase()] = plugin
	    }

	    return this
	  },

	  /**
	   * Sets all of the specified <code>plugins</code> to be registered against their mapped tag names.
	   *
	   * @param {Object<string, Plugin>} plugins - a <code>Map</code> of plugins and tag names to which they are
	   * to be registered
	   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
	   * @public
	   */
	  setAll: function(plugins) {
	    var that = this

	    forOwn$2(plugins, function(plugin, tag) {
	      that._plugins[tag.toLowerCase()] = plugin
	    })

	    return this
	  }

	})

	Object.defineProperty(Preset$1.prototype, 'plugins', {
	  get: function() {
	    return assign$2({}, this._plugins)
	  }
	})

	var Preset_1 = Preset$1

	var __moduleExports$24 = {
		Preset: Preset_1
	};

	var Plugin$16 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs as quoted text.
	 *
	 * @public
	 * @constructor QuotePlugin
	 * @extends {Plugin}
	 */
	var QuotePlugin$1 = Plugin$16.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.output('"')
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    transformation.output('"')

	    transformation.atNoWhiteSpace = true

	    return true
	  }

	})

	var QuotePlugin_1 = QuotePlugin$1

	var __moduleExports$25 = {
		QuotePlugin: QuotePlugin_1
	};

	var Plugin$17 = __moduleExports$7.Plugin

	/**
	 * A {@link Plugin} which outputs an unordered list.
	 *
	 * @public
	 * @constructor UnorderedListPlugin
	 * @extends {Plugin}
	 */
	var UnorderedListPlugin$1 = Plugin$17.extend({

	  /**
	   * @override
	   */
	  after: function(transformation, context) {
	    transformation.inOrderedList = context.previousInOrderedList
	    transformation.listIndex = context.previousListIndex
	    transformation.listDepth--
	  },

	  /**
	   * @override
	   */
	  before: function(transformation, context) {
	    context.previousInOrderedList = transformation.inOrderedList
	    context.previousListIndex = transformation.listIndex
	  },

	  /**
	   * @override
	   */
	  transform: function(transformation, context) {
	    if (transformation.listDepth === 0) {
	      transformation.appendParagraph()
	    }

	    transformation.inOrderedList = false
	    transformation.listIndex = 1
	    transformation.listDepth++

	    return true
	  }

	})

	var UnorderedListPlugin_1 = UnorderedListPlugin$1

	var __moduleExports$26 = {
		UnorderedListPlugin: UnorderedListPlugin_1
	};

	var AnchorPlugin = __moduleExports$6.AnchorPlugin
	var BlockQuotePlugin = __moduleExports$8.BlockQuotePlugin
	var BreakPlugin = __moduleExports$9.BreakPlugin
	var CodePlugin = __moduleExports$10.CodePlugin
	var DefinitionTermPlugin = __moduleExports$11.DefinitionTermPlugin
	var DetailsPlugin = __moduleExports$13.DetailsPlugin
	var EmphasisPlugin = __moduleExports$14.EmphasisPlugin
	var EmptyPlugin = __moduleExports$15.EmptyPlugin
	var HeadingPlugin = __moduleExports$16.HeadingPlugin
	var HorizontalRulePlugin = __moduleExports$17.HorizontalRulePlugin
	var ImagePlugin = __moduleExports$18.ImagePlugin
	var ListItemPlugin = __moduleExports$19.ListItemPlugin
	var OrderedListPlugin = __moduleExports$21.OrderedListPlugin
	var ParagraphPlugin = __moduleExports$22.ParagraphPlugin
	var PreformattedPlugin = __moduleExports$23.PreformattedPlugin
	var Preset = __moduleExports$24.Preset
	var QuotePlugin = __moduleExports$25.QuotePlugin
	var StrongPlugin = __moduleExports$12.StrongPlugin
	var UnorderedListPlugin = __moduleExports$26.UnorderedListPlugin

	/**
	 * A default preset containing all of the predefined plugins.
	 *
	 * @public
	 * @constructor DefaultPreset
	 * @extends {Preset}
	 */
	var DefaultPreset$1 = Preset.extend(function() {
	  DefaultPreset$1.super_.call(this)

	  this.set([ 'a' ], new AnchorPlugin())
	  this.set([
	    'blockquote',
	    'dd'
	  ], new BlockQuotePlugin())
	  this.set([ 'br' ], new BreakPlugin())
	  this.set([
	    'code',
	    'kbd',
	    'samp'
	  ], new CodePlugin())
	  this.set([ 'dt' ], new DefinitionTermPlugin())
	  this.set([ 'details' ], new DetailsPlugin())
	  this.set([
	    'cite',
	    'dfn',
	    'em',
	    'i',
	    'u',
	    'var'
	  ], new EmphasisPlugin())
	  this.set([
	    'applet',
	    'area',
	    'audio',
	    'button',
	    'canvas',
	    'datalist',
	    'embed',
	    'head',
	    'input',
	    'map',
	    'menu',
	    'meter',
	    'noframes',
	    'noscript',
	    'object',
	    'optgroup',
	    'option',
	    'param',
	    'progress',
	    'rp',
	    'rt',
	    'ruby',
	    'script',
	    'select',
	    'style',
	    'textarea',
	    'title',
	    'video'
	  ], new EmptyPlugin())
	  this.set([
	    'h1',
	    'h2',
	    'h3',
	    'h4',
	    'h5',
	    'h6'
	  ], new HeadingPlugin())
	  this.set([ 'hr' ], new HorizontalRulePlugin())
	  this.set([ 'img' ], new ImagePlugin())
	  this.set([ 'li' ], new ListItemPlugin())
	  this.set([ 'ol' ], new OrderedListPlugin())
	  this.set([
	    'address',
	    'article',
	    'aside',
	    'div',
	    'fieldset',
	    'footer',
	    'header',
	    'nav',
	    'p',
	    'section'
	  ], new ParagraphPlugin())
	  this.set([ 'pre' ], new PreformattedPlugin())
	  this.set([ 'q' ], new QuotePlugin())
	  this.set([
	    'b',
	    'strong'
	  ], new StrongPlugin())
	  this.set([ 'ul' ], new UnorderedListPlugin())
	})

	var DefaultPreset_1 = DefaultPreset$1

	var __moduleExports$5 = {
		DefaultPreset: DefaultPreset_1
	};

	var forOwn$4 = __moduleExports$3
	var Oopsy$5 = __moduleExports$4

	/**
	 * Contains contextual information for a single transformation process.
	 *
	 * @param {Transformer} transformer - the {@link Transformer} responsible for this transformation
	 * @param {Transformation~Options} options - the options to be used
	 * @public
	 * @constructor Transformation
	 * @extends {Oopsy}
	 */
	var Transformation$1 = Oopsy$5.extend(function(transformer, options) {
	  /**
	   * The {@link Transformation} responsible for this {@link Transformation}.
	   *
	   * @public
	   * @type {Transformer}
	   */
	  this.transformer = transformer

	  /**
	   * The options for this {@link Transformation}.
	   *
	   * @public
	   * @type {Transformation~Options}
	   */
	  this.options = options

	  /**
	   * Indicates whether the buffer is at the start of the current line.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.atLeft = true

	  /**
	   * Indicates whether any white space should be removed from the start of the next output.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.atNoWhiteSpace = true

	  /**
	   * Indicates whether the buffer is at the start of a paragraph.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.atParagraph = true

	  /**
	   * The transformation output buffer to which the Markdown will be written.
	   *
	   * @public
	   * @type {string}
	   */
	  this.buffer = ''

	  /**
	   * The context for this {@link Transformation}.
	   *
	   * @public
	   * @type {Object<string, *>}
	   */
	  this.context = {}

	  /**
	   * Indicates whether the buffer is currently within a code block.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.inCodeBlock = false

	  /**
	   * Indicates whether the buffer is currently within an ordered list.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.inOrderedList = false

	  /**
	   * Indicates whether the buffer is currently within a preformatted block.
	   *
	   * @public
	   * @type {boolean}
	   */
	  this.inPreformattedBlock = false

	  /**
	   * The last string to be output next to the buffer.
	   *
	   * @public
	   * @type {string}
	   */
	  this.last = null

	  /**
	   * The start of the current line.
	   *
	   * @public
	   * @type {string}
	   */
	  this.left = '\n'

	  /**
	   * The depth of nested lists.
	   *
	   * @public
	   * @type {number}
	   */
	  this.listDepth = 0

	  /**
	   * The one-based index for the current list item within the current list.
	   *
	   * @public
	   * @type {number}
	   */
	  this.listIndex = 1

	  /**
	   * The current document for this {@link Transformation}.
	   *
	   * This may not be the same document as is associated with the {@link Transformer} as this document may be nested
	   * (e.g. a frame).
	   *
	   * @private
	   * @type {HTMLDocument}
	   */
	  this._document = transformer.document

	  /**
	   * The current element for this {@link Transformation}.
	   *
	   * @private
	   * @type {Element}
	   */
	  this._element = null

	  /**
	   * The name of the tag for the current element for this {@link Transformation}.
	   *
	   * This will be the lower case tag name.
	   *
	   * @private
	   * @type {string}
	   */
	  this._tagName = null

	  /**
	   * The current window for this {@link Transformation}.
	   *
	   * This may not be the same window as is associated with the {@link Transformer} as this window may be nested (e.g. a
	   * frame).
	   *
	   * @private
	   * @type {Window}
	   */
	  this._window = transformer.window
	}, {

	  /**
	   * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
	   *
	   * @param {string} string - the string to be appended
	   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	   * @public
	   */
	  append: function(string) {
	    if (this.last != null) {
	      this.buffer += this.last
	    }

	    this.last = string

	    return this
	  },

	  /**
	   * Appends a paragraph to the output buffer.
	   *
	   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	   * @public
	   */
	  appendParagraph: function() {
	    if (this.atParagraph) {
	      return this
	    }

	    if (!this.atLeft) {
	      this.append(this.left)

	      this.atLeft = true
	    }

	    this.append(this.left)

	    this.atNoWhiteSpace = true
	    this.atParagraph = true

	    return this
	  },

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
	  output: function(string, clean) {
	    if (!string) {
	      return this
	    }

	    string = string.replace(/\r\n/g, '\n')

	    if (clean) {
	      string = string.replace(/\n([ \t]*\n)+/g, '\n')
	        .replace(/\n[ \t]+/g, '\n')
	        .replace(/[ \t]+/g, ' ')

	      forOwn$4(Transformation$1.replacements, function(value, key) {
	        string = string.replace(Transformation$1.replacementsRegExp[key], value)
	      })
	    }

	    if (!this.inPreformattedBlock) {
	      if (this.atNoWhiteSpace) {
	        string = string.replace(/^[ \t\n]+/, '')
	      } else if (/^[ \t]*\n/.test(string)) {
	        string = string.replace(/^[ \t\n]+/, '\n')
	      } else {
	        string = string.replace(/^[ \t]+/, ' ')
	      }
	    }

	    if (!string) {
	      return this
	    }

	    this.atLeft = /\n$/.test(string)
	    this.atNoWhiteSpace = /[ \t\n]$/.test(string)
	    this.atParagraph = /\n{2}$/.test(string)

	    return this.append(string.replace(/\n/g, this.left))
	  },

	  /**
	   * Replaces the start of the current line with the <code>string</code> provided.
	   *
	   * @param {string} string - the string to replace the start of the current line
	   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
	   * @public
	   */
	  replaceLeft: function(string) {
	    if (!this.atLeft) {
	      this.append(this.left.replace(/[ ]{2,4}$/, string))

	      this.atLeft = true
	      this.atNoWhiteSpace = true
	      this.atParagraph = true
	    } else if (this.last) {
	      this.last = this.last.replace(/[ ]{2,4}$/, string)
	    }

	    return this
	  }

	}, {

	  /**
	   * A map of special characters and their replacements.
	   *
	   * @public
	   * @static
	   * @type {Object<string, string>}
	   */
	  replacements: {
	    '\\\\': '\\\\',
	    '\\[': '\\[',
	    '\\]': '\\]',
	    '>': '\\>',
	    '_': '\\_',
	    '\\*': '\\*',
	    '`': '\\`',
	    '#': '\\#',
	    '([0-9])\\.(\\s|$)': '$1\\.$2',
	    '\u00a9': '(c)',
	    '\u00ae': '(r)',
	    '\u2122': '(tm)',
	    '\u00a0': ' ',
	    '\u00b7': '\\*',
	    '\u2002': ' ',
	    '\u2003': ' ',
	    '\u2009': ' ',
	    '\u2018': '\'',
	    '\u2019': '\'',
	    '\u201c': '"',
	    '\u201d': '"',
	    '\u2026': '...',
	    '\u2013': '--',
	    '\u2014': '---'
	  },

	  /**
	   * A map of special characters and the regular expression used to identify them.
	   *
	   * @public
	   * @static
	   * @type {Object<string, RegExp>}
	   */
	  replacementsRegExp: {}

	})

	Object.defineProperties(Transformation$1.prototype, {
	  document: {
	    get: function() {
	      return this._document
	    }
	  },
	  element: {
	    get: function() {
	      return this._element
	    },
	    set: function(value) {
	      this._element = value
	      this._tagName = value && value.tagName ? value.tagName.toLowerCase() : null
	    }
	  },
	  tagName: {
	    get: function() {
	      return this._tagName
	    }
	  },
	  window: {
	    get: function() {
	      return this._window
	    },
	    set: function(value) {
	      this._window = value
	      this._document = value ? value.document : null
	    }
	  }
	})

	forOwn$4(Transformation$1.replacements, function(value, key) {
	  Transformation$1.replacementsRegExp[key] = new RegExp(key, 'g')
	})

	var Transformation_1 = Transformation$1

	/**
	 * The options for {@link Transformation}.
	 *
	 * @typedef {Object} Transformation~Options
	 * @property {boolean} [absolute=false] - <code>true</code> if absolute URLs should be used for anchors/images;
	 * otherwise <code>false</code>.
	 * @property {string} [baseUri] - the base URI for the window
	 * @property {boolean} [inline=false] - <code>true</code> if anchor/image URLs are to be inserted inline; otherwise
	 * <code>false</code>.
	 */

	var __moduleExports$28 = {
		Transformation: Transformation_1
	};

	var forOwn$3 = __moduleExports$3
	var Oopsy$4 = __moduleExports$4

	var Transformation = __moduleExports$28.Transformation

	/**
	 * Transforms an HTML string or DOM element into Markdown.
	 *
	 * @param {Window} window - the <code>Window</code> to be used
	 * @param {Object<string, Plugin>} plugins - the plugins to be used
	 * @public
	 * @constructor Transformer
	 * @extends {Oopsy}
	 */
	var Transformer$1 = Oopsy$4.extend(function(window, plugins) {
	  /**
	   * The <code>Window</code> for this {@link Transformer}.
	   *
	   * @public
	   * @type {Window}
	   */
	  this.window = window

	  /**
	   * The <code>HTMLDocument</code> for this {@link Transformer}.
	   *
	   * @public
	   * @type {HTMLDocument}
	   */
	  this.document = window.document

	  /**
	   * The plugins for this {@link Transformer}.
	   *
	   * @public
	   * @type {Object<string, Plugin>}
	   */
	  this.plugins = plugins
	}, {

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
	  transform: function(html, options) {
	    if (!html) {
	      return ''
	    }

	    var root
	    if (typeof html === 'string') {
	      root = this.document.createElement('div')
	      root.innerHTML = html
	    } else {
	      root = html
	    }

	    var transformation = new Transformation(this, options)

	    forOwn$3(this.plugins, function(plugin) {
	      plugin.beforeAll(transformation)
	    })

	    this.transformElement(root, transformation)

	    forOwn$3(this.plugins, function(plugin) {
	      plugin.afterAll(transformation)
	    })

	    return transformation.append('').buffer.trim()
	  },

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
	  transformElement: function(element, transformation) {
	    if (!element) {
	      return
	    }

	    var context
	    var i
	    var plugin
	    var transformChildren
	    var value

	    if (element.nodeType === this.window.Node.ELEMENT_NODE) {
	      if (!this._isVisible(element)) {
	        return
	      }

	      transformation.element = element

	      context = {}
	      plugin = this.plugins[transformation.tagName]
	      transformChildren = true

	      if (plugin) {
	        plugin.before(transformation, context)
	        transformChildren = plugin.transform(transformation, context)
	      }

	      if (transformChildren) {
	        for (i = 0; i < element.childNodes.length; i++) {
	          this.transformElement(element.childNodes[i], transformation)
	        }
	      }

	      if (plugin) {
	        plugin.after(transformation, context)
	      }
	    } else if (element.nodeType === this.window.Node.TEXT_NODE) {
	      value = element.nodeValue || ''

	      if (transformation.inPreformattedBlock) {
	        transformation.output(value)
	      } else if (transformation.inCodeBlock) {
	        transformation.output(value.replace(/`/g, '\\`'))
	      } else {
	        transformation.output(value, true)
	      }
	    }
	  },

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
	  _isVisible: function(element) {
	    var style = this.window.getComputedStyle(element)

	    return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden'
	  }

	})

	var Transformer_1 = Transformer$1

	var __moduleExports$27 = {
		Transformer: Transformer_1
	};

	var assign = __moduleExports$2
	var forOwn = __moduleExports$3
	var Oopsy = __moduleExports$4

	var DefaultPreset = __moduleExports$5.DefaultPreset
	var Transformer = __moduleExports$27.Transformer

	/**
	 * An HTML to Markdown transformation library that supports HTML strings and DOM elements.
	 *
	 * @param {WindowService} windowService - the {@link WindowService} to be used for HTML to Markdown transformation
	 * @public
	 * @constructor Europa
	 * @extends {Oopsy}
	 */
	var Europa$2 = Oopsy.extend(function(windowService) {
	  /**
	   * The {@link WindowService} for this {@link Europa} instance.
	   *
	   * If no <code>Window</code> has been allocated, one is retrieved from the {@link WindowService} and allocated.
	   *
	   * @private
	   * @type {WindowService}
	   */
	  this._windowService = windowService

	  /**
	   * The <code>Window</code> to be used for HTML to Markdown transformation.
	   *
	   * @private
	   * @type {Window}
	   */
	  this._window = null

	  /**
	   * The plugins for this {@link Europa} instance.
	   *
	   * @private
	   * @type {Object<string, Plugin>}
	   */
	  this._plugins = {}

	  this.registerPreset(new DefaultPreset())
	}, {

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
	  destroy: function() {
	    if (this._window) {
	      this._windowService.closeWindow(this._window)
	      this._window = null
	    }

	    return this
	  },

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
	  register: function(tags, plugin) {
	    if (typeof tags === 'string') {
	      tags = tags.trim().split(/\s+/)
	    }

	    for (var i = 0; i < tags.length; i++) {
	      this._plugins[tags[i].toLowerCase()] = plugin
	    }

	    return this
	  },

	  /**
	   * Registers all of the plugins within the specified <code>preset</code>.
	   *
	   * @param {Preset} preset - the {@link Preset} whose plugins are to be registered
	   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
	   * @public
	   */
	  registerPreset: function(preset) {
	    var plugins = this._plugins

	    forOwn(preset.plugins, function(plugin, tag) {
	      plugins[tag] = plugin
	    })

	    return this
	  },

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
	  transform: function(html, options) {
	    var transformer = new Transformer(this.window, this.plugins)

	    options = this._createTransformationOptions(options)

	    return transformer.transform(html, options)
	  },

	  /**
	   * Creates the options, including their default values, for the {@link Transformer#transform} method based on the
	   * <code>options</code> provided.
	   *
	   * @param {Transformation~Options} [options] - the options that were passed in
	   * @return {Transformation~Options} The complete options.
	   * @private
	   */
	  _createTransformationOptions: function(options) {
	    return assign({
	      absolute: false,
	      baseUri: this._windowService.getBaseUri(this.window),
	      inline: false
	    }, options)
	  }

	})

	Object.defineProperties(Europa$2.prototype, {
	  plugins: {
	    get: function() {
	      return assign({}, this._plugins)
	    }
	  },
	  window: {
	    get: function() {
	      if (this._window == null) {
	        this._window = this._windowService.getWindow()
	      }

	      return this._window
	    }
	  },
	  windowService: {
	    get: function() {
	      return this._windowService
	    }
	  }
	})

	var Europa_1 = Europa$2

	var __moduleExports$1 = {
		Europa: Europa_1
	};

	var Europa$1 = __moduleExports$1.Europa

	var __moduleExports = Europa$1

	var Oopsy$6 = __moduleExports$4

	var Utilities$2 = __moduleExports$20.Utilities

	/**
	 * A service used to retrieve the <code>Window</code> object for transforming HTML to Markdown and, optionally, to close
	 * it upon destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an
	 * artificial browser environment.
	 *
	 * @public
	 * @constructor WindowService
	 * @extends {Oopsy}
	 */
	var WindowService$1 = Oopsy$6.extend({

	  /**
	   * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
	   *
	   * @param {Window} window - the <code>Window</code> to be closed
	   * @return {void}
	   * @public
	   */
	  closeWindow: function(window) {
	    if (this.isCloseable(window)) {
	      window.close()
	    }
	  },

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
	  getBaseUri: function(window) {
	    Utilities$2.throwUnimplemented('WindowService', 'getBaseUri')
	  },

	  /**
	   * Returns a <code>Window</code> to be used for transforming HTML to Markdown.
	   *
	   * Implementations <b>must</b> override this method.
	   *
	   * @return {Window} The <code>Window</code>.
	   * @public
	   * @abstract
	   */
	  getWindow: function() {
	    Utilities$2.throwUnimplemented('WindowService', 'getWindow')
	  },

	  /**
	   * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
	   *
	   * @param {Window} window - the <code>Window</code> to be checked
	   * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
	   * @public
	   */
	  isCloseable: function(window) {
	    return false
	  }

	})

	var WindowService_1 = WindowService$1

	var __moduleExports$30 = {
		WindowService: WindowService_1
	};

	var WindowService = __moduleExports$30.WindowService

	/**
	 * A very simplistic implementation of {@link WindowService} that returns the global <code>Window</code> object to be
	 * used for transforming HTML into Markdown.
	 *
	 * @public
	 * @constructor NativeWindowService
	 * @extends {WindowService}
	 */
	var NativeWindowService$1 = WindowService.extend({

	  /**
	   * @override
	   */
	  getBaseUri: function(window) {
	    return window.document.baseURI
	  },

	  /**
	   * @override
	   */
	  getWindow: function() {
	    return window
	  }

	})

	var NativeWindowService_1 = NativeWindowService$1

	var __moduleExports$29 = {
		NativeWindowService: NativeWindowService_1
	};

	var Europa = __moduleExports

	var NativeWindowService = __moduleExports$29.NativeWindowService

	var index = new Europa(new NativeWindowService())

	return index;

})));
//# sourceMappingURL=europa.js.map