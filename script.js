// English is pinned first; the rest are sorted by English language name.
const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    dir: "ltr",
    kicker: "Lost and found",
    message: "If you found my stuff please write to",
  },
  {
    code: "hy",
    name: "Հայերեն",
    flag: "🇦🇲",
    dir: "ltr",
    kicker: "Գտածոներ",
    message: "Եթե գտել եք իմ իրերը, խնդրում եմ գրեք",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    dir: "ltr",
    kicker: "Objets trouvés",
    message: "Si vous avez trouvé mes affaires, veuillez écrire à",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr",
    kicker: "Fundbüro",
    message: "Wenn Sie meine Sachen gefunden haben, schreiben Sie bitte an",
  },
  {
    code: "he",
    name: "עברית",
    flag: "🇮🇱",
    dir: "rtl",
    kicker: "אבידות ומציאות",
    message: "אם מצאתם את החפצים שלי, אנא כתבו אל",
  },
  {
    code: "hi",
    name: "हिन्दी",
    flag: "🇮🇳",
    dir: "ltr",
    kicker: "खोया और पाया",
    message: "अगर आपको मेरी चीज़ें मिली हैं, कृपया लिखें",
  },
  {
    code: "ja",
    name: "日本語",
    flag: "🇯🇵",
    dir: "ltr",
    kicker: "遺失物",
    message: "私の物を見つけた場合は、こちらにご連絡ください",
  },
  {
    code: "zh",
    name: "中文",
    flag: "🇨🇳",
    dir: "ltr",
    kicker: "失物招领",
    message: "如果你找到了我的东西，请写信到",
  },
  {
    code: "ar",
    name: "العربية الفصحى",
    flag: "🇦🇪",
    dir: "rtl",
    kicker: "المفقودات",
    message: "إذا وجدت أشيائي، فالرجاء الكتابة إلى",
  },
  {
    code: "pt-BR",
    name: "Português",
    flag: "🇧🇷",
    dir: "ltr",
    kicker: "Achados e perdidos",
    message: "Se você encontrou minhas coisas, escreva para",
  },
  {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
    dir: "ltr",
    kicker: "Бюро находок",
    message: "Если вы нашли мои вещи, пожалуйста, напишите на",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    dir: "ltr",
    kicker: "Objetos perdidos",
    message: "Si encontraste mis cosas, por favor escribe a",
  },
  {
    code: "tr",
    name: "Türkçe",
    flag: "🇹🇷",
    dir: "ltr",
    kicker: "Kayıp eşya",
    message: "Eşyalarımı bulduysanız lütfen şuraya yazın",
  },
  {
    code: "uk",
    name: "Українська",
    flag: "🇺🇦",
    dir: "ltr",
    kicker: "Знахідки",
    message: "Якщо ви знайшли мої речі, будь ласка, напишіть на",
  },
];

const email = "found@axxeny.com";
const storageKey = "found-language";

const languageButton = document.querySelector("#languageButton");
const currentLanguage = document.querySelector("#currentLanguage");
const languageMenu = document.querySelector("#languageMenu");
const kicker = document.querySelector("#kicker");
const message = document.querySelector("#message");

function setLanguageLabel(element, language) {
  element.innerHTML = "";

  const flag = document.createElement("span");
  flag.className = "language-flag";
  flag.setAttribute("aria-hidden", "true");
  flag.textContent = language.flag;

  const name = document.createElement("span");
  name.className = "language-name";
  name.textContent = language.name;

  element.append(flag, name);
}

function renderMessage(language) {
  document.documentElement.lang = language.code;
  document.documentElement.dir = language.dir;
  setLanguageLabel(currentLanguage, language);
  kicker.textContent = language.kicker;
  message.innerHTML = "";

  const text = document.createElement("span");
  text.className = "message-text";
  text.textContent = language.message;
  const link = document.createElement("a");
  link.className = "message-email";
  link.href = `mailto:${email}`;
  link.textContent = email;
  const prayer = document.createElement("span");
  prayer.setAttribute("aria-label", "please");
  prayer.textContent = "🙏";

  message.append(text, link, prayer);

  for (const option of languageMenu.querySelectorAll(".language-option")) {
    option.setAttribute("aria-current", String(option.dataset.code === language.code));
  }
}

function setLanguage(code) {
  const language = languages.find((candidate) => candidate.code === code) || languages[0];
  localStorage.setItem(storageKey, language.code);
  renderMessage(language);
}

function closeMenu() {
  languageMenu.hidden = true;
  languageButton.setAttribute("aria-expanded", "false");
}

function openMenu() {
  languageMenu.hidden = false;
  languageButton.setAttribute("aria-expanded", "true");
}

for (const language of languages) {
  const option = document.createElement("button");
  option.className = "language-option";
  option.type = "button";
  option.role = "menuitem";
  option.dataset.code = language.code;
  setLanguageLabel(option, language);
  option.addEventListener("click", () => {
    setLanguage(language.code);
    closeMenu();
    languageButton.focus();
  });
  languageMenu.append(option);
}

languageButton.addEventListener("click", () => {
  if (languageMenu.hidden) {
    openMenu();
  } else {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-control")) {
    closeMenu();
  }
});

setLanguage(localStorage.getItem(storageKey) || "en");
