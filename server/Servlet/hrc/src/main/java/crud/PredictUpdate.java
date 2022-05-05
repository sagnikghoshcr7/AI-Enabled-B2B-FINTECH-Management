package crud;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import database.Database;

public class PredictUpdate {
	
	 public static int updateData(int slNo, String  aging_bucket, String predicted) throws SQLException {
	        Connection conn = Database.getConnection();
	        String sql_query = "UPDATE winter_internship" 
	        + " SET"
	        + "     aging_bucket = ?,"
	        + "     predicted = ?"
	        + " WHERE sl_no = ?;";

	        PreparedStatement pstmt = conn.prepareStatement(sql_query);
	        if (aging_bucket     == "") pstmt.setNull(1, java.sql.Types.NULL); else pstmt.setString(1,  aging_bucket);
	        if (predicted == "") pstmt.setNull(2, java.sql.Types.NULL); else pstmt.setString(2, predicted);
	        // pstmt.setString(1, invoiceCurrency);
	        // pstmt.setString(2, customerPaymentTerms);
	        pstmt.setInt(3, slNo);

	        int r_code = pstmt.executeUpdate();

	        return r_code;
	    }

}
