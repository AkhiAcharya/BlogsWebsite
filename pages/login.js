import styles from '@/styles/login.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';
import { loginUser } from '@/firebase';
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function LoginPage() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [message, setMessage] = useState('');
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
        const logIn = document.querySelector('.login');
        let email = logIn.email.value;
        let password = logIn.password.value;
        try {
            await loginUser(email, password);
            router.push('/');
        } catch (error) {
            alert(error.message);
        }
    }


    return(
    <>
        <Head>
            <title>Log In</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.logoArea}>
                    <Image className={styles.logo} src="/favicon.ico" alt="logo" width={100} height={100}/> 
                </div>

                <form className = {`${styles.loginForm} login`} onSubmit={onSubmit}>
                    <input name="email" type="email" placeholder="Email" required className={styles.loginInput}/>
                    <input name="password" type="password" placeholder="Password" required className={styles.loginInput}/>
                    <button type="submit" className={styles.loginButton}>Login</button>
                    <p className={styles.message}>Don't have an account? <Link href="/signup" className={styles.signUpLink}>Sign Up</Link></p>
                    <p>{message}</p>
                </form>
            </div>
        </div>  
    </>
    )
}



