const express = require("express");
const app = express();

// database sederhana (sementara)
let lisensiDB = [];

// generate kode lisensi
function generateKode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// homepage
app.get("/", (req, res) => {
  res.send("id.repair Server Running 🚀");
});

// beli → generate lisensi
app.get("/beli", (req, res) => {
  const paket = req.query.paket || "Basic";
  const kode = generateKode();

  lisensiDB.push({
    kode,
    paket,
    status: "aktif",
    created: new Date()
  });

  res.send(`
    <h2>Pembelian Berhasil</h2>
    <p>Paket: ${paket}</p>
    <p>Kode Lisensi: <b>${kode}</b></p>
  `);
});

// cek lisensi
app.get("/cek", (req, res) => {
  const kode = req.query.kode;

  const data = lisensiDB.find(x => x.kode === kode);

  if (data && data.status === "aktif") {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});

