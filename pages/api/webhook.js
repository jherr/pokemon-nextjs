export default async function handler(req, res) {
  console.log(">> modified");
  console.log(req.body?.head_commit?.modified);

  for (const file of req.body?.head_commit?.modified ?? []) {
    if (file.includes("pokemon/")) {
      const url = `/${file.replace(".json", "")}`;
      console.log(`Revalidating ${url}`);
      await res.unstable_revalidate(`${url}`);
    }
  }

  return res.json({ revalidated: true });
}
