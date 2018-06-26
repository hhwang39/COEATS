from flask import Flask, Response
from flask import request, render_template, redirect
import json
from flask_bcrypt import Bcrypt
from eat_street_cred import EAT_STREET_API_KEY
import boto3
from awscredentials import AWS_KEY, AWS_SECRET, REGION
from boto3.dynamodb.types import Binary
import logging
from logging.handlers import RotatingFileHandler
import datetime
from awshelper import DecimalEncoder
from EatStreetAPI import EatStreetAPI
# from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
from OrderAPI import Order
import decimal
# from flask_httpauth import HTTPBasicAuth
import os
import UserAPI
# auth = HTTPBasicAuth()
app = Flask(__name__)
brcypt = Bcrypt(app)
rest_search_url = "https://api.eatstreet.com/publicapi/v1/restaurant/search"  # search resturants url
menu_search_url = "https://api.eatstreet.com/publicapi/v1/restaurant/"  # search menu url
headers = {"X-Access-Token": EAT_STREET_API_KEY}
dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_KEY,
                          aws_secret_access_key=AWS_SECRET,
                          region_name=REGION)
table = dynamodb.Table("User")
order = Order()
# os.chdir("D:")
curDir = os.getcwd()
print(os.path.join(curDir,
                   datetime.datetime.now().
                   strftime("%Y-%m-%d-%H-%M-%S") + ".log"))


#  curl -i -H "Content-Type: application/json" -X GET http://localhost:5000/API/get_menus -d '{"id":"1231"}'
# @app.route('/', methods=["GET"])
# def index():
#     return 'Hello World!'
@app.route('/API/get_user_orders', methods=["POST"])
def get_user_orders():
    req = request.get_json(force=True)
    if "oId" not in req:
        return errorJson()
    if "userId" not in req:
        return errorJson()
    oId = req["oId"]
    userId = req["userId"]
    return add_allow_origin_header(order.get_user_order_detail(userId, oId))


@app.route('/API/get_user_info', methods=["POST"])
def get_user_info():
    req = request.get_json(force=True)
    if "userId" not in req:
        return errorJson()
    data = UserAPI.user_info(req["userId"])
    if data is not None:
        data["result"] = "OK"
        return add_allow_origin_header(json.dumps(data, cls=DecimalEncoder))
    return errorJson()


@app.route('/API/verifyUser', methods=["POST"])
def verifyUser():
    item = request.get_json(force=True)
    if item is None:
        return errorJson()
    # print(item)
    if "userId" not in item:
        return json.dumps({"result": "ERROR"})
    if "password" not in item:
        return json.dumps({"result": "ERROR"})
    userId = item["userId"]
    password = item["password"]
    # match = brcypt.check_password_hash(pw_hash, password)
    try:
        resp = table.get_item(Key={"userId": userId},
                              AttributesToGet=["password"])
    except ClientError as e:
        # print(e.response['Error']['Message'])
        logging.error(e.response['Error']['Message'])
    else:
        if "Item" in resp:
            item = resp['Item']
            # print("GetItem succeeded:")
            # print(item)
            # print(json.dumps(item, indent=4, cls=DecimalEncoder))
            # pw_hash = str(item["password"]).decode("utf-8")
            pw_hash = item["password"]
            logging.debug("verifyUser recieved " + pw_hash.value.decode("utf-8"))
            logging.debug("Password Recieved" + password)
            # print(pw_hash)
            # print(type(pw_hash))
            # des = TypeDeserializer()
            # a = des.deserialize(pw_hash.__str__)
            # print(type(pw_hash.value))
            print("decoded hash")
            print(pw_hash.value.decode("utf-8"))
            match = brcypt.check_password_hash(pw_hash.value, password)
            # match = password == pw_hash.value.decode("utf-8")
            # print("password")
            # print(password)
            # print(pw_hash.value)
            if match:
                logging.debug("matched")
                # print("matched")
                # logging.debug("matched")
                return add_allow_origin_header(json.dumps({"result": "OK"}))
    return errorJson()

@app.route('/API/createUser', methods=["POST"])
def createUser():

    item = request.get_json(force=True)
    if item is None:
        return errorJson()
    if "userId" not in item:
        return json.dumps({"result": "ERROR"})
    if "password" not in item:
        return json.dumps({"result": "ERROR"})
    if "first_name" not in item:
        return json.dumps({"result": "ERROR"})
    if "last_name" not in item:
        return json.dumps({"result": "ERROR"})
    if "email" not in item:
        return json.dumps({"result": "ERROR"})
    if "phone_number" not in item:
        return json.dumps({"result": "ERROR"})
    userId = item["userId"]
    password = item["password"]
    firstName = item['first_name']
    lastName = item['last_name']
    email = item["email"]
    phoneNumber = item["phone_number"]
    logging.debug("Creating User {}, {}, {}, {}, {}, {}".format(userId, password,
                                                        firstName, lastName,
                                                        email, phoneNumber))
    try:
        resp = table.get_item(Key={"userId": userId},
                              AttributesToGet=["password"])
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print(resp)
        if "Item" in resp:
            item = resp['Item']
            print("GetItem succeeded:")
            # print(json.dumps(item, indent=4, cls=DecimalEncoder))
            return json.dumps({"result": "ERROR"})
        else:
            # if item is not None:
            #     # taken
            #     return None # TODO FIX IT
            # insert into no sql or sql
            pw_hash = brcypt.generate_password_hash(password)
            # res = EatStreetAPI.register_user(email,
            #                                  password,
            #                                  firstName,
            #                                  lastName,
            #                                  phoneNumber)
            # if res is None:
            #     return json.dumps({"result": "ERROR"})
            response = table.put_item(Item={
                "userId": userId, "password": pw_hash,
                "email": email, "phone_number": phoneNumber,
                "lastName": lastName, "firstName": firstName,
                "credits": decimal.Decimal(5000.0) # they will get always $5000.0
            })
            # print(json.dumps(response, indent=4, cls=DecimalEncoder))
            return add_allow_origin_header(json.dumps({"result": "OK"}))


#
# @app.route('/', methods=["GET", "POST"])
# def sign_in():
#     if request.method == "GET":
#         # TODO not yet
#         # render_template()
#         return render_template("signinhtml.html")
#     elif request.method == "POST":
#         form = request.form
#         userId = form["userId"]
#         password = form["password"]
#         # pw_hash = 123# get from sql or nosql
#         try:
#             resp = table.get_item(Key={"userId": userId},
#                                   AttributesToGet=["password"])
#         except ClientError as e:
#             print(e.response['Error']['Message'])
#             # logging.error(e.response['Error']['Message'])
#         else:
#             if "Item" in resp:
#                 item = resp['Item']
#                 print("GetItem succeeded:")
#                 print(item)
#                 # print(json.dumps(item, indent=4, cls=DecimalEncoder))
#                 # pw_hash = str(item["password"]).decode("utf-8")
#                 pw_hash = item["password"]
#                 # print(pw_hash)
#                 print(type(pw_hash))
#                 # des = TypeDeserializer()
#                 # a = des.deserialize(pw_hash.__str__)
#                 print(type(pw_hash.value))
#                 print(pw_hash.value.decode("utf-8"))
#                 match = brcypt.check_password_hash(pw_hash.value, password)
#                 if match:
#                     print("matched")
#                     return redirect("/")
#         return redirect("/sign_up")

#
# @app.route('/sign_up', methods=["GET", "POST"])
# def sign_up():
#     if request.method == "GET":
#         # TODO impelemnt
#         return render_template("signup.html")
#     elif request.method == "POST":
#         form = request.form
#         password = form["password"]  # name of password input field
#         userId = form["userId"]
#         try:
#             resp = table.get_item(Key={"userId": userId},
#                                   AttributesToGet=["password"])
#         except ClientError as e:
#             print(e.response['Error']['Message'])
#         else:
#             print(resp)
#             if "Item" in resp:
#                 item = resp['Item']
#                 print("GetItem succeeded:")
#                 print(json.dumps(item, indent=4, cls=DecimalEncoder))
#                 return redirect("/sign_up")
#             else:
#                 # if item is not None:
#                 #     # taken
#                 #     return None # TODO FIX IT
#                 # insert into no sql or sql
#                 pw_hash = brcypt.generate_password_hash(password)
#                 response = table.put_item(Item={
#                     "userId": userId, "password": pw_hash
#                 })
#                 # print(json.dumps(response, indent=4, cls=DecimalEncoder))
#                 return redirect("/")


@app.route('/API/get_menus', methods=["POST"])
def get_menus():
        req = request.get_json(force=True)
        if req is None:
            return errorJson()
        if "rest_api_key" not in req:
            return json.dumps({"result": "ERROR"})
        res = EatStreetAPI.search_menu(req["rest_api_key"])
        # res = EatStreetAPI.search_menu("d28dd32538ddfd3af15b4f2e73e761805f2f9e661202a1ab")
        if res is None:
            return json.dumps({"result": "ERROR"})
        ret = {"result": "OK", "menus": []}
        for items in res:
            for item in items["items"]:
                if "description" not in item:
                    menu = {"name": item["name"], "menu_api_key": item["apiKey"],
                            "price": item["basePrice"]}
                else:
                    menu = {"name": item["name"], "menu_api_key": item["apiKey"],
                            "price": item["basePrice"],
                            "description": item["description"]}
                ret["menus"].append(menu)
        print(ret)
        logging.debug(ret)
        return add_allow_origin_header(json.dumps(ret))

@app.route("/API/get_list_of_categories", methods=["GET"])
def get_list_of_categories():
    return json.dumps({"result": "OK", "categories":["Asian",
                                                     "Mexican",
                                                     "European",
                                                     "American"]})
@app.route("/API/get_list_of_subcategories/<string:category>", methods=["GET"])
def get_sub_list_categories(category):
    if category is None:
        return errorJson()
    if category.lower() == "asian":
        return json.dumps({"result": "  OK", "subcategories": [
            "Chinese",
            "Korean",
            "Indian",
            "Japanese"
        ]})
    elif category.lower() == "european":
        return json.dumps({"result": "OK", "subcategories": [
            "Greek",
            "Italian",
            "Spanish",
            "French"
        ]})
    return errorJson()

def errorJson(par=""):
    logging.debug("returned result ERROR: " + par)
    return add_allow_origin_header(json.dumps({"result": "ERROR"}))


#
# @app.route('/API/get_fake_restaurants', methods=["GET"])
# def get_fake_restaurants():
#     """
#     :return: json of restaurants
#     """
#     restaurants = []
#     results = dict()
#     results["result"] = "OK"
#     resturant1 = {"Name": "ChickFila", "logo":
#         "https://cdn20.patchcdn.com/users/1625498/20170913/031321/styles/"
#         "T800x600/public/processed_images/cfa_red_script_logo_transparent"
#         "-1505329998-2321.jpg"}
#     resturant2 = {"Name": "Panda Express", "logo":
#         "https://en.wikipedia.org/wiki/"
#         "Panda_Express#/media/File:Panda_Express_logo.svg"}
#     restaurants.append(resturant1)
#     restaurants.append(resturant2)
#     results["restaurants"] = restaurants
#     return json.dumps(results)
## Save you money eat together
@app.route("/API/get_restaurant_detail", methods=["POST"])
def get_restaurant_detail():
    req = request.get_json(force=True)
    if req is None:
        return errorJson()
    if "rest_api_key" not in req:
        return errorJson()
    if "lat" not in req or "lon" not in req:
        return errorJson()
    i = EatStreetAPI.get_rest_detail(req["rest_api_key"], req["lat"], req["lon"])
    if "restaurant" not in i:
        return errorJson()
    i = i["restaurant"]
    # ret = {"result": "OK"}
    item = {"result": "OK", "name": i["name"], "rest_api_key": i["apiKey"],
            "logo": i["logoUrl"], "min_wait_time": i["minWaitTime"],
            "max_wait_time": i["maxWaitTime"],
            "delivery_price": i["deliveryPrice"],
            "min_delivery_price": i["deliveryMin"], "open": i["open"],
            "foodTypes": i["foodTypes"]}
    # ret["restaurant"] = item
    return add_allow_origin_header(json.dumps(item))





@app.route('/API/get_restaurants', methods=["POST"])
def get_restaurants():
    """
    get real restaurants list
    :return: real restaurants list
    """
    req = request.get_json(force=True)
    if req is None:
        return errorJson()
    res = None
    if "loc" in req:
        if "query" in req:
            res = EatStreetAPI.search_restaurants(req["loc"], req["query"])
        else:
            res = EatStreetAPI.search_restaurants(req["loc"])
    if "lat" in req and "lon" in req:
        if "query" in req:
            res = EatStreetAPI.search_restaurants(query=req["query"],
                                                  lat=req["lat"],
                                                  lon=req["lon"])
        else:
            res = EatStreetAPI.search_restaurants(lat=req["lat"],
                                                  lon=req["lon"])
    if res is None:
        return json.dumps({"result": "ERROR"})
    # parse each just for needed items
    rests = {"result": "OK", "restaurants": []} # resturants
    # rest = {}
    if "error" in res:
        return errorJson()
    for i in res["restaurants"]:
        rest = {"name": i["name"], "rest_api_key": i["apiKey"],
                "logo": i["logoUrl"], "min_wait_time": i["minWaitTime"],
                "max_wait_time": i["maxWaitTime"],
                "delivery_price": i["deliveryPrice"],
                "min_delivery_price": i["deliveryMin"],
                "open": i["open"], "foodTypes": i["foodTypes"]}
        rests["restaurants"].append(rest)
    return add_allow_origin_header(json.dumps(rests))

@app.route('/API/ind_order', methods=["POST"])
def individual_order():
    req = request.get_json(force=True)
    if req is None:
        return errorJson()
    if "item_list" not in req:
        return errorJson()
    if "username" not in req:
        return errorJson()
    if "rest_api_key" not in req:
        return errorJson()
    if "lat" not in req:
        return errorJson()
    if "lon" not in req:
        return errorJson()
    item_list = []
    for item in req["item_list"]:
        if ("item_api_key" not in item) or ("item_price" not in item):
            return errorJson()
        item_list.append({"item_api_key": item["item_api_key"],
                          "price": item["item_price"]})
    return add_allow_origin_header(order.ind_order(req["username"], item_list, req["rest_api_key"]))

# def is_int_or_float(x):
#     return (type(x) == float) or (type(x) == int)

#
#
# @app.route('/API/fakejoin', methods=["GET"])
# def fakejoin():
#     restaurants = []
#     results = dict()
#     results["result"] = "OK"
#     resturant1 = {"Name": "ChickFila", "num_joined": 2, "remaining_time": 60}
#     resturant1["type"] = ["American", "Asian"]
#     resturant2 = {"Name": "Panda Express", "num_joined": 1,
#                   "remaining_time": 120}
#     resturant2["type"] = ["Chinese", "Japanese"]
#     restaurants.append(resturant1)
#     restaurants.append(resturant2)
#     results["restaurants"] = restaurants
#     return json.dumps(results)
@app.route('/API/get_join_list', methods=["POST"])
def get_join_list():
    data = request.get_json(force=True)
    if data is None:
        return errorJson("Not application json")
    if "distance" not in data:
        return errorJson()
    if "lat" not in data:
        return errorJson()
    if "lon" not in data:
        return errorJson()
    return add_allow_origin_header(order.getList(data["distance"], data["lat"], data["lon"]))

@app.route('/API/init_join', methods=["POST"])
def init_join_request():
    data = request.get_json(force=True)
    if data is None:
        return errorJson()
    if "rest_api_key" not in data:
        return errorJson()
    if "lat" not in data:
        return errorJson()
    if "lon" not in data:
        return errorJson()
    if "duration" not in data:
        return errorJson()
    if "rest_name" not in data:
        return errorJson()
    if "username" not in data:
        return errorJson()
    if "min_people" not in data:
        return errorJson()
    if "min_amount" not in data:
        return errorJson()
    if "item_list" not in data:
        return errorJson()
    items = []
    for item in data["item_list"]:
        if ("item_api_key" not in item) or ("item_price" not in item):
            return errorJson()
        items.append({"item_api_key": item["item_api_key"],
                      "price": item["item_price"]})
    print(item)
    return add_allow_origin_header(order.addOrder(data["lat"], data["lon"], data["duration"],
                   data["username"], data["rest_api_key"], data["rest_name"],
                   data["min_amount"], data["min_people"], items))
    # self, lat, long, duration, username, rest_api_key, rest_name,
    # min_amount, min_people, item_api_key, item_price):
    # return json.dumps({"result": "OK"})

@app.route('/API/get_order_status', methods=["POST"])
def get_order_status():
    data = request.get_json(force=True)
    if data is None:
        return errorJson()
    print(data)
    logging.debug(data)
    if "oId" not in data:
        return errorJson()
    return add_allow_origin_header(order.checkOrderStatus(data["oId"]))


@app.route('/API/get_user_order', methods=["POST"])
def get_user_order():
    data = request.get_json(force=True)
    if data is None:
        return errorJson()
    if "username" not in data:
        return errorJson()




@app.route('/API/join', methods=["POST"])
def join():
    # (self, oId, username, item_api_key, item_price):
    data = request.get_json(force=True)
    if data is None:
        return errorJson()
    if "oId" not in data:
        return errorJson()
    if "username" not in data:
        return errorJson()
    if "item_list" not in data:
        return errorJson()
    item_list = data["item_list"]
    items = []
    for item in item_list:
        if ("item_api_key" not in item) or "item_price" not in item:
            return errorJson()
        items.append({"item_api_key": item["item_api_key"],
                      "price": item["item_price"]})
    # order.addOrder(data["lat"], data["lon"], data["duration"],
    #                data["rest_api_key"], data["rest_name"])
    order.joinOrder(data["oId"], data["username"],
                    items)
    return add_allow_origin_header(json.dumps({"result": "OK"}))


def add_allow_origin_header(json_data):
    resp = Response(json_data)
    resp.headers['Access-Control-Allow-Origin'] = "*"
    return resp

if __name__ == '__main__':
    logging.basicConfig(format='%(levelname)s: %(asctime)s: %(message)s',
                        filename=os.path.join(curDir,
                                              datetime.datetime.now().
                                              strftime("%Y-%m-%d-%H-%M-%S") + ".log"),
                        level=logging.DEBUG)
    handler = RotatingFileHandler(datetime.datetime.now().
                                  strftime("%Y-%m-%d-%H-%M-%S") + "_flask.log",
                                  maxBytes=10000, backupCount=1)
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    # log = logging.getLogger('werkzeug')
    # log.setLevel(logging.DEBUG)
    # log.addHandler(handler)
    app.run("0.0.0.0", port=5000)
    # search_restaurants("Atlanta", "Chicken")
