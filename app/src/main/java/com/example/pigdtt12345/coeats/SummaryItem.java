package com.example.pigdtt12345.coeats;

/**
 * Created by pigdtt12345 on 3/26/18.
 */

public class SummaryItem {
    String m_sumName;
    double m_sumPrice;
    int m_sumNum;

    SummaryItem(String sumName, double sumPrice, int sumNum) {
        m_sumName = sumName;
        m_sumPrice = sumPrice;
        m_sumNum = sumNum;
    }

    public String getSumName() {
        return m_sumName;
    }

    public double getSumPrice() {
        return m_sumPrice;
    }

    public int getSumNum() {
        return m_sumNum;
    }
}
