from flask import Flask, request, jsonify
import pickle
import numpy as np
import json

app = Flask(__name__)

model = pickle.load(open('loan_model.sav', 'rb'))

# class Int64Encoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, np.int64):
#             return int(obj)
#         return json.JSONEncoder.default(self, obj)

@app.route('/predict', methods=['POST'])
def predict():
    
    status = request.get_json()
    
    
    gender = status['Gender']
    if(gender == "Male"):
        p1 = 1
    elif(gender == "Female"):
        p1 = 0
       
    
    marry = status['Married']
    if(marry == "Yes"):
        p2 = 1
    elif(marry == "No"):
        p2 = 0
    
    p3 = status['Dependents']
    
   
    edu = status['Education']
    if(edu == "Not Graduate"):
        p4 = 0
    elif(edu == "Graduate"):
        p4 = 1
        
    emp = status['Self Employed']
    if(emp == "No"):
        p5 = 0
    elif(emp== "Yes"):
        p5 = 1
        
    p6 = status['Applicant Income']
    p7 = status['Coapplicant Income']
    p8 = status['Loan Amount']
    p9 = status['Loan Amount Term']
    p10 = status['Credit History']
    
    area = status['Property Area']
    if(area == "Rural"):
        p11 = 0
    elif(area == "Semiurban"):
        p11 = 1
    elif(area == "Urban"):
        p11 = 2
    
    # features = [status[p1], status[p2],status[p3],status[p4],status[p5], status[p6],status[p7],status[p8],status[p9], status[p10],status[p11]]
    features = [p1,p2, p3, p4, p5, p6, p7, p8, p9, p10, p11]
    features = np.array(features).reshape(1, -1)
    
    prediction = model.predict(features)
    result = False
    if (prediction[0]):
        result = True 

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(port=5001, debug=True)

