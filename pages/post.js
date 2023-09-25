import Image from 'next/image'
import { useEffect, useState} from 'react';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import { useRouter } from 'next/router';
import styles from '@/styles/post.module.css'
import Head from 'next/head';

export default function Post() {
  const [message, setMessage] = useState('');
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      console.log("signed in!");
    } else if (currentUser == null) {
      router.push("/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const AddUser = document.querySelector('.create')
    let author = AddUser.author.value
    let title = AddUser.title.value
    let body = AddUser.body.value
    let uid = currentUser.uid
    
    try {
      const response = await fetch('/api/post/postblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, title, body, uid}),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      AddUser.author.value = '';
      AddUser.title.value = '';
      AddUser.body.value = '';
      setTimeout(() => {
        setMessage('');
      }, 2000);

    } catch(e){
      console.log('ERROR', e);
    }
  }
  
  

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <div className={styles.all}>
        <div className={styles.container}>
          <h1 className={styles.title}>Create a blog</h1>
          <form className={`${styles.createForm} create`} onSubmit = {onSubmit}>
            <label htmlFor="author" className={styles.label}>Name:</label>
            <input type="text" name="author" placeholder="Enter your name" className={styles.input} required/>
            <label htmlFor="title" className={styles.label}>Title:</label>
            <input type="text" name="title" placeholder="Enter the title" className={styles.input} required/>
            <label htmlFor="body" className={styles.label}>Blog-body:</label>
            <textarea name="body" cols="120" rows="10" placeholder="Enter your blog-body" className={styles.textarea} required></textarea>
            <button type="submit" className={styles.submitButton}>Submit</button>
            <p className={styles.message}>{message}</p>
          </form>
        </div>
      </div>
    </>
  );
};

