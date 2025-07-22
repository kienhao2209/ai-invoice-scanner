import React, { useState } from "react";
import InvoiceDetails from "./InvoiceDetails";

function InvoiceLookup() {
    const [searchValue, setSearchValue] = useState("");
    const [invoiceData, setInvoiceData] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isInvoiceId = (value) => /^[A-Za-z0-9-]+$/.test(value.trim());

    const handleLookup = async () => {
        if (!searchValue.trim()) {
            setError("❌ Vui lòng nhập Invoice ID hoặc Tên Khách Hàng");
            return;
        }

        setLoading(true);
        setError("");
        setInvoiceData(null);
        setSelectedInvoice(null);

        const keyword = searchValue.trim();

        try {
            let url = process.env.REACT_APP_API_GET_URL;
            if (isInvoiceId(keyword)) {
                url += `/${encodeURIComponent(keyword)}`;
            } else {
                url += `?name=${encodeURIComponent(keyword)}`;
            }

            const res = await fetch(url, { method: "GET" });
            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg || "Không tìm thấy hóa đơn");
            }

            const data = await res.json();
            setInvoiceData(data);
        } catch (err) {
            setError(`❌ Lỗi: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderTable = (invoices) => {
        if (!Array.isArray(invoices)) {
            invoices = [invoices];
        }

        return (
            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "1rem",
                    cursor: "pointer",
                }}
            >
                <thead>
                    <tr>
                        <th style={thStyle}>Invoice ID</th>
                        <th style={thStyle}>Customer Name</th>
                        <th style={thStyle}>Invoice Date</th>
                        <th style={thStyle}>Due Date</th>
                        <th style={thStyle}>Total Amount</th>
                        <th style={thStyle}>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((inv, index) => (
                        <tr
                            key={index}
                            onClick={() => setSelectedInvoice(inv)}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <td style={tdStyle}>{inv.InvoiceId}</td>
                            <td style={tdStyle}>{inv.CustomerName}</td>
                            <td style={tdStyle}>{inv.InvoiceDate}</td>
                            <td style={tdStyle}>{inv.DueDate}</td>
                            <td style={tdStyle}>{inv.TotalAmount}</td>
                            <td style={tdStyle}>{inv.Currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const thStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#f2f2f2",
    };
    const tdStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "center",
    };

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginTop: "1rem",
                borderRadius: "8px",
                textAlign: "center",
            }}
        >
            <h2>🔍 Tra cứu Hóa Đơn</h2>
            <input
                type="text"
                placeholder="Nhập Invoice ID hoặc Tên Khách Hàng"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={loading}
                style={{
                    marginRight: "0.5rem",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "60%",
                    maxWidth: "400px",
                }}
            />
            <button
                onClick={handleLookup}
                disabled={loading}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                {loading ? "Đang tra cứu..." : "Tra cứu"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {invoiceData && !selectedInvoice && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <h3 style={{ textAlign: "left" }}>Kết quả tra cứu</h3>
                    {renderTable(invoiceData)}
                </div>
            )}

            {selectedInvoice && (
                <InvoiceDetails
                    invoice={selectedInvoice}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}
        </div>
    );
}

export default InvoiceLookup;
