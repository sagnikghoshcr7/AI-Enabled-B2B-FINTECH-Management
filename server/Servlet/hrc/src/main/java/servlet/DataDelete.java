package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

// import crud.Update;

@WebServlet("/api/delete")
public class DataDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // response.setContentType("text/html;charset=UTF-8");
		String[] slNo_Arr = request.getParameterValues("sl_no");

        HashMap<Object, Object> data = new HashMap<>();

        int rowUpdatedCount = 0;
        
        try {
        	rowUpdatedCount = crud.Delete.deleteData(slNo_Arr);
            data.put("code", 0);
            data.put("message", "Success. " + rowUpdatedCount + " row(s) updated.");
        } catch (NumberFormatException e) {
        	data.put("code", 1);
            data.put("message", e.toString());
    	} catch (SQLException e) {
            // response.getWriter().println(e);
            e.printStackTrace();
            data.put("code", 1);
            data.put("message", e.toString());
        }

        Gson gson = new Gson();
        String respData = gson.toJson(data);

        response.setContentType("application/json");
        response.getWriter().print(respData);
    }
}
