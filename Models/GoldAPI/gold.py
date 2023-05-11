from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('gold_price_model.sav', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    price = request.get_json()
    
    p1 = price['SPX']
    p2 = price['USO']
    p3 = price['SLV']
    p4 = price['EUR/USD']
    
    prediction = model.predict(np.array([[p1, p2, p3, p4]]))

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=5002, debug=True)

