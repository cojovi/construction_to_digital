"use client";

/**
 * Explicit global error boundary.
 *
 * Next 16's built-in `/_global-error` fallback fails to prerender in this
 * project (TypeError: Cannot read properties of null (reading 'useContext')).
 * Providing our own overrides that default, fixes the export, and gives the
 * failure state the same instrument treatment as the rest of the site.
 *
 * Styling is inline because this component renders its own <html>/<body> and
 * must not depend on the app stylesheet having loaded.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#000",
          color: "#f4fafc",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: 520, width: "100%" }}>
          <p
            style={{
              margin: "0 0 18px",
              color: "#ff3d78",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            System fault
          </p>

          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            The instrument lost signal.
          </h1>

          <p
            style={{
              margin: "0 0 28px",
              color: "#93a7b3",
              fontSize: 14,
              lineHeight: 1.65,
            }}
          >
            An unrecoverable error interrupted this page. Nothing was submitted
            and no action was taken.
          </p>

          {error.digest && (
            <p
              style={{
                margin: "0 0 28px",
                color: "#566b78",
                fontSize: 11,
                letterSpacing: "0.14em",
              }}
            >
              REF / {error.digest}
            </p>
          )}

          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 48,
              border: "1px solid #16c8f4",
              background: "#16c8f4",
              color: "#00121a",
              padding: "13px 24px",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Re-establish link
          </button>
        </main>
      </body>
    </html>
  );
}
