package crud;


import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import database.Database;
/**
 * Servlet implementation class PieChart
 */
@WebServlet("/api/PieChart")
public class PieChart extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PieChart() {
        super();
        // TODO Auto-generated constructor 
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			
	         Connection con=Database.getConnection(); 
			 Statement st = con.createStatement();
			 
			 String invoice_curr = request.getParameter("invoice_curr");
			 
			 String extra2 = " where invoice_currency = \"" +invoice_curr+"\"";
			
			 String sql = "select invoice_currency,count(*) from winter_internship" + extra2;
			 PreparedStatement pstmt = con.prepareStatement(sql);
			 
			 
			 if(invoice_curr == "" || invoice_curr == null)
				 sql = sql.substring(0,(sql.length()-extra2.length())+1) + "group by invoice_currency;";
			 
				 //pstmt.setString(1,invoice_curr);
				 
			 //System.out.print(sql);
			  ResultSet rs ;
			  rs = pstmt.executeQuery(sql);
			  
			 
			 Map<String ,Integer>map=new HashMap<String ,Integer>();
			while(rs.next()) {
				map.put(rs.getString(1), rs.getInt(2));
				
			}
    
			 
			 
			 
			 
			 
			 
			 
			 Gson gson = new Gson();
		     String respData1 = gson.toJson(map);
		    
		     response.setContentType("application/json");
		     response.getWriter().print(respData1);
			 

		 }
		 catch(Exception e) {
			response.getWriter().print(e.getMessage());
		 }

	}

	private String toString(String invoice_curr) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

