import { UserSignout } from "@/firebase"
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import styles from '@/styles/profile.module.css'
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Head from "next/head";
import url from "@/url";

export default function profile({data}) {
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

    const filteredBlogposts = data.filter(post => post.uid === currentUser.uid);

    const onClick = async(e) => {
        await UserSignout();
    }

    return(
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className={styles.all}>
                <div className={styles.container}>
                    <h1 className={styles.header}>Profile Page</h1>
                    <p className={styles.welcomeText}>Welcome, {currentUser.email}</p>
                    
                    <h2 className={styles.blogsHeader}>My Blogs</h2>

                    {filteredBlogposts.map((blog) => (
                        <div key={blog.id} className={styles.blogCard}>
                            <Link href={'/blogs/' + blog.id}>
                                <div>
                                    <h3 className={styles.blogTitle}>{blog.title}</h3>
                                    <p className={styles.blogAuthor}>{blog.author}</p>
                                </div>
                            </Link>
                        </div>
                    ))}

                    <button onClick={onClick} className={styles.signoutButton}>Sign out</button>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() { 
    const response = await fetch(url + '/api/get/getallblogs');
    const { blogposts } = await response.json();
    return {
        props: {
            data: blogposts,
        }
    }
}
