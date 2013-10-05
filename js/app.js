/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true, browser: true, nomen: true*/
/*global $, NProgress, Prism*/

// Warning: this code is quite messy
$(function () {
    // Use the browser's built-in functionality to quickly and safely escape the
    // string
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function example(code) {
        return '<pre class="syntax-highlight language-javascript"><code>' + escapeHtml(code) + '</code></pre>';
    }
    
    function getElemType(type) {
        type = type.toLowerCase();
        return {string: 'String', number: 'Number', array: 'Array', boolean: 'Boolean', object: 'Object'}[type] || type;
    }
    
    function elemType(type) {
        var len, i, res = [];
        
        if (typeof type === 'string') {
            type = type.split(" ");
        }
        
        for (i = 0, len = type.length; i < len; i += 1) {
            res.push(getElemType(type[i]));
        }
        
        return res.join(' | ');
    }

    /* doc-element, doc-element-property, toggle-visibility, doc-element-content, doc-element-description */
    function parseElem(name, elem, partOf) {
        var uniqid = Math.random().toString().substr(2) + Math.random().toString().substr(2);
        var requiredText = elem.required ? '<span class="doc-element-required">Required</span>' : '<span class="doc-element-optional">Optional</span>';
        var type = elemType(elem.type);
        var properties = '', notes = '', len, i;
        
        // [{name, description, required, type}]
        if (elem.properties) {
            properties = '<ul class="doc-element-properties">';
            for (i in elem.properties) {
                properties += '<li class="doc-element-properties-property">' + parseElem(i, elem.properties[i], partOf) + '</li>';
            }
            properties += '</ul><br/>';
        }

        if (elem.notes) {
            notes = '<ul class="doc-element-notes">';
            for (i = 0, len = elem.notes.length; i < len; i += 1) {
                notes += '<li class="doc-element-notes-note">' + elem.notes[i].replace(/\[(.*?)\]/g, '<span class="doc-note-annotate">$1</span>') + '</li>';
            }
            notes += '</ul><br/>';
        }
        
        return '<div class="doc-element">'
            + '<span class="doc-element-property">' + name + '</span> '
            + '<span class="doc-badge">' + requiredText + ' ' + type + '</span>'
            + ' <i class="icon-chevron-right toggle-visibility" data-enabled="false" data-of="' + partOf + '" data-target="' + uniqid + '"></i>'
            + '<br/>'
            + '<div id="' + uniqid + '" class="init-hidden doc-element-content">'
            + properties
            + '<span class="doc-element-description">' + elem.description + '</span>'
            + (elem.example ? '<br/>' + example(JSON.stringify(elem.example, null, 4)) : '')
            + (notes && notes.length ? '<br/><span class="doc-element-notes-header">Notes:</span>' + notes : '')
            + '</div>'
            + '</div>';
    }
    
    function ajax(file, callback) {
        NProgress.start();
        // jQuery automatically parses the JSON
        $.get(file, function (resp) {
            callback(resp);
        }).progress(NProgress.inc).always(NProgress.done);
    }
    
    ajax('data/docs.min.json', function (json) {
        var html = [],
            sidebar = [],
            currentCategory = '',
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
                    currentCategory = i;
                    sidebar.push('<li><a href="#docs-header-' + i + '">' + i + '</li>');
                    html.push('<span id="docs-header-' + i + '">' + i + '</span> <span class="label label-primary show-all" data-name="' + i + '">Show All</span> <span class="label label-warning hide-all" data-name="' + i + '">Hide All</span> <hr/>');
                    return cycle(prop);
                }
                
                html.push(parseElem(i, prop, currentCategory));
            }
        }
        
        html.push('<ul>');
        cycle(json);
        html.push('</ul>');
        
        var $doc = $('#theme-doc');
        $doc.html(html.join(''));
        $('.doc-sidebar').append(sidebar.join(''));
        $('.syntax-highlight').each(function (index, elem) {
            Prism.highlightElement(elem);
        });
        
        $('.init-hidden').hide();
        
        function hideElement($this) {
            $this.data('enabled', false).addClass('icon-chevron-right').removeClass('icon-chevron-left');
            $("#" + $this.data('target')).hide();
        }
        
        function showElement($this) {
            $this.data('enabled', true).addClass('icon-chevron-left').removeClass('icon-chevron-right');
            $("#" + $this.data('target')).show();
        }
        
        $doc.on("click", ".toggle-visibility", function () {
            var $this = $(this);
            var enabled = $this.data('enabled') || false;
            
            if (enabled) {
                hideElement($this);
            } else {
                showElement($this);
            }
        });
        
        $doc.on("click", ".show-all", function () {
            var name = $(this).data('name');
            $('[data-of="' + name + '"]').each(function () {
                showElement($(this));
            });
        });
        
        $doc.on("click", ".hide-all", function () {
            var name = $(this).data('name');
            $('[data-of="' + name + '"]').each(function () {
                hideElement($(this));
            });
        });
    });
});