package com.example.pigdtt12345.coeats;

/**
 * Created by pigdtt12345 on 3/9/18.
 */

public class MenuItem {
    String m_dishName;
    String m_dishDescription;
    double m_dishPrice;
    String m_dishKey;

    MenuItem(String dishName, String dishDescription, double dishPrice) {
        this.m_dishName = dishName;
        this.m_dishDescription = dishDescription;
        this.m_dishPrice = dishPrice;
    }

    MenuItem(String dishName, String dishDescription, double dishPrice, String dishKey) {
        this.m_dishName = dishName;
        this.m_dishDescription = dishDescription;
        this.m_dishPrice = dishPrice;
        this.m_dishKey = dishKey;
    }

    public String getDishName() {
        return m_dishName;
    }

    public String getDishDescription() {
        return m_dishDescription;
    }

    public double getDishPrice() {
        return m_dishPrice;
    }

    public String getDishKey() {
        return m_dishKey;
    }
}
