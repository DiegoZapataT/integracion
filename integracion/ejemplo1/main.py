from flask import Flask, render_template, request, redirect, url_for, flash
from flask import render_template
from backend import *

app =Flask(__name__)

###############  Rutas  ##################
@app.route('/', methods = ['GET','POST'])
def index():
  if request.method == 'POST':
    data,key = buscarJson()
    key_doc = tag_documento()
    key_des = tag_desarrollo()
    return render_template('index.html', data=data,key=key,key_doc=key_doc,key_des=key_des)
  else:
    return render_template('index.html', data={},key={},key_doc={}, key_des={})


@app.route('/index', methods = ['GET','POST'])
def index_r():
    return render_template('repuestos/index_repuesto.html')

@app.route('/category', methods = ['GET','POST'])
def buscarCategori():
  return render_template('repuestos/category.html', categoria=buscarCategoria())

@app.route('/titulo', methods = ['GET','POST'])
def buscarTitul():
  return render_template('repuestos/titulo.html', titulo= buscarTitulo())

@app.route('/parrafo', methods = ['GET','POST'])
def buscarParraf():
  return render_template('repuestos/parrafo.html', parrafo= buscarParrafo())

@app.route('/desarrollo', methods = ['GET','POST'])
def buscarDesarroll():
  return render_template('repuestos/desarrollo.html', desarrollo=buscarDesarrollo())

@app.route('/fecha', methods = ['GET','POST'])
def buscarFech():
  return render_template('repuestos/fecha.html', fecha=buscarFecha())

@app.route('/json', methods = ['GET','POST'])
def buscarJso():
  return render_template('repuestos/json.html', json=buscarJson())

@app.route('/titu', methods = ['POST'])
def buscaTitul():
  return render_template('repuestos/titu.html', titulo= buscaTitulo())

@app.route('/subtitulo', methods = ['POST'])
def buscaSubtitul():
  return render_template('repuestos/subtitulo.html', subtitulo=buscaSubtitulo())


@app.route('/Desc_cat', methods = ['GET','POST'])
def Desc_Categor():
  return render_template('repuestos/desc_category.html', desc_categoria=Desc_Category())


@app.route('/Document', methods = ['GET','POST'])
def Documen():
  return render_template('repuestos/documentos.html', Document=Document())

     
if __name__ == '__main__':
        app.run(debug = True, port=9000)

  # if request.method == 'POST':
  #       id = request.form['ID']
  #   tag=[]
  #   for x in coleccion.find({},{"_id": id}):
  #     print(x)
  #   return render_template('index.html' , id = id)
  # else:  
  #   return render_template('index.html') 
