import { useState, useEffect } from 'react';
import { getClient } from '../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const colorMap = {
  'White': '#ffffff',
  'Light Gray': '#E9E9E9',
  'Yellow': '#FFD600',
  'Black': '#000000',
};

const urlFor = (source) => {
  return imageUrlBuilder(getClient()).image(source);
};

const PostPage = ({ postData }) => {
  const { title, excerpt, mainImage, backgroundColor } = postData;
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(colorMap[backgroundColor]);
  }, [backgroundColor]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <h1>{title}</h1>
      <p>{excerpt}</p>
      <img src={urlFor(mainImage).url()} alt={title} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const query = `*[slug.current == "${slug}"]{
    title,
    excerpt,
    mainImage,
    backgroundColor
  }`;

  const postData = await getClient().fetch(query);

  return {
    props: {
      postData: postData[0],
    },
  };
}

export default PostPage;



