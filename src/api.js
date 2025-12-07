import { supabase } from './supabaseClient'

export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) return { error: error.message }
  return { user: data.user, session: data.session }
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }
  return { user: data.user, session: data.session }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  return { error: error?.message }
}

export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createTask(title) {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, user_id: user.id }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTask(id) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
}
