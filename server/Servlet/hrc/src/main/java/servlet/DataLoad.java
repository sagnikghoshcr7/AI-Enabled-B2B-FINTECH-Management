package servlet;

import java.io.IOException;
// import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

// import database.Database;

@WebServlet("/api/load")
public class DataLoad extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // request.getAttribute(name)
        crud.Read dataReader = new crud.Read();

        String s_Offset      = request.getParameter("offset");
        String s_Limit       = request.getParameter("limit");
        String orderByColumn = request.getParameter("order_by_column");
        String s_sortDesc    = request.getParameter("sort_desc");
        
        boolean sortDesc = (s_sortDesc.equals("1") || s_sortDesc.equalsIgnoreCase("true")) ? true : false; 
        
        int offset;
        int limit;
        HashMap<Object, Object> data = new HashMap<>();

        offset          = (s_Offset        != null && s_Offset        != "") ? Integer.parseInt(s_Offset) : 0;
        limit           = (s_Limit         != null && s_Limit         != "") ? Integer.parseInt(s_Limit)  : 100;
        orderByColumn   = (orderByColumn   != null && orderByColumn   != "") ? orderByColumn              : "sl_no";


        String doc_id        = request.getParameter("doc_id");
        String cust_number   = request.getParameter("cust_number");
        String invoice_id    = request.getParameter("invoice_id");
        String buisness_year = request.getParameter("buisness_year");
        
        try {
            data = dataReader.getDataSearch(offset, limit, orderByColumn, sortDesc, doc_id, cust_number, invoice_id, buisness_year);;
            data.put("code", 0);
            data.put("message", "Success. No error.");
        } catch (SQLException e) {
            // response.getWriter().println(e);
            e.printStackTrace();
            data.put("code", 1);
            data.put("message", e.toString());
        }

        Gson gson = new Gson();
        String respData = gson.toJson(data);

        // response.getWriter().append("Served at: ").append(request.getContextPath());
        response.setContentType("application/json");
        response.getWriter().print(respData);
    }
}
