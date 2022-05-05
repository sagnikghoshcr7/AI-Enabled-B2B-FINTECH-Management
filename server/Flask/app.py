from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import xgboost as xgb
import pickle
import numpy as np

# __________________________________________________________________________
class EncoderExt(object):
    def __init__(self):
        self.label_encoder = LabelEncoder()
     
    def fit(self, data_list):
        self.label_encoder = self.label_encoder.fit(list(data_list) + ['Unknown'])
        self.classes_ = self.label_encoder.classes_
        return self

    def transform(self, data_list):
        new_data_list = list(data_list)
        for unique_item in np.unique(data_list):
            if unique_item not in self.label_encoder.classes_:
                new_data_list = ['Unknown' if x == unique_item else x for x in new_data_list]
        return self.label_encoder.transform(new_data_list)
# __________________________________________________________________________



pickle_files = pickle.load(open("pickle_save_files.pkl", "rb"))
name_encoder, business_ecoder, cust_payment_terms_encoder, model = pickle_files

cols = ['cust_number', 'buisness_year', 'doc_id', 'converted_usd','business_code_enc', 'name_customer_enc', 
        'cust_payment_terms_enc','day_of_postingdate', 'month_of_postingdate', 'year_of_postingdate',
        'day_of_createdate', 'month_of_createdate', 'year_of_createdate', 'day_of_due', 'month_of_due', 'year_of_due']



def add_missing(row):
    temp = row
    temp["buisness_year"] = row["business_year"]
    if temp["invoice_currency"] == "CAD":
        temp["converted_usd"] = row["total_open_amount"]*0.7
    else:
         temp["converted_usd"] = row["total_open_amount"] 
    temp["day_of_postingdate"] = row["posting_date"]["day"]
    temp["month_of_postingdate"] = row["posting_date"]["month"]
    temp["year_of_postingdate"] = row["posting_date"]["year"]
    
    temp["day_of_createdate"] = row["document_create_date"]["day"]
    temp["month_of_createdate"] = row["document_create_date"]["month"]
    temp["year_of_createdate"] = row["document_create_date"]["year"]
    
    temp["day_of_due"] = row["due_in_date"]["day"]
    temp["month_of_due"] = row["due_in_date"]["month"]
    temp["year_of_due"] = row["due_in_date"]["year"]
   
    return temp


def return_df(rows):
    for row in rows:
        row = add_missing(row)
    df = pd.DataFrame(rows)
    df['cust_payment_terms_enc'] = cust_payment_terms_encoder.transform(df['cust_payment_terms'])
    df['business_code_enc'] = business_ecoder.transform(df['business_code'])
    df['name_customer_enc'] = name_encoder.transform(df['name_customer'])
    df = df[cols]
    return df

def return_predicted_date(due_in_date, delay_seconds):
    due_in_date = "{}-{}-{}".format(due_in_date["year"], due_in_date["month"], due_in_date["day"])
    due_in_date = pd.to_datetime(due_in_date)
    predicted_date = due_in_date + pd.Timedelta(seconds=delay_seconds)
    return predicted_date.strftime("%Y-%m-%d")

def ret_bucket(avg_delay):
    bucket =  avg_delay// (24 * 3600)
    
    if bucket > 60:
        return 'Greatar than 60'
    elif bucket > 45:
        return '46-60'
    elif bucket > 30:
        return '31-45'
    elif bucket > 15:
        return '16-30'
    elif bucket > 0:
        return '0-15'
    return "NaN"
    
def funct(data):
    data_list = []
    json_df = return_df(data)
    result =  model.predict(json_df)
    for i in range(len(data)):
        temp = {}
        temp["sl_no"] = data[i]["sl_no"]
        temp["predicted_payment_date"] = return_predicted_date(data[i]["due_in_date"], result[i])
        temp["aging_bucket"] = ret_bucket(result[i])
        data_list.append(temp)
    return data_list
    
        
    








app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/predict', methods=['POST','GET'])
def predict():
    data = funct(request.json)    
    return jsonify(data)


@app.route('/')
def home():
    return render_template('index.html')









if __name__ == '__main__':
    app.run(debug=True)

