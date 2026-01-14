import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const text = req.body?.text;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Tugas kamu adalah MEMPARAFRASE teks berikut menjadi SATU KALIMAT
bahasa Indonesia akademik formal.

ATURAN WAJIB:
- Hasil HARUS satu kalimat.
- JANGAN memberikan beberapa opsi.
- JANGAN memberikan penjelasan.
- JANGAN menggunakan markdown atau simbol seperti *, **, -, atau _.
- JANGAN menambahkan konteks baru.
- HANYA kembalikan teks hasil parafrase.

Teks:
"${text}"
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    responseText = responseText.replace(/[*_`#>-]/g, "").trim();

    return res.status(200).json({ result: responseText });
  } catch (error) {
    console.error("Paraphrase error:", error);
    return res.status(500).json({ error: "Failed to process text" });
  }
}
