from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('car_price_model.sav', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    price = request.get_json()
    
    p1 = price['Year']
    p2 = price['Present Price']
    p3 = price['Kms Driven']
    
    fuel = price['Fuel Type']
    if(fuel == "Petrol"):
        p4 = 0
    elif(fuel == "Diesel"):
        p4 = 1
    elif(fuel == "CNG"):
        p4 = 2
        
    seller = price['Seller']
    if(seller == "Dealer"):
        p5 = 0
    elif(seller == "Individual"):
        p5 = 1
        
    trans = price['Transmission']
    if(trans == "Manual"):
        p6 = 0
    elif(trans == "Automatic"):
        p6 = 1
        
    p7 = price['Owner']


    prediction = model.predict(np.array([[p1, p2, p3, p4, p5, p6, p7]]))

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

