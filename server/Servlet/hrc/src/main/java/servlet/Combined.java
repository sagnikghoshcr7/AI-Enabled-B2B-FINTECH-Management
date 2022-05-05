package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import database.Database;
import pojo.Invoice;

@WebServlet("/Combined")

public class Combined extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {

			Connection conn = Database.getConnection();
			Statement st = conn.createStatement();

			String from_cl = request.getParameter("from_cl");
			String to_cl = request.getParameter("to_cl");
			String from_due = request.getParameter("from_due");
			String to_due = request.getParameter("to_due");
			String from_base = request.getParameter("from_base");
			String to_base = request.getParameter("to_base");
			//String invoice_curr = request.getParameter("invoice_curr");
			
			//GROUP BY invoice_currency";
			String query_min_cldate = "select min(clear_date), max(clear_date), min(due_in_date), max(due_in_date), min(baseline_create_date), max(baseline_create_date) from winter_internship";
			String def_min_cl;
			String def_max_cl;
			String def_min_due;
			String def_max_due;
			String min_baseline_create_date;
			String max_baseline_create_date;
			
			ResultSet rs = st.executeQuery(query_min_cldate);
			rs.next();
			def_min_cl = rs.getString(1);
			def_max_cl = rs.getString(2);
            def_min_due = rs.getString(3);
            def_max_due = rs.getString(4);
            min_baseline_create_date = rs.getString(5);
            max_baseline_create_date = rs.getString(6);
           
            
//            String def_inv = "('USD','CAD')";
            
			String sql_query = "SELECT business_code, COUNT(DISTINCT cust_number) AS no_of_cust,SUM(total_open_amount) AS total_open_ampount FROM winter_internship WHERE clear_date between ? and ? and due_in_date between ? and ? and baseline_create_date between ? and ? GROUP BY business_code";
			PreparedStatement pstmt1 = conn.prepareStatement(sql_query);
			 //System.out.print(sql_query);
			if (from_cl == "" || from_cl == null)
				pstmt1.setString(1, def_min_cl);
			else
				pstmt1.setString(1, from_cl);
			if (to_cl == "" || to_cl == null)
				pstmt1.setString(2, def_max_cl);
			else
				pstmt1.setString(2, to_cl);
			if(from_due == "" ||from_due == null )
				pstmt1.setString(3, def_min_due);
			else
				pstmt1.setString(3, from_due);
			
			if (to_due == ""|| to_due == null) 
				pstmt1.setString(4, def_max_due);
			else
				pstmt1.setString(4, to_due);
			
			if(from_base == "" || from_base == null)
				pstmt1.setString(5, min_baseline_create_date);
			else
				pstmt1.setString(5, from_base);
            
			if(to_base == "" || to_base == null)
				pstmt1.setString(6, max_baseline_create_date);
			else
				pstmt1.setString(6, to_base);
			
//			if(invoice_curr == "" || invoice_curr == null)
//				pstmt1.setString(7,def_inv);
//			else
//				pstmt1.setString(7,invoice_curr);
				
            rs=pstmt1.executeQuery();
            
            //System.out.print(sql_query);
            
//            String extra2 = " where invoice_currency = ?";
//            String sql = "select invoice_currency,count(*) from winter_internship" + extra2;
//            PreparedStatement pstmt = conn.prepareStatement(sql);
//            
//            
//            
//            if(invoice_curr == "")
//              sql = sql.substring(0,(sql.length()-extra2.length())+1) + "group by invoice_currency;";
//              
//            else
//            pstmt.setString(1,invoice_curr);
//            ResultSet rs1 = st.executeQuery(sql);
//            rs1 = pstmt.executeQuery();
			
            
			Gson gson = new Gson();
			String respData = gson.toJson(dataSearch(rs));
			response.setContentType("application/json");
			response.getWriter().print(respData);
		}

		catch (Exception e) {

			e.printStackTrace();
			response.getWriter().print(e.getMessage());
		}

	}

	public ArrayList<HashMap> dataSearch(ResultSet rs) throws SQLException {

		

		
		ArrayList<HashMap> invoiceArr = new ArrayList<HashMap>();
		
		
		
		
		while (rs.next()) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("business_code",rs.getString(1));
		map.put("no_of_cust", rs.getInt(2));
		map.put("total_open_amount", rs.getDouble(3));
		
//		HashMap<String,Object> subArr = new HashMap<String,Object>();
//		while (rs.next()) {
//			subArr.put("invoice_currency", r1.getString(1));
//		}
//		map.put("inv", subArr);
//		
//		invoiceArr.add(map);

		invoiceArr.add(map);	
			

		}

		return invoiceArr;
	}

}
