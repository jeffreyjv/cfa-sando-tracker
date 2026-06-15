import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { USERS } from './users'

const RED = '#E4002B'
const RED_DARK = '#B8001F'
const CREAM = '#FFF8F0'
const TAN = '#F5E6D3'

const s = {
  body: {
    minHeight: '100vh',
    background: CREAM,
    fontFamily: "'Segoe UI', Arial, sans-serif",
    margin: 0,
  },
  header: {
    background: RED,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    height: 64,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 42,
    height: 42,
    background: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    flexShrink: 0,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 20,
    letterSpacing: '-0.3px',
    margin: 0,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  headerBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.4)',
    borderRadius: 6,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  main: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '28px 16px 48px',
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: RED,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: 16,
  },
  // Counter
  counterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: '8px 0',
  },
  counterBtn: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: `2px solid ${RED}`,
    background: '#fff',
    color: RED,
    fontSize: 26,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
    lineHeight: 1,
  },
  counterBtnDisabled: {
    borderColor: '#ddd',
    color: '#ccc',
    cursor: 'not-allowed',
  },
  counterNum: {
    fontSize: 56,
    fontWeight: 800,
    color: '#1a1a1a',
    minWidth: 80,
    textAlign: 'center',
    lineHeight: 1,
  },
  counterLabel: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 8,
  },
  // Leaderboard
  lbRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: 8,
    marginBottom: 4,
    gap: 12,
  },
  lbRowTop: {},
  lbRowMe: {
    background: TAN,
  },
  lbRank: {
    width: 28,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
  },
  lbName: {
    flex: 1,
    fontWeight: 600,
    fontSize: 15,
    color: '#1a1a1a',
  },
  lbYou: {
    fontSize: 11,
    color: RED,
    fontWeight: 700,
    background: '#ffeaed',
    borderRadius: 4,
    padding: '2px 6px',
    marginLeft: 6,
  },
  lbCount: {
    fontWeight: 700,
    fontSize: 15,
    color: '#1a1a1a',
    minWidth: 24,
    textAlign: 'right',
  },
  lbSandwich: {
    fontSize: 14,
    marginLeft: 4,
  },
  // Login form
  loginOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: 16,
  },
  loginCard: {
    background: '#fff',
    borderRadius: 14,
    padding: 32,
    width: '100%',
    maxWidth: 360,
    boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  loginSub: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 700,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: '1.5px solid #ddd',
    borderRadius: 7,
    boxSizing: 'border-box',
    marginBottom: 16,
    outline: 'none',
    fontFamily: 'inherit',
  },
  btnPrimary: {
    width: '100%',
    padding: '11px',
    fontSize: 15,
    fontWeight: 700,
    background: RED,
    color: '#fff',
    border: 'none',
    borderRadius: 7,
    cursor: 'pointer',
    marginTop: 4,
  },
  btnCancel: {
    width: '100%',
    padding: '10px',
    fontSize: 14,
    fontWeight: 600,
    background: 'transparent',
    color: '#888',
    border: '1.5px solid #ddd',
    borderRadius: 7,
    cursor: 'pointer',
    marginTop: 8,
  },
  error: {
    color: RED,
    fontSize: 13,
    marginBottom: 12,
    background: '#ffeaed',
    padding: '8px 12px',
    borderRadius: 6,
  },
  divider: {
    height: 1,
    background: '#f0e8e0',
    margin: '0 0 16px',
  },
}

const RANK_ICONS = ['🥇', '🥈', '🥉']

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  useEffect(() => { fetchCounts() }, [])

  async function fetchCounts() {
    const { data, error } = await supabase.from('sandwiches').select('username, count')
    if (error) { console.error(error); return }
    const map = {}
    for (const row of data) map[row.username] = row.count
    setCounts(map)
  }

  function handleLogin(e) {
    e.preventDefault()
    const { username, password } = loginForm
    const match = USERS.find(u => u.username === username && u.password === password)
    if (!match) { setError('Invalid username or password.'); return }
    setError('')
    setCurrentUser(username)
    setShowLogin(false)
    setLoginForm({ username: '', password: '' })
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  async function updateCount(delta) {
    if (!currentUser) return
    setLoading(true)
    setError('')
    const current = counts[currentUser] ?? 0
    const next = Math.max(0, current + delta)
    const { error } = await supabase
      .from('sandwiches')
      .upsert({ username: currentUser, count: next }, { onConflict: 'username' })
    if (error) { setError(error.message) }
    else { setCounts(prev => ({ ...prev, [currentUser]: next })) }
    setLoading(false)
  }

  const leaderboard = USERS
    .map(u => ({ username: u.username, count: counts[u.username] ?? 0 }))
    .sort((a, b) => b.count - a.count)

  return (
    <div style={s.body}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.logo}>🐔</div>
          <div>
            <div style={s.headerTitle}>Sando Tracker</div>
            <div style={s.headerSub}>Eat mor chikin</div>
          </div>
        </div>
        {currentUser ? (
          <button style={s.headerBtn} onClick={handleLogout}>Log out</button>
        ) : (
          <button style={s.headerBtn} onClick={() => setShowLogin(true)}>Log in</button>
        )}
      </header>

      <main style={s.main}>
        {/* Counter (logged in only) */}
        {currentUser && (
          <div style={s.card}>
            <div style={s.cardTitle}>Your sandwiches</div>
            <div style={s.divider} />
            <div style={s.counterRow}>
              <button
                style={{ ...s.counterBtn, ...(((counts[currentUser] ?? 0) === 0 || loading) ? s.counterBtnDisabled : {}) }}
                onClick={() => updateCount(-1)}
                disabled={loading || (counts[currentUser] ?? 0) === 0}
              >−</button>
              <span style={s.counterNum}>{counts[currentUser] ?? 0}</span>
              <button
                style={{ ...s.counterBtn, ...(loading ? s.counterBtnDisabled : {}) }}
                onClick={() => updateCount(1)}
                disabled={loading}
              >+</button>
            </div>
            <div style={{ ...s.counterLabel, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <img src="/sandopic.webp" style={{ width: 20, height: 20, objectFit: 'contain' }} />
              sandwiches eaten, {currentUser}
            </div>
            {error && <div style={{ ...s.error, marginTop: 12, textAlign: 'center' }}>{error}</div>}
          </div>
        )}

        {/* Leaderboard */}
        <div style={s.card}>
          <div style={s.cardTitle}>Leaderboard</div>
          <div style={s.divider} />
          {leaderboard.map((row, i) => (
            <div
              key={row.username}
              style={{ ...s.lbRow, ...(row.username === currentUser ? s.lbRowMe : {}) }}
            >
              <span style={s.lbRank}>{RANK_ICONS[i] ?? i + 1}</span>
              <span style={s.lbName}>
                {row.username}
                {row.username === currentUser && <span style={s.lbYou}>YOU</span>}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <span style={s.lbCount}>{row.count}</span>
                {Array.from({ length: Math.min(row.count, 20) }).map((_, j) => (
                  <img key={j} src="/sandopic.webp" style={{ width: 36, height: 36, objectFit: 'contain', marginLeft: j === 0 ? 4 : -10 }} />
                ))}
                {row.count > 20 && <span style={{ fontSize: 12, color: '#aaa' }}>+{row.count - 20}</span>}
              </span>
            </div>
          ))}
        </div>

        {!currentUser && (
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: 13 }}>
            Log in to track your own count.
          </p>
        )}
      </main>

      {/* Login modal */}
      {showLogin && (
        <div style={s.loginOverlay} onClick={e => e.target === e.currentTarget && setShowLogin(false)}>
          <div style={s.loginCard}>
            <div style={s.loginTitle}>Welcome back 👋</div>
            <div style={s.loginSub}>Log in to update your sandwich count.</div>
            <form onSubmit={handleLogin}>
              {error && <div style={s.error}>{error}</div>}
              <label style={s.label}>Username</label>
              <input
                style={s.input}
                value={loginForm.username}
                onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                autoComplete="username"
                autoFocus
              />
              <label style={s.label}>Password</label>
              <input
                style={s.input}
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
              />
              <button style={s.btnPrimary} type="submit">Log in</button>
              <button style={s.btnCancel} type="button" onClick={() => setShowLogin(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
