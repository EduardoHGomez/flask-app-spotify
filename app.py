import pandas as pd
import numpy as np

from analize import getUserMetrics

from flask import Flask, render_template, request, jsonify, redirect

app = Flask(__name__)

@app.route("/redirect")
def redirect():
    return "Redirect link"

@app.route('/analize', methods=['POST'])
def analize():
    auth = request.headers.get('Authorization')

    data = request.get_json()  # Parse JSON
    tracks = data['array']  # Get array

    # Do the analysis
    result = getUserMetrics(tracks, auth)

    return jsonify(result)


@app.route("/results", methods=['GET'])
def results():
    return render_template('results.html')

@app.route("/")
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)