package com.example.pigdtt12345.coeats;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

/**
 * Created by pigdtt12345 on 3/26/18.
 */

public class ConditionActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.condition_layout);

        final Bundle bundle = this.getIntent().getExtras();

        EditText tempMoney = (EditText) findViewById(R.id.condition_input_money);
        tempMoney.setText("" + utils.getMinDeliveryMoney());

        Button btm = (Button) findViewById(R.id.condition_button);
        btm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText tmpMoney = (EditText) findViewById(R.id.condition_input_money);
                EditText tmpPeople = (EditText) findViewById(R.id.condition_input_people);
                EditText tmpTime = (EditText) findViewById(R.id.condition_input_time);

                double money = Double.parseDouble(tmpMoney.getText().toString());
                int people = Integer.parseInt(tmpPeople.getText().toString());
                double time = Double.parseDouble(tmpTime.getText().toString());

                if (money > 0) {
                    bundle.putDouble("rMoney", money);
                }
                else {
                    bundle.putDouble("rMoney", 0);
                }

                if (people > 1) {
                    bundle.putInt("rPeople", people);
                }
                else {
                    bundle.putInt("rPeople", 1);
                }

                if (time > 0) {
                    bundle.putDouble("rTime", time);
                }
                else {
                    bundle.putDouble("rTime", 0);
                }

                Intent intent = new Intent(ConditionActivity.this, SummaryActivity.class);
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });
    }
}
