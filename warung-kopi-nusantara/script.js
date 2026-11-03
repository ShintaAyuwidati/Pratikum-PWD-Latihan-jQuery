
$(document).ready(function() {

    // Menampilkan pesan saat halaman siap
    console.log("Website Warung Kopi Nusantara siap!");

    // Membuka keranjang
    $("#cartBtn").click(function() {
        $("#cartSidebar").fadeIn();
    });

    // Menutup keranjang
    $("#closeCart").click(function() {
        $("#cartSidebar").fadeOut();
    });

});
