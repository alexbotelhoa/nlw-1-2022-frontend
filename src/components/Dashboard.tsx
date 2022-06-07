import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { Widget } from "./Widget";
import { FeedbackCard, InfoCard } from "./FeedbackCard";
import FeedbackRepository from "../repositories/FeedbackRepository";

interface IFeedback {
  type: string,
  comment: string,
  screenshot: string | null,
}

export function Dashboard() {
  const [feedbacksCard, setFeedbacksCard] = useState<InfoCard[]>([]);

  useEffect(() => {
    loadFeedbacksCard()
  },[]);

  async function loadFeedbacksCard() {
    const feedbackRepository = new FeedbackRepository;
    const { data }: any = await feedbackRepository.list();
    setFeedbacksCard(data);
  }

  async function handleFeedbackCardCreate(feedback: IFeedback) {
    try {
      const feedbackRepository = new FeedbackRepository;
      const { data }: any = await feedbackRepository.create(feedback);
      setFeedbacksCard([...feedbacksCard, data])
      toast.success("Feedback criado com sucesso!");
    } catch (e) {
      toast.error("Erro ao criar o feedback!");
      console.error(e);
    }
  }

  async function handleFeedbackCardRemove(card_id: string) {
    try {
      const feedbackRepository = new FeedbackRepository;
      await feedbackRepository.delete(card_id);
      const array = feedbacksCard.filter((card: InfoCard) => card.id != card_id);
      setFeedbacksCard(array);  
      toast.success("Feedback deletado com sucesso!");
    } catch (e) {
      toast.error("Erro ao deletar o feedback!");
      console.error(e);
    }
  }

  return (
    <>
      <ToastContainer
        draggable
        rtl={false}
        theme="dark"
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        autoClose={5000}
        position="top-right"
        newestOnTop={false}
        hideProgressBar={false}
      />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">        
        {
          Object.entries(feedbacksCard).map(([key, value]) => {
            return (
              <div key={key}>
                <FeedbackCard
                  feedbackCardInfo={value}
                  onFeedbackCardRemove={() => handleFeedbackCardRemove(value.id as string)}
                />
              </div>
            )
          })
        }
      </div>
      <Widget 
        onFeedbackCardCreate={(feedback) => handleFeedbackCardCreate(feedback)} 
      />
    </>
  )
}
