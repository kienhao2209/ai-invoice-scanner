import React from "react";

function InvoiceDetails({ invoice, onClose }) {
    if (!invoice) return null;

    return (
        <div
            style={{
                border: "1px solid #aaa",
                borderRadius: "8px",
                padding: "1rem",
                marginTop: "1rem",
                backgroundColor: "#fafafa",
            }}
        >
            <button
                onClick={onClose}
                style={{
                    float: "right",
                    backgroundColor: "#ff5c5c",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                }}
            >
                Đóng
            </button>
            <h3>Chi tiết Hóa đơn</h3>

            {/* Thông tin hóa đơn căn trái */}
            <div style={{ textAlign: "left" }}>
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

                <h4>🏢 Company</h4>
                <p>{invoice.Company?.Name}</p>
                <p>{invoice.Company?.Address}</p>

                <h4>📄 Bill To</h4>
                <p>{invoice.BillTo?.Name}</p>
                <p>{invoice.BillTo?.Address}</p>

                <h4>🚚 Ship To</h4>
                <p>{invoice.ShipTo?.Name}</p>
                <p>{invoice.ShipTo?.Address}</p>
            </div>

            <h4>🧾 Items</h4>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "1rem",
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

            <div style={{ textAlign: "left" }}>
                <h4>Thuế</h4>
                <p>Tỷ lệ: {invoice.Tax?.Rate}%</p>
                <p>Số tiền: {invoice.Tax?.Amount}</p>

                <h4>Điều khoản thanh toán</h4>
                <p>
                    Thanh toán trong vòng: {invoice.PaymentTerms?.DueWithinDays}{" "}
                    ngày
                </p>
                <p>Thanh toán cho: {invoice.PaymentTerms?.PayableTo}</p>
            </div>
        </div>
    );
}

const thStyle = {
    border: "1px solid #ccc",
    padding: "6px",
    backgroundColor: "#f2f2f2",
};
const tdStyle = {
    border: "1px solid #ccc",
    padding: "6px",
    textAlign: "center",
};

export default InvoiceDetails;
