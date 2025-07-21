import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadForm from "./components/UploadForm";
import InvoiceLookup from "./components/InvoiceLookup";

function App({ signOut, user }) {
    return (
        <div className="App" style={{ padding: "2rem" }}>
            <h1>AI Invoice Scanner</h1>
            <p>👤 Xin chào, {user.username}</p>
            <button onClick={signOut}>Đăng xuất</button>

            {/* Component Upload */}
            <UploadForm />

            {/* Component Tra cứu */}
            <InvoiceLookup />
        </div>
    );
}

export default withAuthenticator(App);
