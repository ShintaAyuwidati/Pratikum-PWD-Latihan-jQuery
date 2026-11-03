// Nonaktifkan animasi jika pengguna meminta reduced motion
jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$(function () {

    // ===== Fungsi toast (fadeIn / delay / fadeOut) =====
    function tampilkanToast(pesan, tipe) {
        $('#toast')
            .stop(true, true)
            .removeClass('success error')
            .addClass(tipe)
            .text(pesan)
            .fadeIn(250)
            .delay(2500)
            .fadeOut(400);
    }

    // ===== EFEK 1: Dropdown navbar (mouseenter/mouseleave + slideDown/slideUp) =====
    $('.dropdown')
        .on('mouseenter', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
        })
        .on('mouseleave', function () {
            $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
        });

    // ===== NAVIGASI TAB (click + fadeIn) =====
    $('.tab-panel').hide().first().show();

    $('.tab').on('click', function () {
        const target = $(this).data('target');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-panel').hide();
        $(target).fadeIn(300);
    });

    // ===== EFEK 2: Kartu produk melayang saat hover (animate) =====
    $('.produk-card')
        .on('mouseenter', function () {
            $(this).stop().animate({ top: '-8px' }, 150);
        })
        .on('mouseleave', function () {
            $(this).stop().animate({ top: '0px' }, 150);
        });

    // ===== EFEK 3: Tombol back to top (scroll + fadeIn/fadeOut + animate) =====
    const $btnTop = $('#backToTop');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $btnTop.fadeIn(200);
        } else {
            $btnTop.fadeOut(200);
        }
    });

    $btnTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // ===== Smooth scroll untuk link navigasi =====
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.length < 2) return;
        const $tujuan = $(href);
        if ($tujuan.length === 0) return;
        e.preventDefault();
        $('html, body').animate({ scrollTop: $tujuan.offset().top - 60 }, 500);
    });

    // ===== VALIDASI FORM (jQuery Validation Plugin + custom method) =====
    $.validator.addMethod('nomorHp', function (value, element) {
        return this.optional(element) || /^[0-9]{10,12}$/.test(value);
    }, 'Nomor HP harus 10-12 digit angka');

    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
    }, 'Password harus mengandung huruf dan angka');

    const validator = $('#formMember').validate({
        rules: {
            nama: { required: true, minlength: 3 },
            email: { required: true, email: true },
            hp: { required: true, nomorHp: true },
            usia: { required: true, digits: true, min: 12 },
            minat: { required: true },
            password: { required: true, minlength: 8, hurufAngka: true },
            konfirmasi: { required: true, equalTo: '#password' }
        },
        messages: {
            nama: { required: 'Nama wajib diisi', minlength: 'Nama minimal 3 karakter' },
            email: { required: 'Email wajib diisi', email: 'Format email tidak valid' },
            hp: { required: 'Nomor HP wajib diisi' },
            usia: { required: 'Usia wajib diisi', digits: 'Usia harus berupa angka', min: 'Usia minimal 12 tahun' },
            minat: { required: 'Pilih salah satu alat musik' },
            password: { required: 'Password wajib diisi', minlength: 'Password minimal 8 karakter' },
            konfirmasi: { required: 'Konfirmasi password wajib diisi', equalTo: 'Password konfirmasi tidak sama' }
        },
        errorElement: 'div',
        errorClass: 'pesan-error',
        highlight: function (el) {
            $(el).addClass('is-error').removeClass('is-valid');
        },
        unhighlight: function (el) {
            $(el).removeClass('is-error').addClass('is-valid');
        },
        submitHandler: function (form) {
            const nama = $('#nama').val().trim();
            tampilkanToast('Selamat datang, ' + nama + '! Akun member berhasil dibuat.', 'success');
            $('#sukses').stop(true, true).slideDown(300).delay(3000).slideUp(300);
            form.reset();
            validator.resetForm();
            $('#formMember input, #formMember select').removeClass('is-error is-valid');
        }
    });

});