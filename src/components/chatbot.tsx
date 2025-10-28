"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  onChatStateChange?: (isOpen: boolean) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onChatStateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onChatStateChange?.(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onChatStateChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onChatStateChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={toggleChat}
        className={`
          fixed bottom-6 right-6 z-50 flex items-center justify-center
          rounded-full shadow-lg text-white font-medium
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "w-14 h-14 bg-primary hover:bg-primary/95"
              : "h-14 px-5 bg-primary hover:bg-primary/95 rounded-full gap-2"
          }
        `}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={22} className="transition-transform duration-200" />
        ) : (
          <>
            <Bot size={22} />
            <span className="hidden sm:inline">AgroWin Bot</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-20 sm:bottom-24 right-10 left-6 sm:right-6 sm:left-auto sm:w-sm w-86 md:w-md max-w-[calc(100vw-2rem)] sm:h-[500px] h-[400px] bg-gray-900 rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary/90 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg">AgroWin Bot</h3>
            <p className="text-sm text-blue-100">Asisten Seputar Pertanian</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 chat-scroll">
            {messages.length === 0 && (
              <div className="text-gray-400 text-sm">
                <p>
                  👋 Halo! Saya AgroWin Bot, asisten untuk membantu seputar
                  pertanian
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-primary/90 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg text-sm animate-pulse">
                  AgroWin Bot sedang mengetik...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="p-4 border-t border-gray-700 bg-gray-900 box-border"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 items-end overflow-hidden">
              <input
                type="text"
                className="min-w-0 flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ketik pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="cursor-pointer min-w-[40px] min-h-[40px] p-2 bg-primary/90 hover:bg-primary/95 text-white rounded-md flex items-center justify-center"
                disabled={isLoading}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
