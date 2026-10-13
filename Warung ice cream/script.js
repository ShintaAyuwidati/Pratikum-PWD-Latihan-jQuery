/* ============================================================
   WARUNG ICE CREAM - JQUERY SCRIPT
   Praktikum Pemrograman Web Dasar
   ============================================================ */

$(document).ready(function() {

    /* =====================================================
       1. DATA PRODUK
       ===================================================== */
//
    const produkData = [
        {
            id: 1,
            nama: 'Es Krim Cokelat',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍫',
            badge: 'Best Seller',
            badgeType: 'hot'
        },
        {
            id: 2,
            nama: 'Es Krim Strawberry',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍓',
            badge: 'Favorit',
            badgeType: 'fav'
        },
        {
            id: 3,
            nama: 'Es Krim Vanilla',
            harga: 13000,
            kategori: 'es-krim',
            icon: '🍦',
            badge: '',
            badgeType: ''
        },
        {
            id: 4,
            nama: 'Es Krim Mangga',
            harga: 16000,
            kategori: 'es-krim',
            icon: '🥭',
            badge: 'Baru',
            badgeType: 'new'
        },
        {
            id: 5,
            nama: 'Sundae Cokelat',
            harga: 25000,
            kategori: 'sundae',
            icon: '🍨',
            badge: 'Best Seller',
            badgeType: 'hot'
        },
        {
            id: 6,
            nama: 'Sundae Keju',
            harga: 27000,
            kategori: 'sundae',
            icon: '🧀',
            badge: '',
            badgeType: ''
        },
        {
            id: 7,
            nama: 'Sundae Buah',
            harga: 28000,
            kategori: 'sundae',
            icon: '🍧',
            badge: 'Favorit',
            badgeType: 'fav'
        },
        {
            id: 8,
            nama: 'Milkshake Cokelat',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥤',
            badge: '',
            badgeType: ''
        },
        {
            id: 9,
            nama: 'Milkshake Strawberry',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥛',
            badge: 'Baru',
            badgeType: 'new'
        },
        {
            id: 10,
            nama: 'Es Teh Manis',
            harga: 8000,
            kategori: 'minuman',
            icon: '🧊',
            badge: '',
            badgeType: ''
        },
        {
            id: 11,
            nama: 'Es Jeruk',
            harga: 10000,
            kategori: 'minuman',
            icon: '🍊',
            badge: '',
            badgeType: ''
        },
        {
            id: 12,
            nama: 'Float Ice Cream',
            harga: 22000,
            kategori: 'minuman',
            icon: '🍹',
            badge: 'Best Seller',
            badgeType: 'hot'
        }
    ];

    /* =====================================================
       2. STATE APLIKASI
       ===================================================== */

    let cart = [];
    let currentFilter = 'all';
    let searchKeyword = '';

    /* =====================================================
       3. RENDER PRODUK
       ===================================================== */

    function renderProduk() {

        const $grid = $('#produkGrid');

        $grid.empty();

        let produkFiltered = produkData.filter(function(p) {

            const cocokKategori =
                currentFilter === 'all' ||
                p.kategori === currentFilter;

            const cocokSearch =
                p.nama.toLowerCase().includes(
                    searchKeyword.toLowerCase()
                );

            return cocokKategori && cocokSearch;
        });

        if (produkFiltered.length === 0) {

            $grid.html(`
                <div class="empty-products">
                    <i class="fas fa-search"></i>
                    <p>Produk tidak ditemukan</p>
                    <small>Coba kata kunci lain</small>
                </div>
            `);

            return;
        }

        produkFiltered.forEach(function(p) {

            const badgeHTML = p.badge
                ? `<span class="produk-badge ${p.badgeType}">
                    ${p.badge}
                   </span>`
                : '';

            const card = `
                <div class="produk-card">

                    ${badgeHTML}

                    <div class="produk-img">
                        ${p.icon}
                    </div>

                    <div class="produk-info">

                        <h3>${p.nama}</h3>

                        <p class="desc">
                            Es krim lezat dengan rasa yang nikmat
                        </p>

                        <div class="produk-footer">

                            <div class="produk-price">
                                Rp ${p.harga.toLocaleString('id-ID')}
                                <small>per porsi</small>
                            </div>

                            <button
                                class="btn-add-cart"
                                data-id="${p.id}">
                                <i class="fas fa-plus"></i>
                            </button>

                        </div>

                    </div>
                </div>
            `;

            $grid.append(card);
        });
    }

    /* =====================================================
       4. FILTER KATEGORI - NAVBAR
       ===================================================== */

    $('.nav-link').on('click', function() {

        currentFilter = $(this).data('filter');

        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        $('.filter-btn').removeClass('active');

        $(`.filter-btn[data-cat="${currentFilter}"]`)
            .addClass('active');

        renderProduk();
    });

    /* =====================================================
       5. FILTER KATEGORI - BUTTON
       ===================================================== */

    $('.filter-btn').on('click', function() {

        currentFilter = $(this).data('cat');

        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        $('.nav-link').removeClass('active');

        $(`.nav-link[data-filter="${currentFilter}"]`)
            .addClass('active');

        renderProduk();
    });

    /* =====================================================
       6. SEARCH PRODUK
       ===================================================== */

    $('#searchProduk').on('input', function() {

        searchKeyword = $(this).val();

        renderProduk();
    });

    /* =====================================================
       7. TAMBAH PRODUK KE KERANJANG
       ===================================================== */

    $(document).on('click', '.btn-add-cart', function() {

        const id = parseInt($(this).data('id'));

        const produk = produkData.find(function(p) {
            return p.id === id;
        });

        const existing = cart.find(function(item) {
            return item.id === id;
        });

        if (existing) {

            existing.qty++;

        } else {

            cart.push({
                id: produk.id,
                nama: produk.nama,
                harga: produk.harga,
                icon: produk.icon,
                qty: 1
            });
        }

        updateCartUI();

        showToast(produk.nama + ' ditambahkan ke keranjang!');

        $(this).css('transform', 'scale(1.2)');

        setTimeout(function() {
            $('.btn-add-cart').css('transform', '');
        }, 200);
    });

    /* =====================================================
       8. UPDATE KERANJANG
       ===================================================== */

    function updateCartUI() {

        let totalQty = 0;

        let totalHarga = 0;

        cart.forEach(function(item) {

            totalQty += item.qty;

            totalHarga += item.harga * item.qty;
        });

        $('#cartBadge').text(totalQty);

        $('#cartTotal').text(
            'Rp ' + totalHarga.toLocaleString('id-ID')
        );

        const $cartItems = $('#cartItems');

        $cartItems.empty();

        if (cart.length === 0) {

            $cartItems.html(`
                <div class="cart-empty">

                    <i class="fas fa-shopping-basket"></i>

                    <p>Keranjang masih kosong</p>

                    <small>
                        Yuk pilih es krim favoritmu!
                    </small>

                </div>
            `);

            $('#btnCheckout').prop('disabled', true);

            return;
        }

        $('#btnCheckout').prop('disabled', false);

        cart.forEach(function(item) {

            const itemHTML = `
                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h5>${item.nama}</h5>

                        <div class="price">
                            Rp ${item.harga.toLocaleString('id-ID')}
                        </div>

                        <div class="qty-control">

                            <button
                                class="qty-btn btn-minus"
                                data-id="${item.id}">
                                −
                            </button>

                            <span class="qty-value">
                                ${item.qty}
                            </span>

                            <button
                                class="qty-btn btn-plus"
                                data-id="${item.id}">
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="cart-item-remove"
                        data-id="${item.id}">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>
            `;

            $cartItems.append(itemHTML);
        });
    }

    /* =====================================================
       9. TOMBOL PLUS / MINUS
       ===================================================== */

    $(document).on('click', '.btn-plus', function() {

        const id = parseInt($(this).data('id'));

        const item = cart.find(function(item) {
            return item.id === id;
        });

        if (item) {
            item.qty++;
        }

        updateCartUI();
    });

    $(document).on('click', '.btn-minus', function() {

        const id = parseInt($(this).data('id'));

        const item = cart.find(function(item) {
            return item.id === id;
        });

        if (item) {

            item.qty--;

            if (item.qty <= 0) {

                cart = cart.filter(function(item) {
                    return item.id !== id;
                });
            }
        }

        updateCartUI();
    });

    /* =====================================================
       10. HAPUS PRODUK
       ===================================================== */

    $(document).on('click', '.cart-item-remove', function() {

        const id = parseInt($(this).data('id'));

        cart = cart.filter(function(item) {
            return item.id !== id;
        });

        updateCartUI();

        showToast('Produk dihapus dari keranjang');
    });

    /* =====================================================
       11. BUKA KERANJANG
       ===================================================== */

    $('#cartBtn').on('click', function() {

        $('#cartSidebar').addClass('open');

        $('#cartOverlay').fadeIn(300);
    });

    /* =====================================================
       12. TUTUP KERANJANG
       ===================================================== */

    $('#cartClose, #cartOverlay').on('click', function() {

        $('#cartSidebar').removeClass('open');

        $('#cartOverlay').fadeOut(300);
    });

    /* =====================================================
       13. CHECKOUT
       ===================================================== */

    $('#btnCheckout').on('click', function() {

        if (cart.length === 0) {

            showToast('Keranjang masih kosong!');

            return;
        }

        const total = cart.reduce(function(sum, item) {

            return sum + (item.harga * item.qty);

        }, 0);

        const qty = cart.reduce(function(sum, item) {

            return sum + item.qty;

        }, 0);

        const $btn = $(this);

        $btn.prop('disabled', true);

        $btn.html(`
            <i class="fas fa-spinner fa-spin"></i>
            Memproses...
        `);

        setTimeout(function() {

            cart = [];

            updateCartUI();

            $('#cartSidebar').removeClass('open');

            $('#cartOverlay').fadeOut(300);

            $btn.prop('disabled', false);

            $btn.html(`
                <i class="fas fa-check-circle"></i>
                Checkout Sekarang
            `);

            showToast(
                'Checkout berhasil! ' +
                qty +
                ' item - Total Rp ' +
                total.toLocaleString('id-ID')
            );

        }, 1500);
    });

    /* =====================================================
       14. TOAST NOTIFICATION
       ===================================================== */

    function showToast(message) {

        $('#toastMsg').text(message);

        $('#toast').addClass('show');

        setTimeout(function() {

            $('#toast').removeClass('show');

        }, 2500);
    }

    /* =====================================================
       15. HAMBURGER MENU
       ===================================================== */

    $('#hamburger').on('click', function() {

        $('#navMenu').toggleClass('show');
    });

    /* =====================================================
       16. INISIALISASI APLIKASI
       ===================================================== */

    renderProduk();

    updateCartUI();

    console.log(
        '%c🍦 Warung Ice Cream - Siap!',
        'color:#ff6b9d;font-size:16px;font-weight:bold;'
    );

    console.log(
        '%cTotal produk: ' + produkData.length,
        'color:#2d1b3d;font-size:12px;'
    );

});