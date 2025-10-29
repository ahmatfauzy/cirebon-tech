"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Hand } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** utk efek ketikan */
  show?: string;
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

  /* ---------- buka/tutup ---------- */
  const toggleChat = () => {
    const next = !isOpen;
    setIsOpen(next);
    onChatStateChange?.(next);
    /* first open → tampilkan sambutan */
    if (next && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "",
          show: "",
        },
      ]);
      /* mulai animasi ketik */
      setTimeout(
        () =>
          typeText(
            "welcome",
            "👋 Halo! Saya AgroBot, asisten untuk membantu seputar pertanian"
          ),
        300
      );
    }
  };

  /* ---------- klik di luar ---------- */
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        onChatStateChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onChatStateChange]);

  /* ---------- efek ketik ---------- */
  const typeText = (id: string, text: string) => {
    let idx = 0;
    const interval = setInterval(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, show: text.slice(0, idx + 1) } : m
        )
      );
      idx++;
      if (idx >= text.length) clearInterval(interval);
    }, 25);
  };

  /* ---------- kirim pesan ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      show: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(String(res.status));

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || data.message,
        show: "",
      };

      setMessages((prev) => [...prev, botMsg]);
      typeText(botMsg.id, botMsg.content); // animasi ketik
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        show: "",
      };
      setMessages((prev) => [...prev, errMsg]);
      typeText(errMsg.id, errMsg.content);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <>
      {/* tombol floating */}
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
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <>
            <Bot size={22} />
            <span className="hidden sm:inline">AgroBot</span>
          </>
        )}
      </button>

      {/* jendela chat */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-20 sm:bottom-24 right-10 left-6 sm:right-6 sm:left-auto sm:w-sm w-86 md:w-md max-w-[calc(100vw-2rem)] sm:h-[500px] h-[400px] bg-gray-900 rounded-lg shadow-2xl z-40 flex flex-col overflow-hidden"
        >
          {/* header */}
          <div className="bg-primary/90 text-white p-4 rounded-t-lg flex items-center gap-3">
            <Hand className="w-5 h-5 animate-pulse" />
            <div>
              <h3 className="font-semibold text-lg">AgroBot</h3>
              <p className="text-sm text-blue-100">Asisten Seputar Pertanian</p>
            </div>
          </div>

          {/* area pesan */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 chat-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary/90 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.show}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg text-sm animate-pulse">
                  AgroBot sedang mengetik...
                </div>
              </div>
            )}
          </div>

          {/* input */}
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
                className="cursor-pointer min-w-[40px] min-h-[40px] p-2 bg-primary/90 hover:bg-primary/95 text-white rounded-md flex items-center justify-center disabled:opacity-60"
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
