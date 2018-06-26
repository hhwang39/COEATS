package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
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
 * Created by pigdtt12345 on 3/9/18.
 */

public class MenuActivity extends AppCompatActivity {
    private LinkedList<MenuItem> mData = new LinkedList<>();
    private Context mContext;
    private ListView list_order;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.menu_layout);

        final Bundle bundleIn = this.getIntent().getExtras();
        final String resName = bundleIn.getString("resName");
        final String resKey = bundleIn.getString("resKey");
        final boolean isJoin = bundleIn.getBoolean("join");
        final int orderId = bundleIn.getInt("orderId");
        if (isJoin) {
            Button indv = (Button) findViewById(R.id.menu_indiv);
            indv.setEnabled(false);
        }

        TextView txt_resName = (TextView) findViewById(R.id.sum_resName);
        txt_resName.setText(resName);

        JSONObject signInobj1 = new JSONObject();
        try {
            signInobj1.put("rest_api_key", resKey);
            signInobj1.put("lat", utils.getLatitude());
            signInobj1.put("lon", utils.getLongitude());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String[] strs = new String[6];
        final String MenuInput1 = signInobj1.toString();
        final String[] MenuOutput1 = {null};
        Log.e("thread", "prepared");
        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL myURL = new URL(utils.getCurrentURL() + "/API/get_restaurant_detail");
                    //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                    HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                    myURLConnection.setRequestMethod("POST");
                    myURLConnection.setRequestProperty("Content-Type", "application/json");
                    myURLConnection.setRequestProperty("Accept", "application/json");
                    Log.e("thread", "thread running");
                    OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                    Log.e("thread", "thread still running");
                    osw.write(MenuInput1);
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
                        MenuOutput1[0] = sb.toString();
                        reader.close();
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        thread1.start();

        try {
            thread1.join(1000000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (MenuOutput1 != null) {
            String output = MenuOutput1[0];
            String result = null;
            try {
                JSONObject outputJSON = new JSONObject(output);
                result = outputJSON.getString("result");
                if (result.equals("OK")) {
                    int maxWaitTime = outputJSON.getInt("max_wait_time");
                    int minWaitTime = outputJSON.getInt("min_wait_time");
                    double minDeliveryMoney = outputJSON.getDouble("min_delivery_price");
                    utils.setMinDeliveryMoney(minDeliveryMoney);
                    double deliveryFee = outputJSON.getDouble("delivery_price");
                    utils.setDeliveryFee(deliveryFee);
                    boolean isOpen = outputJSON.getBoolean("open");
                    JSONArray types = outputJSON.getJSONArray("foodTypes");
                    strs[0] = isOpen? "open": "closed";
                    strs[1] = "Max wait time : " + maxWaitTime;
                    strs[2] = "Min wait time : " + minWaitTime;
                    strs[3] = "Min delivery price : " + minDeliveryMoney;
                    strs[4] = "Delivery fee : " + deliveryFee;
                    String tempp = "type : ";
                    for (int j = 0; j < types.length(); j++) {
                        if (j == 0) tempp = tempp + types.getString(j);
                        else tempp = tempp + ", " +types.getString(j);
                    }
                    strs[5] = tempp;
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        //String[] strs = {"open", "Delivery Min: 10", "Delivery Price: 2", "minFreeDelivery: N/A", "Wait time: 35 - 50 min", "Accept: Cash, Credit Card", "phone: (608) 535-1051"};
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.simple_listview_layout_menu_resinfo, strs);
        ListView listV = (ListView) findViewById(R.id.menu_resinfo);
        listV.setAdapter(adapter);

        JSONObject signInobj = new JSONObject();
        try {
            signInobj.put("rest_api_key", resKey);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final String MenuInput = signInobj.toString();
        final String[] MenuOutput = {null};
        Log.e("thread", "prepared");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL myURL = new URL(utils.getCurrentURL() + "/API/get_menus");
                    //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                    HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                    myURLConnection.setRequestMethod("POST");
                    myURLConnection.setRequestProperty("Content-Type", "application/json");
                    myURLConnection.setRequestProperty("Accept", "application/json");
                    Log.e("thread", "thread running");
                    OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                    Log.e("thread", "thread still running");
                    osw.write(MenuInput);
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
                        MenuOutput[0] = sb.toString();
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
        if (MenuOutput != null) {
            String output = MenuOutput[0];
            String result = null;
            try {
                JSONObject outputJSON = new JSONObject(output);
                result = outputJSON.getString("result");
                if (result.equals("OK")) {
                    JSONArray tempMenu = outputJSON.getJSONArray("menus");
                    for (int i = 0; i < tempMenu.length(); i++) {
                        JSONObject tempItem = tempMenu.getJSONObject(i);
                        String tempName = tempItem.getString("name");
                        String tempDes = " ";
                        if (tempItem.has("description"))  tempDes = tempItem.getString("description");
                        double tempPri = tempItem.getDouble("price");
                        String tempKey = tempItem.getString("menu_api_key");
                        MenuItem tempItem2 = new MenuItem(tempName, tempDes, tempPri, tempKey);
                        mData.add(tempItem2);
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        mContext = MenuActivity.this;
        list_order = (ListView) findViewById(R.id.menu_listView);
        //mData = utils.getFakeMenu();
        final MenuAdapter mAdapter = new MenuAdapter(mData, mContext);
        list_order.setAdapter(mAdapter);

        Button indBtm = (Button) findViewById(R.id.menu_indiv);
        indBtm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int itemNo = mAdapter.getCount();
                String[] menuNames = new String[itemNo];
                double[] menuPrices = new double[itemNo];
                String[] menuKeys = new String[itemNo];
                int[] menuNum = new int[itemNo];
                for (int i = 0; i < itemNo; i++) {
                    MenuAdapter.ViewHolder holder = (MenuAdapter.ViewHolder) mAdapter.getView(i,null,null).getTag();
                    menuNames[i] = holder.txt_name.getText().toString();
                    menuPrices[i] = Double.parseDouble(holder.txt_price.getText().toString().substring(2));
                    menuKeys[i] = holder.itemKey;
                }
                menuNum = mAdapter.getM_amount();

                Intent intentInd = new Intent(MenuActivity.this, SummaryActivity.class);
                Bundle bundle = new Bundle();
                bundle.putString("resName", resName);
                bundle.putString("resKey", resKey);
                bundle.putStringArray("menuNames", menuNames);
                bundle.putStringArray("menuKeys", menuKeys);
                bundle.putDoubleArray("menuPrices", menuPrices);
                bundle.putIntArray("menuNum", menuNum);
                bundle.putBoolean("COEATS", false);
                bundle.putBoolean("join", false);
                bundle.putInt("orderId", -1);
                bundle.putBoolean("review", false);
                intentInd.putExtras(bundle);
                startActivity(intentInd);
            }
        });

        Button coBtm = (Button) findViewById(R.id.menu_coorder);
        coBtm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int itemNo = mAdapter.getCount();
                String[] menuNames = new String[itemNo];
                String[] menuKeys = new String[itemNo];
                double[] menuPrices = new double[itemNo];
                int[] menuNum = new int[itemNo];
                for (int i = 0; i < itemNo; i++) {
                    MenuAdapter.ViewHolder holder = (MenuAdapter.ViewHolder) mAdapter.getView(i,null,null).getTag();
                    menuNames[i] = holder.txt_name.getText().toString();
                    menuPrices[i] = Double.parseDouble(holder.txt_price.getText().toString().substring(2));
                    menuKeys[i] = holder.itemKey;
                }
                menuNum = mAdapter.getM_amount();

                Bundle bundleOut = new Bundle();
                bundleOut.putString("resName", resName);
                bundleOut.putString("resKey", resKey);
                bundleOut.putStringArray("menuNames", menuNames);
                bundleOut.putStringArray("menuKeys", menuKeys);
                bundleOut.putDoubleArray("menuPrices", menuPrices);
                bundleOut.putIntArray("menuNum", menuNum);
                bundleOut.putBoolean("COEATS", true);
                bundleOut.putBoolean("review", false);
                if (isJoin) {
                    Intent intentSum = new Intent(MenuActivity.this, SummaryActivity.class);
                    bundleOut.putInt("orderId", orderId);
                    bundleOut.putBoolean("join", true);
                    bundleOut.putInt("rPeople", bundleIn.getInt("rPeople"));
                    bundleOut.putDouble("rMoney", bundleIn.getDouble("rMoney"));
                    intentSum.putExtras(bundleOut);
                    startActivity(intentSum);
                }
                else {
                    Intent intentInd = new Intent(MenuActivity.this, ConditionActivity.class);
                    bundleOut.putInt("orderId", -1);
                    bundleOut.putBoolean("join", false);
                    intentInd.putExtras(bundleOut);
                    startActivity(intentInd);
                }
            }
        });
    }
}