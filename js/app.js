const produkUmkm = [
  { nama: "Bloom Box", kategori: "Flowers", harga: 85000, stok: 12, unggulan: false },
  { nama: "Flowers Bouquet", kategori: "Flowers", harga: 70000, stok: 4, unggulan: false },
  { nama: "Bear Bouquet", kategori: "Bear", harga: 50000, stok: 0, unggulan: false },
  { nama: "Gift Set", kategori: "Bundling", harga: 110000, stok: 0, unggulan: true },
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
console.log(formatRupiah.format(produkUmkm[0].harga));


function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Flowers":
      return "Produk flowers pilihan";
    case "Bundling":
      return "Flowers Bouquet + Bear Bouquet + Kartu Ucapan";
    case "Bear":
      return "Produk Bear pilihan";
    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const labelUnggulan = produk.unggulan
      ? "Produk Unggulan"
      : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${labelUnggulan}</p>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>

      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
