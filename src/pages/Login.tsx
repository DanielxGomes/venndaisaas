import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Mail, Lock, LogIn, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vennd-light via-white to-vennd-light flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vennd-primary mb-2">Bem-vindo à Vennd</h1>
            <p className="text-gray-600">Faça login para acessar sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-vennd-primary" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-vennd-accent focus:border-vennd-accent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-vennd-primary" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-vennd-accent focus:border-vennd-accent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-vennd-primary hover:bg-vennd-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vennd-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vennd-accent"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-medium text-vennd-primary hover:text-vennd-dark">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Credenciais de teste:</p>
            <p>Email: teste@vennd.com.br</p>
            <p>Senha: teste123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}