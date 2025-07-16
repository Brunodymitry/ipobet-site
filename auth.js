
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from './firebase-config.js';

const auth = getAuth(app);

window.register = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    await sendEmailVerification(userCred.user);
    document.getElementById('message').textContent = "Verifique seu e-mail antes de entrar.";
  } catch (err) {
    document.getElementById('message').textContent = err.message;
  }
};

window.login = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    if (userCred.user.emailVerified) {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById('message').textContent = "Verifique seu e-mail para continuar.";
    }
  } catch (err) {
    document.getElementById('message').textContent = err.message;
  }
};

window.sendPasswordReset = async () => {
  const email = document.getElementById('email').value;
  try {
    await sendPasswordResetEmail(auth, email);
    document.getElementById('message').textContent = "Link de recuperação enviado.";
  } catch (err) {
    document.getElementById('message').textContent = err.message;
  }
};

window.googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user.emailVerified) {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById('message').textContent = "Verifique seu e-mail para continuar.";
    }
  } catch (err) {
    document.getElementById('message').textContent = err.message;
  }
};
