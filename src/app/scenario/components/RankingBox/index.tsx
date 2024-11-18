'use client'

import Image from 'next/image'

interface RankingProps {
  height: string
  ranking?: React.ReactNode
  score: number
  user: string
  character?: string
  border?: string
  profileSize: number
}

export default function Ranking({
  height,
  ranking,
  score,
  user,
  character,
  border,
  profileSize,
}: RankingProps) {
  return (
    <div
      className={`${height} pt-8 flex-col items-center bg-ranking-gradient w-96 rounded-t-2xl px-9 relative border-[5px] border-[#F1CC85] ${border} flex flex-col`}
    >
      {ranking}
      <div className="relative w-full">
        <span className="bg-[#FFEECE] text-[#75520E] py-5 flex justify-center  rounded-full text-2xl font-bold w-full">
          {`${score}점`}
        </span>
        <p
          className="absolute top-14 left-1/2 -translate-x-1/2 aspect-square overflow-hidden rounded-full bg-white shrink-0 select-none"
          draggable={false}
        >
          {character ? (
            <Image
              src={character}
              alt="character_profile"
              width={profileSize}
              height={profileSize}
              draggable={false}
            />
          ) : null}
        </p>
      </div>
      <span className="ranking-font-outline-2 text-3xl text-[#FFE097] absolute bottom-2">
        {user}
      </span>
    </div>
  )
}
