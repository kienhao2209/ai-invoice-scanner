import React from "react";
import {
    FaCloudUploadAlt,
    FaSearch,
    FaListUl,
    FaTags,
    FaStar,
} from "react-icons/fa";

function Navigation({ activePage, setActivePage }) {
    const navItems = [
        { id: "upload", label: "Upload hóa đơn", icon: <FaCloudUploadAlt /> },
        { id: "lookup", label: "Tra cứu hóa đơn", icon: <FaSearch /> },
        { id: "all", label: "Xem tất cả hóa đơn", icon: <FaListUl /> },
        { id: "starred", label: "Hóa đơn quan trọng", icon: <FaStar /> }, // mới thêm
        { id: "categories", label: "Danh mục hóa đơn", icon: <FaTags /> },
    ];

    return (
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background:
                            activePage === item.id ? "white" : "transparent",
                        color: activePage === item.id ? "#0d6efd" : "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.3s ease",
                    }}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </nav>
    );
}

export default Navigation;
