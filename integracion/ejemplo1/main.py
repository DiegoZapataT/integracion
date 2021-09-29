from flask import Flask
from flask import request
from flask import render_template
import form
import pymongo

app =Flask(__name__)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

db = myclient['arquetipos']
coleccion = db['plantillas']

@app.route('/', methods = ['GET','POST'])

def index():
    coment_form = form.CommentForm(request.form)
    if request.method == 'POST' and coment_form.validate():
        print(coment_form.username.data)
        print(coment_form.email.data)
    return render_template('index.html', form = coment_form)

@app.route('/category', methods = ['GET','POST'])
def buscarCategoria():
  categoria=[]
  for x in coleccion.find({},{ "_id": 0, "categoria": 1}):
        
    categoria.append(str((x['categoria'])))

  return render_template('category.html', categoria=categoria)

@app.route('/title', methods = ['GET','POST'])
def buscarTitulo():
  titulo_parrafo=[]
  #parrafo=[] FALTA AGREGAR PARRAFO
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      for z in y["desarrollo"]:
        titulo_parrafo.append(str(z["titulo_parrafo"]))
        #parrafo.append(str(z["parrafo"]))

  return render_template('title.html', titulo=titulo_parrafo) #parrafo=parrafo

@app.route('/desarrollo', methods = ['GET','POST'])
def buscarDesarrollo():
  desarrollo=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      for z in y["desarrollo"]:
        desarrollo.append(str(z["id_parrafo"]))
        desarrollo.append(str(z["titulo_parrafo"]))
        desarrollo.append(str(z["parrafo"]))

  return render_template('desarrollo.html', desarrollo=desarrollo)

@app.route('/fecha', methods = ['GET','POST'])
def buscarFecha():
  fecha=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      fecha.append(str(y["id_documento"]))
      fecha.append(str(y["fecha"]))

  return render_template('fecha.html', fecha=fecha)


if __name__ == '__main__':
        app.run(debug = True, port=9000)

