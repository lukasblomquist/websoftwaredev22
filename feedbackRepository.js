const kv = await Deno.openKv();

export async function getFeedbackCount(value) {
  const res = await kv.get(["feedbacks", value.toString()]);
  return res.value ?? 0;
}

export async function incrementFeedbackCount(value) {
  const key = ["feedbacks", value.toString()];
  const current = await getFeedbackCount(value);
  const updated = current + 1;
  await kv.set(key, updated);
  return updated;
}
