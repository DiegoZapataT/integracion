import re
from flask import Flask
from flask import request
from flask import render_template

import form


app =Flask(__name__)

@app.route('/', methods = ['GET','POST'])

def index():
    coment_form = form.CommentForm(request.form)
    if request.method == 'POST' and coment_form.validate():
        print(coment_form.username.data)
        print(coment_form.email.data)
        print(coment_form.comment.data)
    return render_template('index.html', form = coment_form)


if __name__ == '__main__':
        app.run(debug = True, port=9000)

