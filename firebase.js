import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot, getDocs, getDoc,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    updateDoc
  } from 'firebase/firestore'
import {
    getAuth, 
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'


  const firebaseConfig = {
    apiKey: "AIzaSyBSeEje5vzJjGt9XycQfBeGgikeASpgy60",
    authDomain: "blog-website-5f055.firebaseapp.com",
    projectId: "blog-website-5f055",
    storageBucket: "blog-website-5f055.appspot.com",
    messagingSenderId: "21383983617",
    appId: "1:21383983617:web:2929a35349010afb67c600",
    measurementId: "G-F3F8D5XST5"
  };


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth()


const colRef = collection(db, 'blogs')



export const getBlogposts = async () => {
    // let blogPosts = [];
    // onSnapshot(colRef, (snapshot) => {
    //     blogPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     return blogPosts;
    // });
    const snapshot = await getDocs(colRef);
    const blogPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return (blogPosts);
    
};

export const addBlogs = async(author, title, body, uid) => {
    const docRef = await addDoc(colRef, {author: author, title: title, body: body, uid: uid})
};

export const getDocumentById = async(documentId) => {
    const docRef = doc(colRef, documentId);
    const document = await getDoc(docRef);
    return document.data();
};

export const getCommentsForBlog = async (blogId) => {
    const commentsSnapshot = await getDocs(collection(db, "blogs", blogId, "comments"));
    const comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return(comments);
};

export const postComment = async(blogId, author, body) => {
    const commentsRef = collection(db, 'blogs', blogId, 'comments');
    const commentData = {
        author: author,
        body: body
    };
    const docRef = await addDoc(commentsRef, commentData);
}

export const deleteBlog = async(blogId) => {
    const docRef = doc(db, 'blogs', blogId);
    await deleteDoc(docRef);
}

export const createUser = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user;
        })
        .catch(error => {
            throw new Error(error.message);
        });
};

export const loginUser = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export const UserSignout = async() => {
    return signOut(auth)
        .then(() => {
            console.log('The user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
}

export const filterBlogs = async(title) => {
    const q = query(colRef, where('title', '==', title));

    const querySnapshot = await getDocs(q);
    const filteredBlogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return filteredBlogs;
}