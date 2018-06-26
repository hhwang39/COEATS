package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/9/18.
 */

public class MenuAdapter extends BaseAdapter {

    private LinkedList<MenuItem> m_data;
    private Context m_context;
    private final int[] m_amount;

    public MenuAdapter(LinkedList<MenuItem> data, Context context) {
        m_data = data;
        m_context = context;
        m_amount = new int[m_data.size()];
    }

    public int[] getM_amount() {
        return m_amount;
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
        ViewHolder holderTmp = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(m_context).inflate(R.layout.list_menu_layout, parent, false);
            holderTmp = new ViewHolder();
            holderTmp.txt_name = (TextView) convertView.findViewById(R.id.list_res_name);
            holderTmp.txt_description = (TextView) convertView.findViewById(R.id.list_res_type);
            holderTmp.txt_price = (TextView) convertView.findViewById(R.id.list_order_cd);
            holderTmp.txt_amount = (TextView) convertView.findViewById(R.id.list_menu_amount);
            holderTmp.btm_minus = (Button) convertView.findViewById(R.id.list_menu_minus);
            holderTmp.btm_plus = (Button) convertView.findViewById(R.id.list_menu_plus);
            convertView.setTag(holderTmp);
        }
        else {
            holderTmp = (ViewHolder) convertView.getTag();
        }
        final ViewHolder holder = holderTmp;
        final int posit = position;
        convertView.setTag(holder);
        holder.itemKey = m_data.get(position).getDishKey();
        holder.txt_name.setText(m_data.get(position).getDishName());
        holder.txt_description.setText(m_data.get(position).getDishDescription());
        holder.txt_price.setText("$ " + m_data.get(position).getDishPrice());
        holder.txt_amount.setText("0");

        holder.btm_minus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String origin = holder.txt_amount.getText().toString();
                int amount = Integer.parseInt(origin);
                if (amount > 0) {
                    amount -= 1;
                    holder.txt_amount.setText("" + amount);
                    m_amount[posit] = amount;
                }
            }
        });
        holder.btm_plus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String origin = holder.txt_amount.getText().toString();
                int amount = Integer.parseInt(origin) + 1;
                holder.txt_amount.setText("" + amount);
                m_amount[posit] = amount;
            }
        });
        return convertView;
    }

    static class ViewHolder{
        TextView txt_name;
        TextView txt_description;
        TextView txt_price;
        TextView txt_amount;
        Button btm_minus;
        Button btm_plus;
        String itemKey;
    }
}