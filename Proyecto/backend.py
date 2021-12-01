from flask import request
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

db = myclient['arquetipos']
coleccion = db['plantillas']
textos = db['Textos']

def tag_documento():
  ID = int(request.form['ID'])
  for data in coleccion.find({"_id": ID}):
    for document in data['documentos'] :
      key = list()
      for i in document.keys():
        key.append(i) 
  return key

def tag_desarrollo():
  ID = int(request.form['ID'])
  for data in coleccion.find({"_id": ID}):
    for documentos in data["documentos"]:
      for desarrollo in documentos["desarrollo"]:
        key =list()
      for i in desarrollo.keys():
        key.append(i) 
  return key 

def buscarJson():
  ID = int(request.form['ID'])
  for data in coleccion.find({"_id": ID}):
    key = list()
    for i in data.keys():
      key.append(i) 
  return data,key

def ID():
  ID = coleccion.find().distinct('_id') 
  return",".join( repr(i) for i in ID).split(',') 



  
