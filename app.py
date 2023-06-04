from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the machine learning model from the pickle file
with open('model_new.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    ans_list = data['ans_list']
    print('Received ans_list:', ans_list)
    # ans_list = data['ans_list']

    # ext = ans_list[0:10]
    # est = ans_list[10:20]
    # agr = ans_list[20:30]
    # csn = ans_list[30:40]
    # opn = ans_list[40:50]
    # print('ext:', ext)
    # print('est:', est)
    # print('agr:', agr)
    # print('csn:', csn)
    # print('opn:', opn)
    ans_list = np.array(ans_list, dtype=int)  # Convert ans_list to numpy array of integers

    prediction = model.predict([ans_list])[0]
    prediction = int(prediction)  # Convert prediction to Python integer

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
