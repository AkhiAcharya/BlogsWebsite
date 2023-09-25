import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/navbar.module.css';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

export default function navbar() {
    const [isTransparent, setIsTransparent] = useState(true);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 10; // Adjust this value as needed

            if (scrollPosition > threshold) {
                setIsTransparent(true);
            } else {
                setIsTransparent(false);
            }
        };

        setIsTransparent(false);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <nav className={`${styles.navbar} ${isExpanded ? styles.expanded : ''} ${isTransparent ? styles.transparent : ''}`}>
            {/* <div className={styles.logo}>
                <Image src="/vercel.svg" width={128} height={77} alt="Logo" />
            </div> */}

            {currentUser ? (
                    <div className={`${styles['nav-links']} ${isExpanded ? styles.visible : ''}`}>
                        <a href="/">Home</a>
                        <a href="/post">Post</a>
                        <a href="/blogs">Blogs</a>
                        <a href="/profile">Profile</a>
                    </div>
                ) : (
                    <div className={`${styles['nav-links']} ${isExpanded ? styles.visible : ''}`}>
                        <a href="/">Home</a>
                        <a href="/blogs">Blogs</a>
                        <a href="/login">Log in</a>
                        <a href="/signup">Sign up</a>
                    </div>
            )}

            
            <div className={styles.icon} onClick={toggleNavbar}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </div>
        </nav>
  );
}