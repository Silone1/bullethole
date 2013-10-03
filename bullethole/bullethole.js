/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true*/

// This exposes a global 'bullethole' property.
var bullethole;

bullethole = (function () {
    var types = {
        minMaxStr: 0 // {type: minMaxStr, name: theme.[name], value: [str], length: [len], bounds: [inBounds]}
    };
    
    function addMinMaxRecStr(results, str, minmax, name) {
        if (typeof str !== 'string') {
            return null;
        }
        
        var min = minmax[0],
            max = minmax[1],
            len = str.length,
            rec = {type: types.minMaxStr, name: 'theme.' + name, value: str, length: len, bounds: true};
        
        if (len > max || len < min) {
            rec.bounds = false;
        }
        
        results.push(rec);
        return rec;
    }
    
    function parseSides(theme, results) {
        var sides = theme.sides,
            res = [];
        
        return res;
    }
    
    function check(theme) {
        var results = {global: [], sides: [], roles: [], meta: {name: theme.name, summary: theme.summary, theme: theme}};
        var sides = parseSides(theme);
        
        addMinMaxRecStr(results.global, theme.name, [2, 25], 'name');
        addMinMaxRecStr(results.global, theme.summary, [10, 450], 'summary');
        
        if (sides.length > 0) {
            results.sides = sides;
        }
        
        return results;
    }
    
    return {check: check, types: types};
}());