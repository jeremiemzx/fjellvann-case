/*import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Container>
      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}*/

import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, 'test')

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <section className="post">
        <div className="card" style={{ backgroundColor: post.backgroundColor }}>
          {post.mainImage && post.mainImage.imagePlacement === 'Left' && (
            <div className="card__cover">
              <Image
                src={urlForImage(post.mainImage).width(788).height(567).url()}
                height={567}
                width={788}
                alt=""
                className="full-width-height"
              />
            </div>
          )}
          <div className="card__container">
            <h3 className="card__title">{post.title}</h3>
            <h2 className="card__heading_title">{post.heading_title}</h2>
            <p className="card__excerpt">{post.excerpt}</p>

            <ul className="custom-list">
              {post.custom_list.map((item, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      listStyleType: 'none',
                      listStyleImage: `url(https://cdn.sanity.io/images/exl1743j/production/2a577ac5d1a6a8bfd445105d181d0466c25623f2-42x41.svg)`,
                      verticalAlign: 'middle',
                    }}
                  >
                    <span>{item.text}</span>
                  </li>
                )
              })}
            </ul>

            <div className="groupbutton">
              <a
                href={post.button1.link}
                target="_blank"
                rel="noopener noreferrer"
                className="custombutton1"
              >
                {post.button1.text}
              </a>
              <a
                href={post.button2.link}
                target="_blank"
                rel="noopener noreferrer"
                className="custombutton2"
              >
                {post.button2.text}
              </a>
            </div>
          </div>
          {post.mainImage && post.mainImage.imagePlacement === 'Right' && (
            <div className="card__cover">
              <Image
                src={urlForImage(post.mainImage).width(788).height(567).url()}
                height={567}
                width={788}
                alt=""
                className="full-width-height"
              />
            </div>
          )}
        </div>
      </section>
    </Container>
  )
}
