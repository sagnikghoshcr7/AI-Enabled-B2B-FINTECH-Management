package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import pojo.Invoice;

@WebServlet("/api/add")
public class DataAdd extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Invoice inv = new Invoice();

        HashMap<Object, Object> data = new HashMap<>();

        inv.set_fromString(
            "0",
            request.getParameter("business_code"),
            request.getParameter("business_name"),
            request.getParameter("cust_number"),
            request.getParameter("name_customer"),
            request.getParameter("clear_date"),
            request.getParameter("business_year"),
            request.getParameter("doc_id"),
            request.getParameter("posting_date"),
            request.getParameter("document_create_date"),
            request.getParameter("document_create_date1"),
            request.getParameter("due_in_date"),
            request.getParameter("invoice_currency"),
            request.getParameter("document_type"),
            request.getParameter("posting_id"),
            request.getParameter("area_business"),
            request.getParameter("total_open_amount"),
            request.getParameter("baseline_create_date"),
            request.getParameter("cust_payment_terms"),
            request.getParameter("invoice_id"),
            request.getParameter("isOpen"),
            request.getParameter("aging_bucket"),
            request.getParameter("predicted"),
            request.getParameter("is_deleted")
        );

        try {
            crud.Add.addData(inv);
            data.put("code", 0);
            data.put("message", "Success. No error.");
        } catch (java.sql.SQLIntegrityConstraintViolationException e) {
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
