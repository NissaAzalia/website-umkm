const produkUmkm = [
  { nama: "Bloom Box", kategori: "Flowers", harga: 85000, stok: 12, unggulan: false },
  { nama: "Flowers Bouquet", kategori: "Flowers", harga: 70000, stok: 2, unggulan: false },
  { nama: "Bear Bouquet", kategori: "Bear", harga: 50000, stok: 0, unggulan: false },
  { nama: "Gift Set", kategori: "Bundling", harga: 110000, stok: 2, unggulan: true },
];


// const formatRupiah = new Intl.NumberFormat("id-ID", {
//   style: "currency",
//   currency: "IDR",
//   maximumFractionDigits: 0,
// });
// console.log(formatRupiah.format(produkUmkm[0].harga));

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

console.log(formatRupiah(85000));


function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

console.log(buatKartuProduk(produkUmkm[0]));

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
produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});
console.table(produkUmkm);

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  // let jumlahTersedia = 0;
  // let markup = "";

  // for (const produk of produkUmkm) {
  //   const status = statusStok(produk.stok);
  //   const kategori = labelKategori(produk.kategori);
  //   const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
  //   const labelUnggulan = produk.unggulan
  //     ? "Produk Unggulan"
  //     : "";


  //   if (produk.stok > 0) {
  //     jumlahTersedia = jumlahTersedia + 1;
  //   }

  //   markup = markup + `
  //     <article class="js-product-card">
  //       <h3>${produk.nama}</h3>
  //       <p>${labelUnggulan}</p>
  //       <p>${kategori}</p>

  //       <span class="stock-badge ${status.className}">${status.label}</span>
  //       <p>${labelAksi}</p>

  //     </article>
  //   `;

  // }

  // grid.innerHTML = markup;
  // ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");


  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);

  console.log(produkTersedia);
  console.log(produkUnggulan);
  console.log(markupProduk);
  console.log("Jumlah produk tersedia:", produkTersedia.length);

}

document.addEventListener("DOMContentLoaded", renderProduk);
