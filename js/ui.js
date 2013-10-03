/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true*/
/*global $, prompt, bullethole, loadFromURL, NProgress*/
var themeUrl = '';
var DEVELOPMENT = true;
var LOADING_TIMER = -1;

/* CSS classes used:
    bh-theme-name
    bh-global-header
    bh-side-header
    bh-role-header
    bh-minmaxstr
    bh-string-property
    bh-string-value
    bh-value-length
    bh-inbounds-true
    bh-inbounds-false
    bh-hr
*/

if (!DEVELOPMENT) {
    $(document).ready(function () {
        NProgress.start();
        LOADING_TIMER = setInterval(function () {
            NProgress.inc();
        }, 20);
    });
    $(window).load(function () {
        NProgress.done();
        clearInterval(LOADING_TIMER);
    });
}

$('#theme-load').click(function (e) {
    e.preventDefault();
    themeUrl = $('#theme-url').val().trim();
    loadFromURL(themeUrl);
});

//  minMaxStr: 0 // {type: minMaxStr, name: theme.[name], value: [str], length: [len], bounds: [inBounds]}

function bhInBounds(val, inBounds, cls) {
    cls = cls || '';
    return "<span class='bh-inbounds-" + inBounds + " " + cls + "'>" + val + "</span>";
}

var BH_TYPES = bullethole.types;
function parseBHElem(elem) {
    var res = '', type = elem.type;
    
    if (type === BH_TYPES.minMaxStr) {
        res = '<div class="bh-minmaxstr"><span class="bh-string-property">' + elem.name + '</span>: ' + bhInBounds(elem.value, elem.bounds, 'bh-string-value') + ' <span class="bh-value-length">' + elem.length + '</span></div>';
    }
    
    return res;
}

function parseBHNode(node) {
    var len, i, res = [];
    
    for (i = 0, len = node.length; i < len; i += 1) {
        res.push(parseBHElem(node[i]));
    }
    
    return res;
}

function parseBHResult(bh) {
    function TAG(tag, cls, content) {
        return "<" + tag + (typeof cls === 'string' ? ' class="' + cls + '"' : '') + ">" + content + "</" + tag + ">";
    }
    
    var meta = bh.meta,
        glob = bh.global,
        side = bh.sides,
        role = bh.roles,
        res = [];
    
    res.push(TAG('h2', 'bh-theme-name', meta.name) + '<hr class="bh-hr">');
    if (glob.length > 0) {
        res.push(TAG('h3', 'bh-global-header', 'Global'));
        res.push(parseBHNode(glob).join(''));
    }
    
    if (side.length > 0) {
        res.push(TAG('h3', 'bh-side-header', 'Sides'));
        res.push(parseBHNode(glob).join(''));
    }
    
    if (role.length > 0) {
        res.push(TAG('h3', 'bh-role-header', 'Roles'));
        res.push(parseBHNode(glob).join(''));
    }
    
    return res.join('');
}

function loadFromURL(url) {
    if (url.substr(0, 8) === 'https://') {
        url = url.substr(8);
    } else if (url.substr(0, 7) === 'http://') {
        url = url.substr(7);
    }
    
    NProgress.start();
    $.get("http://www.corsproxy.com/" + url, function (resp) {
        var json, check;
        
        try {
            json = JSON.parse(resp);
            check = bullethole.check(json);
            $('#theme-content').html(parseBHResult(check));
        } catch (ex) {
            $('.on-theme-load').hide();
            prompt("Couldn't load your theme.\nCheck your theme with RiceKirby's theme checker.", ex);
            throw ex;
        }
        
        $('.on-theme-load').show();
    }).fail(function () {
        prompt("Couldn't load your theme.\nTry reuploading it to pastebin, and check your url.", url);
    }).progress(NProgress.inc).always(NProgress.done);
}

if (DEVELOPMENT) {
    // Kirby theme
    loadFromURL('http://pastebin.com/raw.php?i=dm1nDrvz');
}

$('.on-theme-load').hide();