from wtforms import Form
from wtforms import StringField, TextField
from wtforms.fields.html5 import EmailField
from wtforms import validators

class CommentForm(Form):
    username = StringField('username',
                [   validators.DataRequired(message = 'el username es requerido'),
                    validators.length(min=4, max=15, message= 'Ingrese un username valido')
                    ])
    email = EmailField('Correo',
                        [validators.DataRequired(message = 'el email es requerido')
                        #,validators.Email(message='que sea un email valido')
                        ])
    comment = TextField('cometnario')


class formularioJSON(Form):
    categoria = 
