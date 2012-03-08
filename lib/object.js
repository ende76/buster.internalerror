/*jslint indent: 2*/
if ("undefined" === typeof Object.create) {
	(function () {
			function F() {

			}

			Object.create =
				function (object) {
					F.prototype = object;
					return new F();
				};
	}());
}

if ("undefined" === typeof Object.extend) {
	(function () {
		var
			hasOwn = Object.prototype.hasOwnProperty,
			toString = Object.prototype.toString,
			// [[Class]] -> type pairs
			class2type = {},
			jQuery = {};

		// args is for internal usage only
		jQuery.each = function( object, callback, args ) {
				var name, i = 0,
					length = object.length,
					isObj = length === undefined || jQuery.isFunction( object );

				if ( args ) {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.apply( object[ name ], args ) === false ) {
								break;
							}
						}
					} else {
						for ( ; i < length; ) {
							if ( callback.apply( object[ i++ ], args ) === false ) {
								break;
							}
						}
					}

				// A special, fast, case for the most common use of each
				} else {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
								break;
							}
						}
					} else {
						for ( ; i < length; ) {
							if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
								break;
							}
						}
					}
				}

				return object;
			};

		jQuery.extend = Object.extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
				target = {};
			}

			// extend jQuery itself if only one argument is passed
			if ( length === i ) {
				target = this;
				--i;
			}

			for ( ; i < length; i++ ) {
				// Only deal with non-null/undefined values
				if ( (options = arguments[ i ]) != null ) {
					// Extend the base object
					for ( name in options ) {
						src = target[ name ];
						copy = options[ name ];

						// Prevent never-ending loop
						if ( target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];

							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[ name ] = jQuery.extend( deep, clone, copy );

						// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.isArray = Array.isArray || function( obj ) {
			return jQuery.type(obj) === "array";
		};

		jQuery.isFunction = function( obj ) {
			return jQuery.type(obj) === "function";
		};

		jQuery.isWindow = function( obj ) {
			return obj && typeof obj === "object" && "setInterval" in obj;
		};

		jQuery.isPlainObject = function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			} catch ( e ) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		};

		jQuery.type = function( obj ) {
			return obj == null ?
				String( obj ) :
				class2type[ toString.call(obj) ] || "object";
		};

		// Populate the class2type map
		jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		});
	}());
}