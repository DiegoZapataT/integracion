$(document).ready(function() {

    $("#categoria").change(function(){
        console.log($('option:selected', $(this)).text());
      });
});
