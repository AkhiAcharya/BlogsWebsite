import styles from '@/styles/signup.module.css'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '@/firebase';
import Head from 'next/head';


export default function login() {
    const [message, setMessage] = useState('');
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
          console.log("not signed in!");
        } else if (currentUser != null) {
          router.push("/profile");
        }
      }, [currentUser]);
    
      if (currentUser) {
        // user is signed out or still being checked.
        // don't render anything
        return null;
      }

    const onSubmit = async(e) => {
        e.preventDefault();
        const signUp = document.querySelector('.signup');
        let email = signUp.email.value;
        let password = signUp.password.value;
        try {
            const response = await fetch('/api/post/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setMessage(`Signup Successful for user: ${data.email}`);
            setTimeout(() => {
                setMessage('');
            }, 3000);
            loginUser(email,password)
            signUp.reset();
        } catch(e){
            alert(e.message);
        }
    }


    return(
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Sign up for an account!</h1>
                    <form className = {`${styles.signupForm} signup`} onSubmit={onSubmit}>
                        <input name="email" type="email" placeholder="Email" required/>
                        <input name="password" type="password" placeholder="Password" required/>
                        <button type="submit">Sign up</button>
                        <p className={styles.message}>{message}</p>
                    </form>
                    <p className={styles.writing}>Already have an account? <Link href="/login" className={styles.logInLink}>Log In</Link></p>
                </div>
            </div>
        </>
    )
}
