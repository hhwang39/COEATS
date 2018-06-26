package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by pigdtt12345 on 3/26/18.
 */

public class SummaryActivity extends AppCompatActivity{
    private LinkedList<SummaryItem> mData;
    private Context mContext;
    private ListView list_sum;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.summary_layout);

        final Bundle bundle = this.getIntent().getExtras();
        final String resName = bundle.getString("resName");
        final String resKey = bundle.getString("resKey");
        final String[] menuNames = bundle.getStringArray("menuNames");
        final String[] menuKeys = bundle.getStringArray("menuKeys");
        final double[] menuPrices = bundle.getDoubleArray("menuPrices");
        final int[] menuNum = bundle.getIntArray("menuNum");
        final boolean coeats = bundle.getBoolean("COEATS");
        final boolean isJoin = bundle.getBoolean("join");
        final int orderId = bundle.getInt("orderId");

        final boolean review = bundle.getBoolean("review");

        int peopleSitu = 0;
        double moneySitu = 0;

        TextView txt_resName = (TextView) findViewById(R.id.sum_resName);
        txt_resName.setText(resName);

        TextView coeatsTitle = (TextView) findViewById(R.id.sum_title_coeats);
        TextView coeatsMoney = (TextView) findViewById(R.id.sum_coeats_money);
        TextView coeatsTime = (TextView) findViewById(R.id.sum_coeats_time);
        TextView coeatsPeople = (TextView) findViewById(R.id.sum_coeats_people);
        TextView addressTitle = (TextView) findViewById(R.id.sum_title_address);
        ConstraintLayout addressAdd = (ConstraintLayout) findViewById(R.id.sum_newaddress);
        Button submit = (Button) findViewById(R.id.sum_submit);

        final Order input = new Order(resName, resKey, menuNames, menuKeys, menuPrices, menuNum);
        if (review) {
            coeatsTitle.setVisibility(View.GONE);
            coeatsMoney.setVisibility(View.GONE);
            coeatsTime.setVisibility(View.GONE);
            coeatsPeople.setVisibility(View.GONE);
            addressTitle.setVisibility(View.GONE);
            addressAdd.setVisibility(View.GONE);
            submit.setVisibility(View.GONE);
        }
        if (coeats == false) {
            coeatsTitle.setVisibility(View.GONE);
            coeatsMoney.setVisibility(View.GONE);
            coeatsTime.setVisibility(View.GONE);
            coeatsPeople.setVisibility(View.GONE);
        }
        else {
            if (isJoin) {
                JSONObject signInobj = new JSONObject();
                try {
                    signInobj.put("oId", orderId);
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
                                peopleSitu = outputJSON.getInt("num_people_joined");
                                int rPeople = bundle.getInt("rPeople");
                                if (rPeople - peopleSitu > 1) {
                                    coeatsPeople.setText("Remaining " + (rPeople - peopleSitu) + " people");
                                } else {
                                    coeatsPeople.setVisibility(View.GONE);
                                }
                                double time = outputJSON.getDouble("time_remaining");
                                if (time > 0) {
                                    coeatsTime.setText("Minimum waiting time is " + Math.round(time) + " min");
                                } else {
                                    coeatsTime.setVisibility(View.GONE);
                                }
                                moneySitu = outputJSON.getDouble("total_amount");
                                double rMoney = bundle.getDouble("rMoney");
                                if (rMoney - moneySitu > 0) {
                                    coeatsMoney.setText("Remaining prices : $ " + (rMoney - moneySitu));
                                } else {
                                    coeatsMoney.setVisibility(View.GONE);
                                }
                            }
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
            else {
                double money = bundle.getDouble("rMoney");
                if (money > 0) {
                    coeatsMoney.setText("Minimum amount of bill: $ " + money);
                } else {
                    coeatsMoney.setVisibility(View.GONE);
                }
                double time = bundle.getDouble("rTime");
                if (time > 0) {
                    coeatsTime.setText("Minimum waiting time is " + time + " min");
                } else {
                    coeatsTime.setVisibility(View.GONE);
                }
                int people = bundle.getInt("rPeople");
                if (people > 1) {
                    coeatsPeople.setText("Minimum people requirements: " + people);
                } else {
                    coeatsPeople.setVisibility(View.GONE);
                }
            }
        }

        mData = new LinkedList<>();
        mContext = SummaryActivity.this;
        list_sum = (ListView) findViewById(R.id.sum_summary);
        double total = 0;
        for (int i = 0; i < menuNum.length; i++) {
            if (menuNum[i] > 0) {
                mData.add(new SummaryItem(menuNames[i], menuPrices[i], menuNum[i]));
                total += menuPrices[i] * menuNum[i];
            }
        }
        DecimalFormat fmt = new DecimalFormat("0.00");
        double deliveryFee = review? bundle.getDouble("deliveryFee") : utils.getDeliveryFee();
        if (coeats) {
            deliveryFee = Double.parseDouble(fmt.format(deliveryFee / Math.max(bundle.getInt("rPeople"), peopleSitu)));
            mData.add(new SummaryItem("Delivery Fee", deliveryFee, 1));
        }
        else {
            mData.add(new SummaryItem("Delivery Fee", deliveryFee, 1));
        }
        SummaryAdapter sumAdapter = new SummaryAdapter(mData, mContext);
        list_sum.setAdapter(sumAdapter);

        TextView sumSum = (TextView) findViewById(R.id.sum_total);

        sumSum.setText("Total amount (upper bound) : $ " + fmt.format(total + deliveryFee));

        Button sum_btm = (Button) findViewById(R.id.sum_submit);
        if (coeats) {
            if (total < utils.getMinDeliveryMoney() && bundle.getDouble("rMoney") < utils.getMinDeliveryMoney() && moneySitu < utils.getMinDeliveryMoney()) {
                sum_btm.setEnabled(false);
            }
            else sum_btm.setEnabled(true);
        }
        else if (total < utils.getMinDeliveryMoney()) sum_btm.setEnabled(false);
        else sum_btm.setEnabled(true);
        sum_btm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (coeats && isJoin && orderId >= 0) {
                    Order temp = new Order(resName, resKey, menuNames, menuKeys, menuPrices, menuNum);
                    temp.setRmoney(bundle.getDouble("rMoney"));
                    temp.setRpeople(bundle.getInt("rPeople"));
                    temp.setIfCoeats(true);
                    temp.setOrderID(orderId);
                    temp.setDeliveryFee(utils.getDeliveryFee());
                    utils.getOderList().add(temp);

                    JSONObject signInobj = new JSONObject();
                    JSONArray itemArray = new JSONArray();
                    try {
                        signInobj.put("oId", orderId);
                        signInobj.put("username", utils.getUsername());
                        for (int i = 0; i < menuNames.length; i++) {
                            for (int j = 0; j < menuNum[i]; j++) {
                                JSONObject tempitem = new JSONObject();
                                tempitem.put("item_api_key", menuKeys[i]);
                                tempitem.put("item_price", menuPrices[i]);
                                itemArray.put(tempitem);
                            }
                        }
                        signInobj.put("item_list", itemArray);
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
                                URL myURL = new URL(utils.getCurrentURL() + "/API/join");
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
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        if (result.equals("OK")) {
                            Intent intent = new Intent(SummaryActivity.this, ManagementActivity.class);
                            startActivity(intent);
                        }
                        else {
                            Toast toast = Toast.makeText(SummaryActivity.this, "Join failed.", Toast.LENGTH_LONG);
                            toast.show();
                        }
                    }
                }
                else if (coeats) {
                    final Order temp = new Order(resName, resKey, menuNames, menuKeys, menuPrices, menuNum);
                    temp.setRpeople(bundle.getInt("rPeople"));
                    temp.setRmoney(bundle.getDouble("rMoney"));
                    temp.setIfCoeats(true);
                    temp.setDeliveryFee(utils.getDeliveryFee());

                    JSONObject signInobj = new JSONObject();
                    JSONArray itemArray = new JSONArray();
                    try {
                        signInobj.put("username", utils.getUsername());
                        signInobj.put("duration", bundle.getDouble("rTime"));
                        signInobj.put("rest_name", resName);
                        signInobj.put("rest_api_key", resKey);
                        signInobj.put("lat", utils.getLatitude());
                        signInobj.put("lon", utils.getLongitude());
                        signInobj.put("min_people", bundle.getInt("rPeople"));
                        signInobj.put("min_amount", bundle.getDouble("rMoney"));

                        for (int i = 0; i < menuNames.length; i++) {
                            for (int j = 0; j < menuNum[i]; j++) {
                                JSONObject tempitem = new JSONObject();
                                tempitem.put("item_api_key", menuKeys[i]);
                                tempitem.put("item_price", menuPrices[i]);
                                itemArray.put(tempitem);
                            }
                        }
                        signInobj.put("item_list", itemArray);
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
                                URL myURL = new URL(utils.getCurrentURL() + "/API/init_join");
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
                        int oId = -1;
                        try {
                            JSONObject outputJSON = new JSONObject(output);
                            result = outputJSON.getString("result");
                            oId = outputJSON.getInt("oId");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        if (result.equals("OK")) {
                            temp.setOrderID(oId);
                            utils.getOderList().add(temp);
                            Intent intent = new Intent(SummaryActivity.this, ManagementActivity.class);
                            startActivity(intent);
                        }
                        else {
                            Toast toast = Toast.makeText(SummaryActivity.this, "COEATS order failed.", Toast.LENGTH_LONG);
                            toast.show();
                        }
                    }
                }
                else {
                    final Order temp = new Order(resName, resKey, menuNames, menuKeys, menuPrices, menuNum);
                    temp.setRpeople(0);
                    temp.setRmoney(0);
                    temp.setIfCoeats(false);
                    temp.setDeliveryFee(utils.getDeliveryFee());

                    JSONObject signInobj = new JSONObject();
                    JSONArray itemArray = new JSONArray();
                    try {
                        signInobj.put("username", utils.getUsername());
                        signInobj.put("duration", 0);
                        signInobj.put("rest_name", resName);
                        signInobj.put("rest_api_key", resKey);
                        signInobj.put("lat", utils.getLatitude());
                        signInobj.put("lon", utils.getLongitude());
                        signInobj.put("min_people", 0);
                        signInobj.put("min_amount", 0);

                        for (int i = 0; i < menuNames.length; i++) {
                            for (int j = 0; j < menuNum[i]; j++) {
                                JSONObject tempitem = new JSONObject();
                                tempitem.put("item_api_key", menuKeys[i]);
                                tempitem.put("item_price", menuPrices[i]);
                                itemArray.put(tempitem);
                            }
                        }
                        signInobj.put("item_list", itemArray);
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
                                URL myURL = new URL(utils.getCurrentURL() + "/API/init_join");
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
                        int oId = -1;
                        try {
                            JSONObject outputJSON = new JSONObject(output);
                            result = outputJSON.getString("result");
                            oId = outputJSON.getInt("oId");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        if (result.equals("OK")) {
                            temp.setOrderID(oId);
                            utils.getOderList().add(temp);
                            Intent intent = new Intent(SummaryActivity.this, ManagementActivity.class);
                            startActivity(intent);
                        }
                        else {
                            Toast toast = Toast.makeText(SummaryActivity.this, "Individual order failed.", Toast.LENGTH_LONG);
                            toast.show();
                        }
                    }
                }
            }
        });
    }
}
