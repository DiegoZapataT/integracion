var data = JSON.parse(document.getElementById("data").dataset.data);

$("#tag_documento").hide();
$("#tag_desarrollo").hide();
$("#contenedor2").hide();
$("#contenedor3").hide();

// $(".draggable").draggable({
//     revert: true,
//     start: function(event, ui) {
//         $(this).fadeTo('fast', 0.5);
//     },
//     stop: function(event, ui) {
//         $(this).fadeTo(0, 1);
//     }
// });

var editor = new FroalaEditor('#editor')
var dragCallback = function (e) {
e.dataTransfer.setData('Text', this.id);
};

document.querySelector('#caja').addEventListener('dragstart', dragCallback);
new FroalaEditor('div#froala-editor', {
events: {
initialized: function () {
var editor = this;
editor.events.on('drop', function (dropEvent) {
    editor.markers.insertAtPoint(dropEvent.originalEvent);
    var $marker = editor.$el.find('.fr-marker');
    $marker.replaceWith(FroalaEditor.MARKERS);
    editor.selection.restore();

    if (!editor.undo.canDo()) editor.undo.saveStep();

    if (dropEvent.originalEvent.dataTransfer.getData('Text') == 'caja') {
    editor.html.insert($('#caja').text());    
    }
    editor.undo.saveStep();

    dropEvent.preventDefault();
    dropEvent.stopPropagation();
    return false;
}, true);}}
})

$("#save").submit(function(event) {
    var texto = $("#texto").text();
    alert(texto)
    event.preventDefault();
  });  
 
$("#tags").change(function(){
    $("#tag_documento").hide();
    $("#tag_desarrollo").hide();
    $("#contenedor2").hide();
    $("#contenedor3").hide();
    var seleccion =($('option:selected', $(this)).text());            
    if (seleccion != 'documentos'){
        $('#contenedor1').text(data[seleccion]);
    } else{
        $("#tag_documento").show();
    }   
})
var doc_tag = data.documentos[0]
$("#tag_documento").change(function(){
    $("#tag_desarrollo").hide();
    $("#contenedor2").hide();
    $("#contenedor3").hide();
    var tagsdoc =($('option:selected', $(this)).text());            
    if (tagsdoc != 'desarrollo'){
        $('#contenedor1').text(doc_tag[tagsdoc]);
    } else {
        $("#tag_desarrollo").show();
    }
})

var des_tag = doc_tag.desarrollo[0];
$("#tag_desarrollo").change(function(){
    $("#contenedor2").hide();
    $("#contenedor3").hide();
    var tagsdes =($('option:selected', $(this)).text());            
        $('#contenedor1').text(des_tag[tagsdes]);
})

$( "#doc" ).click(function() {
    var doc = data.documentos[0]
    $('#contenedor1').text(doc['titulo']);
    $("#contenedor2").show();
    $('#contenedor2').text(doc['subtitulo']);
    $("#contenedor3").show();
    $('#contenedor3').text(doc['fecha']);
});

$( "#des" ).click(function() {
    $("#contenedor3").hide();
    var doc = data.documentos[0]
    var des = doc.desarrollo[0];
    $('#contenedor1').text(des['titulo_parrafo']);
    $("#contenedor2").show();
    $('#contenedor2').text(des['parrafo']);
});

$( "#json" ).click(function() {
    $('#contenedor1').html(
        data.categoria +'<br><br>'+
        data.desc_categoria +'<br><br>'+ 
        data.documentos[0].titulo+'<br><br>'+
        data.documentos[0].subtitulo+'<br><br>'+
        data.documentos[0].fecha+'<br><br>'+
        data.documentos[0].desarrollo[0].titulo_parrafo+'<br><br>'+
        data.documentos[0].desarrollo[0].parrafo);
});


  

