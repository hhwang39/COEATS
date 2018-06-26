package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
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
 * Created by pigdtt12345 on 3/3/18.
 */

public class RestaurantActivity extends AppCompatActivity{

    private final LinkedList<Restaurant> mData = new LinkedList<>();
    private Context mContext;
    private RestaurantAdapter mAdapter = null;
    private ListView list_order;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.restaurant_layout);

        Bundle bundle = this.getIntent().getExtras();
        final String resName = bundle.getString("resName");
        final String cate = bundle.getString("cate");
        final double latitude = utils.getLatitude();
        final double longitude = utils.getLongitude();

        final EditText resNametxt = (EditText) findViewById(R.id.inputResName2);
        if (resName != null && !resName.equals("Restaurant Name")) {
            resNametxt.setText(resName.toCharArray(), 0, resName.length());
        }


        JSONObject QueryObj = new JSONObject();
        try {
            QueryObj.put("query", resName);
            QueryObj.put("lat", latitude);
            QueryObj.put("lon", longitude);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final String QueryInput = QueryObj.toString();
        final String[] QueryOutput = {null};
        Log.e("thread", "prepared");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL myURL = new URL(utils.getCurrentURL() + "/API/get_restaurants");
                    //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                    HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                    myURLConnection.setRequestMethod("POST");
                    myURLConnection.setRequestProperty("Content-Type", "application/json");
                    myURLConnection.setRequestProperty("Accept", "application/json");
                    Log.e("thread", "thread running");
                    OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                    Log.e("thread", "thread still running");
                    osw.write(QueryInput);
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
                        QueryOutput[0] = sb.toString();
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

        if (QueryOutput != null) {
            String output = QueryOutput[0];
            String result = null;
            try {
                JSONObject outputJSON = new JSONObject(output);
                result = outputJSON.getString("result");
                if (result.equals("OK")) {
                    JSONArray temp = outputJSON.getJSONArray("restaurants");
                    for (int i = 0; i < temp.length(); i++) {
                        JSONObject tempRes = temp.getJSONObject(i);
                        String listResName = tempRes.getString("name");
                        String listResKey = tempRes.getString("rest_api_key");
                        JSONArray templistResType = tempRes.getJSONArray("foodTypes");
                        String[] listResType = new String[templistResType.length()];
                        for (int j = 0; j < templistResType.length(); j++) {
                            listResType[j] = templistResType.getString(j);
                        }
                        boolean listResOpen = tempRes.getBoolean("open");
                        Restaurant listRes = new Restaurant(listResName, listResKey, listResType, listResOpen);
                        mData.add(listRes);
                    }

                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        mContext = RestaurantActivity.this;
        list_order = (ListView) findViewById(R.id.restaurantList);
        //mData = utils.getFakeRestaurants();
        mAdapter = new RestaurantAdapter(mData, mContext);
        list_order.setAdapter(mAdapter);

        final LinkedList<Restaurant> data = mData;
        list_order.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(parent.getContext(), MenuActivity.class);
                String resName = data.get(position).getName();
                String resKey = data.get(position).getKeys();
                Bundle bundle = new Bundle();
                bundle.putString("resName", resName);
                bundle.putString("resKey", resKey);
                bundle.putBoolean("join", false);
                bundle.putInt("orderId", -1);
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });

        Button schBtm = (Button) findViewById(R.id.restaurant_btm);
        schBtm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String query = resNametxt.getText().toString();
                Bundle bundle2 = new Bundle();
                bundle2.putString("resName", query);
                bundle2.putString("cate", cate);
                Intent intent = new Intent(RestaurantActivity.this, RestaurantActivity.class);
                intent.putExtras(bundle2);
                startActivity(intent);
                RestaurantActivity.this.finish();
            }
        });
    }
}
