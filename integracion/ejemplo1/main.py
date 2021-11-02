from flask import Flask, render_template, request
from flask import render_template
from backend import *

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
    
if __name__ == '__main__':
        app.run(debug = True, port=9000)

