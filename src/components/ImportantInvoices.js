import React, { useEffect, useState } from "react";
import InvoiceDetails from "./InvoiceDetails";
import mockInvoices from "../mockData/invoices"; // sử dụng mock data

function ImportantInvoices() {
    const [starredInvoices, setStarredInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        const starredIds = JSON.parse(
            localStorage.getItem("starredInvoices") || "[]"
        );
        const filtered = mockInvoices.filter((inv) =>
            starredIds.includes(inv.InvoiceId)
        );
        setStarredInvoices(filtered);
    }, []);

    if (selectedInvoice) {
        return (
            <div>
                <button
                    onClick={() => setSelectedInvoice(null)}
                    style={{
                        background: "#007bff",
                        color: "white",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        marginBottom: "1rem",
                        cursor: "pointer",
                    }}
                >
                    ⬅ Quay lại danh sách
                </button>
                <InvoiceDetails invoice={selectedInvoice} />
            </div>
        );
    }

    return (
        <div>
            <h2>⭐ Hóa đơn quan trọng</h2>
            {starredInvoices.length === 0 ? (
                <p>Không có hóa đơn nào được đánh dấu quan trọng.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "1rem",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>Invoice ID</th>
                            <th style={thStyle}>Customer Name</th>
                            <th style={thStyle}>Invoice Date</th>
                            <th style={thStyle}>Total</th>
                            <th style={thStyle}>Tags</th>
                            <th style={thStyle}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {starredInvoices.map((invoice) => (
                            <tr key={invoice.InvoiceId}>
                                <td style={tdStyle}>{invoice.InvoiceId}</td>
                                <td style={tdStyle}>{invoice.CustomerName}</td>
                                <td style={tdStyle}>{invoice.InvoiceDate}</td>
                                <td style={tdStyle}>
                                    {invoice.TotalAmount} {invoice.Currency}
                                </td>
                                <td style={tdStyle}>
                                    {(invoice.Tags || []).join(", ")}
                                </td>
                                <td style={tdStyle}>
                                    <button
                                        onClick={() =>
                                            setSelectedInvoice(invoice)
                                        }
                                        style={{
                                            background: "#28a745",
                                            color: "white",
                                            border: "none",
                                            padding: "0.3rem 0.6rem",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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

export default ImportantInvoices;
