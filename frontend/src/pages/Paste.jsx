import { useRef, useState } from "react";
import "./Paste.css";

export function Paste() {
  const [error, setError] = useState();
  const [response, setResponse] = useState({});

  const contentRef = useRef();
  const maxLimitRef = useRef();
  const maxTimeMsRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResponse({});

    const content = contentRef.current.value.trim();
    const max_views = maxLimitRef.current.value;
    const ttl_seconds = maxTimeMsRef.current.value;

    if (!content) {
      return setError("Content should not be kept blank");
    }

    const paste = { content };

    if (max_views) {
      paste.max_views = Number(max_views);
    }

    if (ttl_seconds) {
      paste.ttl_seconds = Number(ttl_seconds);
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}/api/pastes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paste),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) =>
        setError(
          "Failed to create paste. Please retry or contact support if the issue persists."
        )
      );

    contentRef.current.value = "";
    maxLimitRef.current.value = "";
    maxTimeMsRef.current.value = "";
  }

  return (
    <div className="paste-container">
      <div className="paste-card">
        <h1>Create a Paste</h1>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <input
              id="content"
              placeholder="Write your content"
              ref={contentRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="max_views">Max Views</label>
            <input
              type="number"
              id="max_views"
              min={1}
              placeholder="Max view count"
              ref={maxLimitRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ttl_seconds">TTL (seconds)</label>
            <input
              type="number"
              id="ttl_seconds"
              min={1}
              placeholder="Expire time in seconds"
              ref={maxTimeMsRef}
            />
          </div>

          <button>Create Paste</button>
        </form>

        {Object.keys(response).length > 0 && (
          <div className="result">
            {response.error ? (
              <p className="error">Error: {response.error}</p>
            ) : (
              <>
                <p>
                  <strong>ID:</strong> {response.id}
                </p>
                <p>
                  <a
                    href={response.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {response.url}
                  </a>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
