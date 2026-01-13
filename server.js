// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ===== ES MODULE FIX =====
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ===== MIDDLEWARE =====
// app.use(cors());
// app.use(express.json());

// // ===== STATIC FRONTEND =====
// app.use(express.static(path.join(__dirname, "public")));

// // ===== GEMINI INIT =====
// if (!process.env.GEMINI_API_KEY) {
//   throw new Error("GEMINI_API_KEY is not set");
// }

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ===== API ROUTE =====
// app.post("/paraphrase", async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text || !text.trim()) {
//       return res.status(400).json({ error: "Text is required" });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const prompt = `
// Tugas kamu adalah MEMPARAFRASE teks berikut menjadi SATU KALIMAT
// bahasa Indonesia akademik formal.

// ATURAN WAJIB:
// - Hasil HARUS satu paragraf pendek (1 kalimat).
// - JANGAN memberikan beberapa opsi.
// - JANGAN memberikan penjelasan.
// - JANGAN menggunakan markdown, bullet point, atau simbol seperti *, **, -, atau _.
// - JANGAN menambahkan konteks baru.
// - HANYA kembalikan teks hasil parafrase.

// Teks:

// "${text}"
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response.text();

//     res.json({ result: response });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to process text" });
//   }
// });

// // ===== SPA FALLBACK =====
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ===== START SERVER =====
// app.listen(PORT, () => {
//   console.log(`VOCO running at http://localhost:${PORT}`);
// });
