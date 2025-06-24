'use client'

import { useState } from 'react'

export default function Home() {
  const [title, setTitle] = useState('Futuros Tech')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, you should use an environment variable: process.env.NEXT_PUBLIC_ACCESS_PASSWORD
    const correctPassword = 'prj_8Pqx1JTxndc6MnYuV6cqEMHIJapm' // Temporary hardcoded password
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Senha incorreta')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setResult(null)

    try {
      const response = await fetch('https://boop-notify-ios-ft.dpbdp1.easypanel.host/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
        }),
      })

      const data = await response.json()
      
      setResult({
        success: response.ok,
        message: response.ok ? 'Notificação enviada com sucesso!' : data.error || 'Erro ao enviar notificação',
      })
    } catch (_error) {
      setResult({
        success: false,
        message: 'Erro ao conectar com o servidor',
      })
    } finally {
      setSending(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen p-4 bg-black text-green-500 font-mono">
        <div className="max-w-md mx-auto pt-20">
          <h1 className="text-2xl font-normal mb-4 border-b border-green-800 pb-2">Access Control</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                {'>'}Password_
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-green-800 bg-black text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            {authError && (
              <div className="text-red-500 text-sm">
                {'>'} {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full p-2 bg-green-900 text-green-500 font-mono text-sm hover:bg-green-800 border border-green-800"
            >
              {'>'}Login_
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 bg-black text-green-500 font-mono">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 border-b border-green-800 pb-2">
          <h1 className="text-2xl font-normal">Notificação System</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm hover:text-green-400"
          >
            {'>'}Logout
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm mb-1">
              {'>'}Título_
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-green-800 bg-black text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              {'>'}Mensagem_
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-2 border border-green-800 bg-black text-green-500 font-mono text-sm focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full p-2 bg-green-900 text-green-500 font-mono text-sm hover:bg-green-800 disabled:bg-green-950 border border-green-800"
          >
            {sending ? '>Processando...' : '>Enviar_Notificação'}
          </button>
        </form>

        {result && (
          <div className={`mt-4 p-2 border ${result.success ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'} font-mono text-sm ${result.success ? 'text-green-500' : 'text-red-500'}`}>
            {'>'} {result.message}
          </div>
        )}
      </div>
    </main>
  )
}
