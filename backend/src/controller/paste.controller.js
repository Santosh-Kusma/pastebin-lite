import { pasteService } from "../service/paste.service.js";
import { renderErrorHTML, renderPasteHTML } from "../utils/pastePage.js";
import { nowForExpiry } from "../utils/time.js";

const { addPaste, fetchPaste } = pasteService;

export const pasteController = {
  // Health check endpoint to verify service availability
  healthCheck(req, res, next) {
    console.log(req);
    res.status(200).json({ ok: true });
  },

  // Creates a new paste with optional expiry time and max view count
  async createPaste(req, res, next) {
    let { content, ttl_seconds, max_views } = req.body;

    if (!ttl_seconds) {
      // Default - No expiry
      ttl_seconds = null;
    } else {
      // Use deterministic time when running in test mode
      const now = nowForExpiry(req);

      // Convert TTL from seconds to absolute expiry timestamp (ms)
      ttl_seconds = now + ttl_seconds * 1000;
    }

    if (!max_views) {
      // Default - Unlimited views
      max_views = null;
    }

    // Build absolute base URL for paste link
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const { id, url } = await addPaste(
      { content, ttl_seconds, max_views },
      baseUrl
    );

    return res.status(201).json({ id, url });
  },

  // API endpoint to fetch paste content as JSON
  async getPaste(req, res, next) {
    if (!req.params.id) {
      return res.status(400).json("Id param is missing");
    }

    const now = nowForExpiry(req);

    const paste = await fetchPaste(req.params.id, now);

    if (!paste) {
      return res.status(404).json({ error: "Paste not found or expired" });
    }

    const { content, max_views, ttl_seconds } = paste;

    return res.status(200).json({
      content: content,
      remaining_views: max_views,
      expires_at: ttl_seconds ? new Date(ttl_seconds) : null,
    });
  },

  // Web endpoint to render paste as HTML
  async viewPaste(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json("Id param is missing");
      }

      const now = nowForExpiry(req);

      const paste = await fetchPaste(req.params.id, now);

      if (!paste) {
        return res
          .status(404)
          .send(renderErrorHTML("Paste not found or expired"));
      }

      return res.status(200).send(renderPasteHTML(paste));
    } catch (err) {
      return res.status(404).send(renderErrorHTML(err.message));
    }
  },
};
