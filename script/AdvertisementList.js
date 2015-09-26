/**
 * Created by Aabhas Arora on 26-09-2015.
 */

var advertisements = [];

$(document).ready(function (){
    $.getJSON('../script/data/advertisements.json', function (data) {
        data.adList.forEach(function (value) {
            var advertisment = new Advertisement(value);
            advertisements.push(advertisment);
        });
    });
});