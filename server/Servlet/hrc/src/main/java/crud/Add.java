package crud;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import database.Database;

import pojo.Invoice;

public class Add {

    public static int addData(Invoice inv) throws SQLException {
        Connection conn = Database.getConnection();

        String sql_query = "INSERT INTO winter_internship ("
        + " business_code,"
        + " cust_number,"
        + " clear_date,"
        + " business_year,"
        + " doc_id,"
        + " posting_date,"
        + " document_create_date,"
        + " document_create_date1,"
        + " due_in_date,"
        + " invoice_currency,"
        + " document_type,"
        + " posting_id,"
        + " area_business,"
        + " total_open_amount,"
        + " baseline_create_date,"
        + " cust_payment_terms,"
        + " invoice_id,"
        + " isOpen,"
        + " aging_bucket,"
        + " is_deleted,"
        + " predicted)"
        + " VALUES ("
        + " ?,"
        + " ?,"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " ?,"
        + " ?,"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " ?,"
        + " ?,"
        + " ?,"
        + " ?,"
        + " ?,"
        + " STR_TO_DATE(?, '%Y-%m-%d'),"
        + " ?,"
        + " ?,"
        + " ?,"
        + " ?,"
        + " ?,"
        + " ?"
        + ");";

        PreparedStatement pstmt = conn.prepareStatement(sql_query);
        // pstmt.setInt    (1 , inv.get_sl_no());

        if (inv.get_business_code()                      == null) pstmt.setNull(1 , java.sql.Types.NULL); else pstmt.setString (1 , inv.get_business_code());
        if (inv.get_cust_number()                        == 0L  ) pstmt.setNull(2 , java.sql.Types.NULL); else pstmt.setLong   (2 , inv.get_cust_number());
        if (inv.get_clear_date().toString()              == null) pstmt.setNull(3 , java.sql.Types.NULL); else pstmt.setString (3 , inv.get_clear_date().toString());
        if (inv.get_business_year()                      == 0   ) pstmt.setNull(4 , java.sql.Types.NULL); else pstmt.setInt    (4 , inv.get_business_year());
        if (inv.get_doc_id()                             == null) pstmt.setNull(5 , java.sql.Types.NULL); else pstmt.setString (5 , inv.get_doc_id());
        if (inv.get_posting_date().toString()            == null) pstmt.setNull(6 , java.sql.Types.NULL); else pstmt.setString (6 , inv.get_posting_date().toString());
        if (inv.get_document_create_date().toString()    == null) pstmt.setNull(7 , java.sql.Types.NULL); else pstmt.setString (7 , inv.get_document_create_date().toString());
        if (inv.get_document_create_date1().toString()   == null) pstmt.setNull(8 , java.sql.Types.NULL); else pstmt.setString (8 , inv.get_document_create_date1().toString());
        if (inv.get_due_in_date().toString()             == null) pstmt.setNull(9 , java.sql.Types.NULL); else pstmt.setString (9 , inv.get_due_in_date().toString());
        if (inv.get_invoice_currency()                   == null) pstmt.setNull(10, java.sql.Types.NULL); else pstmt.setString (10, inv.get_invoice_currency());
        if (inv.get_document_type()                      == null) pstmt.setNull(11, java.sql.Types.NULL); else pstmt.setString (11, inv.get_document_type());
        if (inv.get_posting_id()                         == 0   ) pstmt.setNull(12, java.sql.Types.NULL); else pstmt.setInt    (12, inv.get_posting_id());
        if (inv.get_area_business()                      == null) pstmt.setNull(13, java.sql.Types.NULL); else pstmt.setString (13, inv.get_area_business());
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */ pstmt.setDouble (14, inv.get_total_open_amount());
        if (inv.get_baseline_create_date().toString()    == null) pstmt.setNull(15, java.sql.Types.NULL); else pstmt.setString (15, inv.get_baseline_create_date().toString());
        if (inv.get_cust_payment_terms()                 == null) pstmt.setNull(16, java.sql.Types.NULL); else pstmt.setString (16, inv.get_cust_payment_terms());
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */ pstmt.setLong   (17, inv.get_invoice_id());
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */ pstmt.setInt    (18, inv.get_isOpen());
        if (inv.get_aging_bucket()                       == null) pstmt.setNull(19, java.sql.Types.NULL); else pstmt.setString (19, inv.get_aging_bucket());
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */ pstmt.setInt    (20, inv.get_is_deleted());
        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */ pstmt.setString (21, inv.get_predicted());

        System.out.println(pstmt);
        int r_code = pstmt.executeUpdate();

        return r_code;
    }
}

