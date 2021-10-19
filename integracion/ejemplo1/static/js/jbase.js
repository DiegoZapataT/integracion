$(document).ready(function() {

    $("#categoria").change(function(){
        console.log($('option:selected', $(this)).text());
      });
      

    $('#cTexto').summernote();    
    $("#cuadro").submit(function(event) {
      event.preventDefault();
      var message = $('#cTexto').val();
      $("#contenido").append(message)
    });
 
});
