// Register service worker
const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Registrasi berhasil");
      return registration;
    })
    .catch((err) => {
      console.error("Registrasi gagal:", err);
    });
};

// Periksa service worker
if ("serviceWorker" in navigator) {
  registerServiceWorker();
} else {
  console.log("service worker tidak didukung browser ini!");
}

const requestPermission = () => {
  Notification.requestPermission().then((result) => {
    if (result === "denied") {
      console.log("Fitur tidak diizinkan");
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan izin");
    }

    console.log("Fitur notifikasi diizinkan");
  });
};

// periksa fitur notifikasi
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung fitur notifikasi");
}

const displayNotif = (title, options) => {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
      console.log("udah dipencet");
    });
  } else {
    console.error("Izin notifikasi belum turun dari polisinya");
  }
};

const showNotifikasiSederhana = () => {
  const title = "Notifikasi pertama dungs";
  const options = {
    body: "Ini adalah body, isi dari notifnya yekan",
  };

  displayNotif(title, options);
};

const showNotifikasiRequireInteraction = () => {
  const title = "Yang Ini Notifikasinya meminta interkasi pengguna";
  const options = {
    requireInteraction: true,
  };

  displayNotif(title, options);
};

const showNotifikasiIkon = () => {
  const title = "Notif dengan Ikon nih guys";
  const options = {
    body: "Ini adalah konten notifikasi dengan ikon",
    icon: "./icons-192.png",
  };

  displayNotif(title, options);
};

const showNotifikasiBadge = () => {
  const title = "Notifikasi dengan badge";
  const options = {
    body: "Ini adalah konten dengan gambar badge",
    badge: "./badge.png",
  };

  displayNotif(title, options);
};

const showNotifikasiActions = () => {
  const title = "Notifikasi dengan Aksi";
  const options = {
    body: "Ini adalah notifikasi menggunakan aksi",
    actions: [
      { action: "yes-action", title: "Ya", icon: "./ya.png" },
      { action: "no-action", title: "Tidak", icon: "./tidak.png" },
    ],
  };

  displayNotif(title, options);
};

const showNotifikasiTag = () => {
  const title1 = "Notifikasi1";
  const title2 = "Notifikasi2";
  const title3 = "Notifikasi3";

  const options1 = {
    body: "Anggota tag 1",
    tag: "message-group-1",
  };
  const options2 = {
    body: "Anggota tag 2",
    tag: "message-group-2",
  };
  const options3 = {
    body: "Anggota tag 3",
    tag: "message-group-1",
  };

  displayNotif(title1, options1);
  displayNotif(title2, options2);
  displayNotif(title3, options3);
};

const showNotifikasiSilent = () => {
  const title = "Notifikasi Senyap";
  const options = {
    silent: true,
  };

  displayNotif(title, options);
};

function showNotifikasiGambar() {
  const title = "Notifikasi dengan Gambar";
  const options = {
    body: "Ini adalah konten notifikasi dengan gambar latar.",
    image: "./badge.png",
  };

  displayNotif(title, options);
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
// push subscription
if ("PushManager" in window) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BEcE-cE8dXWAkyA8w4VKQ4O1eW5P9sQxoHtm3txgpchXRxotA3oW0U8mynJ7kM82RU2O3nxyAmiXvYPCso_hTS4"
        ),
      })
      .then((subscribe) => {
        console.log("Berhasil subscribe dengan endpoint: ", subscribe.endpoint);
        console.log(
          "Berhasil subscribe dengan p256dh key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("p256dh"))
            )
          )
        );
        console.log(
          "Berhasil subscribe dengan auth key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("auth"))
            )
          )
        );
      })
      .catch((err) => {
        console.error(`Tidak melakukan subscribe ${err.message}`);
      });
  });
}
