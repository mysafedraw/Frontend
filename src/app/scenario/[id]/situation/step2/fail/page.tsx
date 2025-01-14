'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import ARController from '@/app/scenario/[id]/situation/components/ARController'
import ModelLoader from '@/app/scenario/[id]/situation/components/ModelLoader'
import { useRouter } from 'next/navigation'
import StoryLayout from '@/app/scenario/[id]/situation/components/StoryLayout'
import { useUser } from '@/app/_contexts/UserContext'

function Fail() {
  const router = useRouter()
  const [fireScale, setFireScale] = useState(7)
  const { user } = useUser()

  useEffect(() => {
    const interval = setInterval(() => {
      setFireScale((prev) => prev + 0.1)
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
      router.push(`/scenario/result/${user?.isHost ? 'host' : 'participant'}`)
    }, 6000)
  }, [])

  return (
    <StoryLayout
      speechText="으악 불이 더 커지고 있어! 불이 났을 때 바로 119에 신고해야 했는데......"
      isSpeechVisible
    >
      <div className="fixed inset-0">
        <Canvas
          camera={{
            position: [0, 2, 5],
            near: 0.1,
            far: 2000,
            fov: 75,
          }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          }}
        >
          <ARController>
            <ambientLight intensity={0.5} />
            <pointLight
              position={[0, 2, 0]}
              intensity={2}
              color="#ffffff"
              distance={10}
              decay={2}
            />
            <spotLight
              position={[0, 5, 2]}
              angle={0.5}
              penumbra={0.5}
              intensity={1}
              castShadow
            />

            <Suspense fallback={null}>
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-2, -1, 0]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-1, -2, 0.9]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-2.5, -2, 0.9]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-3, -3, 1.5]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-2, -3, 1.5]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
              <ModelLoader
                path="/assets/scenario/fire2.glb"
                position={[-0.5, -3, 1.5]}
                scale={[fireScale, fireScale, fireScale]}
                rotation={[0, 0.2, 0]}
              />
            </Suspense>
          </ARController>
        </Canvas>
      </div>
    </StoryLayout>
  )
}

export default dynamic(() => Promise.resolve(Fail), { ssr: false })
