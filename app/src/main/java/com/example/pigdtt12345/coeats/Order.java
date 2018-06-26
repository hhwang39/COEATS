package com.example.pigdtt12345.coeats;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/1/18.
 */

public class Order {
    Restaurant m_restaurant;
    String m_keys;
    int m_orderID;

    boolean m_ifCoeats;
    double m_deliveryFee;

    String[] m_menuNames;
    String[] m_menuKeys;
    double[] m_menuPrices;
    int[] m_menuNum;

    double m_lon;
    double m_lat;
    double m_dist;
    String m_address;

    double m_rmoney;
    int m_rpeople;
    double m_countdown;
    double m_nmoney;
    int m_npeople;
    String m_status;
/*
    Order(Restaurant restaurant, double countdown, String address, LinkedList<String[]> menu, int people, double dist, String keys) {
        m_restaurant = restaurant;
        m_countdown = countdown;
        m_address = address;
        m_menu = menu;
        m_people = people;
        m_dist = dist / 1.6;
        m_keys = keys;
    }
*/
    Order(String resName, String resKey, String[] foodTypes, double lat, double lon, double distance, int orderId, int nPeople, int rPeople, double nMoney, double rMoney, double nTime, String address) {
        m_restaurant = new Restaurant(resName, resKey, foodTypes);
        m_lat = lat;
        m_lon = lon;
        m_dist = distance;
        m_orderID = orderId;
        m_npeople = nPeople;
        m_rpeople = rPeople;
        m_nmoney = nMoney;
        m_rmoney = rMoney;
        m_countdown = nTime;
        m_address = address;
    }

    Order(String Resname, double lon, double lat, String keys, String[] resTypes, int orderID, double distance, String address) {
        m_restaurant = new Restaurant(Resname, keys, resTypes);
        m_orderID = orderID;
        m_dist = distance;
        m_lon = lon;
        m_lat = lat;
        m_address = address;
        update();
    }

    Order(String resName, String resKey, String[] menuNames, String[] menuKeys, double[] menuPrices, int[] menuNum) {
        m_restaurant = new Restaurant(resName, resKey);
        m_menuNames = menuNames;
        m_menuKeys = menuKeys;
        m_menuPrices = menuPrices;
        m_menuNum = menuNum;
    }



    public Restaurant getRestaurant() {
        return m_restaurant;
    }

    public double getCountdown() {
        return m_countdown;
    }

    public String getAddress() {
        return m_address;
    }

    public int getNpeople() {
        return m_npeople;
    }

    public void setNpeople(int n) {
        m_npeople = n;
    }

    public int getRpeople() {
        return m_rpeople;
    }

    public void setRpeople(int n) {
        m_rpeople = n;
    }

    public double getNmoney() {
        return m_nmoney;
    }

    public void setNmoney(double d) {
        m_nmoney = d;
    }

    public double getRmoney() {
        return m_rmoney;
    }

    public void setRmoney(double d) {
        m_rmoney = d;
    }

    public String getKeys() {
        return m_keys;
    }

    public double getDist() {
        return m_dist;
    }

    public void setOrderID(int orderID) {
        m_orderID = orderID;
    }

    public int getOrderId() {
        return m_orderID;
    }

    public boolean getIfCoeats() {
        return m_ifCoeats;
    }

    public void setIfCoeats(boolean x) {
        m_ifCoeats = x;
    }

    public String getStatus() {
        return m_status;
    }

    public void setStatus(String status) {
        m_status = status;
    }

    public String[] getMenuNames() {
        return m_menuNames;
    }

    public String[] getMenuKeys() {
        return m_menuKeys;
    }

    public double[] getMenuPrices() {
        return m_menuPrices;
    }

    public void setDeliveryFee(double d) {
        m_deliveryFee = d;
    }

    public double getDeliveryFee() {
        return m_deliveryFee;
    }

    public int[] getMenuNum() {
        return m_menuNum;
    }

    public void setLocation(double latitude, double longitude) {
        m_lon = longitude;
        m_lat = latitude;
    }

    public void update() {
        JSONObject signInobj = new JSONObject();
        try {
            signInobj.put("oId", m_orderID);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final String SignInInput = signInobj.toString();
        final String[] SignInOutput = {null};
        Log.e("thread", "prepared");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL myURL = new URL(utils.getCurrentURL() + "/API/get_order_status");
                    //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                    HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                    myURLConnection.setRequestMethod("POST");
                    myURLConnection.setRequestProperty("Content-Type", "application/json");
                    myURLConnection.setRequestProperty("Accept", "application/json");
                    Log.e("thread", "thread running");
                    OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                    Log.e("thread", "thread still running");
                    osw.write(SignInInput);
                    osw.flush();
                    osw.close();
                    myURLConnection.connect();

                    if (myURLConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        BufferedReader reader = new BufferedReader(new InputStreamReader(myURLConnection.getInputStream(), "utf-8"));
                        String line = reader.readLine();
                        StringBuilder sb = new StringBuilder();
                        while (line != null) {
                            sb.append(line);
                            line = reader.readLine();
                        }
                        SignInOutput[0] = sb.toString();
                        reader.close();
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();

        try {
            thread.join(1000000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (SignInOutput != null) {
            String output = SignInOutput[0];
            String result = null;
            try {
                JSONObject outputJSON = new JSONObject(output);
                result = outputJSON.getString("result");
                if (result.equals("OK")) {
                    String status = outputJSON.getString("status");
                    if (status.equals("IP")) {
                        m_status = "In Process";
                        m_npeople = outputJSON.getInt("num_people_joined");
                        m_countdown = outputJSON.getDouble("time_remaining") * 60;
                        m_nmoney = outputJSON.getDouble("total_amount");
                    }
                    else if (status.equals("F")) {
                        boolean isExecuted = outputJSON.getBoolean("Executed");
                        if (isExecuted) m_status = "Deal executed";
                        else m_status = "Deal discarded";
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return;
    }
}