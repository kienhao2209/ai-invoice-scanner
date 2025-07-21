import React, { useState } from "react";

function UploadForm() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("API URL:", process.env.REACT_APP_API_UPLOAD_URL);

    const handleUpload = async () => {
        if (!file) {
            setMessage("❌ Vui lòng chọn file trước khi upload.");
            return;
        }

        setLoading(true);
        setMessage("⏳ Đang upload...");

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.split(",")[1]; // Loại bỏ phần data:image/png;base64,...

            const payload = {
                file: base64String,
                filename: file.name,
            };

            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_UPLOAD_URL}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );

                const result = await res.json();
                if (res.ok) {
                    setMessage(
                        `✅ Upload thành công! File lưu tại: ${result.s3_path}`
                    );
                } else {
                    setMessage(
                        `❌ Lỗi từ server: ${
                            result.error || "Không rõ nguyên nhân."
                        }`
                    );
                }
            } catch (err) {
                setMessage(`❌ Lỗi khi gọi API: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsDataURL(file); // Đọc file thành base64
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
            <h2>📤 Upload Hóa Đơn</h2>
            <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={loading}
            />
            <br />
            <br />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Đang upload..." : "Tải lên"}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default UploadForm;
