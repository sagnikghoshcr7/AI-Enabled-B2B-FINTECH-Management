package pojo;

import java.time.LocalDate;
// import java.util.LocalDateTime;   outdated
// import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
// import java.time.temporal.TemporalAccessor;

public class Invoice {
// Private Data Types
    private int             sl_no;                   // INT
    private String          business_code;           // VARCHAR(10),
    private String          business_name;           // VARCHAR(20),****
    private long            cust_number;         // INT,
    private String          name_customer;           // VARCHAR(50),****
    private LocalDate       clear_date;              // DATETIME,
    private int             business_year;           // YEAR,
    private String          doc_id;                  // VARCHAR(10),
    private LocalDate       posting_date;            // DATE,
    private LocalDate       document_create_date;     // DATE,
    private LocalDate       document_create_date1;    // DATE,
    private LocalDate       due_in_date;              // DATE,
    private String          invoice_currency;        // VARCHAR(5),
    private String          document_type;           // VARCHAR(5),
    private int             posting_id;              // INT,
    private String          area_business;           // VARCHAR(5),
    private double          total_open_amount;        // DOUBLE
    private LocalDate       baseline_create_date;     // DATE,
    private String          cust_payment_terms;   // VARCHAR(5),
    private long            invoice_id;              // INT,             
    private int             isOpen;                 // INT,             
    private String          aging_bucket
;            // VARCHAR(20),
    private String          predicted;              // VARCHAR(15),****
    private int             is_deleted;              // TINYINT(1),

// Static Data Types
    private static DateTimeFormatter stringCSVToDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    // private static DateTimeFormatter stringCSVToDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

// Getters
    public int             get_sl_no()                   {return this.sl_no;}
    public String          get_business_code()           {return this.business_code;}
    public String          get_business_name()           {return this.business_name;}
    public long            get_cust_number()             {return this.cust_number;}
    public String          get_name_customer()           {return this.name_customer;}
    public LocalDate       get_clear_date()              {return this.clear_date;}
    public int             get_business_year()           {return this.business_year;}
    public String          get_doc_id()                  {return this.doc_id;}
    public LocalDate       get_posting_date()            {return this.posting_date;}
    public LocalDate       get_document_create_date()    {return this.document_create_date;}
    public LocalDate       get_document_create_date1()   {return this.document_create_date1;}
    public LocalDate       get_due_in_date()             {return this.due_in_date;}
    public String          get_invoice_currency()        {return this.invoice_currency;}
    public String          get_document_type()           {return this.document_type;}
    public int             get_posting_id()              {return this.posting_id;}
    public String          get_area_business()           {return this.area_business;}
    public double          get_total_open_amount()       {return this.total_open_amount;}
    public LocalDate       get_baseline_create_date()    {return this.baseline_create_date;}
    public String          get_cust_payment_terms()      {return this.cust_payment_terms;}
    public long            get_invoice_id()              {return this.invoice_id;}
    public int             get_isOpen()                  {return this.isOpen;}
    public String          get_aging_bucket()            {return this.aging_bucket;}
    public String          get_predicted()               {return this.predicted;}
    public int             get_is_deleted()              {return this.is_deleted;}

// Setters
    public void  set_sl_no                   (int             sl_no                  )  {this.sl_no = sl_no;}
    public void  set_business_code           (String          business_code          )  {this.business_code = business_code;}
    public void  set_business_name           (String          business_name          )  {this.business_name = business_name;}
    public void  set_cust_number             (long            cust_number            )  {this.cust_number = cust_number;}
    public void  set_name_customer           (String          name_customer          )  {this.name_customer = name_customer;}
    public void  set_clear_date              (LocalDate       clear_date             )  {this.clear_date = clear_date;}
    public void  set_business_year           (int             business_year          )  {this.business_year = business_year;}
    public void  set_doc_id                  (String          doc_id                 )  {this.doc_id = doc_id;}
    public void  set_posting_date            (LocalDate       posting_date           )  {this.posting_date = posting_date;}
    public void  set_document_create_date    (LocalDate       document_create_date   )  {this.document_create_date = document_create_date;}
    public void  set_document_create_date1   (LocalDate       document_create_date1  )  {this.document_create_date1 = document_create_date1;}
    public void  set_due_in_date             (LocalDate       due_in_date            )  {this.due_in_date = due_in_date;}
    public void  set_invoice_currency        (String          invoice_currency       )  {this.invoice_currency = invoice_currency;}
    public void  set_document_type           (String          document_type          )  {this.document_type = document_type;}
    public void  set_posting_id              (int             posting_id             )  {this.posting_id = posting_id;}
    public void  set_area_business           (String          area_business          )  {this.area_business = area_business;}
    public void  set_total_open_amount       (double          total_open_amount      )  {this.total_open_amount = total_open_amount;}
    public void  set_baseline_create_date    (LocalDate       baseline_create_date   )  {this.baseline_create_date = baseline_create_date;}
    public void  set_cust_payment_terms      (String          cust_payment_terms     )  {this.cust_payment_terms = cust_payment_terms;}
    public void  set_invoice_id              (long            invoice_id             )  {this.invoice_id = invoice_id;}
    public void  set_isOpen                  (int             isOpen                 )  {this.isOpen = isOpen;}
    public void  set_aging_bucket            (String          aging_bucket           )  {this.aging_bucket = aging_bucket;}
    public void  set_predicted               (String          predicted              )  {this.predicted = predicted;}
    public void  set_is_deleted              (int             is_deleted             )  {this.is_deleted = is_deleted;}

    public String toString() {
        return String.format(
            "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n", 
            this.sl_no,
            this.business_code,
            this.business_name,
            this.cust_number,
            this.name_customer,
            this.clear_date,
            this.business_year,
            this.doc_id,
            this.posting_date,
            this.document_create_date,
            this.document_create_date1,
            this.due_in_date,
            this.invoice_currency,
            this.document_type,
            this.posting_id,
            this.area_business,
            this.total_open_amount,
            this.baseline_create_date,
            this.cust_payment_terms,
            this.invoice_id,
            this.isOpen,
            this.aging_bucket,
            this.predicted,
            this.is_deleted
        );
    }

    private static LocalDate stringtoDate(String dateString) {
        return LocalDate.parse(dateString.substring(0, 10) , stringCSVToDateFormatter);
    }

    // private static LocalDateTime stringtoDateTime(String dateTimeString) {
    //     return LocalDateTime.parse(dateTimeString.substring(0, 19) , stringCSVToDateTimeFormatter);
    // }

    public void set_fromString (
        String sl_no,                
        String business_code,        
        String business_name,        
        String cust_number,      
        String name_customer,      
        String clear_date,           
        String business_year,        
        String doc_id,               
        String posting_date,         
        String document_create_date,  
        String document_create_date1, 
        String due_in_date,           
        String invoice_currency,     
        String document_type,        
        String posting_id,           
        String area_business,        
        String total_open_amount,     
        String baseline_create_date,  
        String cust_payment_terms,
        String invoice_id,           
        String isOpen,              
        String aging_bucket,
        String predicted,         
        String is_deleted           
    ) {
        int tInt;
        long tLong;
        double tDouble;

        this.sl_no                  = (int) Double.parseDouble(sl_no);
        this.business_code          = (business_code          == "" || business_code          == null) ? null : business_code;
        this.business_name          = (business_name          == "" || business_name          == null) ? null : business_name;
 
        tLong                       = (cust_number            == "" || cust_number            == null) ? 0L   : (long) Double.parseDouble(cust_number);
         
        this.cust_number            = tLong;
        this.name_customer          = (name_customer          == "" || name_customer          == null) ? null : name_customer;
        this.clear_date             = (clear_date             == "" || clear_date             == null) ? null : stringtoDate(clear_date);
         
        tInt                        = (business_year          == "" || business_year          == null) ? 0    : (int) Double.parseDouble(business_year);
 
        this.business_year          = tInt;
        this.doc_id                 = (doc_id                 == "" || doc_id                 == null) ? null : doc_id;
        this.posting_date           = (posting_date           == "" || posting_date           == null) ? null : stringtoDate(posting_date);
        this.document_create_date   = (document_create_date   == "" || document_create_date   == null) ? null : stringtoDate(document_create_date);
        this.document_create_date1  = (document_create_date1  == "" || document_create_date1  == null) ? null : stringtoDate(document_create_date1);
        this.due_in_date            = (due_in_date            == "" || due_in_date            == null) ? null : stringtoDate(due_in_date);
        this.invoice_currency       = (invoice_currency       == "" || invoice_currency       == null) ? null : invoice_currency;
        this.document_type          = (document_type          == "" || document_type          == null) ? null : document_type;

        tInt                        = (posting_id             == "" || posting_id             == null) ? 0    : (int) Double.parseDouble(posting_id);

        this.posting_id             = tInt;
        this.area_business          = (area_business          == "" || area_business          == null) ? null : area_business;

        tDouble                     = (total_open_amount      == "" || total_open_amount      == null) ? null : (double) Double.parseDouble(total_open_amount);

        this.total_open_amount      = tDouble;
        this.baseline_create_date   = (baseline_create_date   == "" || baseline_create_date   == null) ? null : stringtoDate(baseline_create_date);
        this.cust_payment_terms     = (cust_payment_terms     == "" || cust_payment_terms     == null) ? null : cust_payment_terms;
        
        tLong                       = (invoice_id             == "" || invoice_id             == null) ? 0L   : (long) Double.parseDouble(invoice_id);
        
        this.invoice_id             = tLong;
        
        tInt                        = (isOpen                 == "" || isOpen                 == null) ? 0    : (int) Double.parseDouble(isOpen);
        
        this.isOpen                 = tInt;
        this.aging_bucket           = (aging_bucket           == "" || aging_bucket           == null) ? null : aging_bucket
;
        this.predicted              = (predicted              == "" || predicted              == null) ? null : predicted;
        
        tInt                        = (is_deleted             == "" || is_deleted             == null) ? 0    : (int) Double.parseDouble(is_deleted);
        
        this.is_deleted             = tInt;
    }
}
