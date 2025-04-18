'use client'

import SafeIcon from '/public/icons/safe-word.svg'
import NoIcon from '/public/icons/no.svg'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ModelLoader from '@/app/scenario/[id]/situation/components/ModelLoader'

export default function Splash() {
  useEffect(() => {
    document.documentElement.classList.add('scrollbar-hide')

    return () => {
      document.documentElement.classList.remove('scrollbar-hide')
    }
  }, [])

  const [isScroll, setIsScroll] = useState(false)

  const scrollToBottomSlowly = () => {
    const targetPosition = document.documentElement.scrollHeight
    let currentPosition = window.scrollY

    const interval = setInterval(() => {
      currentPosition += 15
      window.scrollTo(0, currentPosition)

      if (currentPosition >= targetPosition) {
        clearInterval(interval)
        // document.body.style.overflow = 'hidden'
      }
    }, 16)
  }

  useEffect(() => {
    if (isScroll) {
      document.body.style.position = 'static'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
      scrollToBottomSlowly()
    } else {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
    }
  }, [isScroll])

  useEffect(() => {
    document.documentElement.classList.add('scrollbar-hide')

    return () => {
      document.documentElement.classList.remove('scrollbar-hide')
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 70 }}
        className="absolute top-0"
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={5} color="#ffffff" />
        <ModelLoader
          path="/assets/background/cloud.glb"
          scale={[2, 2, 2]}
          position={[0, -10, -10]}
        />
      </Canvas>
      <div>
        <div className="flex flex-col justify-center items-center gap-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <>
              <Image
                src="/images/siren-cloud.png"
                alt="siren-cloud"
                height={252}
                width={200}
                className="absolute -top-44 -left-64 -z-10"
              />
              <Image
                src="/images/prohibition-cloud.png"
                alt="siren-cloud"
                height={252}
                width={200}
                className="absolute -bottom-72 -right-56 -z-10"
              />
            </>
            <h1 className="text-9xl text-text whitespace-nowrap select-none">
              내가 그린 기린 그림
            </h1>
            <span className="absolute -top-32 right-40" draggable="false">
              <SafeIcon />
            </span>
            <span className="absolute top-0 right-40" draggable="false">
              <NoIcon />
            </span>
          </div>
          <button
            className="bg-primary-600 text-white text-6xl py-7 rounded-xl border-[5px] border-primary-700 px-44 whitespace-nowrap select-none"
            onClick={() => setIsScroll(true)}
          >
            시작하기
          </button>
        </div>
      </div>
    </section>
  )
}
