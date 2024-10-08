import React, { Suspense } from 'react'
import styles from "./singlePost.module.css"
import Image from 'next/image'
import { getPost } from '@/lib/data';
import PostUser from '@/components/postUser/postUser';


export const generateMetadata = async ({params}) => {
    const {slug} = params;

    const post = await getPost(slug);

    return {
        title: post.title,
        description : post.desc
    }
}


const getSinglePost = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
    console.log('the res from slug api is' , res);
    
    if(!res.ok){
        throw new Error("Something went wrong");
    }

    return res.json();
}

async function SinglePostPage({params}) {


    const {slug} = params;
    console.log("the slug is", slug);

    // without api

    // const post = await getPost(slug);
    // console.log("the current post is", post);
    // console.log("the current post id is", post);

    //with api

    const post = await getSinglePost(slug);

    
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <Image className={styles.img} src={post.img} alt="" fill/>
        </div>
        <div className={styles.textContainer}>  
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.detail}>
                {post && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={post?.userId}/>
                    </Suspense>
                )}
                <div className={styles.detailText}>
                    <span className={styles.detailTitle}>Published</span>
                    <span className={styles.detailValue}>01.01.2024</span>
                </div>
            </div>
            <div className={styles.content}>
                {post.desc}

            </div>

        </div>
    </div>
  )
}

export default SinglePostPage