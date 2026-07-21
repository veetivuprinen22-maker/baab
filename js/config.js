// ═══════════════════════════════════════════════════════════════
//  MUOKKAA TÄTÄ TIEDOSTOA — kaikki sivun sisältö on tässä!
//  Vaihda tekstit, päivämäärä, kuvat ja kysymykset omiksesi.
// ═══════════════════════════════════════════════════════════════

const CONFIG = {

  // ── Salasanaportti ───────────────────────────────────────────
  gateTitle: "Arvaa salasana🤭",
  gateHint: "Vinkki (päivämäärä)",
  gatePlaceholder: "esim. pp.kk.vvvv",
  gateButton: "Avaa",
  // Hyväksytyt vastaukset — vain numerot lasketaan, joten
  // 15.2.2025, 15/02/2025 ja 1522025 kelpaavat kaikki.
  gatePasswords: ["15022025", "1522025", "150225", "15225"],
  gateWrongTexts: [
    "Väärin meni! 😜 Mieti meitä...",
    "Ei ihan... kokeile vielä! 💭",
    "Hmm, kyllä sinä tämän tiedät! ❤️",
  ],

  // ── Aloitus ──────────────────────────────────────────────────
  heroName: "Nella ❤️",
  heroSubtitle: "Hyvää syntymäpäivää Baatiii!!! Tässä pikku lahja🎁",

  // ── Kakku ja kynttilät ───────────────────────────────────────
  cakeTitle: "Puhalla kynttilät! 🎂",
  cakeSubtitle: "Sammuta kynttilät napauttamalla niitä ja toivo jotain",
  cakeCandles: 5,                             // kynttilöiden määrä (esim. ikä)
  cakeDoneText: "Kaikki sammutettu! Toiveesi on matkalla... ✨❤️",
  cakeText: "Nella ❤️",                       // teksti kakun kyljessä

  // ── Raaputuskuva ─────────────────────────────────────────────
  scratchTitle: "Eikö me ollakin söpöjä?",
  scratchPhoto: "img/meidan-kuva.svg",        // vaihda omaan kuvaan (img-kansioon), esim. "img/me.jpg"

  // ── Rakkauskirje ─────────────────────────────────────────────
  letterTitle: "Kirje sinulle",
  letterText: `Rakas,

tähän tulee sinun oma kirjeesi hänelle.
Kirjoita niin monta kappaletta kuin haluat —
kirje rullaa tarvittaessa.

Sinun,
Veeti ❤️`,

  // ── Aikaa yhdessä ────────────────────────────────────────────
  togetherTitle: "Aikaa yhdessä",
  togetherSubtitle: "Olemme olleet yhdessä jo",
  relationshipStart: "2025-02-15T00:00:00",   // seurustelun alkupäivä (VVVV-KK-PP)

  // ── Kukkanappi ───────────────────────────────────────────────
  flowerButtonText: "Tästä vähän kukkia baatille <3",
  flowerEmojis: ["🌸", "🌹", "🌷", "🌻", "🌼", "💐", "🪻", "🌺"],

  // ── Asioita joita rakastan sinussa ───────────────────────────
  loveListTitle: "Kaksi asiaa, mitä rakastan sussa",
  loveListSubtitle: "",
  // Sivut näytetään yksi kerrallaan — selaa nuolilla. Lisää niin monta kuin haluat.
  lovePages: [
    "Sun silmät 👀",
    "Sun hymy 😊",
    "Puijjasinn. Niitä on paljon enemmän 😝",
  ],

  // ── Kuvagalleria ─────────────────────────────────────────────
  galleryTitle: "Meidän hetkiä",
  gallerySubtitle: "Klikkaa kuvaa nähdäksesi sen isompana",
  gallery: [
    // Lisää kuvia img-kansioon ja listaa ne tähän:
    { src: "img/galleria-1.svg", caption: "Tähän kuvateksti" },
    { src: "img/galleria-2.svg", caption: "Toinen muisto" },
    { src: "img/galleria-3.svg", caption: "Kolmas muisto" },
  ],

  // ── Sydänsade-peli ───────────────────────────────────────────
  gameTitle: "Sydänsade 💘",
  gameSubtitle: "Liikuta koria ja nappaa sydämet — mutta vältä hevarinakkeja!",
  gameCatcher: "🧺",
  gameGood: "❤️",
  gameBad: "img/hevarinakki.png",
  gameLives: 3,
  gameOverTexts: {
    great: "Huikeaa! Sydämet ovat sinulla varmassa tallessa 😍",   // 25+ pistettä
    ok: "Hyvä saalis! 💕 Vielä uusiksi?",                          // 10–24
    meh: "Hevarinakit veivät voiton... kokeile uudestaan! 🌭",     // alle 10
  },

  // ── Kartta ───────────────────────────────────────────────────
  mapTitle: "Meidän paikat 🗺️",
  mapSubtitle: "Napauta sydämiä nähdäksesi mitä niissä tapahtui",
  // Kerro paikat (nimi + mitä siellä tapahtui), niin lisään koordinaatit.
  mapPlaces: [
    { name: "Fontana, Vaasa", text: "Täällä näimme ensimmäisen kerran 11.9.2024 💫", img: "img/fontana-1.jpg", lat: 63.0963, lng: 21.6147 },
    { name: "Babula <3", text: "", emoji: "🏠", lat: 63.0941, lng: 21.6178 },
    { name: "Hurghada, Egypti", text: "Ensimmäinen lomamatkamme 🌴", emoji: "✈️", imgs: ["img/hurghada-1.jpg", "img/hurghada-2.jpg"], lat: 27.1747, lng: 33.8231 },
    { name: "Sofia, Bulgaria", text: "Toinen lomamatkamme 🇧🇬", emoji: "✈️", img: "img/sofia-1.jpg", lat: 42.6977, lng: 23.3219 },
    { name: "Niš, Serbia", text: "Roadtrip! Ajoimme tänne Sofiasta 🛣️", emoji: "🚗", img: "img/nis-1.jpg", lat: 43.3209, lng: 21.8958 },
    // Lisää paikkoja samalla kaavalla. "emoji" (oletus ❤️) ja "img" ovat
    // vapaaehtoisia — img näyttää kuvan kuplassa:
    // { name: "Paikka", text: "Muisto", emoji: "⭐", img: "img/kuva.jpg", lat: 0.0, lng: 0.0 },
  ],

  // ── Quiz ─────────────────────────────────────────────────────
  quizTitle: "Pikku visailu hihi😄",
  quizSubtitle: "",
  quiz: [
    {
      question: "Missä näimme ensimmäisen kerran?",
      options: ["Koulussa", "Fontana", "Kaverin kautta", "Netissä"],
      correct: 1,
    },
    {
      question: "Mikä on lempiruokamme yhdessä?",
      options: ["Pizza", "Hevarinakki", "Tacot", "Carppis"],
      correct: 3,
    },
    {
      question: "Minkä sarjan olemme katsoneet yhdessä loppuun?",
      options: ["Frendit", "Young Sheldon", "You", "Big Bang Theory"],
      correct: 1,
    },
    // Lisää kysymyksiä samalla kaavalla. "correct" on oikean
    // vaihtoehdon numero alkaen nollasta (0 = ensimmäinen).
  ],
  quizVerdicts: {
    perfect: "Täydet pisteet! 🥇❤️",
    good: "Melkein täydet! Aika hyvin muistettu. 💘",
    ok: "Ihan hyvä — mutta taidetaan tarvita treffi-ilta kertaamaan! 😄",
  },

  // ── Muistipeli ───────────────────────────────────────────────
  memoryTitle: "Muistipeli",
  memorySubtitle: "Etsi parit! Voit myöhemmin vaihtaa emojit meidän kuviin.",
  // Joko emojeja TAI kuvapolkuja (esim. "img/pari-1.jpg"). 6 kpl = 12 korttia.
  memoryItems: ["❤️", "🌹", "🐻", "🍕", "🎬", "☕"],
  memoryWinText: "Löysit kaikki parit! Aivan kuten löysit minut. 😌❤️",

  // ── Palkintopyörä ────────────────────────────────────────────
  wheelTitle: "Onnenpyörä!",
  wheelSubtitle: "Pyöräytä ja voita palkinto — lunastettavissa minulta milloin vain.",
  wheelPrizes: [
    { label: "Pusukuponki", color: "#5e35b1" },
    { label: "Leffailta", color: "#c2568c" },
    { label: "Hieronta", color: "#7fcdc7" },
    { label: "Iso hali", color: "#b08398" },
    { label: "Suklaarasia", color: "#f2e263" },
    { label: "Yllätystreffit", color: "#69d2a0" },
  ],

  // ── Synttärikortti ───────────────────────────────────────────
  bdayTitle: "Vielä yksi juttu...",
  bdayFrontText: "Hyvää synttäriä!",
  bdayInsideText: `Onnea ikiomalle tytölleni! 🎉

Tähän voit kirjoittaa kortin sisään
tulevan henkilökohtaisen viestin.

Rakkaudella,
Veeti`,

  // ── Alatunniste ──────────────────────────────────────────────
  footerText: "Tehty rakkaudella ❤️ Veeti",
};
