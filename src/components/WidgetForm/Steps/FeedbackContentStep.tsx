import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { Loading } from "../../Loading";
import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onFeedbackCreate: (data: any) => void;
  onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackSent,
  onFeedbackCreate,
  onFeedbackRestartRequested
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState<string>('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendFeedback(true);

    const feedback = {
      type: feedbackType,
      comment,
      screenshot
    }

    onFeedbackCreate(feedback);

    setIsSendFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" type="button">
          <ArrowLeft className="w-4 h-4" weight="bold" onClick={onFeedbackRestartRequested} />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-nome resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTake={setScreenshot}
          />
          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm transition-colors hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
          >{isSendingFeedback ? <Loading /> : 'Enviar feedback'}</button>
        </footer>        
      </form>
    </>
  )
}
