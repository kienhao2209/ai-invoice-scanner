import React, { useState, useRef } from "react";

function UploadForm() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleUpload = async () => {
        if (!file) {
            setMessage("❌ Vui lòng chọn file trước khi upload.");
            return;
        }

        setLoading(true);
        setProgress(0);
        setMessage("⏳ Đang tải lên...");

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.split(",")[1];

            const payload = {
                file: base64String,
                filename: file.name,
            };

            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_UPLOAD_URL}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );

                const result = await res.json();
                if (res.ok) {
                    setMessage(
                        `✅ Upload thành công! Lưu tại: ${result.s3_path}`
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
                setProgress(100);
            }
        };

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setProgress(percent);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage("");
        setProgress(0);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setMessage("");
            setProgress(0);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "1.5rem",
                marginTop: "1rem",
                borderRadius: "8px",
                maxWidth: "100%",
                background: "#f9f9f9",
                textAlign: "center",
            }}
        >
            <h2>📤 Upload Hóa Đơn</h2>

            {/* Vùng kéo-thả */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
                style={{
                    border: dragActive
                        ? "2px dashed #007bff"
                        : "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "2rem",
                    cursor: "pointer",
                    backgroundColor: dragActive ? "#e9f5ff" : "#fdfdfd",
                    marginBottom: "1rem",
                }}
            >
                <p>
                    Kéo và thả file vào đây hoặc{" "}
                    <strong>bấm để chọn file</strong>
                </p>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                disabled={loading}
                style={{ display: "none" }}
            />

            {file && (
                <p>
                    File đã chọn: <strong>{file.name}</strong>
                </p>
            )}

            {loading && (
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                        marginBottom: "0.5rem",
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: "10px",
                            backgroundColor: "#4caf50",
                            borderRadius: "5px",
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Đang upload..." : "Tải lên"}
            </button>

            {message && (
                <p
                    style={{
                        marginTop: "1rem",
                        color: message.startsWith("✅") ? "green" : "red",
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
}

export default UploadForm;
