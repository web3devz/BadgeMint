import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { PACKAGE_ID, txUrl } from '../config/network'

const enc = (s: string) => Array.from(new TextEncoder().encode(s))

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
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What does this badge represent?"
            rows={2}
          />
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

        <button type="submit" className="btn-primary" disabled={isPending}>
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
