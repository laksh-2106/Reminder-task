import React, { useState, useEffect } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask } from '../api'

export default function TaskList(){
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  async function load(){ const data = await fetchTasks(); setTasks(data || []); }
  useEffect(()=>{ load(); }, [])

  async function add(e){ e.preventDefault(); if (!title.trim()) return; const t = await createTask(title.trim()); setTitle(''); setTasks(prev=>[t, ...prev]); }
  async function toggle(t){ const updated = await updateTask(t.id, { completed: !t.completed }); setTasks(prev=>prev.map(x=>x.id===updated.id?updated:x)); }
  async function remove(id){ await deleteTask(id); setTasks(prev=>prev.filter(p=>p.id!==id)); }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <form onSubmit={add} className="flex gap-2 mb-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="flex-1 p-2 border rounded" placeholder="New task" />
        <button className="px-4 py-2 rounded bg-slate-700 text-white">Add</button>
      </form>
      <ul className="space-y-2">
        {tasks.map(t=>(
          <li key={t.id} className="flex items-center justify-between border p-2 rounded">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={Boolean(t.completed)} onChange={()=>toggle(t)} />
              <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
            </div>
            <div><button onClick={()=>remove(t.id)} className="text-sm text-red-600">Delete</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
