import React, { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import Login from './components/Login'
import { supabase } from './supabaseClient'
import { logout } from './api'

export default function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? <Login onLogin={setUser} /> : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Hello, {user.email}</h2>
            <div>
              <button className="px-4 py-2 bg-slate-700 text-white rounded" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <TaskList />
        </div>
      )}
    </div>
  )
}
