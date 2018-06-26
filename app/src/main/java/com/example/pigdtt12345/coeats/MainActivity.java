package com.example.pigdtt12345.coeats;

import android.annotation.SuppressLint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.util.Log;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import static java.lang.Thread.sleep;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button BtmSignUp = (Button) findViewById(R.id.BtmSignUp);
        BtmSignUp.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, SignUpActivity.class);
                startActivity(intent);
                MainActivity.this.finish();
            }
        });

        Button BtmSignIn = (Button) findViewById(R.id.BtmSignIn);
        BtmSignIn.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText UserNameEdit = (EditText) findViewById(R.id.InputUsername);
                String username = UserNameEdit.getText().toString();
                EditText PassWordEdit = (EditText) findViewById(R.id.InputPassword);
                String password = PassWordEdit.getText().toString();
                //String hashedPassword = utils.hashPassword(password);

                JSONObject signInobj = new JSONObject();
                try {
                    signInobj.put("userId", username);
                    signInobj.put("password", password);
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
                            URL myURL = new URL(utils.getCurrentURL() + "/API/verifyUser");
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
                        utils.setUsername(username);
                        Intent intent = new Intent(MainActivity.this, SearchActivity.class);
                        startActivity(intent);
                        MainActivity.this.finish();
                    }
                    else {
                        Toast toast = Toast.makeText(MainActivity.this, "Invalid Username or Password.", Toast.LENGTH_LONG);
                        toast.show();
                    }
                }
                return;
            }
        });
/*
        //Below are for test
        Button susume = (Button) findViewById(R.id.susume);
        susume.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, SearchActivity.class);
                startActivity(intent);
                MainActivity.this.finish();
            }
        });
*/
    }
}
