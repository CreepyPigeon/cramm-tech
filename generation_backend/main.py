import base64

from flask import Flask, request, jsonify
from flask import send_from_directory
from flask_cors import CORS
from report_generation import generate_report, xlsx_to_csv, read_df
import os
import pandas as pd

app = Flask(__name__)
CORS(app)
hostname_uri = "http://report-generation.com:5000"

def init_working_directory():
    if not os.path.exists('reports'):
        os.makedirs('reports')
    if not os.path.exists('file-storage'):
        os.makedirs('file-storage')

# Report generation mock function (receives the currency and the year)
@app.route('/generate_report', methods=['POST'])
def gen_report():
    data = request.json
    currency = data.get('currency')
    year = data.get('year')

    dataset = read_df()
    if not str(year) in dataset.columns:
        return jsonify({'errors': ["Invalid year or the year wasn't reported yet."]})

    filtered = dataset[dataset["DER_CURR_LEG1"] == currency]
    filtered = filtered[str(year)].isna()
    if filtered.sum() == filtered.count:
        return jsonify({'errors': ["No records were found."]})

    # Mock report generation logic
    report_name, errors = generate_report(dataset, currency, year)

    if filtered.sum()/filtered.count() > 0.8:
        errors = errors + ['WARNING: High percentage of missing records.']

    return jsonify({'errors': errors, 'report_url': f'{hostname_uri}/{report_name}'})

@app.route('/reports/<path:filename>', methods=['GET'])
def download_report(filename):
    return send_from_directory('reports', filename)

@app.route("/reports-summary/<path:filename>", methods=['GET'])
def get_report_serialized(filename):
    return jsonify({
        "report": xlsx_to_csv(f'reports/{filename}')
    })

@app.route("/fetch-data")
def fetch_data():
    # Obtain currency and year for query params
    currency = request.args.get('currency')
    year = request.args.get('year')
    if year is None or currency is None:
        # throw 400 BAD REQUEST
        return "Bad request", 400

    data = read_df()
    filtered = data[data["DER_CURR_LEG1"] == currency]
    # Check if there a specific year column
    if not (year in filtered.columns or str(year) in filtered.columns):
        return jsonify({'status': 'No data available for the specific year', data: []})

    # Get first 36 columns data
    x = filtered.iloc[:, :36]
    y = filtered[str(year)]
    return jsonify({'content': pd.concat([x, y], axis=1).to_csv()})

@app.route("/fetch-data/missing_percentage")
def missing_perchantage():
    currency = request.args.get('currency')
    year = request.args.get('year')
    if year is None or currency is None:
        return "Bad request", 400

    data = read_df()
    filtered = data[data["DER_CURR_LEG1"] == currency]
    # Check if there a specific year column
    if not (year in filtered.columns or str(year) in filtered.columns):
        return jsonify({'status': 'No data available for the specific year', data: []})
    y = filtered[str(year)]
    return jsonify({"missing_percentage": y.isna().sum() / y.isna().count() * 100})

@app.route("/file-storage/<path:filename>", methods=['GET'])
def get_file(filename):
    return send_from_directory('file-storage', filename)

@app.route("/file-storage/<path:filename>", methods=['POST'])
def upload_file(filename):
    # The base64 file is in body
    base64_file = request.get_data()
    # Convert base64 into bytes
    data = base64.b64decode(base64_file)

    if filename == '':
        return jsonify({'status': 'No file selected.'})

    # Save the file
    with open(f'file-storage/{filename}', "wb") as f:
        f.write(data)

    return jsonify({'status': 'File uploaded.'})

if __name__ == '__main__':
    init_working_directory()
    app.run(debug=True)