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
      { type: "image", src: "media/smarties/smartie.jfif", caption: "Ein letztes Mal muss ich das Thema mit den Smarties noch ansprechen. Ist schließlich ein erinnerungswürdiges Ereignis gewesen, das wir teilen." }
    ],
  },
  gamecube: {
    title: "GameCube",
    items: [
      { type: "image", src: "media/gamecube/mario.jpg", caption: "Ich erinnere mich immer gerne an unsere gemeinsamen Runden in Mario Kart. Egal ob auf dem alten Game Cube oder der Wii." },
      { type: "image", src: "media/gamecube/party.jfif", caption: "Apropo Wii... Unsere unzählbar vielen Runden Wii Party werde ich bestimmt auch nie vergessen" }
    ],
  },
  reisen: {
    title: "Reisen",
    items: [
      { type: "image", src: "media/reisen/siam.jfif", caption: "Bei unseren Familienurlauben haben wir manchmal schon echt verrückte Sachen gemacht." },
      { type: "image", src: "media/reisen/babel.jfif", caption: "Woanders haben wir zum Glück nur Schaustellern bei Stunts zugesehen." },
      { type: "image", src: "media/reisen/spree.jfif", caption: "Es musste auch nicht immer weit weg sein, ging ja schließlich hauptsächlich um eine schöne Zeit miteinander :)" },
      { type: "image", src: "media/reisen/udo.jfif", caption: "Dann ging es sogar mal exklusiv in den VIP Bereich bei Udo." },
      { type: "image", src: "media/reisen/dresden.jfif", caption: "Und wer hätte gedacht das ich heute mal in dieser Stadt wohnen darf. Jetzt kenn ich auch ein paar mehr Restaurants, kommt gerne mal rum :)" }
    ],
  },
  familie: {
    title: "Familie",
    items: [
      { type: "image", src: "media/familie/weihe.jfif", caption: "Schon lange bist du bei den großen Tagen mit dabei..." },
      { type: "image", src: "media/familie/schwan.jfif", caption: "Und ich hoffe das behalten wir immer so bei :)" },
      { type: "image", src: "media/familie/geschenk.jfif", caption: "Selbst bei den kleineren Momenten waren wir oft zusammen." },
      { type: "image", src: "media/familie/pavarotti.jfif", caption: "7 Jahre auf den Tag genau. Ganz schön lange her und ganz schön viel passiert seit dem." },
      { type: "image", src: "media/familie/bounty.jfif", caption: "Auch bei euch gab es in der Zwischenzeit Zuwachs." },
      { type: "image", src: "media/familie/grieche.jfif", caption: "In ein paar Tagen ist die Familie wieder zusammen..." },
      { type: "image", src: "media/familie/kloster.jfif", caption: "Dann können dieses Bild nochmal mit allen gemeinsam erneuern :)" }
    ],
  },
};

