import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertModal from "../components/ui/AlertModal";
import "./Share.css";
import "./ReadStory.css";

export default function WriteReply() {
  const { id } = useParams(); // Entry ID we are replying to
  const { user } = useAuth();
  const navigate = useNavigate();

  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onConfirm: null });
  const showAlert = (msg) =>
    setModal({ isOpen: true, message: msg, isConfirm: false });
  const showConfirm = (msg, action) =>
    setModal({
      isOpen: true,
      message: msg,
      isConfirm: true,
      onConfirm: action,
    });

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memory for original Entry
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch original entry so user can reference it while typing
  useEffect(() => {
    const fetchOriginalStory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/entries/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStory(data);
        }
      } catch (error) {
        console.error("Failed to fetch original signal:", error);
      }
    };
    fetchOriginalStory();
  }, [id]);

  const submitReply = async () => {
    if (!content.trim()) {
      showAlert("You cannot submit an empty reply.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          entryId: id,
          content: content.trim(),
        }),
      });

      if (response.ok) {
        // Drop back to the story they were just reading
        navigate(`/story/${id}`);
      } else {
        const data = await response.json();
        showAlert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      showAlert("The grid is currently unresponsive.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <main className="share-page">
      <div className="share-container">
        <header className="share-header">
          <h1 className="share-title">Send a response</h1>
          <h2 className="share-username">
            "<span className="username-text">@{user.username}</span>"
          </h2>
        </header>

        <div className="editor-wrapper">
          {/* No title input needed for replies, so me added padding-top to the textarea to balance it */}
          <textarea
            className="story-editor"
            placeholder="Type out your response..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck="false"
            style={{ paddingTop: "3rem" }}
          />
        </div>

        <div className="action-bar">
          <button
            className="icon-btn delete-btn"
            onClick={() => navigate(`/story/${id}`)}
            disabled={isSubmitting}
            aria-label="Cancel reply"
            title="Cancel reply"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>

          <div className="primary-actions">
            <button
              className="btn-outline"
              onClick={() => navigate(`/story/${id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className="btn-solid"
              onClick={submitReply}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Transmitting..." : "Send Reply"}
            </button>
          </div>
        </div>

        {/* --- ORIGINAL ENTRY REFERENCE --- */}
        {story && (
          <section className="original-reference" style={{ marginTop: "2rem" }}>
            {/* separator line */}
            <hr className="story-divider" style={{ marginBottom: "3rem" }} />

            <h3
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#abd6bd",
                fontSize: "0.95rem",
                marginBottom: "1.5rem",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Replying to:
            </h3>

            {/* We reuse the original-story class, but fade it slightly and shrink the fonts so it doesn't compete with the editor */}
            <article
              className="original-story"
              style={{ opacity: 0.95, marginBottom: "0" }}
            >
              <header className="story-header" style={{ marginBottom: "1rem" }}>
                {story.title && (
                  <h1 className="story-title" style={{ fontSize: "2rem" }}>
                    {story.title}
                  </h1>
                )}
                <h2 className="story-username" style={{ fontSize: "1.2rem" }}>
                  "
                  <span
                    className="username-text"
                    style={{ fontWeight: "bold", color: "#abd897" }}
                  >
                    @{story.username}
                  </span>
                  "
                </h2>
              </header>

              <div className="story-content">
                <p style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
                  {story.content}
                </p>
              </div>
            </article>
          </section>
        )}
      </div>
      <AlertModal
        isOpen={modal.isOpen}
        message={modal.message}
        isConfirm={modal.isConfirm}
        onConfirm={modal.onConfirm}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </main>
  );
}
