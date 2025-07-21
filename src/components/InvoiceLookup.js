import React, { useState } from "react";

function InvoiceLookup() {
    const [invoiceId, setInvoiceId] = useState("");
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log("GET URL:", process.env.REACT_APP_API_GET_URL);

    const handleLookup = async () => {
        if (!invoiceId.trim()) {
            setError("❌ Vui lòng nhập ID hóa đơn");
            return;
        }

        setLoading(true);
        setError("");
        setInvoiceData(null);

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_GET_URL}/${invoiceId}`,
                {
                    method: "GET",
                }
            );

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

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginTop: "1rem",
                borderRadius: "8px",
            }}
        >
            <h2>🔍 Tra cứu Hóa Đơn</h2>
            <input
                type="text"
                placeholder="Nhập Invoice ID"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                disabled={loading}
            />
            <button onClick={handleLookup} disabled={loading}>
                {loading ? "Đang tra cứu..." : "Tra cứu"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {invoiceData && (
                <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <h3>Thông tin hóa đơn</h3>
                    <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default InvoiceLookup;
