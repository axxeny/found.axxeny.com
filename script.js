const languages = [
  {
    code: "en",
    name: "English",
    dir: "ltr",
    kicker: "Lost and found",
    message: "If you found my stuff please write to",
  },
  {
    code: "zh",
    name: "Mandarin",
    dir: "ltr",
    kicker: "失物招领",
    message: "如果你找到了我的东西，请写信到",
  },
  {
    code: "hi",
    name: "Hindi",
    dir: "ltr",
    kicker: "खोया और पाया",
    message: "अगर आपको मेरी चीज़ें मिली हैं, कृपया लिखें",
  },
  {
    code: "es",
    name: "Spanish",
    dir: "ltr",
    kicker: "Objetos perdidos",
    message: "Si encontraste mis cosas, por favor escribe a",
  },
  {
    code: "ar",
    name: "Modern Standard Arabic",
    dir: "rtl",
    kicker: "المفقودات",
    message: "إذا وجدت أشيائي، فالرجاء الكتابة إلى",
  },
  {
    code: "fr",
    name: "French",
    dir: "ltr",
    kicker: "Objets trouvés",
    message: "Si vous avez trouvé mes affaires, veuillez écrire à",
  },
  {
    code: "ru",
    name: "Russian",
    dir: "ltr",
    kicker: "Бюро находок",
    message: "Если вы нашли мои вещи, пожалуйста, напишите на",
  },
  {
    code: "de",
    name: "German",
    dir: "ltr",
    kicker: "Fundbüro",
    message: "Wenn Sie meine Sachen gefunden haben, schreiben Sie bitte an",
  },
  {
    code: "uk",
    name: "Ukrainian",
    dir: "ltr",
    kicker: "Знахідки",
    message: "Якщо ви знайшли мої речі, будь ласка, напишіть на",
  },
  {
    code: "hy",
    name: "Armenian",
    dir: "ltr",
    kicker: "Գտածոներ",
    message: "Եթե գտել եք իմ իրերը, խնդրում եմ գրեք",
  },
];

const email = "found@axxeny.com";
const emailText = `mailto:${email}`;
const storageKey = "found-language";

const languageButton = document.querySelector("#languageButton");
const currentLanguage = document.querySelector("#currentLanguage");
const languageMenu = document.querySelector("#languageMenu");
const kicker = document.querySelector("#kicker");
const message = document.querySelector("#message");

function renderMessage(language) {
  document.documentElement.lang = language.code;
  document.documentElement.dir = language.dir;
  currentLanguage.textContent = language.name;
  kicker.textContent = language.kicker;
  message.innerHTML = "";

  const text = document.createTextNode(`${language.message} `);
  const link = document.createElement("a");
  link.href = `mailto:${email}`;
  link.textContent = emailText;
  const prayer = document.createElement("span");
  prayer.setAttribute("aria-label", "please");
  prayer.textContent = " 🙏";

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
  option.textContent = language.name;
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
