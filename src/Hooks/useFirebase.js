import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const [signinError, setSigninError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);



    const handleFirebaseEmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setSigninError("");
                setSignupError("");
            })
            .catch((error) => {
                setSigninError(error.code);

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerificationLink().then((result) => {
                    setUser(user);
                    setSignupError("");
                    setSigninError("");
                });
            })
            .catch((error) => {
                setSignupError(error.code);
            }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        })
    }, []);

    const sendEmailVerificationLink = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    }

    return {
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        signinError,
        signupError,
        user,
        isLoading,
        logout
    }
}

export default useFirebase;