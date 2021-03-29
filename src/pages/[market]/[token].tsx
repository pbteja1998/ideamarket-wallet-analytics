import { useRouter } from 'next/router'
import RelatedTokens from 'src/components/RelatedTokens'

export default function Profile() {
  const router = useRouter()
  const token = router.query.token as string
  const market = router.query.market as string

  return (
    <div className="p-10">
      <RelatedTokens token={token} market={market} />
    </div>
  )
}
