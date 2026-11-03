
const daftar = document.getElementById("daftar");

document.getElementById("simpan").addEventListener("click", function () {
  const nama = document.getElementById("nama").value.trim();
  const instansi = document.getElementById("instansi").value.trim();

  if (nama === "") {
    alert("Nama wajib diisi");
    return;
  }

  // Buat item daftar baru
  const item = document.createElement("li");
  item.textContent = nama + " - " + instansi;
  daftar.appendChild(item);

  // Kosongkan formulir
  document.getElementById("nama").value = "";
  document.getElementById("instansi").value = "";
});
