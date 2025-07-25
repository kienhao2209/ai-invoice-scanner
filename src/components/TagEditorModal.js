import React, { useState } from "react";

function TagEditorModal({ invoice, onClose, onSave }) {
    const [tags] = useState(invoice.Tags || []);
    const [inputValue, setInputValue] = useState(tags.join(", "));

    const handleSave = async () => {
        const newTags = inputValue
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_UPDATE_TAGS_URL}/${invoice.InvoiceId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tags: newTags }),
                }
            );

            if (!res.ok)
                throw new Error(`Cập nhật tags thất bại: ${res.status}`);

            onSave(invoice.InvoiceId, newTags);
            onClose();
        } catch (err) {
            alert(`❌ Lỗi: ${err.message}`);
        }
    };

    return (
        <div style={modalBackdrop}>
            <div style={modalContent}>
                <h3>Chỉnh sửa Tags cho {invoice.InvoiceId}</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tags, cách nhau bởi dấu phẩy"
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                    }}
                />
                <div style={{ textAlign: "right" }}>
                    <button onClick={onClose} style={{ marginRight: "0.5rem" }}>
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            background: "#007bff",
                            color: "white",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}

const modalBackdrop = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalContent = {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "100%",
};

export default TagEditorModal;
