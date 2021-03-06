import React from 'react';
import Image from 'next/image';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.type === 'list-item') {
        // eslint-disable-next-line array-callback-return
        obj.children.map((item) => {
          // eslint-disable-next-line array-callback-return
          item.children.map((childItem, j) => {
            if (childItem.bold) {
              modifiedText = (<b key={j}>{childItem.text}</b>);
            } else {
              modifiedText = childItem.text;
            }
          });
        });
      }

      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-one':
        return <h3 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'heading-two':
        return <h4 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'heading-three':
        return <h3 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'heading-four':
        return <h4 key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'paragraph':
        return <p key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'bulleted-list':
        return <ul key={index}><li>{modifiedText.map((item, i) => <p key={i} className="mb-0">{item}</p>)}</li></ul>;
      case 'image':
        return (
          <Image
            key={index}
            src={obj.src}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md w-full h-60 lg:h-96 mb-6">
          <Image
            src={post.featuredImage.url}
            alt=""
            layout="fill"
            objectFit="cover"
            quality={100}
            className="shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <Image
                alt={post.author.name}
                src={post.author.photo.url}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
              />
              <p className="inline align-middle text-gray-700 ml-2 mb-0 font-medium">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle text-sm">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-lg md:text-2xl lg:text-3xl  font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetail;
