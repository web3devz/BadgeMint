import { useState } from 'react'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import MyBadges from './components/MyBadges'
import MintBadge from './components/MintBadge'
import './App.css'

type Tab = 'view' | 'mint'

export default function App() {
  const account = useCurrentAccount()
  const [tab, setTab] = useState<Tab>('view')

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <span className="logo">🏅</span>
          <div>
            <div className="brand-name">BadgeMint</div>
            <div className="brand-sub">NFT Achievements</div>
          </div>
        </div>
        <ConnectButton />
      </header>

      {!account ? (
        <>
          <section className="hero">
            <div className="hero-badge">Digital Achievements</div>
            <h1>Your Accomplishments,<br />As NFTs</h1>
            <p className="hero-sub">
              Mint digital badges representing your skills and milestones.
              Permanent, transferable, and publicly verifiable achievements.
            </p>
            <div className="hero-features">
              <div className="feature"><span>🎖️</span><span>Permanent</span></div>
              <div className="feature"><span>🔗</span><span>Transferable</span></div>
              <div className="feature"><span>✅</span><span>Verifiable</span></div>
              <div className="feature"><span>🌐</span><span>Portable</span></div>
            </div>
          </section>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">∞</div>
              <div className="stat-label">Badges Possible</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Revocation Risk</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Owned</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;1s</div>
              <div className="stat-label">Finality</div>
            </div>
          </div>

          <section className="how-section">
            <div className="section-title">How BadgeMint Works</div>
            <p className="section-sub">Three steps to NFT achievements</p>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">01</div>
                <div className="step-icon">🎨</div>
                <h3>Design Badge</h3>
                <p>Create a badge with name, description, and image URL.</p>
              </div>
              <div className="step-card">
                <div className="step-num">02</div>
                <div className="step-icon">⚡</div>
                <h3>Mint NFT</h3>
                <p>One transaction mints the badge as an NFT to any recipient.</p>
              </div>
              <div className="step-card">
                <div className="step-num">03</div>
                <div className="step-icon">🏆</div>
                <h3>Own Forever</h3>
                <p>Recipients own the badge permanently — transferable and verifiable.</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="dashboard">
          <div className="dashboard-inner">
            <nav className="tabs">
              {(['view', 'mint'] as Tab[]).map((t) => (
                <button
                  key={t}
                  className={tab === t ? 'active' : ''}
                  onClick={() => setTab(t)}
                >
                  {t === 'view' && '🏅 My Badges'}
                  {t === 'mint' && '✨ Mint Badge'}
                </button>
              ))}
            </nav>
            <main>
              {tab === 'view' && <MyBadges />}
              {tab === 'mint' && <MintBadge onSuccess={() => setTab('view')} />}
            </main>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>BadgeMint · OneChain Testnet</span>
        <a href="https://onescan.cc/testnet" target="_blank" rel="noreferrer">Explorer ↗</a>
      </footer>
    </div>
  )
}
