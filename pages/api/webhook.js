export default function handler(req, res) {
  console.log(">> modified");
  console.log(req.body?.head_commit?.modified);
  res.status(200).json({ name: "John Doe" });
}
