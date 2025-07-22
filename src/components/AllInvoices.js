import React, { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import InvoiceDetails from "./InvoiceDetails";

function AllInvoices() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_GET_URL}`,
                    { method: "GET" }
                );
                if (!res.ok) {
                    throw new Error(`Lỗi server: ${res.status}`);
                }
                const data = await res.json();
                setInvoices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) return <p>⏳ Đang tải danh sách hóa đơn...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    if (selectedInvoice) {
        return (
            <div>
                <button onClick={() => setSelectedInvoice(null)}>
                    ⬅ Quay lại danh sách
                </button>
                <InvoiceDetails invoice={selectedInvoice} />
            </div>
        );
    }

    return (
        <div>
            <h2>📜 Tất cả hóa đơn</h2>
            <InvoiceTable
                invoices={invoices}
                onSelectInvoice={setSelectedInvoice}
            />
        </div>
    );
}

export default AllInvoices;
