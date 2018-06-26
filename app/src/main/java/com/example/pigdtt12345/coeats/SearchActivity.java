package com.example.pigdtt12345.coeats;

import com.example.pigdtt12345.coeats.utils.*;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.widget.AdapterView;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.view.View;
import android.content.Intent;
import android.widget.EditText;
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
import java.security.Provider;
import java.text.DecimalFormat;
import java.util.LinkedList;


/**
 * Created by pigdtt12345 on 3/1/18.
 */

public class SearchActivity extends AppCompatActivity {

    private final LinkedList<Order> mData = new LinkedList<>();
    private Context mContext;
    private OrderAdapter mAdapter = null;
    private ListView list_order;


    private LocationManager lm;
    boolean canGetLocation;
    private double longitude = 0.0;
    private double latitude = 0.0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.search_page);

        lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        ActivityCompat.requestPermissions(this, new String[]{"android.permission.ACCESS_FINE_LOCATION", "android.permission.ACCESS_COARSE_LOCATION"}, 250);

        Criteria criteria = new Criteria();
        criteria.setAccuracy(Criteria.ACCURACY_COARSE);//Low Accuracy
        criteria.setAltitudeRequired(false);//No altitude
        criteria.setBearingRequired(false);//No orientataion
        criteria.setCostAllowed(false);//No cost
        criteria.setPowerRequirement(Criteria.POWER_LOW);//Low power consumption

        //Location part
        String locationProvider = lm.getBestProvider(criteria, true);
        if (ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.d("tag", "onCreate: No Permission ");
            return;
        }
        Location location = lm.getLastKnownLocation(locationProvider);
        lm.requestLocationUpdates(locationProvider, 0, 20, locationListener);
        if (location == null) {
            location = lm.getLastKnownLocation(locationProvider);
        }

        if (location != null) {
            longitude = location.getLongitude();//Longitude: -84.3957
            latitude = location.getLatitude();//Latitude: 33.7744
            utils.setLatitude(latitude);
            utils.setLongitude(longitude);

            DecimalFormat df = new DecimalFormat("#.00");

            JSONObject searchUpload = new JSONObject();
            try {
                searchUpload.put("distance", 10);
                searchUpload.put("lat", df.format(latitude));
                searchUpload.put("lon", df.format(longitude));
            } catch (JSONException e) {
                e.printStackTrace();
            }

            final String searchInput = searchUpload.toString();
            final String[] searchOutput = {null};

            Thread waitlistThread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        URL myURL = new URL(utils.getCurrentURL() + "/API/get_join_list");
                        //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                        HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                        myURLConnection.setRequestMethod("POST");
                        myURLConnection.setRequestProperty("Content-Type", "application/json");
                        myURLConnection.setRequestProperty("Accept", "application/json");
                        Log.e("thread", "thread running");
                        OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                        Log.e("thread", "thread still running");
                        osw.write(searchInput);
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
                            searchOutput[0] = sb.toString();
                            reader.close();
                        }
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
            waitlistThread.start();

            try {
                waitlistThread.join(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            String result = searchOutput[0];
            String orderList = "";
            try {
                JSONObject SearchOutput = new JSONObject(result);
                result = SearchOutput.getString("result");
                orderList = SearchOutput.getString("orderList");
                if (result.equals("OK")) {
                    JSONArray orderArray = new JSONArray(orderList);
                    for (int i = 0; i < orderArray.length(); i++) {
                        JSONObject temp = orderArray.getJSONObject(i);
                        double tempNmoney = temp.getDouble("total_amount");
                        double tempRmoney = temp.getDouble("min_amount");
                        int tempNpeople = temp.getInt("num_people_joined");
                        int tempRpeople = temp.getInt("min_num_people");
                        double tempNtime = temp.getDouble("time_remaining") * 60;
                        String tempKey = temp.getString("rest_api_key");
                        double tempLat = temp.getDouble("lat");
                        double tempLon = temp.getDouble("lon");
                        double tempDist = temp.getDouble("distance");
                        String tempName = temp.getString("rest_name");
                        String resAddress = temp.getString("address");
                        JSONArray tempTypeArray = temp.getJSONArray("food_types");
                        String[] tempTypes = new String[tempTypeArray.length()];
                        for (int j = 0; j < tempTypes.length; j++) {
                            tempTypes[j] = tempTypeArray.getString(j);
                        }
                        int tempoId = temp.getInt("oId");
                        Order tempord = new Order(tempName, tempKey, tempTypes, tempLat, tempLon, tempDist, tempoId, tempNpeople, tempRpeople, tempNmoney, tempRmoney, tempNtime, resAddress);
                        mData.add(tempord);
                    }
                    Log.e("testLocationRes", orderList);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        mContext = SearchActivity.this;
        list_order = (ListView) findViewById(R.id.search_list);
        //mData = utils.getFakeOrders();
        mAdapter = new OrderAdapter(mData, mContext);
        list_order.setAdapter(mAdapter);

        final LinkedList<Order> data = mData;
        list_order.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(parent.getContext(), MenuActivity.class);
                String resName = data.get(position).getRestaurant().getName();
                String resKey = data.get(position).getRestaurant().getKeys();
                int orderId = data.get(position).getOrderId();
                int rPeople = data.get(position).getRpeople();
                double rMoney = data.get(position).getRmoney();
                Bundle bundle = new Bundle();
                bundle.putString("resName", resName);
                bundle.putString("resKey", resKey);
                bundle.putBoolean("join", true);
                bundle.putInt("orderId", orderId);
                bundle.putInt("rPeople", rPeople);
                bundle.putDouble("rMoney", rMoney);
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });

        final EditText schTxt = (EditText) findViewById(R.id.inputResName1);
        schTxt.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (hasFocus) {
                    schTxt.setText("");
                }
            }
        });

        Button catbtm = (Button) findViewById(R.id.search_guide);
        catbtm.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SearchActivity.this, ManagementActivity.class);
                startActivity(intent);
            }
        });

        Button schbtm = (Button) findViewById(R.id.search_search);
        schbtm.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SearchActivity.this, RestaurantActivity.class);
                String schtxt = schTxt.getText().toString();
                Bundle bundle = new Bundle();
                bundle.putString("resName", schtxt);
                bundle.putString("cate", " ");
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });

        FloatingActionButton refreshBtm = (FloatingActionButton) findViewById(R.id.search_refresh);
        refreshBtm.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SearchActivity.this, SearchActivity.class);
                startActivity(intent);
                SearchActivity.this.finish();
            }
        });
    }


    LocationListener locationListener = new LocationListener() {

        @Override
        public void onStatusChanged(String provider, int status, Bundle arg2) {

        }

        @Override
        public void onProviderEnabled(String provider) {
            Log.d("tag", "onProviderEnabled: " + provider + ".." + Thread.currentThread().getName());
        }

        @Override
        public void onProviderDisabled(String provider) {
            Log.d("tag", "onProviderDisabled: " + provider + ".." + Thread.currentThread().getName());
        }

        @Override
        public void onLocationChanged(Location location) {
            Log.d("tag", "onLocationChanged: " + ".." + Thread.currentThread().getName());
        }
    };
}
