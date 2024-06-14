from datetime import datetime
from urllib import request

from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


@app.route('/')
def index():
    script = url_for('static', filename='script.js')
    style = url_for('static', filename='main.css')
    return render_template('index.html', script=script, style=style)


if __name__ == '__main__':
    app.run()
