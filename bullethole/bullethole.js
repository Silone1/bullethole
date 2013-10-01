/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true*/

// This exposes a global 'bullethole' property.
var bullethole;

bullethole = (function () {
    function addMinMaxRecStr(results, str, minmax, name) {
        if (!str) {
            return null;
        }
        
        var min = minmax[0],
            max = minmax[1],
            len = str.length,
            rec = {name: 'Theme: ' + name, value: str, length: len, bounds: true};
        
        if (len > max || len < min) {
            rec.bounds = false;
        }
        
        results.push(rec);
        return rec;
    }
    
    function check(theme) {
        var results = [];
        
        addMinMaxRecStr(results, theme.name, [2, 25], 'name');
        addMinMaxRecStr(results, theme.summary, [10, 250], 'summary');
        addMinMaxRecStr(results, theme.border, [10, 250], 'summary');
        addMinMaxRecStr(results, theme.summary, [10, 250], 'summary');
    }
    return {check: check};
}());