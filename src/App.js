import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadForm from "./components/UploadForm";

function App({ signOut, user }) {
    return (
        <div className="App" style={{ padding: "2rem" }}>
            <h1>AI Invoice Scanner</h1>
            <p>👤 Xin chào, {user.username}</p>
            <button onClick={signOut}>Đăng xuất</button>

            {/* Component Upload */}
            <UploadForm />
        </div>
    );
}

export default withAuthenticator(App);
