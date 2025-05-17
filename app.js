import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { getFeedbackCount, incrementFeedbackCount } from "./feedbackRepository.js";

const app = new Hono();
app.use("/*", cors());

app.get("/", (c) => c.text("Hello world!"));

// Handler factory for GET and POST
function createFeedbackRoutes(value) {
  app.get(`/feedbacks/${value}`, async (c) => {
    const count = await getFeedbackCount(value);
    return c.json({ count });
  });

  app.post(`/feedbacks/${value}`, async (c) => {
    const count = await incrementFeedbackCount(value);
    return c.json({ count });
  });
}

// Create routes for feedbacks 1, 2, and 3
[1, 2, 3].forEach(createFeedbackRoutes);

export default app;
