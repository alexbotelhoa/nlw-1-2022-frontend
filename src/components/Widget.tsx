import { WidgetForm } from './WidgetForm';
import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

interface WidgetProps {
    onFeedbackCardCreate: (feedback: any) => void;
}

export function Widget({
    onFeedbackCardCreate,
}: WidgetProps) {
    function handleCreateFeedback(feedback: any) {
        onFeedbackCardCreate(feedback)
    }

    return (
        <Popover className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
            <Popover.Panel>
                <WidgetForm
                    onFeedbackCreate={(feedback) => handleCreateFeedback(feedback)} 
                />
            </Popover.Panel>
            <Popover.Button className="bg-violet-500 rounded-full px-3 h-12 text-white flex items-center group">
                <ChatTeardropDots className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                    <span className="pl-2">Feedback</span>
                </span>
            </Popover.Button>
        </Popover>
    )
}
