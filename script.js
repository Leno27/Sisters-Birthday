/*
 * Inhalte der Seite: Bilder, Videos und Texte.
 * Dateien liegen im Ordner "media/". Pro Eintrag:
 * type: "image" oder "video", src: Pfad, caption: Text (optional).
 * Die Reihenfolge hier ist die Reihenfolge der Felder auf der Seite.
 */
const CONTENT = {
  start: {
    title: "Alles Gute!",
    items: [
    ],
  },
  smarties: {
    title: "Smarties",
    items: [
      { type: "image", src: "media/smarties/smartie.jfif", caption: "Ein letztes Mal muss ich das Thema mit den Smarties noch ansprechen. Näher sind wir Unstimmigkeiten zwischen uns glaube ich nie gekommen..." }
    ],
  },
  gamecube: {
    title: "GameCube",
    items: [
      { type: "image", src: "media/gamecube/mario.jpg", caption: "Ich erinnere mich immer gerne an unsere gemeinsamen Runden in Mario Kart. Egal ob auf dem alten Game Cube oder der Wii. So gut konnte ich selten mit jemandem zusammen spielen :)" },
      { type: "image", src: "media/gamecube/party.jfif", caption: "Apropo Wii... Unsere unzählbar vielen Runden Wii Party kann ich bestimmt auch nie vergessen" }
    ],
  },
  reisen: {
    title: "Reisen",
    items: [
      { type: "image", src: "media/reisen/siam.jfif", caption: "Egal wie verrückt die Aktionen im Urlaub manchmal waren, am Ende wurde daraus doch noch eine schöne Zeit." },
      { type: "image", src: "media/reisen/babel.jfif", caption: "Woanders haben wir zum Glück nur Schaustellern bei Stunts zugesehen." },
      { type: "image", src: "media/reisen/spree.jfif", caption: "Es musste auch nicht immer weit weg sein, ging ja schließlich hauptsächlich um eine schöne Zeit miteinander :)" },
      { type: "image", src: "media/reisen/udo.jfif", caption: "Du warst damals übrigens auch bei meinem ersten Konzertbesuch mit dabei. Den werd ich bestimmt nie vergessen, schließlich gabs extra VIP-Plätze" },
      { type: "image", src: "media/reisen/dresden.jfif", caption: "Damals waren die Touri-Hotspots immer ein Erlebnis, heute würde ich euch aber glaube ich andere Lokale empfehlen. Kommt gerne mal rum, dann zeig ich euch die guten Spots :)"}
    ],
  },
  familie: {
    title: "Familie",
    items: [
      { type: "image", src: "media/familie/weihe.jfif", caption: "Schon lange bist du bei meinen wichtigen Momenten mit dabei..." },
      { type: "image", src: "media/familie/pavarotti.jfif", caption: "Und ich hab gesehen wie du langsam erwachsen geworden bist. 7 Jahre ist das Bild schon her. Langsam werden wir echt alt..." },
      { type: "image", src: "media/familie/schwan.jfif", caption: "Trotzdem sind wir immer alle für einander da, egal wie sehr das Leben sich bei jedem von uns verändert hat." },
      { type: "image", src: "media/familie/geschenk.jfif", caption: "Manchmal wäre ich dennoch gerne wieder so klein und könnte unbekümmert Geschenke in der Stube aufreißen. Ich hoffe du hast heute genauso viel Freude beim Auspacken :)" },
      
      { type: "image", src: "media/familie/bounty.jfif", caption: "So ein tolles Geschenk wie einen eueren kleinen Bounty wird es aber bestimmt nicht geben. Er sollte dich übrigens in Katzenjahren schon eine Weile im Alter überholt haben." },
      { type: "image", src: "media/familie/grieche.jfif", caption: "In ein paar Tagen ist die dann endlich Familie wieder zusammen..." },
      { type: "image", src: "media/familie/kloster.jfif", caption: "Dann können dieses Bild nochmal mit allen gemeinsam erneuern :)" }
    ],
  },
};

