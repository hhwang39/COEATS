package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/3/18.
 */

public class RestaurantAdapter extends BaseAdapter {

    private LinkedList<Restaurant> m_data;
    private Context m_context;

    public RestaurantAdapter(LinkedList<Restaurant> data, Context context) {
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
            convertView = LayoutInflater.from(m_context).inflate(R.layout.list_restaurant_layout, parent, false);
            holder = new ViewHolder();
            holder.img_icon = (ImageView) convertView.findViewById(R.id.listItem);
            holder.txt_name = (TextView) convertView.findViewById(R.id.list_res_name);
            holder.txt_type = (TextView) convertView.findViewById(R.id.list_res_type);
            holder.txt_open = (TextView) convertView.findViewById(R.id.listOpen);
            convertView.setTag(holder);
        }
        else {
            holder = (ViewHolder) convertView.getTag();
        }
        holder.img_icon.setImageResource(R.mipmap.list_order_item);
        holder.txt_name.setText(m_data.get(position).getName());
        String tempResType = "";
        String[] listtempResType = m_data.get(position).getType();
        for (int i = 0; i < listtempResType.length; i++) {
            if (i != 0) {
                tempResType += ", ";
            }
            tempResType += listtempResType[i];
        }
        holder.txt_type.setText(tempResType);
        holder.txt_open.setText(m_data.get(position).getOpen());
        return convertView;
    }

    static class ViewHolder{
        ImageView img_icon;
        TextView txt_name;
        TextView txt_type;
        TextView txt_open;
    }
}