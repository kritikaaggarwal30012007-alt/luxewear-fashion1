// LuxeWear Fashion - Interactive eCommerce Engine
document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  let state = {
    cart: JSON.parse(localStorage.getItem("lw_cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("lw_wishlist")) || [],
    recentlyViewed: JSON.parse(localStorage.getItem("lw_recent")) || [],
    orders: JSON.parse(localStorage.getItem("lw_orders")) || [
      {
        id: "LW-90823",
        date: "2026-06-10",
        items: [
          { name: "Aura Silk Slip Dress", price: 340, qty: 1, size: "M", color: "#000000" }
        ],
        total: 340,
        status: "Delivered",
        address: "742 Evergreen Terrace, Springfield"
      },
      {
        id: "LW-91402",
        date: "2026-06-18",
        items: [
          { name: "Linen Tailored Resort Shirt", price: 145, qty: 2, size: "L", color: "#FFFFFF" }
        ],
        total: 290,
        status: "Processing",
        address: "10 Downing St, London"
      }
    ],
    products: window.productsDatabase || [],
    user: JSON.parse(localStorage.getItem("lw_user")) || { name: "Alexandra Vance", email: "alex@luxewear.com", role: "admin" },
    currency: localStorage.getItem("lw_currency") || "USD",
    language: localStorage.getItem("lw_language") || "EN",
    theme: localStorage.getItem("lw_theme") || "light"
  };

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const currencyRates = { USD: 1.0, EUR: 0.92, GBP: 0.78 };

  // Sync state helper
  function saveState() {
    localStorage.setItem("lw_cart", JSON.stringify(state.cart));
    localStorage.setItem("lw_wishlist", JSON.stringify(state.wishlist));
    localStorage.setItem("lw_recent", JSON.stringify(state.recentlyViewed));
    localStorage.setItem("lw_orders", JSON.stringify(state.orders));
    localStorage.setItem("lw_user", JSON.stringify(state.user));
    localStorage.setItem("lw_currency", state.currency);
    localStorage.setItem("lw_language", state.language);
    localStorage.setItem("lw_theme", state.theme);
  }

  // --- INITIALIZATION ---
  document.documentElement.setAttribute("data-theme", state.theme);
  document.getElementById("theme-toggle").innerHTML = state.theme === "dark" ? "☼" : "☾";
  document.getElementById("currency-select").value = state.currency;
  document.getElementById("language-select").value = state.language;

  // Initialize UI Bindings
  updateCartBadge();
  updateWishlistBadge();

  // --- ROUTING ---
  function getRoute() {
    const hash = window.location.hash || "#home";
    const parts = hash.split("?");
    const path = parts[0];
    const params = {};
    if (parts[1]) {
      parts[1].split("&").forEach(p => {
        const kv = p.split("=");
        params[kv[0]] = decodeURIComponent(kv[1]);
      });
    }
    return { path, params };
  }

  function handleRoute() {
    const route = getRoute();
    const main = document.getElementById("app-main");
    main.innerHTML = `<div class="loader"></div>`;

    // Highlight nav link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === route.path) {
        link.classList.add("active");
      }
    });

    setTimeout(() => {
      switch (route.path) {
        case "#home":
          renderHome(main);
          break;
        case "#shop":
          renderShop(main, route.params);
          break;
        case "#product":
          renderProductDetails(main, route.params.id);
          break;
        case "#checkout":
          renderCheckout(main);
          break;
        case "#dashboard":
          renderDashboard(main);
          break;
        case "#admin":
          renderAdminPanel(main);
          break;
        case "#blog":
          renderBlog(main);
          break;
        case "#about":
          renderAbout(main);
          break;
        case "#contact":
          renderContact(main);
          break;
        case "#auth":
          renderAuth(main, route.params.action);
          break;
        default:
          window.location.hash = "#home";
      }
      window.scrollTo(0, 0);
    }, 300);
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();

  // --- CORE UI EVENTS ---
  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    document.getElementById("theme-toggle").innerHTML = state.theme === "dark" ? "☼" : "☾";
    saveState();
    showToast("Theme switched successfully.");
  });

  // Currency select
  document.getElementById("currency-select").addEventListener("change", (e) => {
    state.currency = e.target.value;
    saveState();
    handleRoute(); // re-render current page with new prices
    updateCartDrawer();
  });

  // Language select
  document.getElementById("language-select").addEventListener("change", (e) => {
    state.language = e.target.value;
    saveState();
    showToast(`Language set to ${state.language}`);
    handleRoute();
  });

  // Cart Drawer open/close
  document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart-drawer-overlay").classList.add("active");
    document.getElementById("cart-drawer").classList.add("active");
    updateCartDrawer();
  });

  document.getElementById("cart-close").addEventListener("click", closeCartDrawer);
  document.getElementById("cart-drawer-overlay").addEventListener("click", closeCartDrawer);

  function closeCartDrawer() {
    document.getElementById("cart-drawer-overlay").classList.remove("active");
    document.getElementById("cart-drawer").classList.remove("active");
  }

  // Mobile menu toggle
  document.getElementById("menu-toggle").addEventListener("click", () => {
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu.style.display === "flex") {
      navMenu.style.display = "";
    } else {
      navMenu.style.display = "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "60px";
      navMenu.style.left = "0";
      navMenu.style.width = "100%";
      navMenu.style.backgroundColor = "var(--bg-primary)";
      navMenu.style.padding = "20px";
      navMenu.style.borderBottom = "1px solid var(--border-color)";
      navMenu.style.zIndex = "99";
    }
  });

  // --- HELPERS ---
  function formatPrice(usdPrice) {
    const symbol = currencySymbols[state.currency];
    const rate = currencyRates[state.currency];
    return `${symbol}${(usdPrice * rate).toFixed(0)}`;
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "30px";
    toast.style.backgroundColor = "var(--color-black)";
    toast.style.color = "var(--color-white)";
    toast.style.border = "1px solid var(--color-gold)";
    toast.style.padding = "15px 25px";
    toast.style.fontSize = "12px";
    toast.style.letterSpacing = "1.5px";
    toast.style.textTransform = "uppercase";
    toast.style.zIndex = "1000";
    toast.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  function updateCartBadge() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cart-count").innerText = totalQty;
  }

  function updateWishlistBadge() {
    document.getElementById("wishlist-count").innerText = state.wishlist.length;
  }

  // Wishlist toggle handler
  window.toggleWishlist = function(productId, e) {
    if (e) e.stopPropagation();
    const index = state.wishlist.indexOf(productId);
    if (index === -1) {
      state.wishlist.push(productId);
      showToast("Added to Wishlist");
    } else {
      state.wishlist.splice(index, 1);
      showToast("Removed from Wishlist");
    }
    saveState();
    updateWishlistBadge();
    
    // Toggle active state styling on event button if clicked inside DOM
    if (e && e.currentTarget) {
      e.currentTarget.style.color = index === -1 ? "var(--color-gold)" : "var(--text-primary)";
    }
  };

  // Cart Management
  window.addToCart = function(productId, size = "M", color = "#000000", qty = 1, e) {
    if (e) e.stopPropagation();
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId && item.size === size && item.color === color);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        color,
        qty
      });
    }

    saveState();
    updateCartBadge();
    updateCartDrawer();
    showToast(`Added ${product.name} to Cart.`);
  };

  function updateCartDrawer() {
    const itemsContainer = document.getElementById("cart-items-list");
    if (!itemsContainer) return;

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = `<p style="text-align:center; color:#888; font-size:14px; margin-top:50px;">Your shopping bag is empty.</p>`;
      document.getElementById("cart-subtotal").innerText = formatPrice(0);
      document.getElementById("cart-total").innerText = formatPrice(0);
      return;
    }

    let html = "";
    let subtotal = 0;
    state.cart.forEach((item, index) => {
      subtotal += item.price * item.qty;
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-meta">Size: ${item.size} | Color: <span style="display:inline-block; width:10px; height:10px; background-color:${item.color}; border-radius:50%;"></span></p>
            </div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    });

    itemsContainer.innerHTML = html;
    document.getElementById("cart-subtotal").innerText = formatPrice(subtotal);
    // Shipping calculation: Free over 300, else 15
    const shipping = subtotal > 300 || subtotal === 0 ? 0 : 15;
    document.getElementById("cart-shipping").innerText = shipping === 0 ? "Complimentary" : formatPrice(shipping);
    document.getElementById("cart-total").innerText = formatPrice(subtotal + shipping);
  }

  window.updateQty = function(index, delta) {
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }
    saveState();
    updateCartBadge();
    updateCartDrawer();
  };

  // Checkout trigger
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty.");
      return;
    }
    closeCartDrawer();
    window.location.hash = "#checkout";
  });

  // --- HOME PAGE ---
  function renderHome(container) {
    let slides = [
      {
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1600",
        title: "The Editorial Collection",
        sub: "Sartorial Minimalist tailoring"
      },
      {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600",
        title: "Mulberry Silk Slips",
        sub: "Luxury resort loungewear"
      }
    ];

    let currentSlide = 0;

    container.innerHTML = `
      <section class="hero-slider" id="hero-sec">
        ${slides.map((s, idx) => `
          <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${s.image}')">
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <p class="hero-subtitle">${s.sub}</p>
              <h1 class="hero-title">${s.title}</h1>
              <a href="#shop" class="btn-luxe">Explore Collection</a>
            </div>
          </div>
        `).join("")}
      </section>

      <!-- Editorial Categories -->
      <section class="section-padding">
        <div class="section-header">
          <p class="section-subtitle">Aesthetic Curated Collections</p>
          <h2 class="section-title">Shop by Category</h2>
        </div>
        <div class="editorial-grid">
          <div class="editorial-card" onclick="window.location.hash='#shop?category=Women'">
            <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800" alt="Women">
            <div class="editorial-info">
              <p class="section-subtitle">01</p>
              <h3 class="hero-title" style="font-size: 32px; margin-bottom: 10px;">Women's Collection</h3>
              <p style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Silk gowns, knit tops, tailored bags</p>
            </div>
          </div>
          <div class="editorial-card" onclick="window.location.hash='#shop?category=Men'">
            <img src="https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=800" alt="Men">
            <div class="editorial-info">
              <p class="section-subtitle">02</p>
              <h3 class="hero-title" style="font-size: 32px; margin-bottom: 10px;">Men's Collection</h3>
              <p style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Melton overcoats, resort linen, leather jackets</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Trending Section -->
      <section class="section-padding" style="background-color: var(--bg-secondary);">
        <div class="section-header">
          <p class="section-subtitle">Must-Have Wardrobe Staples</p>
          <h2 class="section-title">Trending Pieces</h2>
        </div>
        <div class="product-grid">
          ${state.products.filter(p => p.trending).slice(0, 4).map(p => renderProductCardHTML(p)).join("")}
        </div>
      </section>

      <!-- Brand Narrative -->
      <section class="section-padding" style="max-width: 1000px; margin: 0 auto; text-align: center;">
        <p class="section-subtitle">Our Heritage</p>
        <h2 class="section-title" style="margin-bottom: 30px;">Quiet Luxury, Conscious Craft</h2>
        <p style="font-family: var(--font-serif); font-size: 20px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 30px; font-style: italic;">
          "LuxeWear was born out of a desire to reject transient fast fashion. We create wardrobe pillars crafted from premium fabrics—Mulberry silk, Mongolian cashmere, Irish linen, and premium Japanese selvage. Every detail, from biological cotton weaves to mother-of-pearl hardware, is engineered to endure."
        </p>
        <a href="#about" class="btn-luxe" style="border-color: var(--text-primary); color: var(--text-primary);">Read Our Story</a>
      </section>
    `;

    // Sliders rotation
    const heroSec = document.getElementById("hero-sec");
    if (heroSec) {
      const slidesDOM = heroSec.querySelectorAll(".hero-slide");
      setInterval(() => {
        slidesDOM[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slidesDOM.length;
        slidesDOM[currentSlide].classList.add("active");
      }, 7000);
    }
  }

  function renderProductCardHTML(product) {
    const inWishlist = state.wishlist.includes(product.id);
    const colorStyle = inWishlist ? "color: var(--color-gold);" : "";
    return `
      <div class="product-card" onclick="window.location.hash='#product?id=${product.id}'">
        <div class="product-image-wrap">
          <img src="${product.images[0]}" alt="${product.name}">
          ${product.images[1] ? `<img src="${product.images[1]}" class="img-hover" alt="${product.name}">` : ""}
          ${product.trending ? `<span class="product-badge gold">Trending</span>` : ""}
          ${product.newArrival && !product.trending ? `<span class="product-badge">New Seasonal</span>` : ""}
          <button class="wishlist-toggle" style="${colorStyle}" onclick="toggleWishlist('${product.id}', event)">♥</button>
          <button class="product-quickadd" onclick="addToCart('${product.id}', 'M', '${product.colors[0]}', 1, event)">Quick Add</button>
        </div>
        <div class="product-info">
          <div>
            <p class="product-sub">${product.category} | ${product.subcategory}</p>
            <h3 class="product-title">${product.name}</h3>
          </div>
          <div>
            <div class="product-rating">★ ${product.rating}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- SHOP PAGE ---
  function renderShop(container, params = {}) {
    const selectedCategory = params.category || "";
    const selectedSub = params.subcategory || "";
    
    // Build lists for layout
    const allSubs = {
      Women: ["Dresses", "Tops", "Jeans", "Skirts", "Jackets", "Handbags", "Footwear"],
      Men: ["Shirts", "T-Shirts", "Jeans", "Jackets", "Hoodies", "Shoes", "Accessories"]
    };

    container.innerHTML = `
      <div class="shop-layout">
        <!-- Sidebar filters -->
        <aside class="shop-sidebar">
          <div class="filter-section">
            <h4 class="filter-title">Collections</h4>
            <ul class="filter-list">
              <li class="filter-item"><label><input type="radio" name="col-filter" value="" ${selectedCategory === "" ? "checked" : ""}> All Collections</label></li>
              <li class="filter-item"><label><input type="radio" name="col-filter" value="Women" ${selectedCategory === "Women" ? "checked" : ""}> Women's Collection</label></li>
              <li class="filter-item"><label><input type="radio" name="col-filter" value="Men" ${selectedCategory === "Men" ? "checked" : ""}> Men's Collection</label></li>
            </ul>
          </div>

          <div class="filter-section">
            <h4 class="filter-title">Categories</h4>
            <ul class="filter-list" id="sidebar-subs-list">
              <!-- Rendered based on selected collection -->
            </ul>
          </div>

          <div class="filter-section">
            <h4 class="filter-title">Price Range</h4>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <input type="range" id="price-range" min="50" max="1000" value="1000" style="accent-color:var(--color-gold);">
              <div style="display:flex; justify-content:space-between; font-size:12px;">
                <span>$50</span>
                <span id="price-val" style="font-weight:600;">$1000</span>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h4 class="filter-title">Sorting</h4>
            <select id="sort-select" class="form-input" style="padding:8px 10px;">
              <option value="popular">Most Popular</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>

        <!-- Shop Main content -->
        <div class="shop-content">
          <div class="shop-toolbar">
            <div style="font-size:13px; letter-spacing:1px; text-transform:uppercase;">
              Showing <span id="results-count" style="font-weight:600;">0</span> Pieces
            </div>
            <input type="text" id="shop-search" placeholder="Search LuxeWear..." class="form-input" style="max-width:300px; padding:8px 12px; font-size:13px;">
          </div>
          
          <div class="product-grid" id="shop-products-grid">
            <!-- Filtered products injection -->
          </div>
        </div>
      </div>
    `;

    // Filter binding logic
    const colFilters = document.querySelectorAll('input[name="col-filter"]');
    const priceRange = document.getElementById("price-range");
    const priceVal = document.getElementById("price-val");
    const sortSelect = document.getElementById("sort-select");
    const searchInput = document.getElementById("shop-search");

    let currentCategory = selectedCategory;
    let currentSub = selectedSub;

    function populateSubs() {
      const subsList = document.getElementById("sidebar-subs-list");
      let subs = [];
      if (currentCategory === "Women") {
        subs = allSubs.Women;
      } else if (currentCategory === "Men") {
        subs = allSubs.Men;
      } else {
        subs = [...allSubs.Women, ...allSubs.Men];
        // Unique elements
        subs = [...new Set(subs)];
      }

      subsList.innerHTML = `
        <li class="filter-item"><label><input type="radio" name="sub-filter" value="" ${currentSub === "" ? "checked" : ""}> All Products</label></li>
        ${subs.map(s => `
          <li class="filter-item"><label><input type="radio" name="sub-filter" value="${s}" ${currentSub === s ? "checked" : ""}> ${s}</label></li>
        `).join("")}
      `;

      // Bind events to newly created subcategory buttons
      document.querySelectorAll('input[name="sub-filter"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
          currentSub = e.target.value;
          updateShopGrid();
        });
      });
    }

    function updateShopGrid() {
      const maxPrice = parseInt(priceRange.value);
      priceVal.innerText = `$${maxPrice}`;
      const searchWord = searchInput.value.toLowerCase().trim();

      let filtered = state.products.filter(p => {
        const matchesCol = currentCategory === "" ? true : p.category === currentCategory;
        const matchesSub = currentSub === "" ? true : p.subcategory === currentSub;
        const matchesPrice = p.price <= maxPrice;
        const matchesSearch = p.name.toLowerCase().includes(searchWord) || p.description.toLowerCase().includes(searchWord);
        return matchesCol && matchesSub && matchesPrice && matchesSearch;
      });

      // Sorting
      if (sortSelect.value === "low-high") {
        filtered.sort((a,b) => a.price - b.price);
      } else if (sortSelect.value === "high-low") {
        filtered.sort((a,b) => b.price - a.price);
      } else if (sortSelect.value === "rating") {
        filtered.sort((a,b) => b.rating - a.rating);
      } else {
        // default / popular (trending first)
        filtered.sort((a,b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
      }

      document.getElementById("results-count").innerText = filtered.length;
      const grid = document.getElementById("shop-products-grid");
      if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#888; margin-top:50px;">No wardrobe pieces found matching your filter criteria.</p>`;
      } else {
        grid.innerHTML = filtered.map(p => renderProductCardHTML(p)).join("");
      }
    }

    colFilters.forEach(radio => {
      radio.addEventListener("change", (e) => {
        currentCategory = e.target.value;
        currentSub = ""; // Reset subcategory when changing main collection
        populateSubs();
        updateShopGrid();
      });
    });

    priceRange.addEventListener("input", updateShopGrid);
    sortSelect.addEventListener("change", updateShopGrid);
    searchInput.addEventListener("input", updateShopGrid);

    // Initial setup
    populateSubs();
    updateShopGrid();
  }

  // --- PRODUCT DETAILS PAGE ---
  function renderProductDetails(container, productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) {
      container.innerHTML = `<p style="text-align:center; margin-top:50px;">Product not found.</p>`;
      return;
    }

    // Add to recently viewed
    if (!state.recentlyViewed.includes(product.id)) {
      state.recentlyViewed.unshift(product.id);
      if (state.recentlyViewed.length > 5) state.recentlyViewed.pop();
      saveState();
    }

    let activeImg = product.images[0];
    let selectedSize = product.sizes[0];
    let selectedColor = product.colors[0];

    container.innerHTML = `
      <div class="details-layout">
        <!-- Gallery -->
        <div class="details-gallery">
          <div class="gallery-thumbs">
            ${product.images.map((img, idx) => `
              <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this)">
                <img src="${img}" alt="${product.name}">
              </div>
            `).join("")}
          </div>
          <div class="gallery-main">
            <img src="${activeImg}" id="main-product-img" alt="${product.name}">
          </div>
        </div>

        <!-- Info -->
        <div class="details-info">
          <p class="details-sub">${product.category} | ${product.subcategory}</p>
          <h1 class="details-title">${product.name}</h1>
          
          <div class="details-rating">★ ${product.rating} (${product.reviews.length} Customer Reviews)</div>
          <div class="details-price">${formatPrice(product.price)}</div>
          
          <p class="details-desc">${product.description}</p>
          
          <div class="details-options">
            <div style="display:flex; justify-content:space-between; align-items:center; max-width:350px;">
              <span class="options-title">Select Size</span>
              <span style="font-size:11px; text-decoration:underline; cursor:pointer;" onclick="openSizeGuide()">Size Guide</span>
            </div>
            <div class="size-selector">
              ${product.sizes.map(s => `
                <button class="size-btn ${s === selectedSize ? 'active' : ''}" onclick="selectDetailSize('${s}', this)">${s}</button>
              `).join("")}
            </div>

            <span class="options-title">Select Color</span>
            <div class="color-selector">
              ${product.colors.map(c => `
                <div class="color-dot ${c === selectedColor ? 'active' : ''}" style="background-color: ${c}; cursor:pointer; width:22px; height:22px; border:2px solid ${c === selectedColor ? 'var(--color-gold)' : 'transparent'}; border-radius:50%;" onclick="selectDetailColor('${c}', this)"></div>
              `).join("")}
            </div>
          </div>

          <div class="details-actions">
            <button class="btn-luxe-gold" style="flex-grow:1;" onclick="addToCart('${product.id}', '${selectedSize}', '${selectedColor}')">Add to Cart</button>
            <button class="btn-luxe" style="flex-grow:1;" onclick="buyNow('${product.id}', '${selectedSize}', '${selectedColor}')">Buy Now</button>
          </div>

          <!-- Tabs -->
          <div class="tab-nav">
            <button class="tab-btn active" onclick="switchDetailTab('specs', this)">Specifications</button>
            <button class="tab-btn" onclick="switchDetailTab('reviews', this)">Reviews (${product.reviews.length})</button>
          </div>

          <div class="tab-content" id="detail-tab-content">
            <p><strong>Material Composition:</strong> ${product.material}</p>
            <p style="margin-top:10px;"><strong>Care Instructions:</strong> ${product.care}</p>
          </div>
        </div>
      </div>

      <!-- AI Fashion Recommendations -->
      <section class="section-padding" style="border-top: 1px solid var(--border-color); background-color: var(--bg-secondary);">
        <div class="section-header">
          <p class="section-subtitle">AI Recommendation Engine</p>
          <h2 class="section-title">Complete The Look</h2>
        </div>
        <div class="product-grid">
          ${state.products.filter(p => product.aiRecommendation.includes(p.id) || (p.subcategory === product.subcategory && p.id !== product.id)).slice(0, 4).map(p => renderProductCardHTML(p)).join("")}
        </div>
      </section>

      <!-- Recently Viewed Widget -->
      <section class="section-padding" style="border-top: 1px solid var(--border-color);">
        <div class="section-header">
          <p class="section-subtitle">Your Browsing History</p>
          <h2 class="section-title">Recently Viewed Pieces</h2>
        </div>
        <div class="product-grid">
          ${state.products.filter(p => state.recentlyViewed.includes(p.id) && p.id !== product.id).slice(0, 4).map(p => renderProductCardHTML(p)).join("")}
        </div>
      </section>
    `;

    // Inner detail screen controllers
    window.switchDetailImage = function(imgSrc, element) {
      document.getElementById("main-product-img").src = imgSrc;
      document.querySelectorAll(".gallery-thumb-item").forEach(t => t.classList.remove("active"));
      element.classList.add("active");
    };

    window.selectDetailSize = function(size, element) {
      selectedSize = size;
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      element.classList.add("active");
    };

    window.selectDetailColor = function(color, element) {
      selectedColor = color;
      document.querySelectorAll(".color-dot").forEach(d => {
        d.style.borderColor = "transparent";
      });
      element.style.borderColor = "var(--color-gold)";
    };

    window.switchDetailTab = function(tabName, element) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      element.classList.add("active");
      
      const content = document.getElementById("detail-tab-content");
      if (tabName === "specs") {
        content.innerHTML = `
          <p><strong>Material Composition:</strong> ${product.material}</p>
          <p style="margin-top:10px;"><strong>Care Instructions:</strong> ${product.care}</p>
        `;
      } else {
        const reviewsHtml = product.reviews.length === 0 
          ? `<p>No customer reviews yet. Be the first to share your experience!</p>`
          : product.reviews.map(r => `
              <div style="border-bottom:1px solid var(--border-color); padding:15px 0;">
                <div style="display:flex; justify-content:between; font-weight:600; font-size:13px; margin-bottom:5px;">
                  <span>${r.name}</span>
                  <span style="color:var(--color-gold); margin-left:auto;">${"★".repeat(r.rating)}</span>
                </div>
                <p style="font-size:13px; color:var(--text-secondary);">${r.text}</p>
                <span style="font-size:11px; color:#999;">${r.date}</span>
              </div>
            `).join("");

        content.innerHTML = `
          <div>
            ${reviewsHtml}
            <div style="margin-top:30px; border-top:1px dashed var(--border-color); padding-top:20px;">
              <h4 style="margin-bottom:15px; text-transform:uppercase; letter-spacing:1px; font-size:13px;">Write A Review</h4>
              <form id="review-form" onsubmit="submitReview('${product.id}', event)">
                <div class="form-group">
                  <label class="form-label">Your Name</label>
                  <input type="text" id="rev-name" required class="form-input" style="max-width:300px;">
                </div>
                <div class="form-group">
                  <label class="form-label">Rating</label>
                  <select id="rev-rating" class="form-input" style="max-width:150px; padding:8px 10px;">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Review text</label>
                  <textarea id="rev-text" required class="form-input" rows="4"></textarea>
                </div>
                <button type="submit" class="btn-luxe">Submit Review</button>
              </form>
            </div>
          </div>
        `;
      }
    };
  }

  window.buyNow = function(productId, size, color) {
    addToCart(productId, size, color);
    closeCartDrawer();
    window.location.hash = "#checkout";
  };

  window.submitReview = function(productId, e) {
    e.preventDefault();
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const name = document.getElementById("rev-name").value;
    const rating = parseInt(document.getElementById("rev-rating").value);
    const text = document.getElementById("rev-text").value;

    product.reviews.push({
      name,
      rating,
      text,
      date: new Date().toISOString().split("T")[0]
    });

    // Recalculate average rating
    const sum = product.reviews.reduce((s, r) => s + r.rating, 0);
    product.rating = parseFloat((sum / product.reviews.length).toFixed(1));

    saveState();
    showToast("Review submitted successfully.");
    // Re-trigger product page
    renderProductDetails(document.getElementById("app-main"), productId);
  };

  // Size Guide trigger
  window.openSizeGuide = function() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = "1000";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.backdropFilter = "blur(5px)";

    overlay.innerHTML = `
      <div style="background-color:var(--bg-primary); padding:40px; border:1px solid var(--color-gold); max-width:550px; width:90%; position:relative;">
        <button style="position:absolute; top:20px; right:20px; background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);" onclick="this.parentElement.parentElement.remove()">×</button>
        <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px; text-transform:uppercase;">Luxury Size Guide</h3>
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color);">
              <th style="padding:10px 0;">Luxe Size</th>
              <th>US Size</th>
              <th>EU Size</th>
              <th>Chest (in)</th>
              <th>Waist (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:12px 0; font-weight:600;">XS</td>
              <td>2</td>
              <td>34</td>
              <td>32"</td>
              <td>25"</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:12px 0; font-weight:600;">S</td>
              <td>4 - 6</td>
              <td>36 - 38</td>
              <td>34"</td>
              <td>27"</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:12px 0; font-weight:600;">M</td>
              <td>8 - 10</td>
              <td>40 - 42</td>
              <td>36"</td>
              <td>29"</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:12px 0; font-weight:600;">L</td>
              <td>12 - 14</td>
              <td>44 - 46</td>
              <td>39"</td>
              <td>32"</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:12px 0; font-weight:600;">XL</td>
              <td>16</td>
              <td>48</td>
              <td>42"</td>
              <td>35"</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:11px; color:var(--text-secondary); margin-top:20px; line-height:1.5;">* LuxeWear builds garments true to European couture sizes. For oversized relaxed jackets or hoodies, we recommend ordering one size down for a slimmer silhouette.</p>
      </div>
    `;
    document.body.appendChild(overlay);
  };

  // --- CHECKOUT PAGE ---
  function renderCheckout(container) {
    let subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 300 ? 0 : 15;
    const total = subtotal + shipping;

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; padding: 40px;">
        <h1 class="details-title" style="text-align:center; margin-bottom:40px;">Secure Checkout</h1>
        
        <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:40px;">
          <!-- Left Forms -->
          <div>
            <form id="checkout-main-form" onsubmit="processCheckout(event)">
              <h3 style="font-family:var(--font-serif); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">1. Shipping Information</h3>
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" required class="form-input" value="${state.user.name}">
              </div>
              <div class="form-group">
                <label class="form-label">Address Line 1</label>
                <input type="text" required class="form-input" placeholder="Street, house number" id="check-address">
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input type="text" required class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">Postal Code</label>
                  <input type="text" required class="form-input">
                </div>
              </div>

              <h3 style="font-family:var(--font-serif); font-size:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px; margin-top:40px;">2. Payment Method</h3>
              <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:25px;">
                <label style="border:1px solid var(--border-color); padding:15px; display:flex; align-items:center; gap:15px; cursor:pointer;">
                  <input type="radio" name="payment-method" value="card" checked style="accent-color:var(--color-gold);">
                  <div>
                    <span style="font-weight:600; font-size:14px;">Credit / Debit Card (via Stripe)</span>
                    <p style="font-size:11px; color:var(--text-secondary);">Pay securely with Visa, Mastercard, or American Express.</p>
                  </div>
                </label>
                <label style="border:1px solid var(--border-color); padding:15px; display:flex; align-items:center; gap:15px; cursor:pointer;">
                  <input type="radio" name="payment-method" value="upi" style="accent-color:var(--color-gold);">
                  <div>
                    <span style="font-weight:600; font-size:14px;">UPI / QR Code</span>
                    <p style="font-size:11px; color:var(--text-secondary);">Instant wallet checkout (GPay, PhonePe, Paytm).</p>
                  </div>
                </label>
                <label style="border:1px solid var(--border-color); padding:15px; display:flex; align-items:center; gap:15px; cursor:pointer;">
                  <input type="radio" name="payment-method" value="paypal" style="accent-color:var(--color-gold);">
                  <div>
                    <span style="font-weight:600; font-size:14px;">PayPal Express</span>
                    <p style="font-size:11px; color:var(--text-secondary);">Redirect and authorize via your PayPal wallet.</p>
                  </div>
                </label>
              </div>

              <!-- Card form inputs -->
              <div id="stripe-card-inputs" style="background-color:var(--bg-secondary); padding:20px; border:1px solid var(--border-color); margin-bottom:30px;">
                <div class="form-group">
                  <label class="form-label">Card Number</label>
                  <input type="text" class="form-input" placeholder="xxxx xxxx xxxx xxxx" id="card-num" required>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                  <div class="form-group">
                    <label class="form-label">Expiry Date</label>
                    <input type="text" class="form-input" placeholder="MM/YY" id="card-expiry" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">CVC Security Code</label>
                    <input type="password" class="form-input" placeholder="***" id="card-cvc" required>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn-luxe-gold" style="width:100%;">Complete Purchase (${formatPrice(total)})</button>
            </form>
          </div>

          <!-- Right summary -->
          <div>
            <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:30px;">
              <h3 style="font-family:var(--font-serif); font-size:20px; margin-bottom:20px;">Order Summary</h3>
              <div style="max-height:300px; overflow-y:auto; border-bottom:1px solid var(--border-color); padding-bottom:20px; margin-bottom:20px;">
                ${state.cart.map(item => `
                  <div style="display:flex; gap:15px; margin-bottom:15px;">
                    <img src="${item.image}" style="width:50px; height:65px; object-fit:cover;">
                    <div style="flex-grow:1;">
                      <h4 style="font-size:13px; font-family:var(--font-serif);">${item.name}</h4>
                      <p style="font-size:10px; color:var(--text-secondary);">Size: ${item.size} x${item.qty}</p>
                    </div>
                    <span style="font-size:13px; font-weight:600;">${formatPrice(item.price * item.qty)}</span>
                  </div>
                `).join("")}
              </div>

              <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:10px;">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:10px;">
                <span>Shipping</span>
                <span>${shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:600; border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px;">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Dynamic payment selection updates
    const methodRadios = document.querySelectorAll('input[name="payment-method"]');
    const cardSection = document.getElementById("stripe-card-inputs");
    methodRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        if (e.target.value === "card") {
          cardSection.style.display = "block";
          document.getElementById("card-num").setAttribute("required", "true");
          document.getElementById("card-expiry").setAttribute("required", "true");
          document.getElementById("card-cvc").setAttribute("required", "true");
        } else {
          cardSection.style.display = "none";
          document.getElementById("card-num").removeAttribute("required");
          document.getElementById("card-expiry").removeAttribute("required");
          document.getElementById("card-cvc").removeAttribute("required");
        }
      });
    });

    window.processCheckout = function(e) {
      e.preventDefault();
      
      const newOrder = {
        id: `LW-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toISOString().split("T")[0],
        items: state.cart.map(i => ({ name: i.name, price: i.price, qty: i.qty, size: i.size, color: i.color })),
        total: total,
        status: "Processing",
        address: document.getElementById("check-address").value
      };

      state.orders.unshift(newOrder);
      state.cart = [];
      saveState();
      updateCartBadge();

      // Show overlay with success
      container.innerHTML = `
        <div style="max-width: 600px; margin: 100px auto; text-align:center; padding:50px; border:1px solid var(--color-gold); background-color:var(--bg-primary);">
          <span style="font-size:64px; color:var(--color-gold);">✓</span>
          <h1 class="details-title" style="margin-top:20px; font-size:32px;">Order Placed Successfully</h1>
          <p style="font-family:var(--font-serif); font-size:18px; margin:20px 0; color:var(--text-secondary);">Your luxury order reference is: <strong>${newOrder.id}</strong></p>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:40px;">We have sent an order invoice confirmation to: <strong>${state.user.email}</strong>. Our logistics partners will package and ship your selection in eco-friendly minimalist boxes shortly.</p>
          <a href="#dashboard" class="btn-luxe-gold">View Order Status</a>
          <a href="#home" class="btn-luxe" style="margin-left:15px; border-color:var(--text-primary); color:var(--text-primary);">Return Home</a>
        </div>
      `;

      showToast("Payment processed via Stripe. Order Created!");
    };
  }

  // --- USER DASHBOARD ---
  function renderDashboard(container) {
    let currentTab = "orders";

    function drawDashboardContent() {
      const dbContent = document.getElementById("db-view-panel");
      if (!dbContent) return;

      if (currentTab === "orders") {
        dbContent.innerHTML = `
          <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px;">Order History</h3>
          ${state.orders.length === 0 ? `<p style="color:#888;">No transactions found in this account.</p>` : state.orders.map(o => `
            <div style="border:1px solid var(--border-color); padding:20px; margin-bottom:20px; background-color:var(--bg-primary);">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px; font-size:13px;">
                <span>Order Ref: <strong>${o.id}</strong></span>
                <span>Date: ${o.date}</span>
                <span style="background-color:${o.status === "Delivered" ? "#d4edda" : "#fff3cd"}; color:${o.status === "Delivered" ? "#155724" : "#856404"}; padding:5px 12px; font-weight:600; text-transform:uppercase; font-size:10px;">${o.status}</span>
              </div>
              <div>
                ${o.items.map(item => `
                  <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:8px;">
                    <span>${item.name} (${item.size}) x${item.qty}</span>
                    <span>${formatPrice(item.price * item.qty)}</span>
                  </div>
                `).join("")}
              </div>
              <div style="border-top:1px solid var(--border-color); padding-top:12px; margin-top:12px; display:flex; justify-content:space-between; font-weight:600; font-size:14px;">
                <span>Destination: <span style="font-weight:400; color:var(--text-secondary);">${o.address}</span></span>
                <span>Total Paid: ${formatPrice(o.total)}</span>
              </div>
            </div>
          `).join("")}
        `;
      } else if (currentTab === "wish") {
        const wishProducts = state.products.filter(p => state.wishlist.includes(p.id));
        dbContent.innerHTML = `
          <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px;">Your Curated Wishlist</h3>
          ${wishProducts.length === 0 ? `<p style="color:#888;">No favorites saved yet.</p>` : `
            <div class="product-grid" style="grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));">
              ${wishProducts.map(p => renderProductCardHTML(p)).join("")}
            </div>
          `}
        `;
      } else {
        // profile settings
        dbContent.innerHTML = `
          <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px;">Profile Settings</h3>
          <form id="profile-edit-form" onsubmit="updateProfile(event)" style="max-width:500px;">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="prof-name" class="form-input" value="${state.user.name}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="prof-email" class="form-input" value="${state.user.email}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Update Password</label>
              <input type="password" id="prof-pass" class="form-input" placeholder="Leave empty to keep current password">
            </div>
            <button type="submit" class="btn-luxe-gold">Save Adjustments</button>
          </form>
        `;
      }
    }

    container.innerHTML = `
      <div class="dashboard-layout">
        <!-- Sidebar Navigation -->
        <aside class="dashboard-nav">
          <div style="padding:20px 10px; border-bottom:1px solid var(--border-color); margin-bottom:15px; text-align:center;">
            <div style="width:60px; height:60px; border-radius:50%; background-color:var(--color-gold); color:white; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:600; margin:0 auto 10px auto;">
              ${state.user.name[0]}
            </div>
            <h4 style="font-family:var(--font-serif); font-size:16px;">${state.user.name}</h4>
            <p style="font-size:11px; color:#888;">${state.user.email} (${state.user.role.toUpperCase()})</p>
          </div>
          <button class="dashboard-nav-item active" id="db-nav-orders" onclick="switchDbTab('orders')">Order History</button>
          <button class="dashboard-nav-item" id="db-nav-wish" onclick="switchDbTab('wish')">Saved Wishlist</button>
          <button class="dashboard-nav-item" id="db-nav-profile" onclick="switchDbTab('profile')">Account Settings</button>
          ${state.user.role === "admin" ? `<button class="dashboard-nav-item" onclick="window.location.hash='#admin'" style="color:var(--color-gold); font-weight:600;">Go To Admin Panel</button>` : ""}
          <button class="dashboard-nav-item" onclick="logoutUser()" style="margin-top:30px; border-top:1px dashed var(--border-color); color:#A30000;">Logout Account</button>
        </aside>

        <!-- Right Content panel -->
        <div class="dashboard-content" id="db-view-panel">
          <!-- Rendered views -->
        </div>
      </div>
    `;

    window.switchDbTab = function(tabName) {
      currentTab = tabName;
      document.querySelectorAll(".dashboard-nav-item").forEach(item => item.classList.remove("active"));
      const activeBtn = document.getElementById(`db-nav-${tabName}`);
      if (activeBtn) activeBtn.classList.add("active");
      drawDashboardContent();
    };

    window.updateProfile = function(e) {
      e.preventDefault();
      state.user.name = document.getElementById("prof-name").value;
      state.user.email = document.getElementById("prof-email").value;
      saveState();
      showToast("Profile info updated successfully.");
      renderDashboard(container);
    };

    window.logoutUser = function() {
      state.user = { name: "Guest Guest", email: "guest@luxewear.com", role: "customer" };
      saveState();
      showToast("Logged out successfully.");
      window.location.hash = "#home";
    };

    // Initial draw
    drawDashboardContent();
  }

  // --- ADMIN PANEL ---
  function renderAdminPanel(container) {
    if (state.user.role !== "admin") {
      container.innerHTML = `<p style="text-align:center; margin-top:50px; color:red;">Access Denied. Admin privilege required.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="max-width: 1400px; margin: 0 auto; padding: 40px;">
        <h1 class="details-title" style="margin-bottom:30px;">eCommerce Analytics & Admin Management</h1>

        <!-- High-level widgets -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; margin-bottom:40px;">
          <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:20px;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888;">Total Gross Revenue</span>
            <h3 style="font-size:28px; font-weight:600; margin-top:5px; color:var(--color-gold);">${formatPrice(state.orders.reduce((sum, o) => sum + o.total, 0))}</h3>
            <p style="font-size:11px; color:green; margin-top:5px;">↑ 12.4% vs last month</p>
          </div>
          <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:20px;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888;">Active Inventory Items</span>
            <h3 style="font-size:28px; font-weight:600; margin-top:5px;">${state.products.length} Products</h3>
            <p style="font-size:11px; color:#888; margin-top:5px;">5 subcategories added recently</p>
          </div>
          <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:20px;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888;">Orders Received</span>
            <h3 style="font-size:28px; font-weight:600; margin-top:5px;">${state.orders.length}</h3>
            <p style="font-size:11px; color:orange; margin-top:5px;">${state.orders.filter(o => o.status === "Processing").length} orders pending shipping</p>
          </div>
          <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:20px;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#888;">AI Recommendations Served</span>
            <h3 style="font-size:28px; font-weight:600; margin-top:5px;">2,450 Requests</h3>
            <p style="font-size:11px; color:green; margin-top:5px;">Conversions: 4.8%</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:40px; margin-bottom:40px;">
          <!-- SVG Sales Graph -->
          <div style="background-color:var(--bg-primary); border:1px solid var(--border-color); padding:30px;">
            <h3 style="font-family:var(--font-serif); font-size:18px; margin-bottom:25px;">Revenue Analytics Chart</h3>
            <div style="width:100%; height:250px; position:relative;">
              <svg viewBox="0 0 500 200" style="width:100%; height:100%; overflow:visible;">
                <path d="M 0 160 Q 100 120 200 100 T 400 60 T 500 40" fill="none" stroke="var(--color-gold)" stroke-width="3" />
                <path d="M 0 160 Q 100 120 200 100 T 400 60 T 500 40 L 500 200 L 0 200 Z" fill="rgba(212,175,55,0.08)" />
                <circle cx="200" cy="100" r="5" fill="var(--color-gold)" />
                <text x="210" y="90" font-size="10" fill="var(--text-primary)">$2,450 (Peak)</text>
                <line x1="0" y1="200" x2="500" y2="200" stroke="#CCC" />
                <text x="10" y="195" font-size="9" fill="#999">Jan</text>
                <text x="120" y="195" font-size="9" fill="#999">Feb</text>
                <text x="230" y="195" font-size="9" fill="#999">Mar</text>
                <text x="340" y="195" font-size="9" fill="#999">Apr</text>
                <text x="450" y="195" font-size="9" fill="#999">May</text>
              </svg>
            </div>
          </div>

          <!-- Add Product Form -->
          <div style="background-color:var(--bg-secondary); border:1px solid var(--border-color); padding:30px;">
            <h3 style="font-family:var(--font-serif); font-size:18px; margin-bottom:20px;">Insert New Fashion Item</h3>
            <form onsubmit="adminAddProduct(event)">
              <div class="form-group">
                <label class="form-label">Garment Name</label>
                <input type="text" id="admin-pname" required class="form-input">
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                <div class="form-group">
                  <label class="form-label">Price (USD)</label>
                  <input type="number" id="admin-pprice" required class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">Category</label>
                  <select id="admin-pcat" class="form-input" style="padding:8px 10px;">
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Subcategory</label>
                <input type="text" id="admin-psub" placeholder="Dresses, Shirts, Accessories..." required class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Image URL (Unsplash)</label>
                <input type="text" id="admin-pimg" value="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" required class="form-input">
              </div>
              <button type="submit" class="btn-luxe-gold" style="width:100%; padding:10px;">Add To Store Database</button>
            </form>
          </div>
        </div>

        <!-- Orders logs -->
        <div style="background-color:var(--bg-primary); border:1px solid var(--border-color); padding:30px;">
          <h3 style="font-family:var(--font-serif); font-size:20px; margin-bottom:25px;">Orders Log & Fulfillment</h3>
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-color);">
                <th style="padding:10px;">Order ID</th>
                <th>Destination Address</th>
                <th>Revenue</th>
                <th>Fulfillment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.orders.map(o => `
                <tr style="border-bottom:1px solid var(--border-color);">
                  <td style="padding:15px 10px; font-weight:600;">${o.id}</td>
                  <td>${o.address}</td>
                  <td>${formatPrice(o.total)}</td>
                  <td>
                    <span style="background-color:${o.status === "Delivered" ? "#d4edda" : "#fff3cd"}; color:${o.status === "Delivered" ? "#155724" : "#856404"}; padding:3px 10px; font-weight:600; text-transform:uppercase; font-size:9px;">
                      ${o.status}
                    </span>
                  </td>
                  <td>
                    ${o.status === "Processing" ? `<button class="btn-luxe" style="padding:5px 10px; font-size:9px; letter-spacing:1px;" onclick="shipOrder('${o.id}')">Ship Package</button>` : ""}
                    ${o.status === "Shipped" ? `<button class="btn-luxe-gold" style="padding:5px 10px; font-size:9px; letter-spacing:1px;" onclick="deliverOrder('${o.id}')">Mark Delivered</button>` : ""}
                    ${o.status === "Delivered" ? `<span style="color:green; font-weight:500;">Fulfilled</span>` : ""}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.adminAddProduct = function(e) {
      e.preventDefault();
      const name = document.getElementById("admin-pname").value;
      const price = parseFloat(document.getElementById("admin-pprice").value);
      const category = document.getElementById("admin-pcat").value;
      const subcategory = document.getElementById("admin-psub").value;
      const img = document.getElementById("admin-pimg").value;

      const newProduct = {
        id: `${category[0].toLowerCase()}-${subcategory.toLowerCase()}-${Date.now()}`,
        name,
        price,
        category,
        subcategory,
        images: [img, img],
        description: "A customized premium fashion piece crafted according to custom LuxeWear specifications.",
        material: "100% Cotton Velvet Blends",
        care: "Dry clean only.",
        sizes: ["S", "M", "L"],
        colors: ["#000000", "#FFFFFF"],
        rating: 5.0,
        reviews: [],
        aiRecommendation: ["w-dress-1"],
        trending: true,
        newArrival: true
      };

      state.products.unshift(newProduct);
      saveState();
      showToast(`Added ${name} into Inventory database.`);
      renderAdminPanel(container); // redraw admin panel
    };

    window.shipOrder = function(orderId) {
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = "Shipped";
        saveState();
        showToast(`Order ${orderId} has been shipped to logistics.`);
        renderAdminPanel(container);
      }
    };

    window.deliverOrder = function(orderId) {
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = "Delivered";
        saveState();
        showToast(`Order ${orderId} finalized and marked delivered.`);
        renderAdminPanel(container);
      }
    };
  }

  // --- BLOG SECTION ---
  function renderBlog(container) {
    let posts = [
      {
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
        title: "Sartorial Minimalist Tailoring: A Style Directive",
        desc: "We explore the revival of double-faced coats, organic fabric draping, and structured lines that shape the current season's editorial mood.",
        date: "June 19, 2026",
        tag: "EDITORIAL GUIDE"
      },
      {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600",
        title: "Mulberry Silk Slips: Day to Dusk Transitioning",
        desc: "Unlocking the versatility of premium silk. How to layer slip dresses with heavyweight knit structures or tailored blazers for the ideal dusk appeal.",
        date: "June 12, 2026",
        tag: "STYLE INSIGHTS"
      },
      {
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=600",
        title: "Conscious Wardrobes & Quiet Luxury Principles",
        desc: "An exploration of longevity over transience. Why natural materials like certified Mongolian cashmere and Peruvian Pima cotton remain sustainable investments.",
        date: "May 28, 2026",
        tag: "HERITAGE DISCUSSION"
      }
    ];

    container.innerHTML = `
      <section class="section-padding">
        <div class="section-header">
          <p class="section-subtitle">LuxeWear Journal</p>
          <h2 class="section-title">Fashion Trends & Style Guides</h2>
        </div>
        <div class="product-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
          ${posts.map(p => `
            <article style="background-color:var(--bg-primary); border:1px solid var(--border-color); display:flex; flex-direction:column; overflow:hidden;">
              <div style="width:100%; height:250px; overflow:hidden;">
                <img src="${p.image}" style="width:100%; height:100%; object-fit:cover; transition:var(--transition-luxe);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
              </div>
              <div style="padding:25px; display:flex; flex-direction:column; justify-content:space-between; flex-grow:1;">
                <div>
                  <span style="font-size:10px; color:var(--color-gold); font-weight:600; letter-spacing:2px; text-transform:uppercase; display:block; margin-bottom:10px;">${p.tag}</span>
                  <h3 style="font-family:var(--font-serif); font-size:18px; margin-bottom:12px; font-weight:400; line-height:1.4;">${p.title}</h3>
                  <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">${p.desc}</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:15px; font-size:11px; color:#999;">
                  <span>Published: ${p.date}</span>
                  <a href="#blog" style="color:var(--text-primary); text-transform:uppercase; font-weight:600; text-decoration:none; letter-spacing:1px;">Read Post →</a>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  // --- ABOUT PAGE ---
  function renderAbout(container) {
    container.innerHTML = `
      <section class="section-padding" style="max-width:1000px; margin:0 auto;">
        <h1 class="details-title" style="text-align:center; margin-bottom:40px;">Our Narrative</h1>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center; margin-bottom:60px;">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" style="width:100%; height:450px; object-fit:cover; border:1px solid var(--border-color);">
          <div>
            <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px;">The Philosophy of LuxeWear</h3>
            <p style="font-size:14px; line-height:1.8; color:var(--text-secondary); margin-bottom:20px;">Founded in 2012, LuxeWear was envisioned as an antidote to disposable clothing. Our founders sought to create garments that do not merely reflect seasonal trends, but rather stand as symbols of architectural refinement, fabric excellence, and premium craftsmanship.</p>
            <p style="font-size:14px; line-height:1.8; color:var(--text-secondary);">We align with factories that enforce fair-wage standards and focus on sustainable processing. Every piece is tailored using premium elements, from gold-zinc zippers to double-faced cashmere layers, reflecting the spirit of quiet luxury.</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center;">
          <div>
            <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:20px;">Sustainability & Integrity</h3>
            <p style="font-size:14px; line-height:1.8; color:var(--text-secondary); margin-bottom:20px;">Our materials are fully traceable. We source raw silk from organic silk farms, linen from Irish heritage fields, and selvage denim from local looms in Kojima, Japan. By producing in limited artisanal batches, we ensure zero inventory waste and preserve quality integrity.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600" style="width:100%; height:450px; object-fit:cover; border:1px solid var(--border-color);">
        </div>
      </section>
    `;
  }

  // --- CONTACT PAGE ---
  function renderContact(container) {
    container.innerHTML = `
      <section class="section-padding" style="max-width:1000px; margin:0 auto;">
        <h1 class="details-title" style="text-align:center; margin-bottom:40px;">Contact Luxury Concierge</h1>
        
        <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:60px;">
          <!-- Contact details -->
          <div>
            <h3 style="font-family:var(--font-serif); font-size:22px; margin-bottom:25px;">Client Services</h3>
            <p style="font-size:14px; line-height:1.6; color:var(--text-secondary); margin-bottom:30px;">Our concierge experts are available Monday through Sunday to guide you through fabric selections, fit advice, sizing queries, and transaction queries.</p>
            
            <div style="display:flex; flex-direction:column; gap:20px; font-size:13px;">
              <div>
                <strong>Global Telephone Hotline:</strong>
                <p style="color:var(--text-secondary); margin-top:5px;">+1 (800) LUXE-WEAR</p>
              </div>
              <div>
                <strong>Concierge Email Desk:</strong>
                <p style="color:var(--text-secondary); margin-top:5px;">concierge@luxewear.com</p>
              </div>
              <div>
                <strong>Corporate Headquarters:</strong>
                <p style="color:var(--text-secondary); margin-top:5px;">50 Avenue Montaigne, Paris, France</p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div style="background-color:var(--bg-secondary); padding:40px; border:1px solid var(--border-color);">
            <h3 style="font-family:var(--font-serif); font-size:20px; margin-bottom:20px;">Send a Direct Message</h3>
            <form onsubmit="submitContactForm(event)">
              <div class="form-group">
                <label class="form-label">Your Name</label>
                <input type="text" required class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" required class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Garment Concern / Order reference</label>
                <input type="text" class="form-input" placeholder="e.g. Size query, order LW-XXXX">
              </div>
              <div class="form-group">
                <label class="form-label">Message Details</label>
                <textarea required class="form-input" rows="5" placeholder="Elaborate details here..."></textarea>
              </div>
              <button type="submit" class="btn-luxe-gold" style="width:100%;">Dispatch Message</button>
            </form>
          </div>
        </div>
      </section>
    `;

    window.submitContactForm = function(e) {
      e.preventDefault();
      showToast("Message dispatched. Concierge will reply within 12 hours.");
      e.target.reset();
    };
  }

  // --- AUTH PAGES ---
  function renderAuth(container, action = "login") {
    if (action === "login") {
      container.innerHTML = `
        <div class="auth-container">
          <h2 class="auth-title">Login Account</h2>
          <form onsubmit="handleLoginSubmit(event)">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="auth-email" required class="form-input" value="alex@luxewear.com">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="auth-pass" required class="form-input" value="password">
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:20px;">
              <label style="display:flex; align-items:center; gap:5px; cursor:pointer;"><input type="checkbox" style="accent-color:var(--color-gold);"> Remember me</label>
              <a href="#auth?action=forgot" style="color:var(--text-primary); text-decoration:none;">Forgot Password?</a>
            </div>
            <button type="submit" class="btn-luxe-gold" style="width:100%; margin-bottom:15px;">Login Secured</button>
            <button type="button" class="btn-luxe" style="width:100%; margin-bottom:20px; background-color:#db4437; border-color:#db4437; color:white;" onclick="handleSocialLogin('Google')">Google OAuth Login</button>
          </form>
          <p style="font-size:12px; text-align:center; color:var(--text-secondary);">Don't possess an account? <a href="#auth?action=signup" style="color:var(--text-primary); font-weight:600; text-decoration:none;">Signup Here</a></p>
        </div>
      `;
    } else if (action === "signup") {
      container.innerHTML = `
        <div class="auth-container">
          <h2 class="auth-title">Register Account</h2>
          <form onsubmit="handleSignupSubmit(event)">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="reg-name" required class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="reg-email" required class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="reg-pass" required class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Verify Password</label>
              <input type="password" id="reg-pass-conf" required class="form-input">
            </div>
            <button type="submit" class="btn-luxe-gold" style="width:100%; margin-bottom:15px;">Create Account</button>
          </form>
          <p style="font-size:12px; text-align:center; color:var(--text-secondary);">Already have an account? <a href="#auth?action=login" style="color:var(--text-primary); font-weight:600; text-decoration:none;">Login Here</a></p>
        </div>
      `;
    } else {
      // Forgot Password
      container.innerHTML = `
        <div class="auth-container">
          <h2 class="auth-title">Reset Password</h2>
          <form onsubmit="handleForgotSubmit(event)">
            <p style="font-size:13px; text-align:center; color:var(--text-secondary); margin-bottom:20px; line-height:1.5;">Input your registered email below, and our systems will dispatch a secure reset link shortly.</p>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="forgot-email" required class="form-input">
            </div>
            <button type="submit" class="btn-luxe-gold" style="width:100%; margin-bottom:15px;">Send Reset Link</button>
          </form>
          <p style="font-size:12px; text-align:center;"><a href="#auth?action=login" style="color:var(--text-primary); text-decoration:none;">Return to Login</a></p>
        </div>
      `;
    }

    window.handleLoginSubmit = function(e) {
      e.preventDefault();
      const email = document.getElementById("auth-email").value;
      if (email === "alex@luxewear.com") {
        state.user = { name: "Alexandra Vance", email: "alex@luxewear.com", role: "admin" };
      } else {
        state.user = { name: "Valued Customer", email: email, role: "customer" };
      }
      saveState();
      showToast(`Welcome back, ${state.user.name}.`);
      window.location.hash = "#dashboard";
    };

    window.handleSignupSubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      
      state.user = { name: name, email: email, role: "customer" };
      saveState();
      showToast(`Welcome to LuxeWear, ${name}. Account initialized.`);
      window.location.hash = "#dashboard";
    };

    window.handleForgotSubmit = function(e) {
      e.preventDefault();
      showToast("Reset link dispatched. Please monitor your inbox.");
      window.location.hash = "#auth?action=login";
    };

    window.handleSocialLogin = function(platform) {
      state.user = { name: "Alex Vance (Social)", email: "alex.google@luxewear.com", role: "customer" };
      saveState();
      showToast(`Logged in successfully via ${platform}.`);
      window.location.hash = "#dashboard";
    };
  }

  // --- LIVE CHAT SUPPORT ENGINE ---
  const chatBubble = document.getElementById("chat-bubble");
  const chatPanel = document.getElementById("chat-panel");
  const chatClose = document.getElementById("chat-close");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  chatBubble.addEventListener("click", () => {
    chatPanel.classList.toggle("active");
  });

  chatClose.addEventListener("click", () => {
    chatPanel.classList.remove("active");
  });

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Render User message
    appendChatMessage(query, "user");
    chatInput.value = "";

    // Simulated Bot response delay
    setTimeout(() => {
      let reply = "Thank you for contacting LuxeWear concierge. A luxury brand support consultant will review your query shortly.";
      const queryLower = query.toLowerCase();
      
      if (queryLower.includes("size") || queryLower.includes("fit")) {
        reply = "LuxeWear garments are modeled to European sizes. You can review the exact measurements using our 'Size Guide' on any product page.";
      } else if (queryLower.includes("ship") || queryLower.includes("deliver") || queryLower.includes("shipping")) {
        reply = "We offer complimentary standard shipping globally on order checkout subtotals exceeding $300. Express shipping options arrive within 2-3 business days.";
      } else if (queryLower.includes("return") || queryLower.includes("exchange")) {
        reply = "LuxeWear operates a complimentary 30-day return policy. Items must be unworn and in their original packaging with designer tags intact.";
      } else if (queryLower.includes("coupon") || queryLower.includes("discount")) {
        reply = "As a quiet luxury atelier, we rarely run broad sales. However, new account registrations receive 10% off their first purchase using promo code: LUXESTART10";
      }

      appendChatMessage(reply, "bot");
    }, 1000);
  });

  function appendChatMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", sender);
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
