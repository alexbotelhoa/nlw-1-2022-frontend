import { Widget } from "./Widget";
import { useEffect, useState } from "react";
import { FeedbackCard, InfoCard } from "./FeedbackCard";

export function Dashboard() {

  const data = [
    {
      id: "1",
      type: "BUG",
      comment: "asdf",
      screenshot: "https://img.r7.com/images/ciberseguranca-01022021173242665?dimensions=221x126",
      createdAt: "2022-05-11 19:05:02"
    },
    {
      id: "2",
      type: "IDEA",
      comment: "lkjlkj",
      screenshot: "https://img.r7.com/images/ciberseguranca-01022021173242665?dimensions=221x126",
      createdAt: "2022-05-11 19:05:02"
    },
    {
      id: "3",
      type: "OTHER",
      comment: "HDFGH",
      screenshot: "https://img.r7.com/images/ciberseguranca-01022021173242665?dimensions=221x126",
      createdAt: "2022-05-11 19:05:02"
    },
  ]

  const [feedbacksCard, setFeedbacksCard] = useState<InfoCard[]>([]);

  useEffect(() => {
    loadFeedbacksCard()
  },[]);

  function loadFeedbacksCard() {
    setFeedbacksCard(data);
  }

  function handleFeedbackCardRemove(idCard: string) {
    const array = feedbacksCard.filter((card: any) => card.id != idCard);
    setFeedbacksCard(array);
  }

  function handleFeedbackCardCreate(feedback: any) {
    setFeedbacksCard([...feedbacksCard, feedback.data])
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">        
        {
          Object.entries(feedbacksCard).map(([key, value]) => {
              return (
                <div key={key}>
                  <FeedbackCard
                    feedbackCardInfo={value}
                    onFeedbackCardRemove={() => handleFeedbackCardRemove(value.id as any)}
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
