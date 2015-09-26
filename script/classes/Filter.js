/**
 * Created by Aabhas Arora on 26-09-2015.
 */
function getFilterObject () {
    var filterState = {
        city: '',
        category: '',
        radial: ''
    };
    $('.filter-group').each(function (index, filter) {
        var filterValue = filter.value;
        filterState[$(filter).attr('data-filterType')] = filterValue || '';
    });
    return filterState;
};

$(document).ready(function () {
    $('.filter-group').change(function (index, filter) {
        var filters = getFilterObject();
        markAdLocation();
    });
});