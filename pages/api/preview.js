export default function handler(req, res) {
  // Bail if no secret or slug defined
  if (req.query.secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || !req.query.type) {
    return res.status(401).json({ message: 'Invalid preview request' });
  }

  // Enable Preview Mode by setting the cookies and passing the sanity token for fetching
  res.setPreviewData(
    { token: process.env.SANITY_API_TOKEN },
    {
      maxAge: 20
    }
  );

  // Redirect to the associated page
  res.redirect(`/${req.query.type}/${req.query.slug}`);
}
