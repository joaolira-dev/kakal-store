import { Eye, EyeOff, Heart, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { asset } from '../../data';
import api from '../../services/api';
export default function AdminLogin() {
  const [form, setForm] = useState({ email: 'admin@kakalkids.com.br', password: '123456' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function login(event) {
    event.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('kakal_admin_token', data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Não foi possível acessar a API. Você pode iniciar o backend e tentar novamente.');
    }
  }
  return (
    <main className="admin-login">
      <div className="login-decoration one">♡</div>
      <div className="login-decoration two">✦</div>
      <form className="login-card" onSubmit={login}>
        <img src={asset('logo-kakal.png')} />
        <span className="eyebrow">Kakal Kids Store</span>
        <h1>Painel Administrativo</h1>
        <p>Gerencie sua lojinha com carinho 💖</p>
        {error && <div className="form-error">{error}</div>}
        <label>
          <span>
            <Mail /> E-mail
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          <span>
            <LockKeyhole /> Senha
          </span>
          <div className="password-input">
            <input
              type={show ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            <button type="button" onClick={() => setShow(!show)}>
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>
        <div className="login-options">
          <label>
            <input type="checkbox" defaultChecked /> Lembrar de mim
          </label>
          <a>Esqueci minha senha</a>
        </div>
        <button className="btn btn-primary full">
          Entrar <Heart fill="white" />
        </button>
        <small>Use admin@kakalkids.com.br · 123456</small>
      </form>
    </main>
  );
}
