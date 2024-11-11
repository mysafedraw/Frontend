import ScoredBoard from '@/app/scenario/result/components/ScoredBoard'
import VolumeMicIcon from '@/app/scenario/result/components/VolumeMicIcon'
import SpeakingRightsToast from '@/app/scenario/result/participant/components/SpeakingRightsToast'
import VotingSidebar from '@/app/scenario/result/components/VotingSidebar'
import AllAnswers from '@/app/scenario/result/components/AllAnswers'
import AppealButton from '@/app/scenario/result/participant/components/AppealButton'

export default function ScenarioResultParticipant() {
  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="mb-4 w-2/5 bg-wood bg-cover bg-left text-5xl text-white text-center py-4 rounded-xl shadow-lg">
        작은 불 끄기
      </h2>
      <div className="relative">
        <ScoredBoard
          data={{
            id: 1,
            isCorrect: false,
            nickname: '이구역그림짱은나야 (나)',
            characterImage: '/images/tiger.png',
            drawingImage: '/images/drawing.png',
          }}
        />
        {/* 발언 중일 때 마이크 표시 */}
        <div className="absolute left-10 bottom-10">
          <VolumeMicIcon />
        </div>
      </div>
      <AppealButton />
      <AllAnswers />

      <VotingSidebar role="participant" />

      <SpeakingRightsToast />
    </div>
  )
}