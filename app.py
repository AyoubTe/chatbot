from flask import Flask, render_template, url_for, request, jsonify

from chat import get_response

app = Flask(__name__)


@app.get('/')
def index():
    script = url_for('static', filename='js/script.js')
    style = url_for('static', filename='css/main.css')
    return render_template('index.html', script=script, style=style)


@app.post("/chat")
def chat():
    text = request.get_json().get("message")
    result = get_response(text)
    response = result["response"]
    tag = result["tag"]

    message = {"answer": response, "context": tag}
    return jsonify(message)


if __name__ == '__main__':
    app.run()
