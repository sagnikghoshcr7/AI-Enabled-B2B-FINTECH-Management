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

@WebServlet("/api/update")
public class DataUpdate extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int slNo = 0;
        String s_SlNo = request.getParameter("sl_no");
        String invoiceCurrency = request.getParameter("invoice_currency");
        String customerPaymentTerms = request.getParameter("cust_payment_terms");
        
        HashMap<Object, Object> data = new HashMap<>();
        
        String errMsg = "Required parameter(s) not specified:";
        int errFlag = 0;

        if (s_SlNo == "" || s_SlNo == null) {
            errFlag = 1;
            errMsg +=  "  sl_no`";
        }
        if (invoiceCurrency == "" || invoiceCurrency == null) {
            errFlag = 1;
            errMsg +=  "  `invoice_currency`";
        }
        if (customerPaymentTerms == "" || customerPaymentTerms == null) {
            errFlag = 1;
            errMsg +=  "  `cust_payment_terms`";
        }

        if (errFlag == 1) {
            // errMsg += ".";
            data.put("code", 5);
            data.put("message", errMsg);
        } else {
            slNo = (int) Double.parseDouble(s_SlNo);
            try {
                crud.Update.updateData(slNo, invoiceCurrency, customerPaymentTerms);
                data.put("code", 0);
                data.put("message", "Success. No error.");
            } catch (SQLException e) {
                // response.getWriter().println(e);
                e.printStackTrace();
                data.put("code", 2);
                data.put("message", e.toString());
            }
        }

        Gson gson = new Gson();
        String respData = gson.toJson(data);

        response.setContentType("application/json");
        response.getWriter().print(respData);
    }
}
