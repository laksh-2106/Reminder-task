import React, { useState } from 'react'
import { login, register } from '../api'

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [err, setErr] = useState(null);

  async function submit(e){
    e.preventDefault();
    setErr(null);
    try {
      const res = mode === 'login' ? await login(email, password) : await register(email, password);
      if (res.error) { setErr(res.error); return; }
      onLogin(res.user);
    } catch(er){
      setErr('Network error');
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">{mode === 'login' ? 'Login' : 'Register'}</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" type="email" />
        <input className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
        {err && <div className="text-red-600">{err}</div>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-700 text-white rounded">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" onClick={()=>setMode(mode === 'login' ? 'register' : 'login')} className="px-4 py-2 border rounded">Switch to {mode === 'login' ? 'Register' : 'Login'}</button>
        </div>
      </form>
    </div>
  )
}
