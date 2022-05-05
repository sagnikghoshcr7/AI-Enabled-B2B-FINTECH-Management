package crud;

import java.sql.Connection;
// import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import database.Database;
import pojo.Invoice;

public class Read {
    private String sql_query = "SELECT "
    + " w.sl_no,"
    + " w.business_code,"
    + " b.business_name,"
    + " w.cust_number,"
    + " c.name_customer,"
    + " w.clear_date,"
    + " w.business_year,"
    + " w.doc_id,"
    + " w.posting_date,"
    + " w.document_create_date,"
    + " w.document_create_date1,"
    + " w.due_in_date,"
    + " w.invoice_currency,"
    + " w.document_type,"
    + " w.posting_id,"
    + " w.area_business,"
    + " w.total_open_amount,"
    + " w.baseline_create_date,"
    + " w.cust_payment_terms,"
    + " w.invoice_id,"
    + " w.isOpen,"
    + " w.aging_bucket,"
    + " w.predicted,"
    + " w.is_deleted"
    + " FROM winter_internship w"
    + " LEFT JOIN business b"
    + " ON w.business_code = b.business_code"
    + " LEFT JOIN customer c"
    + " ON w.cust_number = c.cust_number"
    + " WHERE w.is_deleted = '0'"
    + " AND w.doc_id like ? AND"
    + " w.cust_number LIKE ? AND"
    + " w.invoice_id LIKE ? AND"
    + " w.business_year like ?"
    + " ORDER BY $OrderByColumnName$"
    + " LIMIT ?, ?;";

    private static Set<String> validColumnNameSet = new HashSet<>();

    public Read() {
        validColumnNameSet.add("sl_no");
        validColumnNameSet.add("business_code");
        validColumnNameSet.add("business_name");
        validColumnNameSet.add("cust_number");
        validColumnNameSet.add("name_customer");
        validColumnNameSet.add("clear_date");
        validColumnNameSet.add("business_year");
        validColumnNameSet.add("doc_id");
        validColumnNameSet.add("posting_date");
        validColumnNameSet.add("document_create_date");
        validColumnNameSet.add("document_create_date1");
        validColumnNameSet.add("due_in_date");
        validColumnNameSet.add("invoice_currency");
        validColumnNameSet.add("document_type");
        validColumnNameSet.add("posting_id");
        validColumnNameSet.add("area_business");
        validColumnNameSet.add("total_open_amount");
        validColumnNameSet.add("baseline_create_date");
        validColumnNameSet.add("cust_payment_terms");
        validColumnNameSet.add("invoice_id");
        validColumnNameSet.add("isOpen");
        validColumnNameSet.add("aging_bucket");
        validColumnNameSet.add("predicted");
        validColumnNameSet.add("is_deleted");
    }

    public void setSqlQuery(String query) {
        sql_query = query;
    }
    public String getSqlQuery() {
        return sql_query;
    }

    public HashMap<Object, Object> getDataDefault() throws SQLException {
        return getDataLoading(0, 100, "sl_no", true);
    }

    public HashMap<Object, Object> getDataLoading(int offset, int limit, String orderByColumn, boolean sortDesc) throws SQLException {
        return getDataSearch(offset, limit, orderByColumn, sortDesc, "", "", "", "");
    }

    private boolean checkColumn(String columnName) {
        return validColumnNameSet.contains(columnName);
    }

    public HashMap<Object, Object> getDataSearch(int offset, int limit, String orderByColumn, boolean sortDesc, String doc_id, String cust_number, String invoice_id, String buisness_year) throws SQLException {
        ArrayList<Invoice> invoiceArr = new ArrayList<Invoice>();
        HashMap<Object, Object> map = new HashMap<>();

        Connection conn = Database.getConnection();
        // String sql_query = "SELECT * FROM winter_internship LIMIT ?;";
        
        String sql_query;
        if (checkColumn(orderByColumn)) {
            sql_query = getSqlQuery().replace("$OrderByColumnName$", orderByColumn + ((sortDesc) ? " DESC" : " ASC"));
        } else {
            throw new SQLException("Invalid Column Name specified for sorting");
        }
        
        // sql_query += " ORDER BY ? ASC";
        
        PreparedStatement pstmt = conn.prepareStatement(sql_query);

        pstmt.setString(1, ((doc_id        == null) ? "" : doc_id       ) + '%');
        pstmt.setString(2, ((cust_number   == null) ? "" : cust_number  ) + '%');
        pstmt.setString(3, ((invoice_id    == null) ? "" : invoice_id   ) + '%');
        pstmt.setString(4, ((buisness_year == null) ? "" : buisness_year) + '%');

        pstmt.setInt(5, offset);
        pstmt.setInt(6, limit);

        ResultSet rs = null;
        int rowCount = 0;

        System.out.println(pstmt);
        rs = pstmt.executeQuery();

        while (rs.next()) {
            rowCount++;
            Invoice inv = new Invoice();
            // System.out.println(rs.getString("clear_date") == null);
            inv.set_fromString(
                rs.getString("sl_no"),
                rs.getString("business_code"),
                rs.getString("business_name"),
                rs.getString("cust_number"),
                rs.getString("name_customer"),
                rs.getString("clear_date"),
                rs.getString("business_year").substring(0, 4),
                rs.getString("doc_id"),
                rs.getString("posting_date"),
                rs.getString("document_create_date"),
                rs.getString("document_create_date1"),
                rs.getString("due_in_date"),
                rs.getString("invoice_currency"),
                rs.getString("document_type"),
                rs.getString("posting_id"),
                rs.getString("area_business"),
                rs.getString("total_open_amount"),
                rs.getString("baseline_create_date"),
                rs.getString("cust_payment_terms"),
                rs.getString("invoice_id"),
                rs.getString("isOpen"),
                rs.getString("aging_bucket"),
                rs.getString("predicted"),
                rs.getString("is_deleted")
            );

            invoiceArr.add(inv);
            // System.out.println(inv.toString());
        }

        map.put("count", rowCount);
        map.put("data", invoiceArr);

        return map;
    }
}
