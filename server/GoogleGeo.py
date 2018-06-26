import requests
import json
import ast
# https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
class GeoLoc:
    @staticmethod
    def get_location(lat, lon):
        # ?latlng=
        url = GOOGLE_MAP_URL
        data = {}
        data["latlng"] = str(lat) + "," + str(lon)
        data["key"] = GOOGLE_API_KEY
        resp = requests.get(url, params=data)
        # print(resp.text)
        # data = json.loads(resp.text)
        data = ast.literal_eval(resp.text)
        # print(data)
        # print(data["results"])
        status = data["status"]
        if status != "OK":
            return ""
        data = data["results"]
        data = data[0]
        return data["formatted_address"]
        # print(data.keys())
        # data = data["results"]
        # print(data["formatted_address"])

# GeoLoc.get_location(33.7756178,-84.3962849999)
