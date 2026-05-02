import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SendHorizontal, X } from "lucide-react";
import { RiChat1Fill } from "react-icons/ri";
import gsap from "gsap";
import chatPanelAvatar from "../assets/ishant.jpg";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface ChatHistoryResponse {
  messages?: ChatMessage[];
}

interface ChatReplyResponse {
  reply?: string;
  error?: string;
}

const SESSION_STORAGE_KEY = "ishant-portfolio-chat-session-id";
const LAST_ACTIVITY_KEY = "ishant-portfolio-chat-last-activity";
const EXPIRATION_MS = 15 * 60 * 1000;

const DETAIL_REQUEST_PATTERN =
  /\b(expand|more detail|more details|detailed|deep dive|go deeper|elaborate|longer|full version|step by step|walk me through)\b/i;

const starters = [
  "Tell me about your best project",
  "Why should I hire you?",
  "What tech do you use?",
  "Explain Reader's Robin",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Hey, I'm Ishant. Ask me about a project, my stack, or how I build.",
  },
];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

function updateLastActivity() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  }
}

function getOrCreateSessionId() {
  if (typeof window === "undefined") {
    return "portfolio-chat-session";
  }

  const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);
  const lastActivityStr = window.localStorage.getItem(LAST_ACTIVITY_KEY);
  const now = Date.now();

  if (existingSessionId && lastActivityStr) {
    const lastActivity = parseInt(lastActivityStr, 10);
    if (now - lastActivity < EXPIRATION_MS) {
      return existingSessionId;
    }
  }

  const nextSessionId = crypto.randomUUID();
  window.localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);
  window.localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
  return nextSessionId;
}

function wantsDetailedReply(prompt: string) {
  return DETAIL_REQUEST_PATTERN.test(prompt);
}

function compactReply(reply: string) {
  const flatText = reply.replace(/\s+/g, " ").trim();
  if (flatText.length <= 320) {
    return flatText;
  }

  const sentences = flatText.match(/[^.!?]+[.!?]?/g) ?? [flatText];
  const kept: string[] = [];
  let totalLength = 0;

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) {
      continue;
    }

    const projectedLength =
      totalLength === 0 ? next.length : totalLength + 1 + next.length;
    if (kept.length > 0 && projectedLength > 320) {
      break;
    }

    kept.push(next);
    totalLength = projectedLength;

    if (kept.length >= 3) {
      break;
    }
  }

  return kept.join(" ") || flatText.slice(0, 320).trimEnd();
}

function getLocalFallbackReply(prompt: string): string {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes("tell me about yourself") ||
    normalized.includes("about yourself") ||
    normalized.includes("who are you")
  ) {
    return "I'm Ishant, a full-stack developer based in Bilaspur. I work mostly with React, Next.js, Node.js, PostgreSQL, and MongoDB.\n\nFrontend is probably where I obsess the most, but I care just as much about backend structure, performance, and shipping something that feels clean in real use.\n\nBasically, I like building products that are practical, scalable, and not over-engineered.";
  }

  if (normalized.includes("weakness")) {
    return "Honestly, I can spend too much time refining details when I really care about the product. The upside is the quality usually goes up. The downside is I have to stay strict about scope, so I've gotten better at deciding what actually moves the product forward and what can wait.";
  }

  if (
    normalized.includes("non-technical") ||
    normalized.includes("non technical") ||
    normalized.includes("simple")
  ) {
    return "In simple terms, I build web products that people can actually use without friction. That means I handle the interface people see, the backend logic behind it, and the performance side so the whole thing feels fast and reliable.";
  }

  if (normalized.includes("college connections")) {
    return "College Connections was built as an academic networking platform, and it ended up with 500+ active users. I used Next.js, PostgreSQL, AWS S3, and Auth.js there.\n\nThe interesting part was making discovery actually useful, so I built stronger search and filtering that cut discovery time by about 45%, and role-based auth helped push engagement up too.";
  }

  if (normalized.includes("streamify")) {
    return "Yeah, Streamify was one of the more backend-heavy builds for me. It's a real-time chat and video platform using React, Express, MongoDB, and Stream Chat SDK.\n\nI focused a lot on auth and performance there - JWT auth with HTTP-only cookies, solid test coverage, and API optimizations that got response times down by around 40%.";
  }

  if (normalized.includes("reader") && normalized.includes("robin")) {
    return "Reader's Robin is probably the best example of how I like to build. It's a social reading platform with Next.js, Express, and MongoDB, plus Google OAuth, JWT auth, real-time messaging, and a privacy model around who can see what.\n\nWhat made it interesting was the mix of product depth and engineering tradeoffs - external book APIs, an AI vocabulary layer through SambaNova, and caching to cut latency instead of brute-forcing every request.";
  }

  if (normalized.includes("compare") && normalized.includes("project")) {
    return "Reader's Robin is stronger from a product complexity point of view - more moving parts, more user-facing depth, more tradeoffs around privacy and integrations. Streamify is more about real-time systems, auth, and backend discipline.\n\nSo if you're asking which one shows product thinking, I'd say Reader's Robin. If you're asking which one shows systems work more clearly, Streamify.";
  }

  if (normalized.includes("hire")) {
    return "You should hire me if you want someone who can build end-to-end without turning everything into a mess six weeks later. I can handle frontend polish, backend logic, and the product decisions in between.\n\nWhat you really get with me is someone who cares about performance, clean architecture, and user experience at the same time. I don't just make features work - I try to make them feel right.";
  }

  if (
    normalized.includes("tech") ||
    normalized.includes("stack") ||
    normalized.includes("tools") ||
    normalized.includes("use")
  ) {
    return "My main stack is React, Next.js, Node.js, PostgreSQL, and MongoDB. I lean pretty hard into frontend quality, but I'm comfortable going deep on backend architecture, auth, APIs, and performance too.\n\nSo yeah, I usually think in terms of full product systems, not just isolated screens.";
  }

  if (normalized.includes("best project")) {
    return "Best project? I'd probably say Reader's Robin, with Streamify very close behind.\n\nReader's Robin stands out because it had a better mix of product thinking and engineering depth - auth, privacy controls, real-time messaging, external integrations, AI vocabulary features, and caching. It felt like a real system, not just a demo app.";
  }

  if (
    normalized.includes("achievement") ||
    normalized.includes("award") ||
    normalized.includes("hackathon") ||
    normalized.includes("dsa")
  ) {
    return "A few good ones: I won Hackovation 2.0 and Ideathon 2024, was runner-up at the CSVTU Hackathon, made the Top 10 in Summer of Code 2024, and I've solved 250+ DSA problems.\n\nI like that mix because it shows both execution and problem-solving, not just one side.";
  }

  if (normalized.includes("experience") || normalized.includes("gdg") || normalized.includes("marketing")) {
    return "I have 2+ years of experience building on the web, and I was also the Marketing Lead at GDG GEC Bilaspur. That role was useful because it forced me to think about execution beyond code - campaigns, events, team coordination, and how to actually get people engaged.\n\nWe pushed participation up by 30% and reached 1000+ students, so it wasn't just a title thing.";
  }

  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return "Hey, glad you're here. Ask me about a project, my stack, or how I think about building products, and I'll keep it direct.";
  }

  if (normalized.includes("project")) {
    return "I've worked on things like Reader's Robin, Streamify, and College Connections - each one taught me something different about building real products. If you want, ask me about one specific project and I'll break it down properly instead of giving you the resume version.";
  }

  return "Short version: I'm a full-stack developer who likes building products that feel clean, fast, and actually useful. If you want something more specific, ask me about a project, my stack, or how I work.";
}

const PortfolioChat = () => {
  const [sessionId, setSessionId] = useState(getOrCreateSessionId);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || hasOpened || !highlightRef.current) return;

    const ctx = gsap.context(() => {
      // Intro pop-up
      gsap.fromTo(
        highlightRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          delay: 3.5,
        },
      );

      // Continuous float
      gsap.to(highlightRef.current, {
        y: -6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4.3,
      });
    });

    return () => ctx.revert();
  }, [isOpen, hasOpened]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isOpen) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, isTyping, messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastActivityStr = window.localStorage.getItem(LAST_ACTIVITY_KEY);
      if (lastActivityStr) {
        const lastActivity = parseInt(lastActivityStr, 10);
        if (Date.now() - lastActivity >= EXPIRATION_MS) {
          setMessages(INITIAL_MESSAGES);
          const newSessionId = crypto.randomUUID();
          window.localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
          window.localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
          setSessionId(newSessionId);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadHistory = async () => {
      try {
        const response = await fetch(`/api/chat/${sessionId}`);
        if (!response.ok) return;

        const data = (await response.json()) as ChatHistoryResponse;
        if (!isCancelled && data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch {
        // Keep the default greeting if the backend is not reachable yet.
      }
    };

    void loadHistory();

    return () => {
      isCancelled = true;
    };
  }, [sessionId]);

  const hasUserMessage = messages.some((message) => message.role === "user");

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isTyping) return;

    updateLastActivity();

    setMessages((current) => [...current, createMessage("user", trimmed)]);
    setDraft("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
        }),
      });

      const data = (await response.json()) as ChatReplyResponse;
      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Unable to send message right now.");
      }

      setMessages((current) => [...current, createMessage("assistant", data.reply as string)]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to send message right now.";

      const fallbackReply = errorMessage
        .toLowerCase()
        .includes("failed to fetch")
        ? [
            "The chat server is not reachable right now, so I'm using the local fallback.",
            wantsDetailedReply(trimmed)
              ? getLocalFallbackReply(trimmed)
              : compactReply(getLocalFallbackReply(trimmed)),
          ].join("\n\n")
        : errorMessage;

      setMessages((current) => [...current, createMessage("assistant", fallbackReply)]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <div className="chat-dock">
      {isOpen ? (
        <section
          id="portfolio-chat"
          className="chat-panel"
          aria-label="Chat with Ishant"
        >
          <div className="chat-panel__header">
            <div className="chat-panel__identity">
              <span className="chat-panel__avatar">
                <img
                  src={chatPanelAvatar}
                  alt="Ishant Sinha"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
              </span>
              <div>
                <p className="chat-panel__title">Ishant Sinha</p>
                <p className="chat-panel__status">
                  <span className="chat-panel__status-dot" aria-hidden="true" />
                  Online
                </p>
              </div>
            </div>
          </div>

          <div ref={viewportRef} className="chat-panel__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-message--${message.role}`}
              >
                <span className="chat-message__label">
                  {message.role === "assistant" ? "Ishant" : "You"}
                </span>
                <p
                  className={`chat-message__bubble chat-message__bubble--${message.role}`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {!hasUserMessage ? (
              <div className="chat-starters">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="chat-starters__button"
                    onClick={() => {
                      void sendMessage(starter);
                    }}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}

            {isTyping ? (
              <div className="chat-message chat-message--assistant">
                <span className="chat-message__label">Ishant</span>
                <div
                  className="chat-message__bubble chat-message__bubble--assistant chat-typing"
                  aria-label="Ishant is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>

          <form className="chat-composer" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="chat-composer__input"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask Ishant about work, stack, or projects"
            />
            <button
              type="submit"
              className="chat-composer__send"
              aria-label="Send message"
              disabled={!draft.trim() || isTyping}
            >
              <SendHorizontal size={16} strokeWidth={2.2} />
            </button>
          </form>
        </section>
      ) : null}

      <div className="relative pointer-events-auto">
        {!isOpen && !hasOpened ? (
          <div
            ref={highlightRef}
            className="absolute bottom-full right-0 mb-4 w-56 opacity-0 rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-widest text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ishant.ai
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasOpened(true);
                }}
                className="text-white/40 transition-colors hover:text-white"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-sm font-medium leading-tight text-white/90">
              Got questions?
              <span className="block mt-1 text-xs font-normal text-white/60">
                Ask me about my projects, stack, or experience.
              </span>
            </p>
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-zinc-950" />
          </div>
        ) : null}

        <button
          type="button"
          className="chat-fab"
          aria-controls="portfolio-chat"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          onClick={() => {
            setIsOpen((open) => !open);
            setHasOpened(true);
          }}
        >
          {isOpen ? <X size={24} strokeWidth={2.1} /> : <RiChat1Fill />}
        </button>
      </div>
    </div>
  );
};

export default PortfolioChat;
