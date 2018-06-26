package com.example.pigdtt12345.coeats;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.DecimalFormat;
import java.util.LinkedList;

/**
 * Created by pigdtt12345 on 3/26/18.
 */

public class SummaryAdapter extends BaseAdapter {
    private LinkedList<SummaryItem> m_data;
    private Context m_context;

    public SummaryAdapter(LinkedList<SummaryItem> data, Context context) {
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
        SummaryAdapter.ViewHolder holder = null;
        if (convertView == null) {
            convertView = LayoutInflater.from(m_context).inflate(R.layout.list_sum_layout, parent, false);
            holder = new SummaryAdapter.ViewHolder();
            holder.txt_sumName = (TextView) convertView.findViewById(R.id.list_sum_name);
            holder.txt_sumPrice = (TextView) convertView.findViewById(R.id.list_sum_price);
            holder.txt_sumNum = (TextView) convertView.findViewById(R.id.list_sum_num);
            convertView.setTag(holder);
        }
        else {
            holder = (SummaryAdapter.ViewHolder) convertView.getTag();
        }
        holder.txt_sumName.setText(m_data.get(position).getSumName());
        holder.txt_sumPrice.setText("$ " + m_data.get(position).getSumPrice());
        holder.txt_sumNum.setText("* " + m_data.get(position).getSumNum());
        return convertView;
    }

    static class ViewHolder{
        TextView txt_sumName;
        TextView txt_sumPrice;
        TextView txt_sumNum;
    }
}
