import { NotFound } from "../core/apiError.js";
import { pasteRepository } from "../repository/paste.repository.js";
import { randomUUID } from "crypto";

const { set, get } = pasteRepository;
export const pasteService = {
  // Creates and stores a new paste
  async addPaste(paste, baseUrl) {
    // Generate a unique id
    const id = randomUUID();

    await set(paste, id);

    // Generate absolute paste URL
    const url = `${baseUrl}/p/${id}`;

    return { id, url };
  },

  // Fetches a paste and applies expiry and view-count rules
  async fetchPaste(id, now) {
    const paste = await get(id);

    if (!paste) {
      throw new NotFound("Missing paste");
    }

    // Expiry validation
    if (typeof paste.ttl_seconds === "number" && now >= paste.ttl_seconds) {
      throw new NotFound("Expired paste");
    }

    // View count validation and decrement
    if (typeof paste.max_views === "number") {
      if (paste.max_views <= 0) {
        throw new NotFound("View limit exceeded");
      }

      paste.max_views -= 1;
      await set(paste, id);
    }

    return paste;
  },
};
