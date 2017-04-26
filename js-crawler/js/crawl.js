$(document).ready(function() {
    $.ajax({
        url: "http://www.archanaskitchen.com/how-to-make-homemade-pita-bread",
        type: "get",
        dataType: "html",
        success: function(data) {
            $('#container').text(data);
        },
        error: function(status, data) {
            console.log(status.statusText);
            console.log('failed');
        }
    })
})
