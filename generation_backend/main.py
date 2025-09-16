from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from flask import send_from_directory
from flask_cors import CORS
from report_generation import generate_report
import os

app = Flask(__name__)
CORS(app)
hostname_uri = "http://report-generation.com:5000"

def init_working_directory():
    if not os.path.exists('reports'):
        os.makedirs('reports')

# Report generation mock function (receives the currency and the year)
@app.route('/generate_report', methods=['POST'])
def gen_report():
    data = request.json
    currency = data.get('currency')
    year = data.get('year')
    
    # Mock report generation logic
    report_name, errors = generate_report(currency, year)
    return jsonify({'errors': errors, 'report_url': f'{hostname_uri}/{report_name}'})

@app.route('/reports/<path:filename>', methods=['GET'])
def download_report(filename):
    print("Here")
    return send_from_directory('reports', filename)

if __name__ == '__main__':
    init_working_directory()
    app.run(debug=True)