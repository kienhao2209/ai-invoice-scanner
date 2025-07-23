import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadForm from "./components/UploadForm";
import InvoiceLookup from "./components/InvoiceLookup";
import AllInvoices from "./components/AllInvoices";
import Navigation from "./components/Navigation";
import React, { useState } from "react";
import InvoiceCategories from "./components/InvoiceCategories";

function App({ signOut, user }) {
    const [activePage, setActivePage] = useState("upload"); // 'upload', 'lookup', 'all', 'categories', 'starred'
    const [filterTag, setFilterTag] = useState(null); // tag để lọc trong AllInvoices

    const renderContent = () => {
        switch (activePage) {
            case "lookup":
                return <InvoiceLookup />;
            case "all":
                return <AllInvoices filterTag={filterTag} />;
            case "categories":
                return (
                    <InvoiceCategories
                        onSelectCategory={(tag) => {
                            setFilterTag(tag);
                            setActivePage("all");
                        }}
                    />
                );
            case "starred":
                return (
                    <AllInvoices
                        filterTag={null}
                        showStarredOnly={true} // mới thêm
                    />
                );
            default:
                return <UploadForm />;
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                fontFamily: "Segoe UI, sans-serif",
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: "240px",
                    background: "#0d6efd",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2rem 1rem",
                }}
            >
                <div>
                    <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
                        Invoice Scanner
                    </h2>
                    <Navigation
                        activePage={activePage}
                        setActivePage={(page) => {
                            // Khi quay lại AllInvoices từ menu, reset filterTag
                            if (page === "all") setFilterTag(null);
                            setActivePage(page);
                        }}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: "0.5rem" }}>👤 {user.username}</p>
                    <button
                        onClick={signOut}
                        style={{
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                        }}
                    >
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <header
                    style={{
                        background: "#f8f9fa",
                        padding: "1rem 2rem",
                        borderBottom: "1px solid #dee2e6",
                    }}
                >
                    <h3 style={{ margin: 0 }}>Dashboard</h3>
                </header>

                {/* Page content */}
                <main
                    style={{
                        flex: 1,
                        padding: "2rem",
                        background: "#f1f3f5",
                        overflowY: "auto",
                    }}
                >
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default withAuthenticator(App);
