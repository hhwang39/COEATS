package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 4/9/18.
 */

public class ManagementActivity extends AppCompatActivity{
    private final LinkedList<Order> mData = utils.getOderList();
    private Context mContext;
    private StatusAdapter mAdapter = null;
    private ListView list_order;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.management_layout);

        FloatingActionButton fBtm = (FloatingActionButton) findViewById(R.id.mng_fbtm);
        fBtm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ManagementActivity.this, SearchActivity.class);
                startActivity(intent);
            }
        });

        Button refreshBtm = (Button) findViewById(R.id.mng_refresh);
        refreshBtm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ManagementActivity.this, ManagementActivity.class);
                startActivity(intent);
                ManagementActivity.this.finish();
            }
        });

        LinkedList<Integer> delList = utils.getMngDel();
        for (int i = delList.size() - 1; i >= 0; i--) {
            int idx = delList.get(i);
            mData.remove(idx);
        }
        delList.clear();

        for (int i = 0; i < mData.size(); i++) {
            Order temp = mData.get(i);
            temp.update();
        }


        mContext = ManagementActivity.this;
        list_order = (ListView) findViewById(R.id.mng_listview);
        //mData = utils.getOderList();
        mAdapter = new StatusAdapter(mData, mContext);
        list_order.setAdapter(mAdapter);

        final LinkedList<Order> data = mData;
        list_order.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(parent.getContext(), SummaryActivity.class);
                String resName = data.get(position).getRestaurant().getName();
                String resKey = data.get(position).getRestaurant().getKeys();
                String[] menuNames = data.get(position).getMenuNames();
                String[] menuKeys = data.get(position).getMenuKeys();
                double[] menuPrices = data.get(position).getMenuPrices();
                int[] menuNum = data.get(position).getMenuNum();
                boolean coeats = data.get(position).getIfCoeats();
                int orderId = data.get(position).getOrderId();

                Bundle bundle = new Bundle();
                bundle.putString("resName", resName);
                bundle.putString("resKey", resKey);
                bundle.putStringArray("menuNames", menuNames);
                bundle.putStringArray("menuKeys", menuKeys);
                bundle.putDoubleArray("menuPrices", menuPrices);
                bundle.putIntArray("menuNum", menuNum);
                bundle.putBoolean("COEATS", coeats);
                bundle.putBoolean("join", true);
                bundle.putInt("orderId", orderId);
                bundle.putBoolean("review", true);
                bundle.putDouble("deliveryFee", data.get(position).getDeliveryFee());
                bundle.putInt("rPeople", data.get(position).getRpeople());
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });
    }
}
