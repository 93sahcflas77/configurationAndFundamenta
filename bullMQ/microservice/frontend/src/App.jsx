import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {emailPost} from "./store/emailSlice";

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const disPispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    disPispatch(emailPost({
      useremail: email,
      subject,
      test: text,
      // ctaLink: "http://localhost:7000/admin/queues/queue/emailQueue?status=completed",
      // appName: "BullMq App"
    }))

    setEmail("");
    setSubject("")
    setText("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333",
          }}
        >
          Send Email
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Recipients
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Message
          </label>

          <textarea
            rows={8}
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              resize: "none",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default App;