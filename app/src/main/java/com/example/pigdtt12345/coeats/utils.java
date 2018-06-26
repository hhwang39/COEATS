package com.example.pigdtt12345.coeats;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/1/18.
 */

public class utils {
    private static String m_username;
    private static double m_latitude;
    private static double m_longitude;
    private static HashMap<String, Restaurant> m_listRes = new HashMap<String, Restaurant>();
    private static LinkedList<Order> m_listOrder = new LinkedList<>();
    private static double m_minDeliveryMoney;
    private static double m_deliveryFee;

    private static LinkedList<Integer> m_mngDel = new LinkedList<>();

/*
    public static LinkedList<Order> getFakeOrders() {
        Restaurant res1 = new Restaurant("Street Eating JemMin McKanMob Jappa", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"american"}, true, "asdf");
        Restaurant res2 = new Restaurant("Street Eating America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/88-china-authentic-chinese-4631_1400537432746.png", new String[]{"Mexico"}, false, "adsf");
        Restaurant res3 = new Restaurant("Street America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"Japanese", "Chinese"}, true, "sdf");
        //Restaurant res1 = new Restaurant("Street Eating JemMin McKanMob Jappa", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"american"});
        //Restaurant res2 = new Restaurant("Street Eating America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-america-39386_1482357645693.png", new String[]{"Mexico"});
        //Restaurant res3 = new Restaurant("Street America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"Japanese"});

        LinkedList<String[]> menu1 = new LinkedList<>();
        menu1.add(new String[]{"burger", "chips"});
        LinkedList<String[]> menu2 = new LinkedList<>();
        menu2.add(new String[]{"eggs"});
        menu2.add(new String[]{"bacon"});
        LinkedList<String[]> menu3 = new LinkedList<>();
        menu3.add(new String[]{"rice", "bread"});
        menu3.add(new String[]{"sushi", "ramen", "mapodoufu"});

        Order ord1 = new Order(res1, 100, "Place A", menu1, 3, 3, "asdf");
        Order ord2 = new Order(res2, 200, "Place B", menu2, 2, 0.004, "asdf");
        Order ord3 = new Order(res3, 300, "Place C", menu3, 4, 5, "qwer");

        LinkedList<Order> res = new LinkedList<>();
        res.add(ord1);
        res.add(ord2);
        res.add(ord3);
        return res;
    }
*/
    public static LinkedList<Restaurant> getFakeRestaurants() {
        Restaurant res1 = new Restaurant("Street Eating JemMin McKanMob Jappa", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"american"}, true, "asdf");
        Restaurant res2 = new Restaurant("Street Eating America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/88-china-authentic-chinese-4631_1400537432746.png", new String[]{"Mexico"}, false, "sdaf");
        Restaurant res3 = new Restaurant("Street America", "https://eatstreet-static.s3.amazonaws.com/assets/images/restaurant_logos/street-eating-madison-358_1443198279227.png", new String[]{"Japanese", "Chinese"}, true, "dsaf");
        LinkedList<Restaurant> res = new LinkedList<>();
        res.add(res1);
        res.add(res2);
        res.add(res3);
        return res;
    }

    public static LinkedList<MenuItem> getFakeMenu() {
        MenuItem m1 = new MenuItem("Gongbaojiding", "Red and Yellow Curry Coconut Milk with Squash, Potatoes, Green Bean & Bamboo Shoot. Choice of Chicken, Beef, Pork, Tofu or Shrimp.", 13);
        MenuItem m2 = new MenuItem("Shizitou", "Shredded Papaya, Lime, Pepper, Tomato, Dried Shrimp, Long Bean, Thai Eggplant, Fish Sauce, Peanuts. Served with Cabbage or Lettuce.", 2.5);
        MenuItem m3 = new MenuItem("Mapodoufu", "Stir Fired Cashew Nuts, Onions, Carrots, Bamboo Shoots, Bell Peppers and Brown Sauce. Choice of Chicken, Beef, Pork, Tofu or Shrimp.", 7);
        LinkedList<MenuItem> menu = new LinkedList<>();
        menu.add(m1);
        menu.add(m2);
        menu.add(m3);
        return menu;
    }

    public static Bitmap getImageBitmap(String url) {
        URL imgUrl = null;
        Bitmap bitmap = null;
        try {
            imgUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) imgUrl
                    .openConnection();
            conn.setDoInput(true);
            conn.connect();
            InputStream is = conn.getInputStream();
            bitmap = BitmapFactory.decodeStream(is);
            is.close();
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bitmap;
    }

    public static String getCurrentURL() {
        return "http://ec2-18-188-100-25.us-east-2.compute.amazonaws.com:5000";
    }

    public static void setUsername(String username) {
        m_username = username;
    }
    public static String getUsername() {
        return m_username;
    }
    public static void setLatitude(double latitude) {
        m_latitude = latitude;
    }
    public static double getLatitude() {
        return m_latitude;
    }
    public static void setLongitude(double longitude) {
        m_longitude = longitude;
    }
    public static double getLongitude() {
        return m_longitude;
    }
    public static HashMap<String, Restaurant> getMap() {
        return m_listRes;
    }
    public static LinkedList<Order> getOderList() {
        return m_listOrder;
    }
    public static void setMinDeliveryMoney(double mindm) {
        m_minDeliveryMoney = mindm;
    }
    public static double getMinDeliveryMoney() {
        return m_minDeliveryMoney;
    }
    public static void setDeliveryFee(double df) {
        m_deliveryFee = df;
    }
    public static double getDeliveryFee() {
        return m_deliveryFee;
    }
    public static LinkedList<Integer> getMngDel() {
        return m_mngDel;
    }
}