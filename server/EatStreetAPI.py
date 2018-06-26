from eat_street_cred import EAT_STREET_API_URL, EAT_STREET_API_KEY
import requests
import ast
import json
import logging

class EatStreetAPI:
    @staticmethod
    def register_user(email, password, firstName, lastName, phone):
        """
        :param email:
        :param password:
        :param firstName:
        :param lastName:
        :param phone:
        :return:
        """
        if email is None:
            return None
        if password is None:
            return None
        if firstName is None:
            return None
        if lastName is None:
            return None
        if phone is None:
            return None
        url = EAT_STREET_API_URL + "register-user"
        data = {"email": email, "password": password,
                "firstName": firstName, "lastName": lastName,
                "phone": phone}
        resp = requests.post(url, data=data,
                             headers=EatStreetAPI.header_auth_json())
        print(url)
        print(resp.text)
        # resp_json = ast.literal_eval(resp.text)
        return EatStreetAPI.err_checker(resp.text)

    @staticmethod
    def search_restaurants(loc=None, query=None, lat=None, lon=None):
        """
        given location or latitude and longitude and query
        :param loc:
        :param query:
        :param lat:
        :param lon:
        :return:
        """
        url = EAT_STREET_API_URL + "restaurant/search"
        data = {}
        # not using latitdue and longitude
        if lat is not None:
            lat = str(lat)
            # if is_int_or_float(lat):
            #     lat = str(lat)
            data["latitude"] = lat
        if lon is not None:
            lon = str(lon)
            data["longitude"] = lon
        if loc is not None:
            data["street-address"] = loc
        if query is not None:
            data["search"] = query

        if ("longitude" not in data or "latitude" not in data) \
                and ("street-address" not in data):
            return None
        data["method"] = "delivery"
        resp = requests.get(url, params=data,
                            headers=EatStreetAPI.header_auth())

        print(resp.url)
        print(resp.text)
        # print(j["address"])
        return EatStreetAPI.err_checker(resp.text)

    @staticmethod
    def search_menu(resturant_key, includeCust=False):
        """
        Search menus given resturant API key and includeCust
        :param resturant_key:
        :param includeCust:
        :return:
        """
        if resturant_key is None:
            return None
        url = EAT_STREET_API_URL + "/restaurant/" + resturant_key + "/menu"
        data = {"includeCustomizations": "false"}
        if includeCust:
            data["includeCustomizations"] = "true"
        resp = requests.get(url, params=data,
                            headers=EatStreetAPI.header_auth())
        # TODO handle error
        print(resp.text)
        # print(type(resp.text))
        print(resp.url)
        return EatStreetAPI.err_checker(resp.text)


    @staticmethod
    def add_address(user_api_key, street_addr,
                    city, state, zip, apt_number=None):
        url = EAT_STREET_API_URL + "/user/" + user_api_key +"/add-address"
        return None
        
    @staticmethod
    def get_rest_detail(rest_api_key, lat, lon):
        url = EAT_STREET_API_URL + "restaurant/" + rest_api_key
        # url = "https://api.eatstreet.com/publicapi/v1/restaurant/90fd4587554469b1f15b4f2e73e761809f4b4bcca52eedca"
        data = {"latitude": str(lat), "longitude": str(lon)}
        resp = requests.get(url, params=data,
                            headers=EatStreetAPI.header_auth())
        print(resp.text)
        # if "error" in resp.text:
        #     return None
        # return json.loads(resp.text)
        return EatStreetAPI.err_checker(resp.text)
    @staticmethod
    def header_auth_json():
        return {"X-Access-Token": EAT_STREET_API_KEY,
                   "Content-Type": "application/json"}

    @staticmethod
    def header_auth():
        return {"X-Access-Token": EAT_STREET_API_KEY}

    @staticmethod
    def err_checker(text):
        if "error" in text:
            return None
        return json.loads(text)
#
# EatStreetAPI.get_rest_detail("d28dd32538ddfd3afe2bbabe6b94d9a62c4582e81e910454",
#                              33.77439, -84.39568)
# EatStreetAPI.get_rest_detail("d28dd32538ddfd3afe2bbabe6b94d9a62c4582e81e910454",
#                              33.77439, -84.39568)

# EatStreetAPI.search_restaurants("Georgia Tech", "Chicken")
# res = EatStreetAPI.search_menu("d28dd32538ddfd3af15b4f2e73e761805f2f9e661202a1ab", False)
# for items in res:
#     for item in items["items"]:
#         print(item)
# EatStreetAPI.register_user("helloaa", "1234", "NI", "CK", "404-123-1111")