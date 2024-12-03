// อัปเดตจำนวนสินค้าบนไอคอนตะกร้า
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
}

// เพิ่มสินค้าในตะกร้า
function addToCart() {
    const product = {
        name: document.querySelector(".modal-product-name").textContent,
        description: document.querySelector(".modal-product-details").textContent,
        price:
            parseFloat(
                document
                    .querySelector(".discount-price")
                    .textContent.replace("฿", "")
                    .replace(",", "")
            ) || 0,
        image: document.getElementById("modalProductImage").src,
        quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // ใช้ SweetAlert2 เพื่อแจ้งเตือน
    Swal.fire({
        title: "เพิ่มสินค้าเรียบร้อย!",
        html: `
            <img src="${product.image}" alt="${product.name}" class="img-fluid mb-3" style="max-height: 100px;">
            <p><strong>${product.name}</strong></p>
            <p>จำนวน: 1 ชิ้น</p>
            <p>ราคา: ฿${product.price.toLocaleString()}</p>
        `,
        icon: "success",
        confirmButtonText: "ไปยังตะกร้า",
        showCancelButton: true,
        cancelButtonText: "ซื้อสินค้าต่อ",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "cart.html"; // ไปยังหน้าตะกร้าสินค้า
        }
    });
}

// เพิ่ม Event Listener ให้ปุ่ม "เพิ่มในตะกร้า"
document.getElementById("addToCartBtn").addEventListener("click", addToCart);

// อัปเดตจำนวนสินค้าบนไอคอนเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", updateCartCount);
function buyNow() {
    Swal.fire({
        title: 'ยืนยันการซื้อ?',
        text: "คุณต้องการซื้อสินค้านี้เลยหรือไม่?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ซื้อเลย',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // เปลี่ยนเส้นทางไปยังหน้าชำระเงิน (ปรับ URL ตามความต้องการ)
            window.location.href = 'checkout.html';
        }
    });
}

// เพิ่ม Event Listener ให้ปุ่ม "ซื้อเลย"
document.getElementById("buyNowBtn").addEventListener("click", buyNow);


// เมื่อคลิกที่สินค้าในหน้าแสดงรายละเอียด
document.querySelectorAll(".product-thumbnail").forEach((image) => {
    image.addEventListener("click", function () {
        const imageSrc = this.getAttribute("data-image");
        const productName = this.getAttribute("data-name");
        const originalPrice = this.getAttribute("data-original-price");
        const discountPrice = this.getAttribute("data-discount-price");
        const details = this.getAttribute("data-details");

        document.getElementById("modalProductImage").src = imageSrc;
        document.querySelector(".modal-product-name").textContent = productName;
        document.querySelector(".original-price").textContent = originalPrice
            ? `฿${originalPrice}`
            : "";
        document.querySelector(".discount-price").textContent = `฿${discountPrice}`; // ใช้ราคาโปรโมชั่น
        document.querySelector(".modal-product-details").textContent = details;
    });
});

// สำหรับการเลือกสี/ขนาด (ถ้ามี)
document.querySelectorAll(".btn-outline-primary").forEach((button) => {
    button.addEventListener("click", function () {
        // เปลี่ยนปุ่มที่เลือก
        document
            .querySelectorAll(".btn-outline-primary")
            .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // เปิดใช้งานปุ่มเพิ่มลงตะกร้า
        document.getElementById("addToCartBtn").disabled = false;
        document.getElementById("buyNowBtn").disabled = false;
    });
});

// ฟังก์ชันสำหรับการอัปเดตแกลลอรี่ภาพสินค้า
function updateCarouselImage(index = 0) {
    const gallery = document.querySelectorAll(".product-gallery img");
    if (gallery.length > 0 && gallery[index]) {
        document.getElementById("productImage").src = gallery[index].src;
    } else {
        console.error("ไม่พบรูปภาพในแกลเลอรี");
    }
}

function changeCarouselImage(direction) {
    const gallery = document.querySelectorAll(".product-gallery img");
    if (gallery.length === 0) return;

    if (direction === "next") {
        currentImageIndex = (currentImageIndex + 1) % gallery.length;
    } else if (direction === "prev") {
        currentImageIndex =
            (currentImageIndex - 1 + gallery.length) % gallery.length;
    }

    updateCarouselImage(currentImageIndex);
}

// ฟังก์ชันเลื่อน Carousel ไปยังภาพถัดไป
let currentImageIndex = 0;
function changeCarouselImage(direction) {
    const gallery = document.querySelectorAll(".product-gallery img");
    if (gallery.length === 0) return;

    if (direction === "next") {
        currentImageIndex = (currentImageIndex + 1) % gallery.length;
    } else if (direction === "prev") {
        currentImageIndex =
            (currentImageIndex - 1 + gallery.length) % gallery.length;
    }

    updateCarouselImage(currentImageIndex);
}

// เรียกฟังก์ชันเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
    updateCarouselImage(); // ตั้งค่ารูปภาพแรกใน Carousel

    document
        .querySelector(".carousel-control-next")
        .addEventListener("click", () => {
            changeCarouselImage("next");
        });

    document
        .querySelector(".carousel-control-prev")
        .addEventListener("click", () => {
            changeCarouselImage("prev");
        });
});

