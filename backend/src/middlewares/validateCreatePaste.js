export const validateCreatePaste = (req, res, next) => {
  
  if (!req.body || !Object.keys(req.body).length) {
    return res.status(400).json({ error: "Request body should not be empty" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  const errors = [];

  if (typeof content !== "string" || !content.trim()) {
    errors.push("content must be non empty string");
  }

  if (ttl_seconds !== undefined)  {
    if (!(Number.isInteger(ttl_seconds) && ttl_seconds >= 1)) {
      errors.push("ttl_seconds must be an integer ≥ 1");
    }
  }

  if (max_views !== undefined) {
    if (!(Number.isInteger(max_views) && max_views >= 1)) {
      errors.push("max_views must be an integer ≥ 1");
    }
  }

  if (errors.length) {
    return res.status(400).json({ error: errors[0] });
  }

  next();
};
