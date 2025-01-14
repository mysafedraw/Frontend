import dynamic from 'next/dynamic'
import Setting from '/public/icons/setting.svg'
import Link from 'next/link'

const Map = dynamic(() => import('@/app/scenario/components/Map'), {
  ssr: false,
})

export interface Scenario {
  id: number
  name: string
  description: string
  imgUrl: string
}

async function fetchScenario(): Promise<Scenario[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/scenarios`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch scenarios')
    }

    const result = await response.json()

    return result.data
  } catch (error) {
    console.error('Error fetching scenarios:', error)
    return []
  }
}

export default async function Home() {
  const scenarios = await fetchScenario()

  return (
    <div className="w-screen h-screen">
      <Link href="/settings" className="fixed top-6 right-6 w-20 h-20 z-50">
        <Setting />
      </Link>
      <Map scenarios={scenarios} />
    </div>
  )
}
