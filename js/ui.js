/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true*/
/*global $, prompt, bullethole, loadFromURL*/
var themeUrl = '';

$('#theme-load').click(function (e) {
    e.preventDefault();
    themeUrl = $('#theme-url').val().trim();
    
    if (themeUrl.substr(0, 8) === 'https://') {
        themeUrl = themeUrl.substr(8);
    } else if (themeUrl.substr(0, 7) === 'http://') {
        themeUrl = themeUrl.substr(7);
    }
    
    loadFromURL(themeUrl);
});

function loadFromURL(url) {
    $.get("http://www.corsproxy.com/" + url, function (resp) {
        var json;
        
        try {
            json = JSON.parse(resp);
        } catch (ex) {
            prompt("Couldn't load your theme.\nCheck your theme with Rice's theme checker.", ex);
        }
        
        $('#theme-content').html(bullethole.check(json));
    }).fail(function () {
        prompt("Couldn't load your theme.\nTry reuploading it to pastebin, and check your url.", url);
    });
}