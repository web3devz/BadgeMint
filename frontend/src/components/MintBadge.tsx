import { useState, useEffect, useRef } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { PACKAGE_ID, txUrl } from '../config/network'

const enc = (s: string) => Array.from(new TextEncoder().encode(s))
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY as string

interface Props {
  onSuccess?: () => void
}

export default function MintBadge({ onSuccess }: Props) {
  const account = useCurrentAccount()
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState('')
  const [recipient, setRecipient] = useState('')
  const [txDigest, setTxDigest] = useState('')
  const [error, setError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-generate description when name changes (debounced 700ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!name.trim() || name.trim().length < 3) return

    debounceRef.current = setTimeout(async () => {
      setAiLoading(true)
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'user',
                content: `Write a short 1-sentence description (max 20 words) for an NFT achievement badge named "${name}". Be concise and inspiring. No quotes.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 60,
          }),
        })
        const data = await res.json()
        const generated = data.choices?.[0]?.message?.content?.trim()
        if (generated) setDesc(generated)
      } catch {
        // silently fail — user can type manually
      } finally {
        setAiLoading(false)
      }
    }, 700)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [name])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !name || !recipient) return
    setError('')
    setTxDigest('')

    const tx = new Transaction()
    tx.moveCall({
      target: `${PACKAGE_ID}::badge::mint`,
      arguments: [
        tx.pure.vector('u8', enc(name)),
        tx.pure.vector('u8', enc(desc)),
        tx.pure.vector('u8', enc(image)),
        tx.pure.address(recipient),
      ],
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (r) => {
          setTxDigest(r.digest)
          setName('')
          setDesc('')
          setImage('')
          setRecipient('')
          onSuccess?.()
        },
        onError: (e) => setError(e.message),
      }
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Mint Badge</h2>
        <p className="card-desc">Create and issue an NFT badge to any recipient.</p>
      </div>

      <form onSubmit={submit} className="form">
        <div className="form-row">
          <label>
            Badge Name *
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Developer Pro"
              required
            />
          </label>
          <label>
            Recipient Address *
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
            />
          </label>
        </div>

        <label>
          Description
          <div style={{ position: 'relative' }}>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type a badge name above to auto-generate..."
              rows={2}
              style={{ width: '100%', paddingRight: aiLoading ? '2.5rem' : undefined }}
            />
            {aiLoading && (
              <span style={{
                position: 'absolute', right: '.75rem', top: '.65rem',
                fontSize: '.75rem', color: 'var(--muted)', animation: 'pulse 1s infinite'
              }}>
                🤖 generating...
              </span>
            )}
          </div>
          {!aiLoading && desc && (
            <span style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '.2rem' }}>
              ✨ AI generated · edit freely
            </span>
          )}
        </label>

        <label>
          Image URL
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />
        </label>

        {error && <p className="error">⚠ {error}</p>}

        <button type="submit" className="btn-primary" disabled={isPending || aiLoading}>
          {isPending ? 'Minting...' : 'Mint Badge'}
        </button>
      </form>

      {txDigest && (
        <div className="tx-success">
          <span>✅ Badge minted</span>
          <a href={txUrl(txDigest)} target="_blank" rel="noreferrer">View tx ↗</a>
        </div>
      )}
    </div>
  )
}
