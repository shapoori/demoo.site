/**
 * دمو سایت - موتور مدیریت سبد خرید و محاسبات مالی
 * کاملاً مستقل و آماده برای استقرار مستقیم در گیت‌هاب پیجز
 */

const CART_STORAGE_KEY = 'demo_site_cart_v1';
const COUPON_STORAGE_KEY = 'demo_site_applied_coupon';

// کوپن‌های تخفیف فعال در دمو سایت
const ACTIVE_COUPONS = {
  'DEMO20': { percent: 20, label: 'تخفیف ویژه دمو سایت (۲۰٪)' },
  'FIT10': { percent: 10, label: 'تخفیف همراهان تناسب اندام (۱۰٪)' },
  'CHAMPION': { percent: 15, label: 'تخفیف باشگاه قهرمانان (۱۵٪)' }
};

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.coupon = this.loadCoupon();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  loadCoupon() {
    try {
      const data = localStorage.getItem(COUPON_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon(coupon) {
    this.coupon = coupon;
    if (coupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
    this.notifyListeners();
  }

  // ایجاد کلید یکتا بر اساس شناسه، وزن و طعم
  getItemKey(productId, weight, flavor) {
    return `${productId}__${weight || 'default'}__${flavor || 'default'}`;
  }

  addItem(product, weight, flavor, quantity = 1) {
    if (!product) return;
    const selectedWeight = weight || (product.weights && product.weights[0]) || 'استاندارد';
    const selectedFlavor = flavor || (product.flavors && product.flavors[0]) || 'طبیعی';
    const key = this.getItemKey(product.id, selectedWeight, selectedFlavor);

    const existingIndex = this.cart.findIndex(item => item.key === key);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        key,
        id: product.id,
        name: product.name,
        englishName: product.englishName,
        brand: product.brand,
        price: product.price,
        weight: selectedWeight,
        flavor: selectedFlavor,
        quantity: quantity,
        image: product.image || (getProductById(product.id) && getProductById(product.id).image) || '',
        imageColor: product.imageColor || '#1A2234',
        accentColor: product.accentColor || '#FF6B00'
      });
    }

    this.saveCart();
    this.showToast(`«${product.name}» به سبد خرید دمو سایت افزوده شد.`);
    this.openDrawer();
  }

  updateQuantity(key, delta) {
    const itemIndex = this.cart.findIndex(item => item.key === key);
    if (itemIndex === -1) return;

    this.cart[itemIndex].quantity += delta;
    if (this.cart[itemIndex].quantity <= 0) {
      this.cart.splice(itemIndex, 1);
      this.showToast('آیتم از سبد خرید حذف شد.', 'info');
    }
    this.saveCart();
  }

  removeItem(key) {
    this.cart = this.cart.filter(item => item.key !== key);
    this.saveCart();
    this.showToast('آیتم با موفقیت حذف گردید.', 'info');
  }

  clear() {
    this.cart = [];
    this.coupon = null;
    localStorage.removeItem(COUPON_STORAGE_KEY);
    this.saveCart();
  }

  getTotals() {
    let subtotal = 0;
    let totalItems = 0;

    this.cart.forEach(item => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });

    let discountAmount = 0;
    if (this.coupon && ACTIVE_COUPONS[this.coupon.code]) {
      const percent = ACTIVE_COUPONS[this.coupon.code].percent;
      discountAmount = Math.round((subtotal * percent) / 100);
    }

    // ارسال رایگان برای سفارش‌های بالای ۱,۵۰۰,۰۰۰ تومان
    const freeShippingThreshold = 1500000;
    const shippingFee = (subtotal === 0 || subtotal >= freeShippingThreshold) ? 0 : 65000;

    const total = Math.max(0, subtotal - discountAmount + shippingFee);

    return {
      subtotal,
      discountAmount,
      shippingFee,
      total,
      totalItems,
      coupon: this.coupon,
      isFreeShipping: subtotal >= freeShippingThreshold && subtotal > 0
    };
  }

  applyCoupon(code) {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'لطفاً کد تخفیف را وارد کنید.' };
    }

    if (ACTIVE_COUPONS[trimmed]) {
      const couponData = {
        code: trimmed,
        label: ACTIVE_COUPONS[trimmed].label,
        percent: ACTIVE_COUPONS[trimmed].percent
      };
      this.saveCoupon(couponData);
      return { success: true, message: `کد تخفیف ${trimmed} با موفقیت اعمال گردید!` };
    } else {
      return { success: false, message: 'کد تخفیف وارد شده معتبر نمی‌باشد (کد تست: DEMO20)' };
    }
  }

  removeCoupon() {
    this.saveCoupon(null);
    this.showToast('کد تخفیف حذف گردید.', 'info');
  }

  notifyListeners() {
    this.updateBadges();
    this.renderDrawerUI();
    if (window.onCartUpdated) {
      window.onCartUpdated(this.getTotals(), this.cart);
    }
  }

  updateBadges() {
    const totals = this.getTotals();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = totals.totalItems.toString();
      if (totals.totalItems > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  }

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('translate-x-full', 'translate-x--full', 'opacity-0', 'pointer-events-none');
      drawer.classList.add('translate-x-0', 'opacity-100');
      overlay.classList.remove('hidden');
      setTimeout(() => overlay.classList.add('opacity-100'), 10);
      document.body.classList.add('overflow-hidden');
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        overlay.classList.add('hidden');
      }, 300);
      document.body.classList.remove('overflow-hidden');
    }
  }

  renderDrawerUI() {
    const container = document.getElementById('cart-drawer-items');
    const footerContainer = document.getElementById('cart-drawer-footer');
    if (!container) return;

    const totals = this.getTotals();

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-view py-12 px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-primary">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h4 class="text-white text-lg font-bold mb-2">سبد خرید شما در دمو سایت خالی است</h4>
          <p class="text-slate-400 text-sm mb-6 max-w-xs mx-auto">برای مشاهده برترین مکمل‌های ورزشی و استفاده از تخفیف‌های ویژه به فروشگاه سر بزنید.</p>
          <a href="products.html" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-orange-600 text-white font-bold text-sm transition-colors">
            مشاهده مکمل‌ها
            <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      `;
      if (footerContainer) {
        footerContainer.classList.add('hidden');
      }
      return;
    }

    if (footerContainer) {
      footerContainer.classList.remove('hidden');
    }

    let itemsHtml = '';
    this.cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      const itemImg = item.image || (getProductById(item.id) && getProductById(item.id).image) || 'assets/images/whey-gold.jpg';
      itemsHtml += `
        <div class="cart-item-card p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-3 relative transition-all hover:border-slate-700">
          <div class="w-20 h-20 rounded-lg flex-shrink-0 relative overflow-hidden border border-slate-800 bg-slate-950">
            <img src="${itemImg}" alt="${item.name}" class="w-full h-full object-cover">
          </div>

          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h5 class="text-white text-xs sm:text-sm font-bold line-clamp-1 leading-snug">${item.name}</h5>
                <button type="button" onclick="cartManager.removeItem('${item.key}')" class="text-slate-400 hover:text-red-400 p-1 -mr-1 transition-colors" title="حذف کالا">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5 mt-1">
                <span class="inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">${item.weight}</span>
                <span class="inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800 text-orange-400 font-medium">${item.flavor}</span>
              </div>
            </div>

            <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80">
              <div class="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <button type="button" onclick="cartManager.updateQuantity('${item.key}', 1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-bold transition-colors">+</button>
                <span class="text-white font-bold text-xs px-1 min-w-[18px] text-center">${item.quantity}</span>
                <button type="button" onclick="cartManager.updateQuantity('${item.key}', -1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-bold transition-colors">-</button>
              </div>

              <div class="text-left rtl:text-right">
                <span class="block text-xs font-black text-orange-400 font-chivo">${formatPrice(itemSubtotal)} <span class="text-[10px] font-normal text-slate-400">تومان</span></span>
                ${item.quantity > 1 ? `<span class="block text-[10px] text-slate-500">واحد: ${formatPrice(item.price)}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = itemsHtml;

    // آپدیت خلاصه هزینه در فوتر دراور
    const subtotalEl = document.getElementById('drawer-subtotal');
    const discountEl = document.getElementById('drawer-discount');
    const discountRow = document.getElementById('drawer-discount-row');
    const shippingEl = document.getElementById('drawer-shipping');
    const totalEl = document.getElementById('drawer-total');

    if (subtotalEl) subtotalEl.textContent = `${formatPrice(totals.subtotal)} تومان`;
    if (shippingEl) {
      shippingEl.innerHTML = totals.isFreeShipping 
        ? '<span class="text-emerald-400 font-bold">رایگان (طرح ویژه)</span>' 
        : `${formatPrice(totals.shippingFee)} تومان`;
    }

    if (discountRow) {
      if (totals.discountAmount > 0) {
        discountRow.classList.remove('hidden');
        if (discountEl) discountEl.textContent = `-${formatPrice(totals.discountAmount)} تومان`;
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (totalEl) totalEl.textContent = `${formatPrice(totals.total)} تومان`;
  }

  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 left-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'error' ? 'bg-red-600 border-red-500' : type === 'info' ? 'bg-slate-800 border-slate-700' : 'bg-slate-900 border-orange-500/80';
    
    toast.className = `p-3.5 rounded-xl text-white shadow-2xl border text-sm flex items-center justify-between gap-3 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto ${bgClass}`;
    toast.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-400' : 'bg-orange-500'}"></span>
        <span class="font-medium text-xs sm:text-sm leading-relaxed">${message}</span>
      </div>
      <button class="text-slate-400 hover:text-white p-1" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// ساخت نمونه سراسری
const cartManager = new CartManager();

// راه‌اندازی پس از بارگذاری DOM
document.addEventListener('DOMContentLoaded', () => {
  cartManager.updateBadges();
  cartManager.renderDrawerUI();
});
