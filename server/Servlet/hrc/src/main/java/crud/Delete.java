package crud;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;

import database.Database;

public class Delete {

    public static int deleteData(String[] slNo_Arr) throws SQLException {
        Connection conn = Database.getConnection();

        for (int i = 0; i < slNo_Arr.length; i++) {
        	slNo_Arr[i] = String.valueOf((int) Double.parseDouble(slNo_Arr[i]));
        }
        
        String sql_query = "UPDATE winter_internship" 
        + " SET"
        + "     is_deleted = 1"
        + " WHERE sl_no IN $WHERE_ARR$;";

        String arrToString = Arrays.toString(slNo_Arr);
        String array = "(" + arrToString.replace("[", "(").substring(1, arrToString.length() - 1) + ")";
        PreparedStatement pstmt = conn.prepareStatement(sql_query.replace("$WHERE_ARR$", array));
        
        return pstmt.executeUpdate();
    }
}
