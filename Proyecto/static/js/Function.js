var data = JSON.parse(document.getElementById("data").dataset.data);

$("#tag_documento").hide();
$("#tag_desarrollo").hide();

// $(".draggable").draggable({
//     revert: true,
//     start: function(event, ui) {
//         $(this).fadeTo('fast', 0.5);
//     },
//     stop: function(event, ui) {
//         $(this).fadeTo(0, 1);
//     }
// });

//CREA EDITOR DE TEXTO CON DRAG & DROP
var editor = new FroalaEditor('#editor')
var dragCallback = function (e) {
e.dataTransfer.setData('Text', this.id);
};

document.querySelector('#caja').addEventListener('dragstart', dragCallback);
new FroalaEditor('div#froala-editor', {
    documentReady: true,
    events: {   
    initialized: function () {
        var editor = this;
        editor.events.on('drop', function (dropEvent) {
            editor.markers.insertAtPoint(dropEvent.originalEvent);
            if (dropEvent.originalEvent.dataTransfer.getData('Text') == 'caja') {
                editor.html.insert($('#caja').text());    
            }
            return false;
        },true);
    }},
})


function descargarJson(obj,name){
    var dataStr = "data:text/json;charset=utf-8,"+ encodeURIComponent(obj);
    var downloadNode = document.createElement('a');
    downloadNode.setAttribute("href", dataStr);
    downloadNode.setAttribute("download", name + ".json");
    document.body.appendChild(downloadNode);//para firefox
    downloadNode.click();
    downloadNode.remove();
}

$("#Tojson").click(function() {
    var texto = []
    for (let node of document.getElementById("froala-editor").getElementsByTagName("P")) {  
        texto.push(node.textContent);
    }
    var titulo = texto[1].split("/n",1).toString();
    var titulodoc = titulo;
    for(var i = 0; i < titulo.split(" ").length; i++){
        titulodoc = titulodoc.replace(" ","_");
    } 
    var cuerpo = [];
    for (let i = 2; i < texto.length; i++) {
        cuerpo.push(texto[i]); 
    }
    var dat = []
    var doocument={}
    doocument["Title"]=titulo;
    doocument["Body"]= cuerpo;
    dat.push(doocument);
    // console.log(texto);
    // console.log(cuerpo);
    // console.log(titulo);
    // console.log(titulodoc);
    
    var jdon = JSON.stringify(dat);
    
    descargarJson(jdon,titulodoc);
  });  


  $("#save").on('submit', function(event) {
    event.preventDefault();    
    var texto = []
    for (let node of document.getElementById("froala-editor").getElementsByTagName("P")) {  
        texto.push(node.textContent);
    }
    var titulo = texto[1].toString();
    var cuerpo = [];
    for (let i = 2; i < texto.length; i++) {
        cuerpo.push(texto[i]); 
    }
    var dat = []
    var doocument={}
    doocument["Title"]=titulo;
    doocument["Body"]= cuerpo;
    dat.push(doocument);
    fetch("/save", {
        method: 'POST',
        body: JSON.stringify(dat),
        headers:{
          'Content-Type': 'application/json'
        }
      })
});


$("#delete").on('submit', function(event) {
    event.preventDefault();    
    console.log(document.querySelector("input[id='delete']").value);
    var id = document.querySelector("input[id='delete']").value
    
    fetch("/delete", {
        method: 'POST',
        body: JSON.stringify({"IDdelete":id}),
        headers:{
            'Content-Type': 'application/json'
          }
          

      })
});

$("#formjson").on('submit', function(event) {
    event.preventDefault();    
    var formData = new FormData();
    var fileField = document.querySelector("input[type='file']");
    formData.append('archivosubido', fileField.files[0]);
    fetch("/json", {
        method: 'POST',
        body: formData
      })
});

$("#tags").change(function(){
    $("#tag_documento").hide();
    $("#tag_desarrollo").hide();
    var seleccion =($('option:selected', $(this)).text());            
    if (seleccion != 'documentos'){
        $('#contenedor').text(data[seleccion]);
    } else{
        $("#tag_documento").show();
    }   
})
var doc_tag = data.documentos[0]
$("#tag_documento").change(function(){
    $("#tag_desarrollo").hide();
    var tagsdoc =($('option:selected', $(this)).text());            
    if (tagsdoc != 'desarrollo'){
        $('#contenedor').text(doc_tag[tagsdoc]);
    } else {
        $("#tag_desarrollo").show();
    }
})

var des_tag = doc_tag.desarrollo[0];
$("#tag_desarrollo").change(function(){
    var tagsdes =($('option:selected', $(this)).text());            
        $('#contenedor').text(des_tag[tagsdes]);
})

$( "#doc" ).click(function() {
    $('#contenedor').html(
        data.documentos[0].titulo+'<br><br>'+
        data.documentos[0].subtitulo+'<br><br>'+
        data.documentos[0].fecha);
});

$( "#des" ).click(function() {

    $('#contenedor').html(
    data.documentos[0].desarrollo[0].titulo_parrafo+'<br><br>'+
    data.documentos[0].desarrollo[0].parrafo);
});

$( "#json" ).click(function() {
    $('#contenedor').html(
        data.categoria +'<br><br>'+
        data.desc_categoria +'<br><br>'+ 
        data.documentos[0].titulo+'<br><br>'+
        data.documentos[0].subtitulo+'<br><br>'+
        data.documentos[0].fecha+'<br><br>'+
        data.documentos[0].desarrollo[0].titulo_parrafo+'<br><br>'+
        data.documentos[0].desarrollo[0].parrafo);
});


  

