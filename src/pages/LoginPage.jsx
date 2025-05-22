import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from '../config/back4app';
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage({ showRegister = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(showRegister);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        setError('Verifique seu e-mail antes de fazer login.');
        setLoading(false);
        await auth.signOut();
        return;
      }

      const user = await Parse.User.logIn(email, password);
      window.dispatchEvent(new Event('userChange'));
      navigate('/');
    } catch (err) {
      setError(`Email/senha invalido`);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      const user = new Parse.User();
      user.set("username", email);
      user.set("password", password);
      user.set("email", email);
      user.set("isAdmin", false);
      await user.signUp();

      await auth.signOut();  // desloga do Firebase para não ficar logado antes da verificação

      alert("Cadastro realizado. Verifique seu e-mail para ativar a conta.");
      setLoading(false);
      setIsRegister(false); // volta para tela de login
    } catch (err) {
      setError(`Falha no cadastro: ${err.message}`);
      setLoading(false);
    }
  };


  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-playfair font-bold text-wine-900 text-center mb-6">
          {isRegister ? 'Cadastre-se' : 'Login'}
        </h1>
        {isRegister ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-800 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleMode}
                className="text-wine-900 hover:underline"
              >
                Já tem uma conta? Faça login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine-900 focus:ring focus:ring-wine-800 focus:ring-opacity-50"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wine-900 hover:bg-wine-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-800 disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleMode}
                className="text-wine-900 hover:underline"
              >
                Não tem uma conta? Cadastre-se
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
