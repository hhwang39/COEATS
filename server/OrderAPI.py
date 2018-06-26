from mysql_credentials import MYSQL_PASSWORD, MYSQL_USERNAME, \
    DB_NAME, MYSQL_ENDPOINT, PORT
import MySQLdb
import datetime
from GoogleGeo import GeoLoc
# import math
import json
from decimal import Decimal, ROUND_UP
from threading import Thread, Lock
import logging
import multiprocessing as mp
import time
import UserAPI
# import decimal
from awshelper import DecimalEncoder
logger = logging.getLogger(__file__)
EARTH_RADIUS = 6371
from EatStreetAPI import EatStreetAPI
# TODO FIX THIS
DEFAULT_IMAGE = "http://ec2-18-219-253-186.us-east-2.compute.amazonaws.com/img/header-bg.jpg"
DEFAULT_IMAGE_O = "http://ec2-18-219-253-186.us-east-2.compute.amazonaws.com/img/header-bg.jpg"

class Order:
    def __init__(self):
        self.conn = MySQLdb.connect(host=MYSQL_ENDPOINT, user=MYSQL_USERNAME,
                                    password=MYSQL_PASSWORD, db=DB_NAME,
                                    port=PORT)
        self.cur = self.conn.cursor()
        self.stop = False
        # self.cur = None
        # mp.Process(target=self.executeOrder).start()
        self.individualCount = 10000
        self.p = executeThread(self.conn, self.cur)
        self.p.start()
        # self.p.start()
    def get_user_order_detail(self, userId, oId):
        query = "SELECT item_api_key, num_items, delivery_price, " \
                "tax " \
                "FROM ORDER_HISTORY WHERE userId = '" + userId + "' and oId = " \
                + str(oId) + ";"
        logging.debug(query)
        print(query)
        self.cur.execute(query)
        query = "SELECT SUM(num_items * price) as total_price " \
                "FROM ORDER_HISTORY WHERE userId = '" + userId + "' and oId = " \
                + str(oId) + ";"
        details = {"result": "OK", "username": userId, "item_list":[]}
        items = self.cur.fetchall()
        self.cur.execute(query)
        total_cost_item = self.cur.fetchone()
        firstTime = True
        for item in items:
            print(item[0])
            if firstTime:
                details["item_list"].append({"item_api_key": item[0],
                                             "num_items": item[1]})
                details["total_cost"] = item[2] + item[3] + total_cost_item[0]
                firstTime = False
            else:
                details["item_list"].append({"item_api_key": item[0],
                                             "num_items": item[1]})
        logging.debug(details)
        return json.dumps(details, cls=DecimalEncoder)
    def ind_order(self, userId, item_list, rest_api_key):
        query = "INSERT INTO ORDER_BOOL(oId, ordered) VALUES("\
                + str(self.individualCount)\
                + ", 1)"
        logging.dubug(query)
        print(query)
        self.cur.execute(query)

        self.conn.commit()
        ret = json.dumps({"result": "OK", "oId": self.individualCount})
        # TODO fix it
        # query_str = "INSERT INTO ORDER_HISTORY(oId, userId, item_api_key, " \
        #             "price, order_date, num_items, delivery_price, tax) VALUES"
        # users = {}
        # for item in items:
        #     query_str += "(" + str(self.individualCount) \
        #                  + ", '" + item[1] + "'," + item[0] \
        #                  + "," + str(item[3]) + ", '" + currTime + "'," + str(item[2]) \
        #                  + "," + str(taxAmount) + "," + str(per_del_price) + "),"
        #     if item[1] not in users:
        #         users[item[1]] = []
        #         users[item[1]].append(item[3])
        #     else:
        #         users[item[1]].append(item[3])
        # query_str = query_str[:-1]
        # query_str += ";"
        # print(query_str)
        # self.cur.execute(query_str)
        # self.conn.commit()
        # for user, item_list in users.items():
        #     UserAPI.subtractAmount(user, sum(item_list))
        self.individualCount += 1
    ## decrease user amount
        return ret

    def getList(self, distance, lat, long):
        # self.deleteOrder()
        # lat1 = lat + math.degrees(distance / EARTH_RADIUS)
        # lat2 = lat - math.degrees(distance / EARTH_RADIUS)
        # lng1 = long + math.degrees(distance / EARTH_RADIUS / math.cos(math.radians(lat)))
        # lng2 = long - math.degrees(distance / EARTH_RADIUS / math.cos(math.radians(lat)))
        # minlat = min(lat1, lat2)
        # maxlat = max(lat1, lat2)
        # minlng = min(lng1, lng2)
        # maxlng = max(lng1, lng2)
        currTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "SELECT oId, rest_api_key, rest_name, lat, lon, " \
                "(6371 * acos(cos(radians(" + str(lat) + ")) * " \
                "cos(radians(lat)) * cos(radians(lon) - radians(" + str(long) + \
                ")) + sin(radians(" + str(lat) + ")) * " \
                "sin(radians(lat)))) AS distance, min_people, min_amount " \
                "FROM ORDERS WHERE end_date >= '" + currTime + "' " + \
                "HAVING distance < " \
                + str(distance) + " ORDER BY " \
                "distance LIMIT 10"
        logger.debug(query)
        # print(query)
        # query = "SELECT rest_api_key, rest_name, lat, lon" \
        #         " FROM ORDERS WHERE (lat BETWEEN " + str(minlat) + " AND "\
        #         + str(maxlat) + ") AND (lon BETWEEN " + str(minlng) +\
        #         " AND " + str(maxlng) + ");"
        # print(query)
        self.cur.execute(query)
        items = self.cur.fetchall()
        order = {"result": "OK", "orderList": []}
        for item in items:
            resp = EatStreetAPI.get_rest_detail(item[1], lat, long)
            food_types = ["Chinese", "American"]
            logo_url = DEFAULT_IMAGE_O
            if (resp is None) or ("restaurant" not in resp):
                food_types = ["Chinese", "American"]
            else:
                resp = resp["restaurant"]
                if ("foodTypes" in resp) and (len(resp["foodTypes"]) != 0):
                    food_types = resp["foodTypes"]
                if "logoUrl" in resp:
                    logo_url = resp["logoUrl"]
            addr = GeoLoc.get_location(item[3], item[4])
            m = self.get_order_status(item[0])
            order["orderList"].append({"oId": item[0],
                                      "rest_api_key": item[1],
                                      "rest_name": item[2],
                                      "rest_logo_url": logo_url,
                                      "lat": item[3],
                                      "lon": item[4],
                                      "distance": item[5],
                                      "food_types": food_types,
                                      "address": addr,
                                      "total_amount": m["total_amount"],
                                      "time_remaining": m["time_remaining"],
                                      "num_people_joined": m["num_people_joined"],
                                      "min_num_people": item[6],
                                      "min_amount": item[7]})
        print(order)
        logger.debug(order)
        return json.dumps(order, cls=DecimalEncoder)
    # def list_same_rest(self, rest_api_key):
    #     currTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    #     query = "SELECT count(*) as num_persons FROM ORDERS WHERE rest_api_key = " \
    #             + "\"" + rest_api_key + "\" AND end_date >= \"" \
    #             + currTime + "\";"
    #     print(query)
    #     self.cur.execute(query)
    #     item = self.cur.fetchone()
    #     return json.dumps({"num_person_joined": item[0]})

    def get_order_status(self, oId):
        logging.debug("Giving IP orders")
        query = "SELECT count(DISTINCT userId) as num_people, " \
                "sum(price) as sum_price FROM ORDER_LIST WHERE oId = " + str(oId) + ";"
        self.cur.execute(query)
        item = self.cur.fetchone()
        total_amount = item[1]
        num_people = item[0]
        print(total_amount)
        print(num_people)
        query = "SELECT end_date from ORDERS WHERE oId = " + str(oId) + ";"
        self.cur.execute(query)
        item = self.cur.fetchone()
        print(num_people)

        # print(type(item[0]))
        time_rem = item[0] - datetime.datetime.now()
        # print(time_rem)
        # print(time_rem.seconds)
        # print(time_rem.days)
        logging.debug(time_rem)
        print(time_rem)
        min_rem = time_rem.seconds / 60
        return {"oId": oId, "total_amount": total_amount,
                "num_people_joined": num_people, "time_remaining": min_rem}
    def checkOrderStatus(self, oId):
        """
        This will check the status of order. It returns
        :param oId:
        :return:
        """
        exe = self.checkOrder(oId)
        if exe is None:
            logging.debug("Giving IP orders")
            query = "SELECT count(DISTINCT userId) as num_people, " \
                    "sum(price) as sum_price FROM ORDER_LIST WHERE oId = " + str(oId) + ";"
            self.cur.execute(query)
            item = self.cur.fetchone()
            total_amount = item[1]
            num_people = item[0]
            query = "SELECT end_date, min_people, min_amount from ORDERS WHERE oId = " + str(oId) + ";"
            self.cur.execute(query)
            item = self.cur.fetchone()
            # print(type(item[0]))
            time_rem = item[0] - datetime.datetime.now()
            # print(time_rem)
            # print(time_rem.seconds)
            # print(time_rem.days)
            logging.debug(time_rem)
            print(time_rem)
            min_rem = time_rem.seconds / 60
            return json.dumps({"result": "OK", "status": "IP", "oId": oId, "total_amount": total_amount,
                    "num_people_joined": num_people, "time_remaining": min_rem,
                               "min_people": item[1], "min_amount": item[2]}, cls=DecimalEncoder)
        return exe

    def checkOrder(self, oId):
        if oId is None:
            return None
        query = "SELECT (ordered=B'1') FROM ORDER_BOOL WHERE oId = " + str(oId) + ";"
        self.cur.execute(query)
        item = self.cur.fetchone()
        if item is None or len(item) == 0:
            return None
        if item[0] == True:
            return json.dumps({"result": "OK", "status": "F", "Executed": "True"})
        return json.dumps({"result": "OK", "status": "F", "Executed": "False"})

    def joinOrder(self, oId, username, item_list):
        # TODO batch insert instead
        for food_item in item_list:
            item_api_key = food_item["item_api_key"]
            item_price = food_item["price"]
            if (oId is None) or (username is None) \
                    or (item_api_key is None) or (item_price is None):
                return None
            # query = "INSERT INTO ORDER_LIST(oId, userId, item_api_key, price) " \
            #         "VALUES(" + str(oId) + ", '" + username \
            #         + "', '" + item_api_key + "', " + str(item_price) + ");"
            query = "INSERT INTO ORDER_LIST(oId, userId, item_api_key, price, num_items) " \
                    "VALUES(" + str(oId) + ", '" + username \
                    + "', '" + item_api_key + "', " + str(item_price) + \
                    ", 1) ON DUPLICATE KEY UPDATE num_items=num_items+1;"
            print(query)
            logging.debug(query)
            self.cur.execute(query)
        self.conn.commit()
    def addOrder(self, lat, long, duration, username, rest_api_key, rest_name,
                 min_amount, min_people, item_list):
        ## TODO later this should be based on timezone
        if item_list is None or (len(item_list) == 0):
            return None
        if min_amount is None:
            return None
        if min_people is None:
            min_people = 4 # default is always 4
        curTime = datetime.datetime.now()
        nextTime = curTime + datetime.timedelta(minutes=duration)
        sqlTime = nextTime.strftime("%Y-%m-%d %H:%M:%S")
        # rest_det = EatStreetAPI
        query = "INSERT INTO ORDERS (end_date, username, rest_api_key, " \
                "rest_name, lat, lon, min_people, min_amount) " \
                "VALUES('" + sqlTime + "','" + username + "','" \
                + rest_api_key + "','" + rest_name + "', " \
                + str(lat) + "," + str(long) + ", " + str(min_people) \
                + ", " + str(min_amount) + ");"
        print(query)
        self.cur.execute(query)
        # TODO add multiple items
        query = "SELECT LAST_INSERT_ID();"
        self.cur.execute(query)
        item = self.cur.fetchone()
        oId = item[0]
        # start inserting item
        for food_item in item_list:
            item_api_key = food_item["item_api_key"]
            item_price = food_item["price"]
            print("recently fetched " + str(oId))
            query = "INSERT INTO ORDER_LIST(oId, userId, item_api_key, price, num_items) " \
                    "VALUES(" + str(oId) + ", '" + username \
                    + "', '" + item_api_key + "', " + str(item_price) + ", " \
                    "1) ON DUPLICATE KEY UPDATE num_items=num_items+1;"
            print(query)
            self.cur.execute(query)
        self.conn.commit()
        return json.dumps({"result": "OK", "oId": oId})



            # self.conn.commit()
    #         print(query)

        return None
    def drop_tables(self):

        query = "DROP TABLE IF EXISTS ORDER_BOOL"
        self.cur.execute(query)
        query = "DROP TABLE IF EXISTS ORDER_LIST"
        self.cur.execute(query)
        query = "DROP TABLE IF EXISTS ORDERS"
        self.cur.execute(query)
        query = "DROP TABLE IF EXISTS ORDER_HISTORY"
        self.cur.execute(query)
        query = "DROP TABLE IF EXISTS ORDER_HISTROY"
        self.cur.execute(query)

    def create_tables(self):
        #                 "`rest_log_url` VARCHAR(200) NOT NULL, " \
        query = "CREATE TABLE IF NOT EXISTS `ORDERS`" \
                "(`oId` BIGINT NOT NULL AUTO_INCREMENT, " \
                "`end_date` DATETIME NOT NULL, " \
                "`username` VARCHAR(14) DEFAULT NULL, " \
                "`rest_api_key` VARCHAR(50) NOT NULL, " \
                "`rest_name` VARCHAR(50) NOT NULL, " \
                "`lat` FLOAT NOT NULL, " \
                "`lon` FLOAT NOT NULL, " \
                "`min_people` INTEGER NOT NULL, " \
                "`min_amount` DECIMAL(10, 2), " \
                "PRIMARY KEY(`oId`));"
        print(query)
        self.cur.execute(query)
        query = "CREATE TABLE IF NOT EXISTS `ORDER_HISTORY` " \
                "(`oId` BIGINT NOT NULL, " \
                "`userId` VARCHAR(14) NOT NULL," \
                "`item_api_key` VARCHAR(50) NOT NULL, " \
                "`price` DECIMAL(10, 2) NOT NULL, " \
                "`order_date` DATETIME, " \
                "`num_items` INTEGER NOT NULL, " \
                "`delivery_price` DECIMAL(10, 2) NOT NULL, " \
                "`tax` DECIMAL(10, 2) NOT NULL, " \
                "PRIMARY KEY(oId, userId, item_api_key));"
        print(query)
        self.cur.execute(query)
        query = "CREATE TABLE IF NOT EXISTS `ORDER_LIST`" \
                "(`oId` BIGINT NOT NULL, " \
                "`userId` VARCHAR(14) NOT NULL, " \
                "`item_api_key` VARCHAR(50) NOT NULL, " \
                "`price` DECIMAL(10, 2) NOT NULL, " \
                "`num_items` INTEGER NOT NULL, " \
                "PRIMARY KEY(oId, userId, item_api_key), " \
                "FOREIGN KEY (oId) REFERENCES ORDERS(oId)" \
                "ON DELETE CASCADE);"
        print(query)
        self.cur.execute(query)
        query = "CREATE TABLE IF NOT EXISTS `ORDER_BOOL`" \
                "(`oId` BIGINT NOT NULL AUTO_INCREMENT, " \
                "`ordered` TINYINT(1), " \
                "PRIMARY KEY(oId));"
        print(query)
        self.cur.execute(query)
        # self.cur.execute("DROP TABLE IF EXISTS HEL")
        # query = "CREATE TABLE IF NOT EXISTS `HEL`(`id` BIGINT, `cur_date` date," \
        #         "rest_api_key VARCHAR(50) NOT NULL," \
        #         "username VARCHAR(10) DEFAULT  NULL," \
        #         "`lat` FLOAT NOT NULL," \
        #         "PRIMARY KEY(`id`))"
        # self.cur.execute(query)
    def add_default_entries(self):
        query = "INSERT INTO `ORDERS` VALUES " \
                "(7,'2019-03-27 15:03:03','coeats'," \
                "'d28dd32538ddfd3a884225aec137a02aa7d9b968abbb3711',"\
                "'Niramish Indian Cuisine'," \
                "33.79438,-84.39568, 4, 10.0)," \
                "(8,'2019-03-27 15:03:03','coeats'," \
                "'d28dd32538ddfd3a144247b91fbcb2f3a89b33ecfc082c34','Lucky Buddha'," \
                "44.073,-89.388, 2, 20.0)," \
                "(9,'2019-03-27 15:03:03','coeats'," \
                "'d28dd32538ddfd3af15b4f2e73e761806ec7f4bbd466955e','Panahar Bangladeshi Cuisine'," \
                "44.073,-89.388, 3, 20.0)," \
                "(10,'2019-03-27 15:03:05','coeats'," \
                "'d28dd32538ddfd3a144247b91fbcb2f3b19913d1f102a0f2','Yoi Yoi'," \
                "33.77438,-84.39568, 3, 20.0)," \
                "(11,'2019-03-27 15:03:04','coeats'," \
                "'d28dd32538ddfd3a144247b91fbcb2f35a586ffb6cbe0d6f','Wingnuts - Marietta St. NW'," \
                "33.77438,-84.39568, 2, 20.0)," \
                "(12,'2019-03-27 15:03:05','coeats'," \
                "'d28dd32538ddfd3a884225aec137a02a6cab4bd782b86e0e','Goodfella Pizza'," \
                "127.073,80.18, 4, 30.0);"


        print(query)
        logging.debug(query)
        self.cur.execute(query)
        # query = "INSERT INTO ORDER_LIST VALUES "
        # o.addOrder(33.77438, -84.39568, 60000, "coeats",
        #            "90fd4587554469b1f15b4f2e73e76180ceaf86853e1bc0c8",
        #            "Chinese3", 20, 4, [{"item_api_key": '51c47b6bde7dfbebfdb3aba31c19a8a700329f677004f5da', "price": 3.24}])

        self.conn.commit()


class executeThread(Thread):
    def __init__(self, conn, cur):
        Thread.__init__(self)
        self.conn = conn
        self.cur = cur
        self.stop = False
        self.mutex = Lock()
    def stop_thread(self):
        self.mutex.acquire()
        self.stop = True
        self.mutex.release()
    def run(self):
        # ap = mp.Process(target=archiveFolder, args=(config_data,))
        # stop = self.stop
        try:
            while not self.stop:
                # logging.debug("executing Order ...")
                currTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                query = "SELECT oId, min_people, min_amount, rest_api_key, lat, lon FROM ORDERS WHERE end_date < '" \
                        + currTime + "';"
                self.cur.execute(query)
                print(query)
                # logging.debug(query)
                items = self.cur.fetchall()
                oIdList = []
                min_amount_list = []
                min_people_list = []
                rest_api_list = []
                lat_list = []
                lon_list = []
                for item in items:
                    oIdList.append(item[0])
                    min_people_list.append(item[1])
                    min_amount_list.append(item[2])
                    rest_api_list.append(item[3])
                    lat_list.append(item[4])
                    lon_list.append(item[5])
                print(oIdList)
                print(len(oIdList))
                print(min_amount_list)
                print(min_people_list)
                for i, oId in enumerate(oIdList):
                    print("i is " + str(i))
                    print("oId is " + str(oId))
                    # TODO we can use check Order status
                    query = "SELECT count(DISTINCT userId) as num_people, " \
                            "sum(price * num_items) as sum_price FROM ORDER_LIST WHERE oId = " + str(oId) + ";"
                    self.cur.execute(query)
                    item = self.cur.fetchone()
                    total_amount = item[1]
                    num_people = item[0]
                    print(str(total_amount))
                    print(str(num_people))
                    if (min_amount_list[i] <= total_amount) and (min_people_list[i] <= num_people):
                        # TODO excute Order get items
                        query = "INSERT INTO ORDER_BOOL(oId, ordered) VALUES (" + \
                                str(oId) + ", 1);"
                        self.cur.execute(query)
                        self.execute_order_restaurant(oId, rest_api_list[i],
                                                      total_amount,
                                                      num_people, lat_list[i], lon_list[i])

                        # add to order history

                    else:
                        query = "INSERT INTO ORDER_BOOL(oId, ordered) VALUES (" + \
                                str(oId) + ", 0);"
                        self.cur.execute(query)

                # TODO delete Order
                query = "DELETE FROM ORDERS WHERE end_date < \"" + currTime + "\";"
                print(query)
                # logging.debug(query)
                self.cur.execute(query)
                self.conn.commit()
                time.sleep(10)
        except KeyboardInterrupt:
            self.join()
                # if len(item) == 0:
    def execute_order_restaurant(self, oId, rest_api_key, total_amount, num_people, lat, lon):
        rest_detail = EatStreetAPI.get_rest_detail(rest_api_key, lat, lon)
        if (rest_detail is None) or ("restaurant" not in rest_detail):
            return None
        rest_detail = rest_detail["restaurant"]

        del_price = rest_detail["deliveryPrice"]
        taxRate = rest_detail["taxRate"]
        currTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        taxAmount_real = total_amount * Decimal(taxRate)
        per_del_price_real = Decimal(del_price) / Decimal(num_people)
        per_del_price = Decimal(per_del_price_real.quantize(Decimal('.01'), ROUND_UP))
        print(type(taxAmount_real))
        taxAmount = Decimal(taxAmount_real.quantize(Decimal('.01'), ROUND_UP))
        rev = per_del_price - per_del_price_real + (taxAmount - taxAmount_real)
        print(rev)
        # item_list = []
        query = "SELECT item_api_key, userId, num_items, price FROM ORDER_LIST WHERE oId = " + str(oId) + ";"
        self.cur.execute(query)
        items = self.cur.fetchall()
        query_str = "INSERT INTO ORDER_HISTORY(oId, userId, item_api_key, " \
                    "price, order_date, num_items, delivery_price, tax) VALUES"
        users = {}
        for item in items:
            query_str += "(" + str(oId) \
                         + ", '" + item[1] + "'," + item[0] \
                         + "," + str(item[3]) + ", '" + currTime + "'," + str(item[2]) \
                         + "," + str(taxAmount) + "," + str(per_del_price) + "),"
            if item[1] not in users:
                users[item[1]] = []
                users[item[1]].append(item[3])
            else:
                users[item[1]].append(item[3])
        query_str = query_str[:-1]
        query_str += ";"
        # print(query_str)

        self.cur.execute(query_str)
        self.conn.commit()
        for user, item_list in users.items():
            UserAPI.subtractAmount(user, sum(item_list))
    # item_list.append(item[0])
    # return item_list
    #
# o = Order()
# print(o.get_user_order_detail("ppp", 5))
# #
# conn = MySQLdb.connect(host=MYSQL_ENDPOINT, user=MYSQL_USERNAME,
#                        password=MYSQL_PASSWORD, db=DB_NAME,
#                        port=PORT)
# cur = conn.cursor()
# e = executeThread(conn, cur)
# e.execute_order_restaurant(3, "d28dd32538ddfd3a459c89af9c6802050d88277c4e11f1db", Decimal('15.00'), 1, 33.77438, -84.39568)
# print(o.get_order_status(13))
# o.execute_order_restaurant(16)
# # o.joinOrder(14, "coeats", "61c47b6bde7dfbebfdb4aba31c19a8a700329f677004f5de", 11.00)
# o.drop_tables()
# o.create_tables()
# o.add_default_entries()
# o.addOrder(33.77438, -84.39568, 60000, "coeats",
#            "90fd4587554469b1f15b4f2e73e76180ceaf86853e1bc0c8",
#            "Chinese3", 20, 4, [{"item_api_key": '51c47b6bde7dfbebfdb3aba31c19a8a700329f677004f5da', "price": 3.24}])
# o.addOrder(127.35, 82.12, 1, "coeats",
#            "90fd4587554469b1f15b4f2e73e76180ceaf86853e1b10c5",
#            "Chinese2", 20, 4, '51c47b6bde7dfbebfdb3aba31c19a8a700329f677004f5de', 20.24)
# # print(o.checkORDERStatus(14))
# o.executeOrder()
# o.addOrder(100.45, 82.12, 10, "aaaabaaaaa0002", "Chinese2")
# o.addOrder(127.45, 89.12, 10, "aaaabaaaaa0003", "Chinese3")
# print(o.getList(100, 127.35, 82.12))
# o.drop_tables()
# o.create_tables()
# o.getList(10000, 43.748995, -89.387982)
# o.getList(10000, 127.35, 82.12)
