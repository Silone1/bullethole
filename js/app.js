/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true, browser: true, nomen: true*/
/*global $, NProgress, Prism*/

$(function () {
    // Use the browser's built-in functionality to quickly and safely escape the
    // string
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function example(code) {
        return '<pre class="syntax-highlight language-javascript"><code class="language-javascript">' + escapeHtml(code) + '</code></pre>';
    }
    
    function getElemType(type) {
        type = type.toLowerCase();
        if (type === "string") {
            return ['success', '"String"'];
        } else if (type === "number") {
            return ['primary', 'Numb3r'];
        } else if (type === 'array') {
            return ['warning', '[Array]'];
        } else if (type === 'boolean') {
            return ['info', 'Boolean?'];
        } else if (type === 'object') {
            return ['default', '{Object}'];
        }
        
        return ['danger', 'Unknown - ' + type];
    }
    
    function elemType(type) {
        var len, i, res = [];
        if (Array.isArray(type)) {
            for (i = 0, len = type.length; i < len; i += 1) {
                res.push(getElemType(type[i])[1]);
            }
            
            return ['info', res.join(' | ')];
        } else {
            return getElemType(type);
        }
    }
    
    /* doc-element, doc-element-property, toggle-visibility, doc-element-content, doc-element-description */
    function parseElem(name, elem) {
        var uniqid = Math.random().toString().substr(2);
        var requiredText = elem.required ? 'Required' : 'Optional',
            requiredClass = elem.required ? 'danger' : 'success';
        var type = elemType(elem.type);

        return '<div class="doc-element">'
            + '<span class="doc-element-property">' + name + '</span> '
            + '<span class="label label-' + type[0] + '">' + type[1] + '</span>'
            + ' <span class="label label-' + requiredClass + '">' + requiredText + '</span>'
            + ' <i class="icon-chevron-right toggle-visibility" data-enabled="false" data-target="' + uniqid + '"></i>'
            + '<br/>'
            + '<div id="' + uniqid + '" class="init-hidden doc-element-content">'
            + '<span class="doc-element-description">' + elem.description + '</span>'
            + '<br/>' + example(JSON.stringify(elem.example, null, 4))
            + '</div>'
            + '</div>';
    }
    
    function ajax(file, callback) {
        NProgress.start();
        $.get(file, function (resp) {
            callback(eval(resp));
        }).progress(NProgress.inc).always(NProgress.done);
    }
    
    ajax('data/docs.js', function (json) {
        var html = [],
            sidebar = [],
            len,
            i;
        
        function cycle(obj) {
            var prop, i;
            for (i in obj) {
                prop = obj[i];
                if (i === '__category__') {
                    continue;
                }
                
                if (typeof prop === 'object' && typeof prop.__category__ !== 'undefined' && prop.__category__ === true) {
                    sidebar.push('<li><a href="#docs-header-' + i + '">' + i + '</li>');
                    html.push('<h2 id="docs-header-' + i + '">' + i + '</h2><hr/>');
                    return cycle(prop);
                }
                
                html.push(parseElem(i, prop) + '<br/>');
            }
        }
        
        cycle(json);
        
        $('.page-content').html(html.join(''));
        $('.doc-sidebar').append(sidebar.join(''));
        $('.syntax-highlight').each(function (index, elem) {
            Prism.highlightElement(elem);
        });
        
        $('.init-hidden').hide();
        $(".page-content").on("click", ".toggle-visibility", function () {
            var $this = $(this);
            var enabled = $this.data('enabled') || false;
            
            if (enabled) {
                $this.data('enabled', false).addClass('icon-chevron-right').removeClass('icon-chevron-left');
                $("#" + $this.data('target')).hide();
            } else {
                $this.data('enabled', true).addClass('icon-chevron-left').removeClass('icon-chevron-right');
                $("#" + $this.data('target')).show();
            }
        });
    });
});