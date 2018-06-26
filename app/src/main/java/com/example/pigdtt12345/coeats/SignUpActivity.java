package com.example.pigdtt12345.coeats;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.view.View;
import android.content.Intent;
import android.widget.EditText;
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

/**
 * Created by pigdtt12345 on 3/1/18.
 */


public class SignUpActivity extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.signup);

        Button BtmBack = (Button) findViewById(R.id.SignUpBack);
        BtmBack.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SignUpActivity.this, MainActivity.class);
                startActivity(intent);
                SignUpActivity.this.finish();
            }
        });

        Button BtmSubmit = (Button) findViewById(R.id.SignUpSubmit);
        BtmSubmit.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                //Submit data to the server here
                EditText EditUsername = (EditText) findViewById(R.id.SignUpInputUsername);
                String username = EditUsername.getText().toString();
                EditText EditFirstname = (EditText) findViewById(R.id.SignUpInputFirstname);
                String firstname = EditFirstname.getText().toString();
                EditText EditLastname = (EditText) findViewById(R.id.SignUpInputLastname);
                String lastname = EditLastname.getText().toString();
                EditText Editpassword1 = (EditText) findViewById(R.id.SignUpInputPassword);
                String password1 = Editpassword1.getText().toString();
                EditText Editpassword2 = (EditText) findViewById(R.id.SignUpInputPasswordConfirm);
                String password2 = Editpassword2.getText().toString();
                if (!password1.equals(password2)) {
                    Toast.makeText(SignUpActivity.this, "Password inconsistant.", Toast.LENGTH_LONG).show();
                    return;
                }
                EditText Editemail = (EditText) findViewById(R.id.SignUpInputEmail);
                String email = Editemail.getText().toString();
                EditText Editphone = (EditText) findViewById(R.id.SignUpInputPhone);
                String phone = Editphone.getText().toString();

                JSONObject SignUpupload = new JSONObject();
                try {
                    SignUpupload.put("userId", username);
                    SignUpupload.put("first_name", firstname);
                    SignUpupload.put("last_name", lastname);
                    SignUpupload.put("password", password1);
                    SignUpupload.put("email", email);
                    SignUpupload.put("phone_number", phone);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                final String SignUpInput = SignUpupload.toString();
                final String[] SignUpOutput = {null};


                Thread SignUpthread = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            URL myURL = new URL(utils.getCurrentURL() + "/API/createUser");
                            //URL newURL = new URL(myURL.getProtocol(), myURL.getHost(), 5000, myURL.getFile());
                            HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
                            myURLConnection.setRequestMethod("POST");
                            myURLConnection.setRequestProperty("Content-Type", "application/json");
                            myURLConnection.setRequestProperty("Accept", "application/json");
                            Log.e("thread", "thread running");
                            OutputStreamWriter osw = new OutputStreamWriter(myURLConnection.getOutputStream());
                            Log.e("thread", "thread still running");
                            osw.write(SignUpInput);
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
                                SignUpOutput[0] = sb.toString();
                                reader.close();
                            }
                        } catch (MalformedURLException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
                SignUpthread.start();

                try {
                    SignUpthread.join(1000000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                String result = SignUpOutput[0];
                try {
                    JSONObject temp = new JSONObject(result);
                    result = temp.getString("result");
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                if (result.equals("OK")) {
                    Intent intent = new Intent(SignUpActivity.this, MainActivity.class);
                    startActivity(intent);
                    SignUpActivity.this.finish();
                }
                else {
                    Toast.makeText(SignUpActivity.this, "Sign Up Failed.", Toast.LENGTH_LONG).show();
                }
                return;
            }
        });
    }
}
