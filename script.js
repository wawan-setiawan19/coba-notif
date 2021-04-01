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
