package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.DecimalFormat;
import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/1/18.
 */

public class OrderAdapter extends BaseAdapter{

    private LinkedList<Order> m_data;
    private Context m_context;

    public OrderAdapter(LinkedList<Order> data, Context context) {
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
        ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(m_context).inflate(R.layout.list_order_layout, parent, false);
            holder = new ViewHolder();
            holder.img_icon = (ImageView) convertView.findViewById(R.id.listItem);
            holder.txt_name = (TextView) convertView.findViewById(R.id.list_res_name);
            holder.txt_type = (TextView) convertView.findViewById(R.id.list_res_type);
            holder.txt_cd = (TextView) convertView.findViewById(R.id.list_order_cd);
            holder.txt_dist = (TextView) convertView.findViewById(R.id.list_order_dist);
            holder.txt_people = (TextView) convertView.findViewById(R.id.list_order_people);
            holder.txt_amount = (TextView) convertView.findViewById(R.id.list_order_amount);
            convertView.setTag(holder);
        }
        else {
            holder = (ViewHolder) convertView.getTag();
        }
        holder.img_icon.setImageResource(R.mipmap.list_order_item);
        holder.txt_name.setText(m_data.get(position).getRestaurant().getName());
        String tempResType = "";
        String[] listtempResType = m_data.get(position).getRestaurant().getType();
        for (int i = 0; i < listtempResType.length; i++) {
            if (i != 0) {
                tempResType += ", ";
            }
            tempResType += listtempResType[i];
        }
        holder.txt_type.setText(tempResType);
        double cd = m_data.get(position).getCountdown();
        int people = m_data.get(position).getNpeople();
        int rPeople = m_data.get(position).getRpeople();
        holder.txt_cd.setText((int)(cd / 60) + " min " + (int)(cd % 60) + " s");
        holder.txt_people.setText(people + "/" + rPeople + " people");
        DecimalFormat fmt = new DecimalFormat("0.00");
        double money = m_data.get(position).getNmoney();
        double rMoney = m_data.get(position).getRmoney();
        holder.txt_amount.setText(fmt.format(money) + "/" + fmt.format(rMoney) + "usd");
        double dist = m_data.get(position).getDist();
        if (dist >= 0.01) {
            String tempdist = String.format("%.2f", dist);
            holder.txt_dist.setText(tempdist + " mi");
        }
        else {
            int tempdist = (int) (dist * 5280);
            holder.txt_dist.setText(tempdist + " feet");
        }
        return convertView;
    }

    static class ViewHolder{
        ImageView img_icon;
        TextView txt_name;
        TextView txt_type;
        TextView txt_cd;
        TextView txt_dist;
        TextView txt_people;
        TextView txt_amount;
    }
}
