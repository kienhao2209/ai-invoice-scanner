import React, { useEffect, useState } from "react";
import InvoiceDetails from "./InvoiceDetails";
import TagEditorModal from "./TagEditorModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import mockInvoices from "../mockData/invoices"; // import mock data

function AllInvoices({ filterTag }) {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Modal chỉnh sửa tags
    const [editingInvoice, setEditingInvoice] = useState(null);

    // Tìm kiếm, lọc và sắp xếp
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortField, setSortField] = useState("InvoiceDate");
    const [sortOrder, setSortOrder] = useState("desc");

    // Lọc theo tag trong component
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(filterTag || "");

    // ---------- Thêm đoạn mã mới 7:40 (23/07) ----------
    const [starredInvoices, setStarredInvoices] = useState(
        JSON.parse(localStorage.getItem("starredInvoices") || "[]")
    );

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // API thật
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_GET_URL}`,
                    { method: "GET" }
                );
                if (!res.ok) throw new Error(`Lỗi server: ${res.status}`);
                const data = await res.json();
                setInvoices(data);

                // Cập nhật tags có sẵn
                const allTags = data.flatMap((inv) => inv.Tags || []);
                setAvailableTags([...new Set(allTags)]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    // MockData
    useEffect(() => {
        try {
            setInvoices(mockInvoices);

            const allTags = mockInvoices.flatMap((inv) => inv.Tags || []);
            setAvailableTags([...new Set(allTags)]);
        } catch (err) {
            setError("Không thể tải dữ liệu mock");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let result = invoices;

        const tagToFilter = selectedTag || filterTag;
        if (tagToFilter) {
            result = result.filter((inv) => inv.Tags?.includes(tagToFilter));
        }

        result = result.filter(
            (inv) =>
                inv.CustomerName?.toLowerCase().includes(
                    searchTerm.toLowerCase()
                ) ||
                inv.InvoiceId?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (startDate) {
            result = result.filter(
                (inv) => new Date(inv.InvoiceDate) >= new Date(startDate)
            );
        }
        if (endDate) {
            result = result.filter(
                (inv) => new Date(inv.InvoiceDate) <= new Date(endDate)
            );
        }

        result = result.sort((a, b) => {
            const fieldA =
                sortField === "TotalAmount"
                    ? parseFloat(a.TotalAmount)
                    : new Date(a.InvoiceDate);
            const fieldB =
                sortField === "TotalAmount"
                    ? parseFloat(b.TotalAmount)
                    : new Date(b.InvoiceDate);
            if (sortOrder === "asc") return fieldA > fieldB ? 1 : -1;
            return fieldA < fieldB ? 1 : -1;
        });

        setFilteredInvoices(result);
        setCurrentPage(1);
    }, [
        searchTerm,
        startDate,
        endDate,
        sortField,
        sortOrder,
        invoices,
        filterTag,
        selectedTag,
    ]);

    // ---------- Thêm đoạn mã mới 7:40 (23/07) ----------
    useEffect(() => {
        localStorage.setItem(
            "starredInvoices",
            JSON.stringify(starredInvoices)
        );
    }, [starredInvoices]);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredInvoices);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Invoices");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(data, "Invoices.xlsx");
    };

    const handleTagsUpdated = (invoiceId, newTags) => {
        const updated = invoices.map((inv) =>
            inv.InvoiceId === invoiceId ? { ...inv, Tags: newTags } : inv
        );
        setInvoices(updated);

        const allTags = updated.flatMap((inv) => inv.Tags || []);
        setAvailableTags([...new Set(allTags)]);
    };

    // ---------- Thêm đoạn mã mới 7:40 (23/07) ----------
    const toggleStar = (invoiceId) => {
        setStarredInvoices((prev) =>
            prev.includes(invoiceId)
                ? prev.filter((id) => id !== invoiceId)
                : [...prev, invoiceId]
        );
    };

    if (loading) return <p>⏳ Đang tải danh sách hóa đơn...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = filteredInvoices.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    return (
        <div>
            <h2>
                📜 Tất cả hóa đơn{" "}
                {selectedTag || filterTag
                    ? `(Tag: ${selectedTag || filterTag})`
                    : ""}
            </h2>

            {/* Bộ lọc */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <input
                    type="text"
                    placeholder="Tìm theo tên khách hàng hoặc Invoice ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        flex: "1 1 250px",
                    }}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <option value="InvoiceDate">Sắp xếp theo Ngày</option>
                    <option value="TotalAmount">Sắp xếp theo Tổng tiền</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <option value="desc">Giảm dần</option>
                    <option value="asc">Tăng dần</option>
                </select>

                {/* Lọc theo Tag */}
                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <option value="">-- Lọc theo Tag --</option>
                    {availableTags.map((tag, idx) => (
                        <option key={idx} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
                {selectedTag && (
                    <button
                        onClick={() => setSelectedTag("")}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Xóa lọc
                    </button>
                )}

                <button
                    onClick={exportToExcel}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    ⬇ Xuất Excel
                </button>
            </div>

            {/* Bảng dữ liệu */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "1rem",
                }}
            >
                <thead>
                    <tr>
                        {/* ---------- Thêm đoạn mã mới 7:40 (23/07) ---------- */}
                        <th style={thStyle}>⭐</th>

                        <th style={thStyle}>Invoice ID</th>
                        <th style={thStyle}>Customer Name</th>
                        <th style={thStyle}>Invoice Date</th>
                        <th style={thStyle}>Total</th>
                        <th style={thStyle}>Tags</th>
                        <th style={thStyle}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((invoice) => (
                        <tr key={invoice.InvoiceId}>
                            {/* ---------- Thêm đoạn mã mới 7:40 (23/07) ---------- */}
                            <td style={tdStyle}>
                                <span
                                    onClick={() =>
                                        toggleStar(invoice.InvoiceId)
                                    }
                                    style={{
                                        cursor: "pointer",
                                        color: starredInvoices.includes(
                                            invoice.InvoiceId
                                        )
                                            ? "gold"
                                            : "#ccc",
                                    }}
                                >
                                    ★
                                </span>
                            </td>

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
                                    onClick={() => setSelectedInvoice(invoice)}
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
                                <button
                                    onClick={() => setEditingInvoice(invoice)}
                                    style={{
                                        background: "#ffc107",
                                        color: "black",
                                        border: "none",
                                        padding: "0.3rem 0.6rem",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginLeft: "4px",
                                    }}
                                >
                                    Chỉnh sửa Tags
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div style={{ marginTop: "1rem" }}>
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
                            onClick={() => setCurrentPage(idx + 1)}
                            style={{
                                marginRight: "0.5rem",
                                padding: "0.4rem 0.8rem",
                                background:
                                    currentPage === idx + 1
                                        ? "#007bff"
                                        : "#e0e0e0",
                                color:
                                    currentPage === idx + 1 ? "white" : "black",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}

            {editingInvoice && (
                <TagEditorModal
                    invoice={editingInvoice}
                    onClose={() => setEditingInvoice(null)}
                    onSave={handleTagsUpdated}
                />
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

export default AllInvoices;
