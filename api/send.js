import { token, chat_id } from "./config";

export default async function handler(req, res) {
  // hanya izinkan POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { provinsi, nama, hp } = req.body;

    // validasi
    if (!provinsi || !nama || !hp) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    // bersihkan nomor
    const nohp = String(hp).replace(/[^0-9]/g, "");

    // format pesan
    const text =
      "DATA MASUK\n\n" +
      "Provinsi: " + provinsi + "\n" +
      "Nama: " + nama + "\n" +
      "No HP: +62" + nohp;

    // kirim ke Telegram
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
      }),
    });

    return res.status(200).json({ status: "success" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
