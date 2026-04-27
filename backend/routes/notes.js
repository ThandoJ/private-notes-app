import express from "express";
import { supabase } from "../config/supabaseClient.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*");

  if (error) return res.status(400).json({ error });

  res.json(data);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content, user_id: req.user.id }]);

  if (error) return res.status(400).json({ error });

  res.json(data);
});

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error });

  res.json(data);
});

router.delete("/:id", async (req, res) => {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error });

  res.json({ message: "Deleted" });
});

export default router;