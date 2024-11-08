'use client'

import { useCallback, useState } from 'react'
import DrawingBoard from '@/app/scenario/draw/components/DrawingBoard'
import DrawTimer from '@/app/scenario/draw/components/DrawTimer'
import Image from 'next/image'
import ProgressBarTimer from '@/app/scenario/draw/components/ProgressBarTimer'
import QuestionBubble from '@/app/scenario/draw/components/QuestionBubble'
import { DRAW_TYPES } from '@/app/_constants/draw'
import CommonToast from '@/app/_components/CommonToast'
import { useRouter } from 'next/navigation'

interface DrawResponse {
  label: string
  probability: number
}

export default function Draw() {
  const scenario =
    '헉 콘센트에 불이 붙었어!\n초기에 빨리 진압해야 할 텐데... 지금 필요한 건.....'

  const [question, setQuestion] = useState<string>('...')
  const [isToastShow, setIsToastShow] = useState(false)
  const router = useRouter()
  const drawTime = 20

  const getParticle = (word: string): string => {
    if (!word) return '를'
    const lastChar = word.charAt(word.length - 1)
    const hasJongseong = (lastChar.charCodeAt(0) - 0xac00) % 28 > 0
    return hasJongseong ? '을' : '를'
  }

  // 예측 결과를 받아와 한글로 변환
  const handlePrediction = (prediction: DrawResponse) => {
    if (prediction) {
      const translatedLabel = DRAW_TYPES[prediction.label] || prediction.label
      if (prediction?.probability >= 35) {
        const particle = getParticle(translatedLabel)
        setQuestion(`${translatedLabel}${particle} 그린 건가요?`)
      } else {
        setQuestion(`...`)
      }
    }
  }

  const handleNext = () => {
    setIsToastShow(true)
  }

  const handleMove = () => {
    router.push(`/scenario/situation`)
  }

  return (
    <div className="h-screen w-full bg-secondary-500 flex flex-col p-10">
      {/* 시나리오 말풍선 문장 */}
      <div className="flex py-4 px-2 bg-primary-600 border-4 border-primary-700 w-full rounded-md justify-center">
        <p className="whitespace-pre-wrap leading-9 text-center text-text text-4xl select-none">
          {scenario}
        </p>
      </div>
      {/* 그림판 */}
      <div className="relative mt-4">
        <DrawingBoard onPrediction={handlePrediction} />
        <DrawTimer initialTime={drawTime} handleTimeEnd={handleNext} />
      </div>
      <div className="flex mt-4">
        <div className="flex justify-center w-full">
          <QuestionBubble content={question} />
        </div>
        <button className="absolute right-6 flex items-center justify-center">
          <Image
            src="/images/wood-arrow.png"
            alt="draw-submit"
            width={241}
            height={88}
            className="h-16 w-auto"
            priority
          />
          <p className="absolute text-white text-4xl shadow-lg pr-2">
            제출하기
          </p>
        </button>
      </div>
      {isToastShow && (
        <CommonToast
          message="시간이 끝났어요"
          duration={3000}
          imageSrc="/images/tiger.png"
          altText="draw-rights-icon"
          handleDurationEnd={handleMove}
        />
      )}
    </div>
  )
}
