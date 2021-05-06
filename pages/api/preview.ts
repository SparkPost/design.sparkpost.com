export default function handler(req, res) {
  const type = req.query?.type;
  const slug = req.query?.slug;
  const secret = req.query?.secret;

  // Bail if no secret or slug defined
  if (secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || !type) {
    return res.status(401).json({ message: 'Invalid preview request' });
  }

  // Enable Preview Mode by setting the cookies and passing the sanity token for fetching
  res.setPreviewData(
    { token: process.env.SANITY_API_TOKEN },
    {
      maxAge: 20
    }
  );

  res.redirect(`${slug}`);
}
