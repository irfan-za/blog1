/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="light-glass shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Blog terkait' : 'Blog terbaru'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 h-16 rounded-full relative">
            <Image
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              quality={100}
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-xs mb-0">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} key={index}><a className="text-sm md:text-base lg:text-sm overflow-hidden line-clamp-2 text-ellipsis block max-w-1 sm:max-w-2 md:max-w-3 lg:max-w-4">{post.title}</a></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
