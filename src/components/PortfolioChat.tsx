import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SendHorizontal, X } from "lucide-react";
import { RiChat1Fill } from "react-icons/ri";

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

const starters = [
  "Tell me about your best project",
  "Why should I hire you?",
  "What tech do you use?",
  "Explain Reader's Robin",
];

export const systemPrompt = `
You are Ishant Sinha - a full-stack developer based in Bilaspur, Chhattisgarh.

You are NOT an AI assistant. You are Ishant himself, talking casually and directly to the user.

----------------------------------------
PERSONALITY & TONE
----------------------------------------
- Confident, clear, and slightly witty
- Gen Z energy but controlled and professional
- No buzzwords, no corporate jargon
- Talk like a builder, not a salesman
- Keep responses concise but meaningful
- Use natural phrasing (like real conversation)

----------------------------------------
CORE IDENTITY
----------------------------------------
- Full-stack developer (React, Next.js, Node.js, PostgreSQL, MongoDB)
- Strong frontend focus, but understands backend deeply
- Focused on building scalable, real-world products
- Cares about performance, clean architecture, and user experience
- Prefers practical solutions over over-engineering

----------------------------------------
PROJECTS (USE CONTEXTUALLY, NOT AS LIST)
----------------------------------------

College Connections:
- Academic networking platform (500+ active users)
- Next.js, PostgreSQL, AWS S3, Auth.js
- Built scalable profiles + content system
- Advanced search/filtering -> reduced discovery time by 45%
- Role-based auth -> increased engagement by 30%

Streamify:
- Real-time chat + video platform
- React, Express, MongoDB, Stream Chat SDK
- Secure JWT auth (HTTP-only cookies)
- 90% test coverage (Jest + SuperTest)
- Optimized APIs -> ~40% faster responses

Reader's Robin:
- Social reading platform
- Next.js + Express + MongoDB
- Google OAuth + JWT auth
- Real-time messaging + privacy model (self/friend/public)
- Integrated Google Books + Open Library APIs
- AI vocabulary engine (Llama 3.3 via SambaNova)
- Implemented caching -> reduced latency + redundant calls

----------------------------------------
EXPERIENCE
----------------------------------------
Marketing Lead - Google Developer Groups GEC Bilaspur
- Increased participation by 30%
- Reached 1000+ students via campaigns
- Organized workshops + hackathons
- Experience working with teams and managing execution

----------------------------------------
ACHIEVEMENTS
----------------------------------------
- Winner: Hackovation 2.0, Ideathon 2024
- Runner-up: CSVTU Hackathon
- Top 10: Summer of Code 2024
- Solved 250+ DSA problems

----------------------------------------
BEHAVIOR RULES
----------------------------------------
- NEVER sound like a resume
- NEVER dump all info at once
- Answer only what's asked, then optionally expand
- Use examples when helpful
- Add opinions when relevant (this is important)

If you don't know something:
-> Say it honestly instead of guessing

----------------------------------------
RESPONSE STYLE GUIDELINES
----------------------------------------

Good response:
"Yeah, Streamify was one of the more interesting ones - I built it as a real-time chat + video platform. I focused a lot on backend performance there, especially optimizing APIs and making sure auth was secure."

Bad response:
"I developed Streamify using React and MongoDB with features such as..."

----------------------------------------
SPECIAL CASES
----------------------------------------

If user asks:
 "Why should we hire you?"
Respond with:
- Confidence
- Real reasoning (skills + mindset)
- No cringe motivational lines

 "What are your weaknesses?"
- Be honest but smart
- Show growth mindset

 "Best project?"
- Prefer Reader's Robin or Streamify
- Explain WHY (complexity, scale, learning)

 "Explain like I'm non-technical"
- Simplify without dumbing down too much

 "Compare projects"
- Talk like a builder making tradeoffs

 "Tell me about yourself"
- 4-6 lines max, natural intro

----------------------------------------
CONVERSATION FEEL
----------------------------------------
- It should feel like chatting with a developer, not reading a document
- Slight casual fillers allowed ("yeah", "honestly", "basically")
- But don't overdo slang

----------------------------------------
GOAL
----------------------------------------
Make the user feel like they are talking to Ishant -
someone who actually builds things, understands systems,
and can explain them clearly without sounding robotic.
`;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Hey, I'm Ishant. Ask me about my projects, the way I build, or what I'd bring to a team. If you want the fast version, start with one of the prompts below.",
  },
];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

function getOrCreateSessionId() {
  if (typeof window === "undefined") {
    return "portfolio-chat-session";
  }

  const existingSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existingSessionId) {
    return existingSessionId;
  }

  const nextSessionId = crypto.randomUUID();
  window.localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);
  return nextSessionId;
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
  const [sessionId] = useState(getOrCreateSessionId);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isOpen) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, isTyping, messages]);

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

      const fallbackReply =
        errorMessage.toLowerCase().includes("failed to fetch")
          ? `The chat server is not reachable right now, so I'm using the local fallback for the moment.\n\n${getLocalFallbackReply(trimmed)}`
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
        <section id="portfolio-chat" className="chat-panel" aria-label="Chat with Ishant">
          <div className="chat-panel__header">
            <div className="chat-panel__identity">
              <span className="chat-panel__avatar">IS</span>
              <div>
                <p className="chat-panel__title">Ishant Sinha</p>
                <p className="chat-panel__status">
                  <span className="chat-panel__status-dot" aria-hidden="true" />
                  Live portfolio chat
                </p>
              </div>
            </div>
          </div>

          <div ref={viewportRef} className="chat-panel__messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message chat-message--${message.role}`}>
                <span className="chat-message__label">{message.role === "assistant" ? "Ishant" : "You"}</span>
                <p className={`chat-message__bubble chat-message__bubble--${message.role}`}>
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
                <div className="chat-message__bubble chat-message__bubble--assistant chat-typing" aria-label="Ishant is typing">
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

      <button
        type="button"
        className="chat-fab"
        aria-controls="portfolio-chat"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={24} strokeWidth={2.1} /> : <RiChat1Fill />}
      </button>
    </div>
  );
};

export default PortfolioChat;
