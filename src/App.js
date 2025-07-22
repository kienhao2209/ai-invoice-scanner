import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadForm from "./components/UploadForm";
import InvoiceLookup from "./components/InvoiceLookup";
import AllInvoices from "./components/AllInvoices";
import React, { useState } from "react";

function App({ signOut, user }) {
    const [activePage, setActivePage] = useState("upload"); // 'upload', 'lookup', 'all'

    return (
        <div
            className="App"
            style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}
        >
            <h1>AI Invoice Scanner</h1>
            <p>👤 Xin chào, {user.username}</p>
            <button onClick={signOut}>Đăng xuất</button>

            <nav style={{ margin: "1rem 0" }}>
                <button
                    onClick={() => setActivePage("upload")}
                    style={{
                        marginRight: "1rem",
                        background:
                            activePage === "upload" ? "#007bff" : "#e0e0e0",
                        color: activePage === "upload" ? "white" : "black",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Upload hóa đơn
                </button>
                <button
                    onClick={() => setActivePage("lookup")}
                    style={{
                        marginRight: "1rem",
                        background:
                            activePage === "lookup" ? "#007bff" : "#e0e0e0",
                        color: activePage === "lookup" ? "white" : "black",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Tra cứu hóa đơn
                </button>
                <button
                    onClick={() => setActivePage("all")}
                    style={{
                        background:
                            activePage === "all" ? "#007bff" : "#e0e0e0",
                        color: activePage === "all" ? "white" : "black",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Xem tất cả hóa đơn
                </button>
            </nav>

            {activePage === "upload" && <UploadForm />}
            {activePage === "lookup" && <InvoiceLookup />}
            {activePage === "all" && <AllInvoices />}
        </div>
    );
}

export default withAuthenticator(App);
