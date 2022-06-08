import { Info, Trash } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "./WidgetForm";

export interface InfoCard {
  id: string,
  type: string,
  comment: string,
  screenshot: string,
  createdAt: string,
  updatedAt: string,
}

interface FeedbackCardProps {
  feedbackCardInfo: InfoCard;
  onFeedbackCardRemove: () => void;
}

export function FeedbackCard({ 
  feedbackCardInfo,
  onFeedbackCardRemove
}: FeedbackCardProps) {

  const feedbackTypeInfo = feedbackTypes[feedbackCardInfo.type as FeedbackType];

  function infoDate() {
    const data = feedbackCardInfo.createdAt.split('T')[0].split('-');
    const time = feedbackCardInfo.createdAt.split('T')[1].split(':');
    const dataTime = data[2] + "/" + data[1] + "/" + data[0] + " " + time[0] + ":" + time[1];
    return `Enviado em ${dataTime}`;
  }
  
  return (
    <div className="w-72 h-72 bg-zinc-800 m-3 p-4 rounded-2xl mb-4 shadow-lg flex flex-col items-center justify-between">
      <header className="flex w-full items-center justify-between">
        <Info className="w-4 h-4 text-zinc-400 hover:text-zinc-100 cursor-pointer" weight="bold" alt={infoDate()} />
        
        <div className="text-xl leading-6 flex flex-row items-center gap-3">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" /> {feedbackTypeInfo.title}
        </div>
        
        <button className="p-1 w-6 h-6 flex items-center justify-center rounded-md border-transparent text-zinc-400 hover:text-zinc-100 transition-colors" type="button" onClick={onFeedbackCardRemove}>
          <Trash />
        </button>
      </header>
      
      <textarea
          className="w-64 h-24 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-nome resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          value={feedbackCardInfo.comment}
          readOnly
        />

      {
        (feedbackCardInfo.screenshot)
        ? <img className="w-64 h-28 rounded-md" src={feedbackCardInfo.screenshot} alt="" />
        : <div className="w-64 h-28 text-sm text-zinc-100 flex justify-center items-center border-zinc-600 rounded-md">Sem imagem</div>
      }

      {/* <footer className="text-xs text-neutral-400">
        Feito com 💜 por <a href="https://www.linkedin.com/in/alexbotelhoa/" className="underline underline-offset-2">Alex Botelho</a>
      </footer> */}
    </div>
  )
}
