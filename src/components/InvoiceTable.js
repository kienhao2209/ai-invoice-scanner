import React, { useState } from "react";

function InvoiceTable({ invoices, onSelectInvoice }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Tính toán phân trang
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentInvoices = invoices.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const thStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#f2f2f2",
        textAlign: "center",
    };

    const tdStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "center",
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <h3>Danh sách hóa đơn ({invoices.length})</h3>
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
                        <th style={thStyle}>Due Date</th>
                        <th style={thStyle}>Total Amount</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((inv, idx) => (
                        <tr key={idx}>
                            <td style={tdStyle}>{inv.InvoiceId}</td>
                            <td style={tdStyle}>{inv.CustomerName}</td>
                            <td style={tdStyle}>{inv.InvoiceDate}</td>
                            <td style={tdStyle}>{inv.DueDate}</td>
                            <td style={tdStyle}>
                                {inv.TotalAmount} {inv.Currency}
                            </td>
                            <td style={tdStyle}>
                                <button
                                    onClick={() => onSelectInvoice(inv)}
                                    style={{
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
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

            {/* Điều khiển phân trang */}
            {totalPages > 1 && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        style={{ marginRight: "0.5rem" }}
                    >
                        Trước
                    </button>
                    <span>
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        style={{ marginLeft: "0.5rem" }}
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
}

export default InvoiceTable;
