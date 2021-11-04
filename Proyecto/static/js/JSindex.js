$(document).ready(function() {
    $('#RichText').richText();

    $( "#botontext" ).click(function() {
        $("#text").html($('#RichText').val());
    });
}); 