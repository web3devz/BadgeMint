import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { PACKAGE_ID, objectUrl } from '../config/network'

interface BadgeFields {
  name: string
  issuer: string
}

export default function MyBadges() {
  const account = useCurrentAccount()
  const { data, isPending, error } = useSuiClientQuery('getOwnedObjects', {
    owner: account?.address ?? '',
    filter: { StructType: `${PACKAGE_ID}::badge::Badge` },
    options: { showContent: true },
  })

  if (isPending) return <div className="status-box">Loading your badges...</div>
  if (error) return <div className="status-box error">Error: {error.message}</div>

  const badges = data?.data ?? []

  if (badges.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏅</div>
        <h3>No badges yet</h3>
        <p>You haven't received any badges. Check back soon!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Your Badges</h2>
          <p className="card-desc">{badges.length} achievement{badges.length !== 1 ? 's' : ''} earned</p>
        </div>
      </div>
      <div className="badge-grid">
        {badges.map((obj) => {
          const content = obj.data?.content
          if (content?.dataType !== 'moveObject') return null
          const f = content.fields as unknown as BadgeFields
          const objId = obj.data?.objectId ?? ''

          return (
            <a key={objId} href={objectUrl(objId)} target="_blank" rel="noreferrer" className="badge-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="badge-icon">🏆</div>
              <div className="badge-name">{f.name}</div>
              <div className="badge-desc">Issued by {f.issuer.slice(0, 8)}...</div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
