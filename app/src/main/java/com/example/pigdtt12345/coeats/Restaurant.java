package com.example.pigdtt12345.coeats;

import android.graphics.Bitmap;

/**
 * Created by pigdtt12345 on 3/1/18.
 */

public class Restaurant {
    String m_name;
    int m_icon;
    Bitmap m_iconOnline = null;
    String[] m_type;
    boolean m_open;
    String m_keys;


    Restaurant(String name, String icon, String[] type, boolean open, String keys) {
        m_name = name;
        m_icon = R.mipmap.cross_icon;
        m_type = new String[type.length];
        m_type = type.clone();
        final String IconUrl = icon;
        new Thread(new Runnable() {
            @Override
            public void run() {
                m_iconOnline = utils.getImageBitmap(IconUrl);
            }
        }).start();
        m_open = open;
        m_keys = keys;
    }

    Restaurant(String name, String keys, String[] types, boolean open) {
        m_name = name;
        m_keys = keys;
        m_type = types;
        m_open = open;
    }

    Restaurant(String name, String keys, String[] types) {
        m_name = name;
        m_keys = keys;
        m_type = types;
    }

    Restaurant (String name, String keys) {
        m_name = name;
        m_keys = keys;

        m_type = new String[2];
        m_type[0] = "Chinese";
        m_type[1] = "American";

        m_open = true;
    }

    public String getName() {
        return m_name;
    }

    public int getIcon() {
        return m_icon;
    }

    public String[] getType() {
        return m_type;
    }

    public Bitmap getIconOnline() {
        return m_iconOnline;
    }

    public String getOpen() {
        if (m_open) return "open";
        return "close";
    }

    public String getKeys() {
        return m_keys;
    }
}