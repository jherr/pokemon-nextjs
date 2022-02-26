export default async function handler(req, res) {
  console.log(">> modified");
  console.log(req.body?.head_commit?.modified);

  for (const file of req.body?.head_commit?.modified ?? []) {
    if (file.includes("pokemon/")) {
      const path = `${file}on`;
      console.log(`Revalidating ${path}`);
      await res.unstable_revalidate(`${path}`);
    }
  }

  return res.json({ revalidated: true });
}
