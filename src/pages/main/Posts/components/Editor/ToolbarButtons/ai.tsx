/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify, Check, PenLine, Wand2 } from 'lucide-react';
import { Icons } from '../icons';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import toast from 'react-hot-toast';
import useAppStore from '@/lib/store/app.store';

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  isButton?: boolean;
  onClick?: () => void;
};

const api_endpoint = 'https://api.dev.vhdo.org';

interface AIProps {
  editor: Editor;
}

const AI: React.FC<AIProps> = ({ editor }) => {
  const [menu, setMenu] = useState<MenuItem[]>(initializeMenu());
  const [aiResponse, setAiResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const aiResponseRef = useRef(aiResponse);
  const [lastRequest, setLastRequest] = useState<{
    endpoint: string;
    action: string;
  } | null>(null);

  function initializeMenu(): MenuItem[] {
    return [
      {
        title: 'Correct Phrase',
        icon: <AlignJustify size={14} />,
        onClick: () => processAIRequest('Correct Phrase'),
      },
      {
        title: 'Translate Text',
        icon: <Icons.language />,
        onClick: () => processAIRequest('Translate Text'),
      },
      {
        title: 'Analyze Text',
        icon: <PenLine size={14} />,
        onClick: () => processAIRequest('Analyze Text'),
      },
      {
        title: 'Health Query',
        icon: <Icons.add size={15} />,
        onClick: () => processAIRequest('Health Query'),
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

  const getRequestDetails = (action: string, text: string) => {
    const requests: Record<string, { endpoint: string; body: any }> = {
      'Correct Phrase': {
        endpoint: `${api_endpoint}/api/ai/correct-phrase`,
        body: {
          phrase: `Act as a grammar expert and correct the following phrase: "${text}"`,
        },
      },
      'Translate Text': {
        endpoint: `${api_endpoint}/api/ai/translate-text`,
        body: {
          text: `Translate this text into Spanish while preserving the original meaning: "${text}"`,
          language: 'spanish',
        },
      },
      'Analyze Text': {
        endpoint: `${api_endpoint}/api/ai/analyze-text`,
        body: {
          question: `Analyze the following text and provide insights on its themes and meanings: "${text}"`,
        },
      },
      'Health Query': {
        endpoint: `${api_endpoint}/api/ai/health-query`,
        body: {
          question: `Act as a medical advisor and answer this health-related query: "${text}"`,
        },
      },
      'Summarize Content': {
        endpoint: `${api_endpoint}/api/ai/summarize-content`,
        body: {
          content: `Provide a detailed summary of the following content: "${text}"`,
        },
      },
      'Generate Content': {
        endpoint: `${api_endpoint}/api/ai/generate-content`,
        body: {
          topic: `Generate content based on this topic and ensure it is organized and comprehensive: "${text}"`,
        },
      },
    };

    return requests[action] || {};
  };

  const processAIRequest = async (action: string) => {
    const selectedText = getSelectedText();
    if (!selectedText)
      return toast.error('No text selected for AI processing.');

    const { endpoint, body } = getRequestDetails(action, selectedText);
    setAiTyping(true);
    setAiResponse('');
    setLastRequest({ endpoint, action });

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
        updateMenuAfterResponse();
      } else throw new Error(`Error: ${response.statusText}`);
    } catch (error) {
      toast.error(`Something went wrong - ${error}`);
    } finally {
      setAiTyping(false);
    }
  };

  const retryLastRequest = () => {
    if (lastRequest?.action) processAIRequest(lastRequest.action);
    else toast.error('No previous request to retry.');
  };

  // Stream AI response (typewriter effect)
  const streamAIResponse = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      setAiResponse(prev => prev + text[i]);
    }
  };

  // Update menu after AI response
  const updateMenuAfterResponse = () => {
    setMenu([
      { title: 'Accept', icon: <Check size={14} />, onClick: insertAIResponse },
      { title: 'Discard', icon: <Icons.close size={14} />, onClick: resetMenu },
      {
        title: 'Try Again',
        icon: <Icons.repeat size={14} />,
        onClick: retryLastRequest,
      },
    ]);
  };

  useEffect(() => {
    aiResponseRef.current = aiResponse;
  }, [aiResponse]);

  // Insert AI response into the editor
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

  // Reset menu to initial state
  const resetMenu = () => {
    setMenu(initializeMenu());
    setAiResponse('');
  };

  // Extract selected text from editor
  const getSelectedText = (): string => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, ' ');
  };

  const handleTextareaFocus = () => {
    setIsTextareaActive(true);
  };

  const handleTextareaBlur = () => {
    setIsTextareaActive(false);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 0) {
      setIsTextareaActive(true);
    } else {
      setIsTextareaActive(false);
    }
  };

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-txtColor border-gray-300 flex items-center justify-center gap-2 border"
            variant="outline"
          >
            <Wand2 size={16} /> <p>Ask AI</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[36rem] p-2">
          {/* Streaming AI Response */}
          <div
            className="bg-background relative mt-4 min-h-[5rem] rounded-lg p-2"
            id="ai-response"
          >
            {aiTyping && !aiResponse ? (
              <div className="text-txtColor z-4 absolute top-0 mt-2 flex items-center gap-2 text-xs">
                <Wand2 size={14} />
                {aiTyping ? 'AI is typing...' : ''}
              </div>
            ) : null}
            {aiResponse}
            <div
              className={`${aiResponse && !aiTyping ? 'mt-4 border-t' : ''} relative  w-full pt-2`}
            >
              {!isTextareaActive && !aiTyping && (
                <div className="text-txtColor z-4 absolute top-0 mt-2 flex items-center gap-2 text-xs">
                  <Wand2 size={14} />
                  {aiTyping ? 'AI is typing...' : 'Ask AI to improve the text'}
                </div>
              )}
              <textarea
                id="ai-command-input"
                className="z-5 placeholder:text-gray-500 relative inset-0 w-full resize-none rounded-md border-none bg-transparent p-2 text-sm focus:outline-none"
                placeholder=""
                onFocus={handleTextareaFocus}
                onBlur={handleTextareaBlur}
                onChange={handleTextareaChange}
                onKeyDown={async e => {
                  if (e.key === 'Enter' && !aiTyping) {
                    processAIRequest(`${api_endpoint}/api/ai/generate-content`);
                  }
                }}
              />
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menu.map((item, index) => (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  onClick={e => {
                    e.preventDefault();
                    item.onClick && item.onClick();
                  }}
                  className="hover:bg-blue-600 group cursor-pointer "
                >
                  {item.icon && (
                    <span className="mr-2 group-hover:text-white">
                      {item.icon}
                    </span>
                  )}
                  <p className="text-txtColor group-hover:text-white">
                    {item.title}
                  </p>
                </DropdownMenuItem>
                {index < menu.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AI;
