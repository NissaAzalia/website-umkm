const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    preview.textContent = [
        `Nama: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Telp: ${data.get("tel")}`, // ini
        `Paket: ${data.get("paket")}`,
        `Topik: ${data.get("topik")}`,
        `Waktu: ${data.get("waktu")}`, //ini
        `Pesan: ${data.get("pesan")}`,
    ].join("\n");
});