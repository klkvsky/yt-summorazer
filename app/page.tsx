"use client";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { Inter } from "next/font/google";

import Generate from "./Generate";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          Welcome: "Quickly Summarize YouTube Videos",
          Github: "Star on Github",
          CTA: "Paste link",
          CTA_Invalid: "Invalid link",
          CTA_Loading: "Loading",
          Footer_Powered: "Powered by",
          Footer_Author: "Made by",
        },
      },
      ru: {
        translation: {
          Welcome: "Краткий пересказ видео на YouTube",
          Github: "Посмотреть на Github",
          CTA: "Вставить ссылку",
          CTA_Invalid: "Не правильная ссылка",
          CTA_Loading: "Загрузка",
          Footer_Powered: "Работает благодаря",
          Footer_Author: "Сделано",
        },
      },
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="text-center h-16 sm:h-20 w-full flex sm:flex-row flex-col justify-between items-center px-10 pt-4 sm:pt-0">
        <div>
          {t("Footer_Powered")}{" "}
          <a
            href="https://openai.com/"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline transition underline-offset-2"
          >
            OpenAI.
          </a>{" "}
          {t("Footer_Author")}{" "}
          <a
            href="https://bento.me/klkvsky"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline transition underline-offset-2"
          >
            klkvsky
          </a>
        </div>
        <div className="flex space-x-4 pb-4 sm:pb-0 mt-4 sm:mt-0">
          <Link
            href="https://twitter.com/klkvsky"
            className="group"
            target="_blank"
            rel="noreferrer"
            aria-label="kulikovsky on Twitter"
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
            target="_blank"
            rel="noreferrer"
            aria-label="Repository on GitHub"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </Link>
        </div>
      </nav>
      <main className="min-h-screen w-screen  text-center flex flex-col items-center gap-[20px] pt-[20vh] -mt-16 sm:-mt-20">
        <a
          href="https://github.com/klkvsky/yt-summorazer"
          className="rounded-full border border-neutral-800 h-[44px] gap-2 px-3 hover:scale-[1.04] transition-all duration-300 ease-in-out cursor-pointer flex flex-row items-center group relative focus:scale-[1.04] hover:bg-black hover:text-white dark:border-neutral-600 dark:hover:bg-neutral-800"
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
            {t("Github")}
          </span>
        </a>
        <h1 className="text-4xl lg:text-6xl font-bold max-w-xl">
          {t("Welcome")}
        </h1>
        <p className="hidden">47,118 videos summorized so far.</p>

        <Generate />
      </main>
    </>
  );
}
