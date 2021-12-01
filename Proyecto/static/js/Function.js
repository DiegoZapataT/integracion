var data = JSON.parse(document.getElementById("data").dataset.data);

$("#tag_documento").hide();
$("#tag_desarrollo").hide();


toastr.options = {
    "closeButton": true,
    "positionClass": "toast-bottom-left",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

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
    document.body.appendChild(downloadNode);
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
    var jdon = JSON.stringify(dat);
    
    descargarJson(jdon,titulodoc);
    toastr.success('Archivo Json descargado') 
  });  

function descargarODT(obj,name){
    var dataStr = "data:text/json;charset=utf-8,"+ encodeURIComponent(obj);
    var downloadNode = document.createElement('a');
    downloadNode.setAttribute("href", dataStr);
    downloadNode.setAttribute("download", name + ".odt");
    document.body.appendChild(downloadNode);
    downloadNode.click();
    downloadNode.remove();
}
$("#ODT").click(function() {
    var texto = []
    for (let node of document.getElementById("froala-editor").getElementsByTagName("P")) {  
        texto.push(node.textContent);
        console.log(node.textContent);
    }
    var titulo = texto[1].split("/n",1).toString();
    var titulodoc = titulo;
    for(var i = 0; i < titulo.split(" ").length; i++){
        titulodoc = titulodoc.replace(" ","_");
    }
    var jdon = JSON.stringify(texto);
    
    descargarODT(jdon,titulodoc);
    toastr.success('Archivo ODT descargado')
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
    toastr.success('Texto guardado en la base de datos')
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
    toastr.success('Json borrado con éxito!')  
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
    toastr.success('Archivo Json cargado con éxito!') 
});

$("#selectID").change(function(){
    globalThis.ID = $("#selectID option:selected").val();
    $('#inputID').val(ID);
})

$("#tags").change(function(){
    $("#tag_documento").hide();
    $("#tag_desarrollo").hide();
    globalThis.op = ($("#tags option:selected").val());
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
    globalThis.op = ($("#tag_documento option:selected").val());
    var tagsdoc =($('option:selected', $(this)).text());            
    if (tagsdoc != 'desarrollo'){
        $('#contenedor').text(doc_tag[tagsdoc]);
    } else {
        $("#tag_desarrollo").show();
    }
})

var des_tag = doc_tag.desarrollo[0];
$("#tag_desarrollo").change(function(){
    globalThis.op = ($("#tag_desarrollo option:selected").val());
    var tagsdes =($('option:selected', $(this)).text());            
        $('#contenedor').text(des_tag[tagsdes]);
})

$("#deletebutton").click(function() {
    if(op == 'categoria' || op == 'desc_categoria' ||op == 'documentos'){
        $("#tags option:selected").remove();
        if(op == 'documentos'){
            $("#tag_documento").remove();
            $("#tag_desarrollo").remove();
        }
    }else if(op =='titulo'|| op=='subtitulo' || op=='fecha'||op=='desarrollo' ){
        $("#tag_documento option:selected").remove();   
        if(op =='desarrollo'){
            $("#tag_desarrollo").remove();
        } 
    }else if(op='titulo_parrafo' || op=='parrafo'){
        $("#tag_desarrollo option:selected").remove();   
    }
    $("#contenedor").text('');
    toastr.info('Tag eliminado con exito')
});

    
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






  

