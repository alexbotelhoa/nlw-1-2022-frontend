import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";

export const feedbackTypes = {
  BUG: {
    title: 'Bug',
    image: { 
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: { 
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: { 
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento',
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

interface WidgetFormProps {
  onFeedbackCreate: (feedback: any) => void;
}

export function WidgetForm({
  onFeedbackCreate,
}: WidgetFormProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleCreateFeedback(feedback: any) {
    onFeedbackCreate(feedback)
  }

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg md:w-auto h-72 justify-between">
      { feedbackSent ? <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} /> : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackSent={() => setFeedbackSent(true)}
              onFeedbackCreate={(feedback) => handleCreateFeedback(feedback)}
              onFeedbackRestartRequested={handleRestartFeedback}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com 💜 pela <a href="https://rockectseat.com.br" className="underline underline-offset-2">Rocketseat</a>
      </footer>
    </div>
  )
}
