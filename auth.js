import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

function traduzErro(error) {
  if (error.code === "auth/invalid-email") return "E-mail inválido.";
  if (error.code === "auth/missing-password") return "Informe a senha.";
  if (error.code === "auth/wrong-password") return "Senha incorreta.";
  if (error.code === "auth/user-not-found") return "Usuário não encontrado.";
  if (error.code === "auth/email-already-in-use") return "E-mail já em uso.";
  if (error.code === "auth/weak-password") return "Senha muito fraca (mínimo 6 caracteres).";
  return "Erro desconhecido: " + error.message;
}

window.login = async function () {
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;
  try {
    const usuario = await signInWithEmailAndPassword(auth, email, senha);
    if (!usuario.user.emailVerified) {
      alert("Verifique seu e-mail antes de continuar.");
      return;
    }
    alert("Login realizado com sucesso!");
    window.location.href = "apostas.html";
  } catch (error) {
    alert(traduzErro(error));
  }
};

window.registrar = async function () {
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;
  try {
    const usuario = await createUserWithEmailAndPassword(auth, email, senha);
    await sendEmailVerification(usuario.user);
    alert("Cadastro realizado! Verifique seu e-mail para ativar a conta.");
    window.location.href = "index.html";
  } catch (error) {
    alert(traduzErro(error));
  }
};

window.recuperarSenha = async function () {
  const email = prompt("Informe seu e-mail para recuperação:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Instruções enviadas para o e-mail informado.");
  } catch (error) {
    alert(traduzErro(error));
  }
};
