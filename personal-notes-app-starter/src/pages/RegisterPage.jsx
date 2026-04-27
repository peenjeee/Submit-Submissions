import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import useInput from '../hooks/useInput';
import LanguageContext from '../contexts/LanguageContext';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const navigate = useNavigate();
  const { locale } = useContext(LanguageContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert(locale === 'id' ? 'Password dan Konfirmasi Password harus sama.' : 'Password and Confirm Password must match.');
      return;
    }
    const { error } = await register({ name, email, password });
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <h2>{locale === 'id' ? 'Silahkan isi form untuk mendaftar akun.' : 'Please fill the form to register an account.'}</h2>
      <form onSubmit={onSubmitHandler} className="input-register">
        <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
        <input type="text" id="name" value={name} onChange={onNameChange} required />
        <label htmlFor="email">{locale === 'id' ? 'Email' : 'Email'}</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} required />
        <label htmlFor="password">{locale === 'id' ? 'Kata Sandi' : 'Password'}</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} required />
        <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm Password'}</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} required />
        <button type="submit">{locale === 'id' ? 'Daftar' : 'Register'}</button>
      </form>
      <p>{locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'} <Link to="/">{locale === 'id' ? 'Masuk' : 'Login'}</Link></p>
    </section>
  );
}

export default RegisterPage;
