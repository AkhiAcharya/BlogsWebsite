import { deleteBlog, getBlogposts, getCommentsForBlog, getDocumentById, postComment } from "@/firebase"
import Head from "next/head";
import styles from '@/styles/blogdetails.module.css'
import { useState } from "react"
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '/contexts/authContext';
import Link from "next/link";
import url from "@/url";


export async function getStaticPaths() {
    const response = await fetch(url+'/api/get/getallblogs');

    const { blogposts } = await response.json();
    const allPaths = blogposts.map((path) => {
        return {
          params: {
            id: path.id.toString()
          },
        };
      });
    return {
        paths: allPaths,
        fallback: false,
    };
};

export async function getStaticProps(context) {
    const id = context.params.id;
    let BlogData;
    let BlogComments;
    
    const response = await fetch( url + `/api/get/getblog?id=${id}`);
    const { blog } = await response.json();
    BlogData = blog;

    const responseComments = await fetch(url + `/api/get/getcomments?id=${id}`);
    const { comments } = await responseComments.json();
    BlogComments = comments;

    return {
        props: { data: BlogData, comments: BlogComments, id: id}
    };
}

    
export default function BlogDetails({ data, comments, id }) {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/delete/deleteblog', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            router.push(`/blogs`)
      
        } catch(e){
            console.log('ERROR', e);
        }

        
    }

    const onSubmit2 = async (e) => {
        e.preventDefault();
        const AddComment = document.querySelector('.addComment')
        let author = AddComment.author.value
        let body = AddComment.body.value

        try {
            const response = await fetch('/api/post/postcomment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, author, body }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            AddComment.author.value = '';
            AddComment.body.value = '';
            router.push(`/blogs/${id}`)
      
        } catch(e){
            console.log('ERROR', e);
        }
    }
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <div className={styles.all}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Blog Details</h1>
                    <h2 className={styles.blogTitle}>{data.title}</h2>
                    <p className={styles.blogContent}>{data.body}</p>
                    <p className={styles.author}>Author: {data.author}</p>

                    {currentUser && currentUser.uid === data.uid && (
                        <button className={styles.deleteButton} onClick={onSubmit}>Delete Blog</button>
                    )}


                    {currentUser ? (
                        <div>
                            <form className={`${styles.commentForm} addComment`} onSubmit = {onSubmit2}>
                                <input name="author" type="text" placeholder="Author name" />
                                <textarea name="body" cols="120" rows="5" placeholder="Leave a comment..." required></textarea>
                                <button type="submit">Publish</button>
                            </form>
                        </div>
                    ) : (
                        <div className={styles.loginPrompt}>
                            <p className={styles.loginMessage}>Please sign in to comment!</p>
                            <Link href="/login" className={styles.loginButton}>Login</Link>
                        </div>
                    )}


                    <h2 className={styles.commentsTitle}>Comments</h2>
                    {comments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <h3 className={styles.commentAuthor}>{comment.author}</h3>
                            <p className={styles.commentBody}>{comment.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
