from flask import Flask, render_template, request,redirect, url_for
from flask import render_template
from backend import *
import json

app =Flask(__name__)

###############  Ruta Main  ##################
@app.route('/', methods = ['GET','POST'])
def index():
  if request.method == 'POST':
    data,key = buscarJson()
    key_doc = tag_documento()
    key_des = tag_desarrollo()
    return render_template('index.html', data=data,key=key,key_doc=key_doc,key_des=key_des)
  else:
    return render_template('index.html', data={},key={},key_doc={}, key_des={})

@app.route('/save', methods=['GET','POST'])
def save():
  texto = request.form['texto']
  print(texto)
  return redirect(url_for("index"))

@app.route('/json', methods=['GET','POST'])
def ReceiveJson():
  jsonA = request.files['archivosubido']
  jsonA.save('archive.json', buffer_size=16384)

  with open('archive.json', encoding='utf8') as file:
    file_data = json.load(file)
  
  if isinstance(file_data, list):
    coleccion.insert_many(file_data)  
  else:
    coleccion.insert_one(file_data)
    
  return ('Recibido'), 200
    
if __name__ == '__main__':
  app.run(debug = True, port=9000)

