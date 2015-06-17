var Birdie = (function() {
    'use strict';

    var forEach = function(list, callback) {
        Array.prototype.forEach.call(list, callback);
    }

    var defaults = {
        selector: "",
        enumerate: false
    };

    var enumerate = function(list) {
        for (var i = 0; i < list.length; i++) {
            list[i] = (i+1) + "." + list[i];
        };
        return list;
    }

    /**
     * deep extend: merge defaults with options
     * @param {Objects} objects
     * @return {Object} merged values of default settings and options
     *
     */
    function extend(objects) {
        var extended = {};
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if ( Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = extend(extended[prop], obj[prop]);
                    }
                    else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };
        merge(arguments[0]);
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            merge(obj);
        }
        return extended;
    }

    Birdie = function(stage, options) {
        var settings = extend(defaults, options || {}),
            el = stage.querySelectorAll(settings.selector);

        forEach(el, function(element) {
            var html, attributes,
                range = document.createElement('input'),
                list = element.getAttribute("data-list").split(",");

            if ( settings.enumerate ) {
                list = enumerate(list);
            }

            list.unshift(" ");
            attributes = { type: 'range', min: 1, step: 1, value: 0, max: list.length };

            for (var key in attributes) {
                if ( attributes.hasOwnProperty(key) ) {
                    range.setAttribute(key, attributes[key]);
                }
            }

            stage.insertBefore(range, element).addEventListener('input', function() {
                element.value = list[this.value -1];
            });
        });
    }

    return Birdie;
}());