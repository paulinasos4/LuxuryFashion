const brands = [
  {
    name: "Adidas",
    categories: ["Zapatillas", "Indumentaria"]
  },
  {
    name: "Birkenstock",
    categories: ["Sandalias", "Accesorios"]
  },
  {
    name: "New Balance",
    categories: ["Zapatillas", "Indumentaria"]
  },
  { name: "Alo", categories: ["Indumentaria", "Accesorios"] },
  {
    name: "Nike",
    categories: ["Zapatillas", "Indumentaria"]
  },
  {
    name: "Golden Goose",
    categories: ["Zapatillas", "Indumentaria"]
  },
  {
    name: "Miu Miu",
    categories: ["Calzado", "Accesorios"]
  }
];

const products = [
  { brand: "Adidas", title: "Samba OG", category: "Zapatillas", status: "stock" },
  { brand: "Adidas", title: "Firebird Track Top", category: "Indumentaria", status: "encargue" },
  {
    brand: "Birkenstock",
    title: "Birken Boston Black Leather",
    category: "Linea Boston",
    status: "stock",
    image: "./assets/birken-boston/black-leather.png"
  },
  {
    brand: "Birkenstock",
    title: "Birken Boston Oiled Brown",
    category: "Linea Boston",
    status: "encargue",
    image: "./assets/birken-boston/oiled-brown.png"
  },
  {
    brand: "Birkenstock",
    title: "Birken Boston Light Gray",
    category: "Linea Boston",
    status: "stock",
    image: "./assets/birken-boston/light-gray.png"
  },
  {
    brand: "Birkenstock",
    title: "Birken Boston Mocha",
    category: "Linea Boston",
    status: "stock",
    image: "./assets/birken-boston/mocha.png"
  },
  {
    brand: "Birkenstock",
    title: "Birken Boston Black Suede",
    category: "Linea Boston",
    status: "encargue",
    image: "./assets/birken-boston/black-suede.png"
  },
  { brand: "New Balance", title: "530 Classic", category: "Zapatillas", status: "stock" },
  { brand: "New Balance", title: "9060", category: "Zapatillas", status: "encargue" },
  { brand: "Alo", title: "Airlift Legging", category: "Indumentaria", status: "encargue" },
  { brand: "Alo", title: "Cropped Hoodie", category: "Indumentaria", status: "stock" },
  { brand: "Nike", title: "Air Force 1", category: "Zapatillas", status: "stock" },
  { brand: "Golden Goose", title: "Super-Star", category: "Zapatillas", status: "encargue" },
  { brand: "Miu Miu", title: "Logo Knit Sneakers", category: "Calzado", status: "encargue" }
];

const brandsSection = document.getElementById("marcas");
const activeBrandTitle = document.getElementById("activeBrandTitle");
const brandProducts = document.getElementById("brandProducts");
const brandsDropdown = document.getElementById("brandsDropdown");
const brandsToggle = document.getElementById("brandsToggle");
const brandsPanel = document.getElementById("brandsPanel");
const heroTiles = [
  document.getElementById("heroTile1"),
  document.getElementById("heroTile2"),
  document.getElementById("heroTile3")
];

const heroImages = [
  "./assets/hero/hero-1.png",
  "./assets/hero/hero-2.png",
  "./assets/hero/hero-3.png"
];

function setHeroImages() {
  heroTiles.forEach((tile, index) => {
    if (!tile) return;
    const imageUrl = heroImages[index];
    if (!imageUrl) return;
    tile.style.backgroundImage = `url("${imageUrl}")`;
  });
}

function renderBrandsDropdown() {
  if (!brandsPanel) return;
  const sorted = [...new Set(brands.map((brand) => brand.name))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
  brandsPanel.innerHTML = sorted
    .map(
      (name) =>
        `<a href="#marcas" class="brand-option" data-brand-option="${name}" role="menuitem">${name}</a>`
    )
    .join("");
}

function toggleBrandsDropdown(isOpen) {
  if (!brandsDropdown || !brandsToggle) return;
  const open = typeof isOpen === "boolean" ? isOpen : !brandsDropdown.classList.contains("open");
  brandsDropdown.classList.toggle("open", open);
  brandsToggle.setAttribute("aria-expanded", String(open));
}

function renderProductCards(list) {
  return list
    .map(
      (item) => `
      <article class="product-card">
        <img
          class="product-image"
          src="${item.image || `https://source.unsplash.com/1200x900/?${encodeURIComponent(item.brand + " " + item.category)}`}"
          alt="${item.title} - ${item.brand}"
          loading="lazy"
        />
        <div class="product-top">
          <span class="product-brand">${item.brand}</span>
          ${statusBadge(item.status)}
        </div>
        <h3 class="product-title">${item.title}</h3>
        <p class="product-meta">Categoría: ${item.category}</p>
      </article>
    `
    )
    .join("");
}

function showBrandInSection(brandName) {
  if (!brandsSection || !brandProducts || !activeBrandTitle) return;
  const items = products.filter((product) => product.brand === brandName);
  activeBrandTitle.textContent = brandName.toUpperCase();
  brandProducts.innerHTML =
    items.length > 0
      ? `<div class="product-grid">${renderProductCards(items)}</div>`
      : '<p class="empty-brand">No hay productos cargados para esta marca.</p>';
  brandsSection.classList.remove("is-hidden");
  document.querySelectorAll(".product-image").forEach(setImageFallback);

  if (brandsSection) {
    brandsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (brandsToggle) {
  brandsToggle.addEventListener("click", () => toggleBrandsDropdown());
}

if (brandsDropdown) {
  brandsDropdown.addEventListener("mouseenter", () => toggleBrandsDropdown(true));
  brandsDropdown.addEventListener("mouseleave", () => toggleBrandsDropdown(false));
}

if (brandsPanel) {
  brandsPanel.addEventListener("click", (e) => {
    const option = e.target.closest("[data-brand-option]");
    if (!option) return;
    const selectedBrand = option.dataset.brandOption;
    if (!selectedBrand) return;
    e.preventDefault();
    toggleBrandsDropdown(false);
    showBrandInSection(selectedBrand);
  });
}

document.addEventListener("click", (e) => {
  if (!brandsDropdown) return;
  if (brandsDropdown.contains(e.target)) return;
  toggleBrandsDropdown(false);
});

function statusBadge(status) {
  if (status === "stock") {
    return '<span class="badge badge-stock">En stock</span>';
  }
  return '<span class="badge badge-order">Por encargue</span>';
}

// Si una imagen externa falla, mantenemos una vista prolija con placeholder local.
function setImageFallback(img) {
  img.onerror = () => {
    img.onerror = null;
    img.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'>
          <rect width='100%' height='100%' fill='#f1ede6'/>
          <text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle'
            fill='#5a5a5a' font-family='Arial, sans-serif' font-size='42'>
            Luxury Fashion
          </text>
          <text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle'
            fill='#777' font-family='Arial, sans-serif' font-size='28'>
            Imagen referencial
          </text>
        </svg>`
      );
  };
}

setHeroImages();
renderBrandsDropdown();
