import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("STORE_ORDER_EMAIL") || Deno.env.get("STORE_ORDER_NOTIFICATIONS_EMAIL") || "irfanpinjari2153@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerEmail: string;
  customerName: string;
  orderDetails: {
    orderId: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    address: string;
    phone: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-order-email function invoked");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log("Request body received:", JSON.stringify(requestBody));
    
    const { customerEmail, customerName, orderDetails }: OrderEmailRequest = requestBody;

    const itemsList = orderDetails.items
      .map(
        (item) =>
          `<li>${item.name} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}</li>`
      )
      .join("");

    console.log("Sending customer email to:", customerEmail);
    
    // Send email to customer using Resend API
    const isTestEmail = customerEmail === ADMIN_EMAIL;
    let customerEmailResponse;
    
    if (!isTestEmail) {
      console.log("Note: To send emails to customers, verify your domain at resend.com/domains");
      const customerEmailPayload = {
        from: "Aromyst Essence <onboarding@resend.dev>",
        to: [customerEmail],
        subject: "Order Confirmation - Aromyst Essence",
        html: `
          <h1>Thank you for your order, ${customerName}!</h1>
          <p>Your order has been received and is being processed.</p>
          
          <h2>Order Details (ID: ${orderDetails.orderId})</h2>
          <ul>
            ${itemsList}
          </ul>
          
          <p><strong>Total: ₹${orderDetails.total}</strong></p>
          
          <h3>Delivery Information</h3>
          <p>Address: ${orderDetails.address}</p>
          <p>Phone: ${orderDetails.phone}</p>
          
          <p>Payment Method: Cash on Delivery</p>
          
          <p>We will notify you once your order is shipped.</p>
          
          <p>Best regards,<br>The Aromyst Essence Team</p>
        `,
      };

      const customerEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerEmailPayload),
      });

      customerEmailResponse = await customerEmailRes.json();
      console.log("Customer email sent successfully:", customerEmailResponse);
    } else {
      console.log("Skipping customer email - same as admin email");
    }

    console.log("Sending admin email to:", ADMIN_EMAIL);
    
    // Send email to admin using Resend API
    const adminEmailPayload = {
      from: "Aromyst Essence Orders <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `New Order Received - ${orderDetails.orderId}`,
      html: `
        <h1>New Order Received</h1>
        
        <h2>Customer Information</h2>
        <p>Name: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <p>Phone: ${orderDetails.phone}</p>
        
        <h2>Order Details (ID: ${orderDetails.orderId})</h2>
        <ul>
          ${itemsList}
        </ul>
        
        <p><strong>Total: ₹${orderDetails.total}</strong></p>
        
        <h3>Delivery Address</h3>
        <p>${orderDetails.address}</p>
        
        <p>Payment Method: Cash on Delivery</p>
      `,
    };

    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminEmailPayload),
    });

    const adminEmailResponse = await adminEmailRes.json();
    console.log("Admin email sent successfully:", adminEmailResponse);

    console.log("Both emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailId: customerEmailResponse?.id,
        adminEmailId: adminEmailResponse?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
