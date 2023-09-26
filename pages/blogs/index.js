import { getBlogposts } from "@/firebase";
import styles from '@/styles/blogs.module.css'
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import url from "@/url";

export default function Blogs({ data }) {

    const [displayedBlogs, setDisplayedBlogs] = useState(data);

    const onSubmit = async(e) => {
        e.preventDefault();
        const inputElement = document.querySelector('input[type="text"]');
        const inputValue = inputElement.value.toLowerCase();
        const filteredBlogs = data.filter(blog => blog.title.toLowerCase().includes(inputValue));
        setDisplayedBlogs(filteredBlogs);
    }

    return (
        <>
            <Head>
               <title>Blogs</title> 
            </Head>
            <div className={styles.container}>
                <h1 className={styles.heading}>Blogs</h1>

                <form className={styles.searchForm} onSubmit={onSubmit}>
                    <input type="text" placeholder="Search" className={styles.searchInput} />
                    <button type="Submit" className={styles.searchButton}>Submit</button>
                </form>

                {displayedBlogs.length > 0 ? (
                        displayedBlogs.map((blog) => (
                            <div key={blog.id} className={styles.card}>
                                <Link href={'/blogs/' + blog.id} className={styles.cardLink}>
                                        <div className={styles.cardContent}>
                                            <h2 className={styles.title}>{blog.title}</h2>
                                            <p className={styles.author}>{blog.author}</p>
                                        </div>
                                </Link>
                            </div>
                        ))
                ) : (
                        <div>
                            <p>no blogs found...</p>
                        </div>
                )}

                
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


