import React from "react";

function InvoiceDetails({ invoice }) {
    if (!invoice) return null;

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                marginTop: "1rem",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "left",
            }}
        >
            <h2 style={{ marginBottom: "1rem" }}>Chi tiết Hóa đơn</h2>

            <section style={{ marginBottom: "1.5rem" }}>
                <p>
                    <strong>Invoice ID:</strong> {invoice.InvoiceId}
                </p>
                <p>
                    <strong>Customer Name:</strong> {invoice.CustomerName}
                </p>
                <p>
                    <strong>Invoice Date:</strong> {invoice.InvoiceDate}
                </p>
                <p>
                    <strong>Due Date:</strong> {invoice.DueDate}
                </p>
                <p>
                    <strong>Total Amount:</strong> {invoice.TotalAmount}{" "}
                    {invoice.Currency}
                </p>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <h3>🏢 Company</h3>
                <p>{invoice.Company?.Name}</p>
                <p>{invoice.Company?.Address}</p>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <h3>📄 Bill To</h3>
                <p>{invoice.BillTo?.Name}</p>
                <p>{invoice.BillTo?.Address}</p>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <h3>🚚 Ship To</h3>
                <p>{invoice.ShipTo?.Name}</p>
                <p>{invoice.ShipTo?.Address}</p>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <h3>🧾 Items</h3>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "0.5rem",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Quantity</th>
                            <th style={thStyle}>Unit Price</th>
                            <th style={thStyle}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.Items?.map((item, idx) => (
                            <tr key={idx}>
                                <td style={tdStyle}>{item.Description}</td>
                                <td style={tdStyle}>{item.Quantity}</td>
                                <td style={tdStyle}>{item.UnitPrice}</td>
                                <td style={tdStyle}>{item.Amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
                <h3>Thuế</h3>
                <p>Tỷ lệ: {invoice.Tax?.Rate}%</p>
                <p>Số tiền: {invoice.Tax?.Amount}</p>
            </section>

            <section>
                <h3>Điều khoản thanh toán</h3>
                <p>
                    Thanh toán trong vòng: {invoice.PaymentTerms?.DueWithinDays}{" "}
                    ngày
                </p>
                <p>Thanh toán cho: {invoice.PaymentTerms?.PayableTo}</p>
            </section>
        </div>
    );
}

const thStyle = {
    borderBottom: "2px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
    background: "#f8f9fa",
};

const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
};

export default InvoiceDetails;
