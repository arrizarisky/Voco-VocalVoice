const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const rawText = document.getElementById("rawText");
const resultText = document.getElementById("resultText");

let recognition;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "id-ID";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    rawText.value += event.results[0][0].transcript + " ";
  };
  recognition.onstart = () => {
    recordBtn.textContent = "🎙️ Sedang merekam...";
    recordBtn.classList.add("bg-red-600");
  };

  recognition.onend = () => {
    recordBtn.textContent = "🎙️ Rekam";
    recordBtn.classList.remove("bg-red-600");
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("Gagal merekam suara: " + event.error);
  };
} else {
  alert("Browser tidak mendukung Speech Recognition");
}

recordBtn.onclick = () => recognition.start();
stopBtn.onclick = () => recognition.stop();

generateBtn.onclick = async () => {
  const text = rawText.value.trim();
  if (!text) return alert("Tidak ada teks untuk diproses");

  generateBtn.disabled = true;
  generateBtn.textContent = "Memproses...";

  const response = await fetch("/api/paraphrase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  resultText.value = data.result || "Gagal memproses teks";

  generateBtn.disabled = false;
  generateBtn.textContent = "Parafrase Akademik";
};

copyBtn.onclick = () => {
  navigator.clipboard.writeText(resultText.value);
};

clearBtn.onclick = () => {
  rawText.value = "";
  resultText.value = "";
};
