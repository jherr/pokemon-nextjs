export default function handler(req, res) {
  console.log(">> handler");
  console.log(req.body);
  console.log("<< handler");
  res.status(200).json({ name: "John Doe" });
}
