const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BEcE-cE8dXWAkyA8w4VKQ4O1eW5P9sQxoHtm3txgpchXRxotA3oW0U8mynJ7kM82RU2O3nxyAmiXvYPCso_hTS4",
  privateKey: "dGtq5OAydkC4Ln8PH-rn8PbPcv0Kpgfle2gikHiMRNk",
};

webPush.setVapidDetails(
  "mailto:w.settiawan@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.publicKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/flAtG50AIRk:APA91bHtfz7L-fHQpfBOBSPxkTG08vO14u0Y5TvaKXpanqfqwLLI-JXYXGGxnb0Ptsp-TdND_xqr4evAVLUOPGaPByyEzHAWNajQu9N6T-6Y4vL8nR9QB0fSSxNpVewI4V19il5IzqVh",
  keys: {
    p256dh:
      "BFY2I7na1jgh++9gRgJV6162lB+Rh9FwQ5ONZ2mNg/hxXoPpE7WxXF/jPjQ3sl5FhXd3RYcE25hlqB1Sw5Epv2M=",
    auth: "kw85lu0+7CFni9doPR49hw==",
  },
};

const payload = "Selamat Aplikasi kamu sudah dapat menerima push notifikasi";
const options = {
  gcmAPIKey: "292312429900",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
