/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Check,
  ChevronRight,
  PenLine,
  ScanEye,
  Sparkle,
  Wand2,
} from 'lucide-react';
import { Icons } from '../icons';
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import toast from 'react-hot-toast';
import useAppStore from '@/lib/store/app.store';

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  isButton?: boolean;
  onClick?: () => void;
  submenu?: MenuItem[];
};

const api_endpoint = 'https://api.dev.vhdo.org';

interface AIProps {
  editor: Editor;
}

const AI: React.FC<AIProps> = ({ editor }) => {
  const [menu, setMenu] = useState<MenuItem[]>(initializeMenu());
  const [aiResponse, setAiResponse] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const aiResponseRef = useRef(aiResponse);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLastRequest] = useState<{
    endpoint: string;
    action: string;
    language?: string;
  } | null>(null);
  const lastRequestRef = useRef<{ endpoint: string; action: string } | null>(
    null
  );

  function initializeMenu(): MenuItem[] {
    return [
      {
        title: 'Correct Phrase',
        icon: <Sparkle size={14} />,
        onClick: () => processAIRequest('Correct Phrase'),
      },
      {
        title: 'Translate Text',
        icon: <Icons.language />,
        submenu: [
          {
            title: 'Hausa',
            onClick: () => processAIRequest('Translate Text', 'hausa'),
          },
          {
            title: 'Igbo',
            onClick: () => processAIRequest('Translate Text', 'igbo'),
          },
          {
            title: 'Yoruba',
            onClick: () => processAIRequest('Translate Text', 'yoruba'),
          },
        ],
      },
      {
        title: 'Analyze Text',
        icon: <ScanEye size={14} />,
        onClick: () => processAIRequest('Analyze Text'),
      },
      {
        title: 'Summarize Content',
        icon: <PenLine size={14} />,
        onClick: () => processAIRequest('Summarize Content'),
      },
      {
        title: 'Generate Content',
        icon: <Wand2 size={14} />,
        onClick: () => processAIRequest('Generate Content'),
      },
    ];
  }

  const processAIRequest = async (action: string, language?: string) => {
    const selectedText = getSelectedText();
    const textareaText = getTextareaValue();
    const textToProcess = selectedText || textareaText;

    if (!textToProcess) {
      return toast.error('No text selected or entered for AI processing.');
    }

    const { endpoint, body } = getRequestDetails(
      action,
      textToProcess,
      language
    );
    setAiTyping(true);
    setAiResponse('');
    const request = { endpoint, action, language };
    setLastRequest(request);
    lastRequestRef.current = request;
    try {
      const token = useAppStore.getState().user?.token;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        await streamAIResponse(result.answer);
        updateMenuAfterResponse(action);
      } else throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
      toast.error(`Something went wrong - ${error}`);
    } finally {
      setAiTyping(false);
    }
  };

  const getRequestDetails = (
    action: string,
    text: string,
    language?: string
  ) => {
    const requests: Record<string, { endpoint: string; body: any }> = {
      'Correct Phrase': {
        endpoint: `${api_endpoint}/api/ai/correct-phrase`,
        body: { phrase: text },
      },
      'Translate Text': {
        endpoint: `${api_endpoint}/api/ai/translate-text`,
        body: { text, language: language || 'yoruba' },
      },
      'Analyze Text': {
        endpoint: `${api_endpoint}/api/ai/analyze-text`,
        body: { question: text },
      },
      'Summarize Content': {
        endpoint: `${api_endpoint}/api/ai/summarize-content`,
        body: { content: text },
      },
      'Generate Content': {
        endpoint: `${api_endpoint}/api/ai/generate-content`,
        body: { topic: text },
      },
    };

    return requests[action] || {};
  };

  const updateMenuAfterResponse = (action: string) => {
    const newMenu = [
      action !== 'Analyze Text' && {
        title: 'Accept',
        icon: <Check size={14} />,
        onClick: insertAIResponse,
      },
      { title: 'Discard', icon: <Icons.close size={14} />, onClick: resetMenu },
      {
        title: 'Try Again',
        icon: <Icons.repeat size={14} />,
        onClick: retryLastRequest,
      },
    ].filter(Boolean);

    setMenu(newMenu as MenuItem[]);
  };

  useEffect(() => {
    aiResponseRef.current = aiResponse;
  }, [aiResponse]);

  const insertAIResponse = () => {
    if (aiResponseRef.current.trim()) {
      try {
        editor.chain().focus().insertContent(aiResponseRef.current).run();
      } catch (error) {
        toast.error('Failed to insert content into editor.');
      }
      resetMenu();
    } else {
      toast.error('No response to insert.');
    }
  };

  const retryLastRequest = () => {
    console.log('LAST REQUEST REF >>>>>', lastRequestRef.current); // This will always log the latest request

    if (lastRequestRef.current) {
      processAIRequest(lastRequestRef.current.action);
    } else {
      toast.error('No previous request to retry.');
    }
  };

  const resetMenu = () => {
    setMenu(initializeMenu());
    setAiResponse('');
    setLastRequest(null);
    lastRequestRef.current = null;
  };

  const streamAIResponse = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      setAiResponse(prev => prev + text[i]);
    }
  };

  const getSelectedText = (): string => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');
    return selectedText.trim() ? selectedText : '';
  };

  const getTextareaValue = (): string => {
    const textarea = document.getElementById(
      'ai-command-input'
    ) as HTMLTextAreaElement;
    return textarea?.value.trim() || '';
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="text-txtColor border-gray-300 flex items-center justify-center gap-2 rounded-md border p-2 text-xs font-semibold">
          <Wand2 size={12} /> <p>Ask AI</p>
        </button>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={() => {
          // show alert dialogue
        }}
        className="w-[32rem] p-2"
      >
        <div
          className="bg-background relative mt-4 min-h-[5rem] rounded-lg p-2"
          id="ai-response"
        >
          {aiTyping && !aiResponse && (
            <div className="text-txtColor z-4 absolute top-0 mt-2 flex items-center gap-2 text-xs">
              <Wand2 size={14} />
              {aiTyping ? 'AI is thinking...' : ''}
            </div>
          )}
          {aiResponse}
          <div
            className={`${aiResponse && !aiTyping ? 'mt-2 border-t' : ''} relative w-full pt-2`}
          >
            <textarea
              id="ai-command-input"
              className="z-5 placeholder:text-gray-500 relative inset-0 w-full resize-none rounded-md border-none bg-transparent p-2 text-sm focus:outline-none"
              placeholder=""
              onKeyDown={async e => {
                if (e.key === 'Enter' && !aiTyping) {
                  e.preventDefault();
                  processAIRequest('Generate Content');
                }
              }}
            />
          </div>
        </div>
        <section className="mt-4">
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className="hover:bg-gray-100 group relative flex cursor-pointer items-center gap-2 p-2 text-xs"
                onClick={item.onClick}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
                {item.submenu && (
                  <ChevronRight size={12} className="absolute right-0" />
                )}
                {item.submenu && (
                  <div className="min-w-sm absolute left-full top-0 ml-0 hidden rounded-md bg-white p-2 shadow-md group-hover:block">
                    {item.submenu.map((submenuItem, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={submenuItem.onClick}
                        className="hover:bg-gray-100 flex cursor-pointer items-center gap-2 p-2"
                      >
                        {submenuItem.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default AI;
