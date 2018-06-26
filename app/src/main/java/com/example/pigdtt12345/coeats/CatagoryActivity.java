package com.example.pigdtt12345.coeats;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

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
 * Created by pigdtt12345 on 3/2/18.
 */

public class CatagoryActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.catagory_layout);

        final String[] CategoryOutput = {null};
        Thread CategoryThread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL myURL = new URL(utils.getCurrentURL() + "/API/get_list_of_categories");
                    //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                    HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                    myURLConnection.setRequestMethod("GET");
                    myURLConnection.setRequestProperty("Content-Type", "application/json");
                    myURLConnection.setRequestProperty("Accept", "application/json");
                    Log.e("thread", "thread running");
                    //OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                    Log.e("thread", "thread still running");
                    //osw.write(SignUpInput);
                    //osw.flush();
                    //osw.close();
                    myURLConnection.connect();

                    if (myURLConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                        BufferedReader reader = new BufferedReader(new InputStreamReader(myURLConnection.getInputStream(), "utf-8"));
                        String line = reader.readLine();
                        StringBuilder sb = new StringBuilder();
                        while (line != null) {
                            sb.append(line);
                            line = reader.readLine();
                        }
                        CategoryOutput[0] = sb.toString();
                        reader.close();
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        CategoryThread.start();

        try {
            CategoryThread.join(1000000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String result = CategoryOutput[0];
        JSONArray tmpCategories = null;
        try {
            JSONObject temp = new JSONObject(result);
            result = temp.getString("result");
            tmpCategories = temp.getJSONArray("categories");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final String[] strs = new String[tmpCategories.length() + 1];
        strs[0] = "All Types";
        for (int i = 0; i < tmpCategories.length(); i++) {
            try {
                strs[i + 1] = tmpCategories.getString(i);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }



        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.simple_listview_layout, strs);
        ListView listV = (ListView) findViewById(R.id.catagory_listview);
        listV.setAdapter(adapter);

        listV.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView parent, View view, int position, long id) {
                Intent intent = new Intent(parent.getContext(), RestaurantActivity.class);
                Bundle bundleOut = new Bundle();
                bundleOut.putString("resName", " ");
                bundleOut.putString("cate", strs[position]);
                intent.putExtras(bundleOut);
                startActivity(intent);
            }
        });
    }
}
