const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const fmt = num =>
  typeof num === "number" && !isNaN(num)
    ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
        .format(num)
        .replace("₫", "đ")
    : "0đ";

const toast = msg => {
  const wrap = $("#toastWrap");
  if (!wrap) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => (el.style.opacity = "1"));
  setTimeout(() => {
    el.style.opacity = "0";
    el.addEventListener("transitionend", () => el.remove());
  }, 2500);
};

const getCart = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return JSON.parse(cartData || "{}"); 
  } catch (e) {
    console.error("Lỗi parse giỏ hàng:", e);
    localStorage.removeItem("cart");
    return {};
  }
};
const saveCart = c => localStorage.setItem("cart", JSON.stringify(c));
const updateCartCount = () => {
  const count = getCartCount();
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = count;
  }
};
const getCartCount = () => {
  const cart = getCart(); 
  
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  return count;
};
const getVoucher = () => JSON.parse(localStorage.getItem("currentVoucher") || "null");
const saveVoucher = v => localStorage.setItem("currentVoucher", JSON.stringify(v));
const removeVoucher = () => localStorage.removeItem("currentVoucher");

const getPrice = (id, priceType = 'base') => {
    const productId = String(id); 
    const product = PRODUCTS.find(p => String(p.id) === productId);
    if (!product) return { price: 0, originalPrice: 0, isSale: false };

    let price = product.price;
    let originalPrice = product.price;
    let isSale = false;
    if (typeof FLASH_SALE_PRODUCTS !== 'undefined' && typeof FLASH_SALE_END_TIME !== 'undefined') {
      const flash = FLASH_SALE_PRODUCTS.find(f => String(f.id) === productId);
      if (flash && Date.now() < FLASH_SALE_END_TIME) {
        originalPrice = product.price;
        price = Math.round(product.price * (1 - flash.discount));
        isSale = true;
      }
    }
    
    return { price, originalPrice, isSale };
};

const calculateDiscount = (voucher, subtotal) => {
  if (typeof VOUCHERS === 'undefined' || !voucher || subtotal < (voucher.min_order || 0)) return 0;
  let discount = 0;
  if (voucher.type === 'percentage') {
    discount = subtotal * voucher.value;
    if (voucher.max_discount && discount > voucher.max_discount) discount = voucher.max_discount;
  } else if (voucher.type === 'fixed') {
    discount = voucher.value;
  }
  return discount;
};

const applyVoucher = (code) => {
    if (typeof VOUCHERS === 'undefined') {
        toast('Lỗi: Không tìm thấy dữ liệu voucher.');
        return false;
    }
    const voucher = VOUCHERS.find(v => v.code.toUpperCase() === code.toUpperCase());

    if (!voucher) {
        toast('Mã voucher không hợp lệ.');
        appliedVoucher = null;
        saveAppliedVoucher();
        return false;
    }
    const cartTotal = calculateCartTotal().subtotal; 
    if (cartTotal < voucher.min_order) {
        toast(`Mã "${code}" áp dụng cho đơn hàng từ ${fmt(voucher.min_order)}.`);
        appliedVoucher = null;
        saveAppliedVoucher();
        return false;
    }
    appliedVoucher = voucher;
    saveAppliedVoucher(); 
    toast(`Áp dụng mã ${voucher.code} thành công!`);
    return true;
};
const updateCartIcon = () => {
  const count = getCartCount();
  const cartCountEl = $('#cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? 'inline-block' : 'none';
  }
};

const updateItemQty = (id, change) => {
  const cart = getCart();
  const pid = String(id);
  if (!cart[pid]) return;
  let newQty = (cart[pid].qty || 0) + change;
  newQty = Math.min(Math.max(newQty, 1), 99);
  cart[pid].qty = newQty;
  saveCart(cart);
  renderCart();
};

const removeItem = id => {
  const cart = getCart();
  const pid = String(id);
  if (!cart[pid]) return;
  delete cart[pid];
  saveCart(cart);
  toast("🗑️ Đã xóa sản phẩm khỏi giỏ hàng!");
  renderCart();
};

const addToCart = (id, qty = 1, priceType = 'base') => {
  if (!id) return;
  const cart = getCart();
  const productId = String(id); 

  if (cart[productId]) {
    cart[productId].qty += qty;
  } else {
    cart[productId] = { 
      qty: qty,
      priceType: priceType 
    };
  }

  saveCart(cart);
  updateCartCount();
  if (typeof toast === 'function' && !document.URL.includes('cart.html')) {
    toast(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
  }
};
const renderCart = () => {
  const cart = getCart();
  const cartItemsContainer = $("#cartItems");
  const emptyMessage = $("#emptyCartMessage");
  const cartSection = $("#cartSection");
  const subtotalEl = $("#cartPageSubtotal");
  const grandTotalEl = $("#cartPageGrandTotal");
  
  if (!cartItemsContainer || !emptyMessage || !cartSection) return;

  const cartKeys = Object.keys(cart);

  if (cartKeys.length === 0) {
    emptyMessage.style.display = 'block';
    cartSection.style.display = 'none';
    subtotalEl.textContent = fmt(0);
    grandTotalEl.textContent = fmt(0);
    return;
  }
  
  emptyMessage.style.display = 'none';
  cartSection.style.display = 'grid';

  let subtotal = 0;
  let html = '';
  const SHIPPING_FEE = 30000; //phí vận chuyển

  cartKeys.forEach(id => {
    const p = PRODUCTS.find(pr => String(pr.id) === id); 
    
    if (!p) {
        console.warn(`Sản phẩm với ID ${id} không tồn tại trong PRODUCTS.`);
        return; 
    }
    
    const item = cart[id];
    const info = getPrice(id, item.priceType);
    const lineTotal = info.price * item.qty;
    subtotal += lineTotal;
    
    const DEFAULT_IMG_URL = 'image/default-product.png'; 
    const imgSrc = p.image && p.image.length > 0 ? p.image : DEFAULT_IMG_URL;
    html += `
      <div class="cart-item-row">
        
            <div class="col-product">
                
                <img src="${p.img || p.image}" alt="${p.name}" class="cart-item-img">
                
                <a href="product.html?id=${id}"> 
                    <div class="product-name-info">
                        <span>${p.name}</span>
                        <button data-del="${id}" class="remove-item-btn" title="Xóa sản phẩm">
                            Xóa
                        </button>
                    </div>
                </a>
            </div>
        
        <div class="col-price">${fmt(info.price)}</div>
        
        <div class="col-qty">
            <button class="qty-btn" data-dec="${id}">-</button>
            <input type="text" value="${item.qty}" data-id="${id}" min="1" max="99" readonly>
            <button class="qty-btn" data-inc="${id}">+</button>
        </div>
        
        <div class="col-total">
            <span>${fmt(lineTotal)}</span>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = html;
  const grandTotal = subtotal + SHIPPING_FEE;
  subtotalEl.textContent = fmt(subtotal);
  grandTotalEl.textContent = fmt(grandTotal);
};



const initCartListeners = () => {
    document.body.addEventListener('click', e => {
        const cart = getCart();
        let shouldRender = false;
        if (e.target.matches('[data-inc]')) {
            const id = e.target.dataset.inc;
            cart[id].qty++;
            shouldRender = true;
        } 
        else if (e.target.matches('[data-dec]')) {
            const id = e.target.dataset.dec;
            if (cart[id].qty > 1) {
                cart[id].qty--;
                shouldRender = true;
            }
        } 
        else if (e.target.matches('[data-del]')) {
            const id = e.target.dataset.del;
            e.preventDefault();
            delete cart[id];
            shouldRender = true;
        }

        if (shouldRender) {
            saveCart(cart);
            renderCart();
            updateCartCount();
        }
    });
};

const initCartDrawerListeners = () => {
  const body = $("#cartBody");
  if (!body) return;
  body.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.inc) updateItemQty(btn.dataset.inc, 1);
    if (btn.dataset.dec) updateItemQty(btn.dataset.dec, -1);
    if (btn.dataset.del) removeItem(btn.dataset.del);
  });
};

const renderProducts = (input, containerId = '#productGrid') => {
  const container = $(containerId);
  if (!container) return;
  
  let productsToRender = [];
  
  if (Array.isArray(input)) {
    productsToRender = input;
  } else if (typeof input === 'object' && input !== null) {
    let tempProducts = PRODUCTS; 
    if (input.category && input.category !== 'all') {
        tempProducts = tempProducts.filter(p => p.category === input.category);
    }
    if (input.search) {
        const searchTerm = input.search.toLowerCase();
        tempProducts = tempProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            (p.desc && p.desc.toLowerCase().includes(searchTerm))
        );
    }
    productsToRender = tempProducts;
    
  } else {
    productsToRender = PRODUCTS;
  }
  if (!Array.isArray(productsToRender) || productsToRender.length === 0) {
    container.innerHTML = '<p class="no-results" style="text-align:center; padding: 20px;">Không tìm thấy sản phẩm nào phù hợp.</p>';
    return;
  }
  let html = '';
  productsToRender.forEach(p => {
    const info = getPrice(p.id);
    html += `
      <div class="product-card card ${info.isSale ? 'flash-sale-card' : ''}" data-id="${p.id}">
        <a href="product.html?id=${p.id}" class="card-thumb">
          <img src="${p.img || p.image}" alt="${p.name}" class="product-image">
          ${info.isSale ? '<div class="sale-badge">SALE</div>' : ''}
        </a>
        <div class="card-body">
          <a href="product.html?id=${p.id}" class="product-title">${p.name}</a>
          <div class="product-price">
            ${info.isSale ? `<del class="original-price">${fmt(info.originalPrice)}</del>` : ''}
            <span class="sale-price">${fmt(info.price)}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-add="${p.id}">Thêm vào giỏ</button>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
  $$(`${containerId} .add-to-cart-btn`).forEach(btn => btn.onclick = e => addToCart(e.target.dataset.add, 1, 'current'));
};

const initHeroSlider = (id = '#heroSlider') => {
  const s = $(id);
  if (!s) return;
  const slides = s.querySelectorAll('.slide');
  let i = 0, t = null;
  const show = n => slides.forEach((sl, idx) => sl.style.transform = `translateX(${(idx - n) * 100}%)`);
  slides.forEach(sl => {
    sl.style.position = 'absolute'; sl.style.top = 0; sl.style.left = 0;
    sl.style.width = '100%'; sl.style.height = '100%'; sl.style.transition = 'transform .8s ease';
  });
  const next = () => { i = (i + 1) % slides.length; show(i); };
  t = setInterval(next, 4000);
};

const initFlashSaleSection = () => {
  const grid = $('#flashSaleGrid');
  const h = $('#fs-hours'), m = $('#fs-minutes'), s = $('#fs-seconds');
  if (!grid) return;
  if (typeof PRODUCTS !== 'undefined' && typeof FLASH_SALE_PRODUCTS !== 'undefined') {
    const list = PRODUCTS.filter(p => FLASH_SALE_PRODUCTS.some(fs => fs.id === p.id));
    renderProducts(list, '#flashSaleGrid');
  }
  if (typeof FLASH_SALE_END_TIME === 'undefined') return;
  const update = () => {
    const diff = Math.max(0, FLASH_SALE_END_TIME - Date.now());
    const hh = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
    const mm = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
    const ss = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    if (h) h.textContent = hh;
    if (m) m.textContent = mm;
    if (s) s.textContent = ss;
    if (diff <= 0) clearInterval(timer);
  };
  update();
  const timer = setInterval(update, 1000);
};

const renderPageContent = () => {
  if (typeof PRODUCTS === 'undefined') return;

  if (document.URL.includes('product.html')) {
    renderProductDetail();
    return;
  }

  if (document.URL.includes('flashsale.html')) {
    initFlashSaleSection();
    return;
  }

  if (document.URL.includes('cart.html')) {
    renderCart();
    return;
  }
  if (document.URL.includes('index.html') || document.URL.includes('sanpham.html')) {
    renderProducts(PRODUCTS, '#productGrid');
    initFlashSaleSection();
  }

  if (document.URL.includes('checkout.html')) {
    document.addEventListener('DOMContentLoaded', handleCheckoutSubmit);
    if (typeof renderCheckoutItems === 'function') {
      renderCheckoutItems();
    }
    if (typeof renderCartSummary === 'function') {
        renderCartSummary();
    }
    return;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  renderPageContent();
  initCartDrawerListeners();

  if (typeof updateCartCount === 'function') {
        updateCartCount(); 
    }
  
  if (document.URL.includes('cart.html') && typeof renderVoucherListForCart === 'function') {
      renderVoucherListForCart();
  }

  const form = $('#voucherForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      applyVoucher($('#voucherCode').value);
    });
  }
});

if (typeof PRODUCTS === "undefined") {
  window.PRODUCTS = [];
  console.warn("⚠️ PRODUCTS chưa được load — Giỏ hàng sẽ không hiển thị sản phẩm!");
}

const renderRecentProducts = () => {
  const recentIds = JSON.parse(localStorage.getItem("recentProducts") || "[]");
  if (!recentIds.length) return;
  const recents = PRODUCTS.filter(p => recentIds.includes(p.id));
  renderProducts(recents, '#recentGrid');
};

function renderRelatedProducts(product) {
  const container = document.querySelector(".related-products");
  if (!container) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  
  container.innerHTML = related.slice(0, 4).map(p => `
    <div class="product-card" onclick="viewProduct('${p.id}')">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">${fmt(getProductPrice(p))}</div>
    </div>
  `).join('');
}


function getProductPrice(product) {
  const flash = FLASH_SALE_PRODUCTS.find(f => f.id === product.id);
  if (flash && Date.now() < FLASH_SALE_END_TIME) {
    return Math.round(product.price * (1 - flash.discount));
  }
  return product.price;
}
const reviewForm = document.querySelector("#reviewForm");
const reviewList = document.querySelector("#reviewList");

if (reviewForm && reviewList) {
  const reviews = JSON.parse(localStorage.getItem("productReviews") || "[]");

  const renderReviews = () => {
    reviewList.innerHTML = reviews.length
      ? reviews.map(r => `
          <div class="review-item">
            <div class="review-stars">${"⭐".repeat(r.stars)}</div>
            <div class="review-author">Người dùng ẩn danh</div>
            <div class="review-text">${r.text}</div>
          </div>
        `).join("")
      : `<p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>`;
  };

  reviewForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = document.querySelector("#reviewText").value.trim();
    const stars = parseInt(document.querySelector("#reviewStars").value);
    if (!text) return alert("Vui lòng nhập nội dung đánh giá!");

    reviews.push({ text, stars });
    localStorage.setItem("productReviews", JSON.stringify(reviews));
    reviewForm.reset();
    renderReviews();
  });

  renderReviews();
}

let appliedVoucher = localStorage.getItem('appliedVoucher') ? JSON.parse(localStorage.getItem('appliedVoucher')) : null;


const saveAppliedVoucher = () => {
    if (appliedVoucher) {
        localStorage.setItem('appliedVoucher', JSON.stringify(appliedVoucher));
    } else {
        localStorage.removeItem('appliedVoucher');
    }
}

const calculateCartSummary = (cart) => {
    let subtotal = 0;
    const allProducts = window.PRODUCTS || [];

    for (const id in cart) {
        const item = cart[id];
        const product = allProducts.find(p => p.id == id);
        if (product) {
            const price = getProductPrice(product);
            subtotal += price * item.qty;
        }
    }

    const SHIPPING_FEE = 30000;
    let shippingFee = SHIPPING_FEE;

    let voucherDiscount = 0;
    let voucherCode = null;

    if (appliedVoucher) {
        voucherCode = appliedVoucher.code;
        if (appliedVoucher.type === 'fixed') {
            voucherDiscount = appliedVoucher.value;
        } else if (appliedVoucher.type === 'percentage') {
            const maxDiscount = 100000; 
            voucherDiscount = Math.min(subtotal * appliedVoucher.value, maxDiscount);
        } else if (appliedVoucher.code === 'FREESHIP') {
            shippingFee = Math.max(0, shippingFee - 20000); 
        }
    }
    const finalTotal = Math.max(0, subtotal + shippingFee - voucherDiscount);

    return {
        subtotal,
        shippingFee,
        voucherCode,
        voucherDiscount,
        finalTotal
    };
};

const DEFAULT_SHIPPING_FEE = 30000;
const MAX_PERCENT_DISCOUNT = 100000; 

const calculateCartTotal = () => {
    const cart = getCart();
    const subtotal = Object.keys(cart).reduce((sum, id) => {
        const item = cart[id];
        const product = PRODUCTS.find(p => p.id === id); 
        if (!product) return sum;
        const price = getProductPrice(product); 
        return sum + (item.qty * price);
    }, 0);

    let discountAmount = 0;
    let shippingFee = DEFAULT_SHIPPING_FEE;
    let currentVoucher = appliedVoucher;
    if (currentVoucher) {
        const v = currentVoucher;
        if (subtotal < v.min_order) {
            currentVoucher = null;
            saveAppliedVoucher();
        } else {
            if (v.type === 'fixed') {
                if (v.code === 'FREESHIP') {
                    shippingFee = Math.max(0, DEFAULT_SHIPPING_FEE - v.value);
                } else {
                    discountAmount = v.value;
                }
            } else if (v.type === 'percentage') {
                let calculatedDiscount = subtotal * v.value;
                discountAmount = Math.min(calculatedDiscount, MAX_PERCENT_DISCOUNT);
            }
        }
    }
    const finalTotal = subtotal - discountAmount + shippingFee;

    return {
        subtotal: subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        finalTotal: Math.max(0, finalTotal), 
        voucherCode: currentVoucher ? currentVoucher.code : ''
    };
};
const renderCartSummary = () => {
    const summary = calculateCartTotal();
    const box = document.querySelector('.cart-summary-box');
    if (!box) return;
    const subtotalEl = box.querySelector('.subtotal-line span:last-child');
    const discountEl = box.querySelector('.discount-line span:last-child');
    const shippingEl = box.querySelector('.shipping-line span:last-child');
    let finalTotalEl = box.querySelector('#checkoutFinalTotal');

    if (!finalTotalEl) {
      finalTotalEl = box.querySelector('.total-line span:last-child') || box.querySelector('.total-line strong:last-child');
    }

    if (subtotalEl) subtotalEl.textContent = fmt(summary.subtotal);
    if (discountEl) discountEl.textContent = `- ${fmt(summary.discount)}`;
    if (shippingEl) shippingEl.textContent = fmt(summary.shipping);

    if (finalTotalEl) { 
        finalTotalEl.textContent = fmt(summary.finalTotal);
    } else {
        console.error("Lỗi: Không tìm thấy phần tử để cập nhật Tổng Cộng (Final Total)!");
    }
    subtotalEl.textContent = fmt(summary.subtotal);
    discountEl.textContent = `- ${fmt(summary.discount)}`; 
    shippingEl.textContent = fmt(summary.shipping);
    finalTotalEl.textContent = fmt(summary.finalTotal);
    const voucherInput = box.querySelector('.voucher-form input');
    if (voucherInput) {
        voucherInput.value = summary.voucherCode;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const voucherForm = document.querySelector('.voucher-form');
    if (voucherForm) {
        voucherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = voucherForm.querySelector('input');
            const code = input.value.trim();
            
            if (code) {
                if (applyVoucher(code)) {
                    renderCartSummary();
                }
            } else {
                appliedVoucher = null; 
                saveAppliedVoucher();
                renderCartSummary();
                toast('Mã voucher đã được hủy.');
            }
        });
    }
    if (typeof renderCartSummary === 'function') {
        renderCartSummary(); 
    }
    renderCartSummary(); 
});

const renderVoucherListForCart = () => {
    const container = document.getElementById('availableVouchersList');
    if (typeof VOUCHERS === 'undefined' || !container) return; 

    let html = '';
    VOUCHERS.forEach(v => {
        html += `
            <div class="voucher-tag" style="
                border: 1px dashed var(--accent); 
                padding: 5px 8px; 
                margin-bottom: 5px; 
                display: flex; 
                flex-direction: column;
                align-items: flex-start; 
                background-color: #fffaf0;
                cursor: pointer;
            " data-code="${v.code}" title="Nhấn để sao chép mã">
                <strong style="color: var(--accent); font-size: 0.9em;">MÃ: ${v.code}</strong>
                <span style="font-size: 0.8em; color: #555;">
                    ${v.description}
                    ${v.min_order > 0 ? `(ĐH từ ${fmt(v.min_order)})` : ''}
                </span>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.querySelectorAll('.voucher-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const code = e.currentTarget.dataset.code;
            const voucherInput = document.getElementById('voucherCode');
            if (voucherInput) {
                voucherInput.value = code;
                toast(`Đã điền mã "${code}" vào ô nhập. Vui lòng bấm "Áp dụng"!`);
            } else {
                navigator.clipboard.writeText(code).then(() => {
                    toast(`Đã sao chép mã "${code}"!`);
                }).catch(err => {
                    console.error('Không thể sao chép:', err);
                    toast(`Lỗi sao chép, mã: ${code}`);
                });
            }
        });
    });
};

const renderCheckoutItems = () => {
    const cart = getCart();
    const container = $("#checkoutItemsList");
    if (!container) return;

    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) {
        container.innerHTML = '<p class="muted">Giỏ hàng trống.</p>';
        return;
    }

    let html = '';
    cartKeys.forEach(id => {
        const p = PRODUCTS.find(pr => String(pr.id) === id); 
        if (!p) return;   
        const item = cart[id];
        const price = getProductPrice(p); 
        const lineTotal = price * item.qty;
        const imgSrc = p.img || p.image || 'image/default-product.png';
        html += `
            <div class="checkout-item-row" style="display: flex; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #eee;">
                
                <div style="flex: 3; display: flex; align-items: center;">
                    <img src="${imgSrc}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
                    <span style="font-size: 0.9em;">${p.name}</span>
                </div>
                
                <span style="flex: 1; text-align: center; font-size: 0.9em; font-weight: 600;">x${item.qty}</span>
                
                <span style="flex: 1; text-align: right; font-size: 0.9em; font-weight: 600;">${fmt(lineTotal)}</span>
            </div>
        `;
    });
    const headerRow = container.querySelector('.checkout-header-row');
    if (headerRow) {
      headerRow.insertAdjacentHTML('afterend', html);
    } else {
        container.innerHTML = html;
    }
    if (typeof renderCartSummary === 'function') {
        renderCartSummary(); 
    }
    container.innerHTML = html;
};

const getProductData = (id) => {
    return PRODUCTS.find(p => p.id === id);
};

const getCartSummary = () => {
    const cart = getCart();
    let subTotal = 0;
    const shippingFee = (typeof getShippingFee === 'function' ? getShippingFee() : 30000); 

    for (const id in cart) {
        const item = cart[id];
        const product = getProductData(id); 
        
        if (product) {
            const price = getProductPrice(product);
            subTotal += price * item.qty;
        }
    }

    const discount = 0;
    const finalTotal = subTotal + shippingFee - discount;

    return { subTotal, shippingFee, discount, finalTotal };
};

const handleCheckoutSubmit = () => {
    const form = document.getElementById('checkoutForm');
    if (!form) console.error("❌ Không tìm thấy form checkoutForm");

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const { finalTotal } = getCartSummary(); 
        const orderCode = '#TFS' + Math.floor(Math.random() * 900000 + 100000);
        const shippingCode = 'SHIP' + Math.floor(Math.random() * 900000 + 100000);

        renderOrderConfirmation(orderCode, shippingCode, finalTotal);

        const checkoutGrid = document.querySelector('.checkout-grid');
        const confirmation = document.getElementById('orderConfirmation');
        
        if (checkoutGrid && confirmation) {
            checkoutGrid.style.setProperty('display', 'none', 'important'); 
            confirmation.style.setProperty('display', 'block', 'important'); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast("ĐẶT HÀNG THÀNH CÔNG! 🎉"); 
        } else {
            console.error("LỖI CẤU TRÚC: Không tìm thấy .checkout-grid hoặc #orderConfirmation.");
            toast("Đặt hàng thành công, nhưng không thể hiển thị hóa đơn.");
        }

        saveCart({});
        updateCartCount();
    });
};
if (document.URL.includes('checkout.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        handleCheckoutSubmit();
    });
}


const renderOrderConfirmation = (orderCode, shippingCode, finalTotal) => {
  const orderCodeEl = document.getElementById("orderCode");
  const shippingCodeEl = document.getElementById("shippingCode");
  const finalPaidTotalEl = document.getElementById("finalPaidTotal");

  if (orderCodeEl) orderCodeEl.textContent = orderCode;
  if (shippingCodeEl) shippingCodeEl.textContent = shippingCode;
  if (finalPaidTotalEl) finalPaidTotalEl.textContent = fmt(finalTotal);
  const name = document.querySelector('[name="name"]')?.value || "Không rõ";
  const phone = document.querySelector('[name="phone"]')?.value || "Không rõ";
  const email = document.querySelector('[name="email"]')?.value || "Không cung cấp";
  const address = document.querySelector('[name="address"]')?.value || "Không rõ";
  const payment = document.querySelector('[name="payment"]:checked')?.value === "cod" 
    ? "Thanh toán khi nhận hàng (COD)" 
    : "Chuyển khoản ngân hàng";

  const customerInfoEl = document.getElementById("customerInfo");
  if (customerInfoEl) {
    customerInfoEl.innerHTML = `
      <h3 style="margin-top:20px; text-align:center;">Thông tin khách hàng</h3>
      <div style="text-align:left; max-width:400px; margin:10px auto; line-height:1.8;">
        <strong>Họ và tên:</strong> ${name}<br>
        <strong>Số điện thoại:</strong> ${phone}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Địa chỉ:</strong> ${address}<br>
        <strong>Phương thức thanh toán:</strong> ${payment}
      </div>
    `;
  }
};
