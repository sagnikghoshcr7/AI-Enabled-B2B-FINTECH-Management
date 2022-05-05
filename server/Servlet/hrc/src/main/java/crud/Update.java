package crud;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import database.Database;

public class Update {

    public static int updateData(int slNo, String invoiceCurrency, String customerPaymentTerms) throws SQLException {
        Connection conn = Database.getConnection();
        String sql_query = "UPDATE winter_internship" 
        + " SET"
        + "     invoice_currency = ?,"
        + "     cust_payment_terms = ?"
        + " WHERE sl_no = ?;";

        PreparedStatement pstmt = conn.prepareStatement(sql_query);
        if (invoiceCurrency      == "") pstmt.setNull(1, java.sql.Types.NULL); else pstmt.setString(1, invoiceCurrency);
        if (customerPaymentTerms == "") pstmt.setNull(2, java.sql.Types.NULL); else pstmt.setString(2, customerPaymentTerms);
        // pstmt.setString(1, invoiceCurrency);
        // pstmt.setString(2, customerPaymentTerms);
        pstmt.setInt(3, slNo);

        int r_code = pstmt.executeUpdate();

        return r_code;
    }
}
