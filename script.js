const brands = [
  {
    name: "Adidas",
    categories: ["Zapatillas", "Indumentaria"],
    logo: "./assets/logos/adidas.png"
  },
  {
    name: "Birkenstock",
    categories: ["Sandalias", "Accesorios"],
    logo: "./assets/logos/birkenstock.png"
  },
  {
    name: "New Balance",
    categories: ["Zapatillas", "Indumentaria"],
    logo: "./assets/logos/new-balance.png"
  },
  { name: "Alo", categories: ["Indumentaria", "Accesorios"] },
  {
    name: "Nike",
    categories: ["Zapatillas", "Indumentaria"],
    logo: "./assets/logos/nike.png"
  },
  {
    name: "Golden Goose",
    categories: ["Zapatillas", "Indumentaria"]
  },
  {
    name: "Miu Miu",
    categories: ["Calzado", "Accesorios"],
    logo: "./assets/logos/miu-miu.png"
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

const brandGrid = document.getElementById("brandGrid");
const productGrid = document.getElementById("productGrid");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

function fillFilterOptions() {
  const allBrands = [...new Set(products.map((p) => p.brand))];
  const allCategories = [...new Set(products.map((p) => p.category))];

  allBrands.forEach((brand) => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandFilter.appendChild(opt);
  });

  allCategories.forEach((category) => {
    const opt = document.createElement("option");
    opt.value = category;
    opt.textContent = category;
    categoryFilter.appendChild(opt);
  });
}

function renderBrands() {
  brandGrid.innerHTML = brands
    .map(
      (brand) => `
      <article class="brand-card" data-brand="${brand.name}" role="button" tabindex="0" aria-label="Ver productos ${brand.name}">
        ${
          brand.logo
            ? `<img class="brand-logo" src="${brand.logo}" alt="" loading="lazy" aria-hidden="true" />`
            : `<h3>${brand.name}</h3>`
        }
      </article>
    `
    )
    .join("");
}

/** Al elegir una marca: catálogo filtrado por esa marca y scroll al bloque. */
function showBrandInCatalog(brandName) {
  brandFilter.value = brandName;
  categoryFilter.value = "all";
  statusFilter.value = "all";
  renderProducts();

  const catalogSection = document.getElementById("catalogo");
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

brandGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".brand-card");
  if (!card || !brandGrid.contains(card)) return;
  const name = card.dataset.brand;
  if (name) showBrandInCatalog(name);
});

brandGrid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".brand-card");
  if (!card || !brandGrid.contains(card)) return;
  e.preventDefault();
  const name = card.dataset.brand;
  if (name) showBrandInCatalog(name);
});

function statusBadge(status) {
  if (status === "stock") {
    return '<span class="badge badge-stock">En stock</span>';
  }
  return '<span class="badge badge-order">Por encargue</span>';
}

function renderProducts() {
  const selectedBrand = brandFilter.value;
  const selectedCategory = categoryFilter.value;
  const selectedStatus = statusFilter.value;

  const filtered = products.filter((item) => {
    const matchBrand = selectedBrand === "all" || item.brand === selectedBrand;
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchBrand && matchCategory && matchStatus;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML =
      '<p>No hay resultados con esos filtros. Probá cambiando marca o categoría.</p>';
    return;
  }

  productGrid.innerHTML = filtered
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

  document.querySelectorAll(".product-image").forEach(setImageFallback);
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

[brandFilter, categoryFilter, statusFilter].forEach((el) =>
  el.addEventListener("change", renderProducts)
);

fillFilterOptions();
renderBrands();
renderProducts();
