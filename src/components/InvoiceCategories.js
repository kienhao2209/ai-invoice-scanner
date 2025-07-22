import React, { useEffect, useState } from "react";

function InvoiceCategories({ onSelectCategory }) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_GET_URL}`,
                    {
                        method: "GET",
                    }
                );
                if (!res.ok) throw new Error(`Lỗi server: ${res.status}`);
                const data = await res.json();

                // Trích xuất tất cả tags
                const allTags = data.flatMap((inv) => inv.Tags || []);
                const uniqueTags = [...new Set(allTags)];
                setTags(uniqueTags);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    if (loading) return <p>⏳ Đang tải danh mục hóa đơn...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    if (tags.length === 0) {
        return <p>Không có danh mục (tags) nào được tìm thấy.</p>;
    }

    return (
        <div>
            <h2>📂 Danh mục hóa đơn</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tags.map((tag, idx) => (
                    <li key={idx}>
                        <button
                            onClick={() =>
                                onSelectCategory && onSelectCategory(tag)
                            }
                            style={{
                                backgroundColor: "#f8f9fa",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                padding: "0.5rem 1rem",
                                marginBottom: "0.5rem",
                                cursor: "pointer",
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            {tag}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InvoiceCategories;
