export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.body.token;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LdaqR8mAAAAAFxas0yUbjRD_eQDm__iVjonSeuB&response=${token}`,
      {
        method: "POST",
      }
    );

    res.status(200).json(await response.json());
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
