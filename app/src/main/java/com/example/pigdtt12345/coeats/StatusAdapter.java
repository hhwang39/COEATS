package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.DecimalFormat;
import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 4/15/18.
 */

public class StatusAdapter extends BaseAdapter{

    private LinkedList<Order> m_data;
    private Context m_context;

    public StatusAdapter(LinkedList<Order> data, Context context) {
        m_data = data;
        m_context = context;
    }

    @Override
    public int getCount() {
        return m_data.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    public View getView (int position, View convertView, ViewGroup parent) {
        StatusAdapter.ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(m_context).inflate(R.layout.list_management_layout, parent, false);
            holder = new StatusAdapter.ViewHolder();
            holder.orderType = (TextView) convertView.findViewById(R.id.list_mng_indco);
            holder.resName = (TextView) convertView.findViewById(R.id.list_mng_res);
            holder.status = (TextView) convertView.findViewById(R.id.list_mng_status);
            holder.time = (TextView) convertView.findViewById(R.id.list_mng_countdown);
            holder.money = (TextView) convertView.findViewById(R.id.list_mng_money);
            holder.people = (TextView) convertView.findViewById(R.id.list_mng_people);
            holder.confirm = (Button) convertView.findViewById(R.id.list_mng_confirm);
            convertView.setTag(holder);
        }
        else {
            holder = (StatusAdapter.ViewHolder) convertView.getTag();
        }
        final int posit = position;
        Order order = m_data.get(position);
        if (order.getIfCoeats()) holder.orderType.setText("Order type: COEATS");
        else holder.orderType.setText("Order type: Individual");

        holder.resName.setText("Restaurant: " + order.getRestaurant().getName());
        holder.status.setText("Status: " + order.getStatus());
        if (order.getStatus().equals("In Process")) {
            holder.confirm.setEnabled(false);
            holder.time.setText("Remaining time: " + (int) (order.getCountdown() / 60) + " min " + (int) (order.getCountdown() % 60) + " s");
            holder.money.setText("Current money: " + order.getNmoney() + "/" + order.getRmoney());
            holder.people.setText("Current people: " + order.getNpeople() + "/" + order.getRpeople());
        }
        else {
            holder.confirm.setEnabled(true);
        }
        final ViewHolder finalHolder = holder;
        holder.confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                utils.getMngDel().add(posit);
                finalHolder.confirm.setEnabled(false);
            }
        });
        return convertView;
    }

    static class ViewHolder{
        TextView orderType;
        TextView resName;
        TextView status;
        TextView time;
        TextView money;
        TextView people;
        Button confirm;
    }
}
