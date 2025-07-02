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
    const correctPassword = 'prj_8Pqx1JTxndc6MnYuV6cqEMHIJapm'
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
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'monospace',
        minHeight: '100vh',
        padding: '1rem'
      }}>
        <div style={{ maxWidth: '400px', margin: '80px auto 0' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid white'
          }}>
            Access Control
          </h1>
          
          <form onSubmit={handleLogin} style={{ marginTop: '1rem' }}>
            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                {'>'} Password_
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: 'black',
                  color: 'white',
                  border: '1px solid white',
                  fontFamily: 'monospace',
                  marginBottom: '1rem'
                }}
                required
              />
            </div>

            {authError && (
              <div style={{ color: 'white', marginBottom: '1rem' }}>
                {'>'} {authError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid white',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}
            >
              {'>'} Login_
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'monospace',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid white',
          marginBottom: '1rem',
          paddingBottom: '0.5rem'
        }}>
          <h1 style={{ fontSize: '1.5rem' }}>Notificação System</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontFamily: 'monospace',
              cursor: 'pointer'
            }}
          >
            {'>'} Logout
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
              {'>'} Título_
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid white',
                fontFamily: 'monospace'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>
              {'>'} Mensagem_
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid white',
                fontFamily: 'monospace'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: sending ? '#333' : 'black',
              color: 'white',
              border: '1px solid white',
              fontFamily: 'monospace',
              cursor: sending ? 'not-allowed' : 'pointer'
            }}
          >
            {sending ? '> Processando...' : '> Enviar_Notificação'}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            border: '1px solid white',
            backgroundColor: 'black',
            color: 'white'
          }}>
            {'>'} {result.message}
          </div>
        )}
      </div>
    </div>
  )
}
