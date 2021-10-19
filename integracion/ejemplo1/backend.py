from flask import Flask, render_template, request, redirect, url_for, flash
from flask import render_template
import pymongo
from backend import *

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

db = myclient['arquetipos']
coleccion = db['plantillas']


def Desc_Category():
  desc_categoria=[]
  for x in coleccion.find({},{"desc_categoria"}):
    desc_categoria.append(str(x['desc_categoria']))
  return desc_categoria
  

def buscarCategoria():
  categoria=[]
  for x in coleccion.find({},{ "_id": 0, "categoria": 1}):
        
    categoria.append(str((x['categoria'])))
  return categoria
  

def buscarTitulo():
  titulo_parrafo=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      for z in y["desarrollo"]:
        titulo_parrafo.append(str(z["titulo_parrafo"]))

  return titulo_parrafo


def buscarParrafo():
  parrafo=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      for z in y["desarrollo"]:
        parrafo.append(str(z["parrafo"]))

  return parrafo


def buscarDesarrollo():
  desarrollo=[]
  parrafo = buscarParrafo()
  tituloParafo = buscarTitulo()
  id_parrafo = buscarId_parrafo()
  for x in range(len(tituloParafo)):
    desarrollo.append(str(id_parrafo[x])+'\n'+str(tituloParafo[x])+'\n'+str(parrafo[x]))

  return desarrollo

def buscarId_parrafo():
  id_parrafo=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      for z in y["desarrollo"]:
        id_parrafo.append(str(z["id_parrafo"]))
  return id_parrafo

def buscarFecha():
  fecha=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      fecha.append(str(y["fecha"]))
  return fecha


def buscarJson():
  json = []
  ID = int(request.form['ID'])
  for i in coleccion.find({"_id": ID}):
      json.append((i))
  return json


def buscaTitulooo():
  titulo = []
  for x in coleccion.find({},{"documentos"}):
    for y in x['documentos']:
      titulo.append((y['titulo']))

  return titulo

def buscaTitulo():
  titulo = []
  id = int(request.form['id'])
  resp = coleccion.find({"_id":id})
  for i in resp:
      i['documentos']
      for j in i['documentos']:
          titulo.append((j['titulo']))

  return titulo

def buscaSubtituloooo():
  subtitulo = []
  for x in coleccion.find({},{"documentos"}):
    for y in x['documentos']:
          subtitulo.append((y['subtitulo']))
  return subtitulo

def buscaSubtitulo():
  subtitulo = []
  id1 = int(request.form['id1'])
  resp = coleccion.find({"_id":id1})
  for i in resp:
      i['documentos']
      for j in i['documentos']:
          subtitulo.append((j['subtitulo']))
  return subtitulo

def Id_Documento():
  Id_doc=[]
  for x in coleccion.find({},{"documentos"}):
    for y in x["documentos"]:
      Id_doc.append(str(y["id_documento"]))
  print (Id_doc)    
  return Id_doc


def Document():
  Document=[]
  id_documento= Id_Documento()
  titulo= buscaTitulooo()
  subtitulo= buscaSubtituloooo()
  fecha = buscarFecha()
  desarrollo = buscarDesarrollo()
  for x in range(len(subtitulo)):
    Document.append(str(id_documento[x])+'\n'+str(titulo[x])+'\n'+str(subtitulo[x])+'\n'+str(fecha[x])+'\n'+str(subtitulo[x])+'\n'+str(desarrollo[x]))
  return Document