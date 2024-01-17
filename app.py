import pickle
from flask import Flask, request, render_template
app = Flask (__name__)
model = pickle.load(open("rf_acc_68.pkl","rb"))
Data_normalizer = pickle.load(open("normalizer1.pkl","rb"))
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods = ['GET', 'POST'])
def admin():
    warehouse_block = eval(request.form["Warehouse block"])
    Mode_of_shipment = eval(request.form["Mode_of_Shipment"])
    Customer_care_calls = eval(request.form["Customer_care_calls"])
    Customer_rating = eval(request.form["Customer_rating"])
    Cost_of_the_Product = eval(request.form["Cost_of_the_Product"])
    Prior_purchases = eval(request.form["Prior_purchases"])
    Product_importance = eval(request.form["Product_importance"])
    Gender = eval(request.form["Gender"])
    Discount_offered = eval(request.form["Discount_offered"])
    Weight_in_gms = eval(request.form["Weight_in_gms"])

    preds=[[warehouse_block, Mode_of_shipment, Customer_care_calls, Customer_rating, Cost_of_the_Product, 
            Prior_purchases, Product_importance, Gender, Discount_offered, Weight_in_gms]]

    xx=model.predict(Data_normalizer.transform(preds))
    prob = model.predict_proba(Data_normalizer.transform(preds))[0]
    n_reach = prob[0]
    reach = prob[1]
    print('There is a (0:.2f} X chance that your product will reach in time'.format(reach*100))
    print(xx)
    return render_template("index.html", p='There is a {:.2f}% chance that your product will reach in time'.format(reach * 100), name='main')
if __name__ == '__main__':
    app.run(debug = False, port=4000)