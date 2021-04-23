export default function handler(req, res) {
  console.log(req.query);
  // Bail if no secret or slug defined
  if (req.query.token !== 'HULL' || !req.query.type) {
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
