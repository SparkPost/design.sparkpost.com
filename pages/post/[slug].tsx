import { groq } from 'next-sanity';
import { getClient, usePreviewSubscription } from '@lib/sanity';
import { useRouter } from 'next/router';

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "slug": slug.current
}`;

const Post = ({ post, slug }) => {
  const router = useRouter();

  console.log(slug);
  const { data: postData } = usePreviewSubscription(query, {
    params: { slug: slug },
    initialData: post,
    enabled: true
  });

  if (!router.isFallback && !slug) {
    // Should render 404
    return <div>Error</div>;
  }

  if (!postData) {
    return <div>Could not load post</div>;
  }

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>By: {postData.name}</p>
    </article>
  );
};

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params;

  const post = await getClient(true).fetch(query, { slug });

  return {
    props: {
      preview,
      post,
      slug
    }
  };
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true
  };
}

export default Post;
