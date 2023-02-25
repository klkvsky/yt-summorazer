"use client";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [link, setLink] = useState<string>();
  const [isLinkValid, setIsLinkValid] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //
  async function getTranscription() {
    if (link) {
      const textToAdd = extractYouTubeId(link);
      const url = `/api/hello?id=${textToAdd}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setText(data.generatedSum), setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }
  //
  //
  async function getLink() {
    if (document) {
      navigator.clipboard
        .readText()
        .then((clipText) =>
          isYoutubeLink(clipText)
            ? setLink(clipText)
            : console.error("it's not a youtube link")
        );
    }
  }
  //
  //
  function isYoutubeLink(text: string): boolean {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/i;
    if (!youtubeRegex.test(text)) {
      setIsLinkValid(false);
    }
    return youtubeRegex.test(text);
  }
  function extractYouTubeId(url: string): string | null {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
    const match = url.match(regex);
    return match?.[1] || null;
  }
  //
  //
  useEffect(() => {
    if (!isLinkValid) {
      setTimeout(() => {
        setIsLinkValid(true);
      }, 1500);
    }
  }, [isLinkValid]);

  useEffect(() => {
    if (link) {
      setIsLoading(true);
      getTranscription();
    }
  }, [link]);

  return (
    <>
      <main className="bg-white min-h-screen w-screen text-black text-center flex flex-col items-center gap-[20px] pt-[20vh]">
        <a
          href="https://github.com/klkvsky/yt-summorazer"
          className="rounded-full border border-neutral-800 h-[44px] gap-2 px-3 hover:scale-[1.04] transition-all duration-300 ease-in-out cursor-pointer flex flex-row items-center group relative focus:scale-[1.04] hover:bg-black hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 peer-empty:opacity-80 group-hover:peer-empty:opacity-100"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
            ></path>
          </svg>
          <span className="grid place-items-center rounded-full text-sm font-semibold pr-1">
            Star on Github
          </span>
        </a>

        <h1 className="text-4xl lg:text-5xl font-bold max-w-lg">
          Quickly Summarize YouTube Videos Using Transcriptions
        </h1>

        <p className="hidden">47,118 videos summorized so far.</p>

        <div className="max-w-xl w-full">
          <div className="flex mt-2 lg:mt-5 items-center space-x-3">
            <button
              className={` text-white px-4 py-2 rounded-[10px] flex flex-row items-center justify-center gap-2 font-medium text-lg mx-auto    transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:shadow-sm outline-2 focus:shadow-lg  ${
                !isLoading &&
                (isLinkValid
                  ? "bg-black/80 hover:bg-black focus:bg-black focus:scale-[1.04] active:scale-[0.96] hover:scale-[1.04]"
                  : "bg-red-500")
              } ${isLoading && "bg-black/50 scale-[1.2]"}`}
              onClick={() => {
                getLink();
              }}
            >
              {isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 animate-spin"
                >
                  <circle cx="12" cy="20" r="2"></circle>
                  <circle cx="12" cy="4" r="2"></circle>
                  <circle cx="6.343" cy="17.657" r="2"></circle>
                  <circle cx="17.657" cy="6.343" r="2"></circle>
                  <circle cx="4" cy="12" r="2.001"></circle>
                  <circle cx="20" cy="12" r="2"></circle>
                  <circle cx="6.343" cy="6.344" r="2"></circle>
                  <circle cx="17.657" cy="17.658" r="2"></circle>
                </svg>
              )}
              {!isLoading &&
                (isLinkValid ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                      clipRule="evenodd"
                    />
                    <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
                    <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              <span>
                {!isLoading && (isLinkValid ? "Paste link" : "Invalid link")}
                {isLoading && "Loading"}
              </span>
            </button>
          </div>

          <p
            className="lg:shadow-xl px-6 py-4 text-left my-10 prose max-w-prose transition-all duration-500 ease-in-out shadow-md mx-4"
            style={{
              opacity: text ? 1 : 0,
              transform: `translate(${0}px, ${text ? 0 : 200}px)`,
            }}
          >
            {text}
          </p>
        </div>
      </main>
      <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
        <div>
          Powered by{" "}
          <a
            href="https://openai.com/"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline transition underline-offset-2"
          >
            OpenAI.
          </a>{" "}
          Made by{" "}
          <a
            href="https://bento.me/klkvsky"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline transition underline-offset-2"
          >
            Me
          </a>
        </div>
        <div className="flex space-x-4 pb-4 sm:pb-0">
          <Link
            href="https://twitter.com/klkvsky"
            className="group"
            aria-label="TaxPal on Twitter"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
            </svg>
          </Link>
          <Link
            href="https://github.com/klkvsky/yt-summorazer"
            className="group"
            aria-label="TaxPal on GitHub"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </Link>
        </div>
      </footer>
    </>
  );
}
