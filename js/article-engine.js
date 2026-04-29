/**

 * 功能：動態資料渲染、分類篩選、自動分頁、URL參數導向
 */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof articlesData === "undefined") {
    console.error(
      "articlesData is not defined. Please check if articles-data.js is loaded.",
    );
    return;
  }
  const BASE = location.hostname.includes("github.io") ? "/fongai" : "";
  const itemsPerPage = 9;
  let currentPage = 1;
  let filteredItems = [];

  const articleList = document.getElementById("article-list");
  const paginationContainer = document.getElementById("pagination");
  const tags = document.querySelectorAll(".filter-tag");

  

  function renderArticleList(data, page = 1) {
    if (!articleList) return;

    
    const lang = localStorage.getItem("lang") || "zh";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pagedData = data.slice(start, end);

    articleList.innerHTML = pagedData
    .map((article) => {
      return `
        <div class="col-md-6 col-lg-4 article-item" data-reveal>
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-img-wrapper" style="aspect-ratio: 16/9; background: #f0f0f0;">
              <img src="${BASE + article.image}" 
                   loading="lazy" 
                   class="card-img-top" 
                   style="width: 100%; height: 100%; object-fit: cover;" 
                   alt="${article.title_zh}">
            </div>
  
            <div class="card-body p-4">
              <span class="badge badge-category mb-2"
                  data-dynamic-i18n
                  data-zh="${article.categoryName_zh}"
                  data-en="${article.categoryName_en || article.categoryName_zh}"
                  data-ja="${article.categoryName_ja || article.categoryName_zh}">
                  ${article.categoryName_zh}
              </span>
  
             
              <h5 class="card-title fw-bold"
                  data-dynamic-i18n
                  data-zh="${article.title_zh}"
                  data-en="${article.title_en || article.title_zh}"
                  data-ja="${article.title_ja || article.title_zh}">
                  ${article.title_zh}
              </h5>
  
             
              <p class="card-text text-secondary small text-truncate-2"
                 data-dynamic-i18n
                 data-zh="${article.excerpt_zh}"
                 data-en="${article.excerpt_en || article.excerpt_zh}"
                 data-ja="${article.excerpt_ja || article.excerpt_zh}">
                 ${article.excerpt_zh}
              </p>
  
            <a href="detail.html?id=${article.id}" 
              class="stretched-link text-decoration-none fw-bold"
              data-i18n="article.read_more">
              閱讀更多 <i class="bi bi-arrow-right ms-1"></i>
            </a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

    if (window.refreshRevealAnimations) {
      window.refreshRevealAnimations();
    }
  }
  if (window.loadLang) {
    const lang = localStorage.getItem("lang") || "zh";
    window.loadLang(lang);
  }
  function filterArticles(category) {
    tags.forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-filter") === category);
    });

    filteredItems =
      category === "all"
        ? articlesData
        : articlesData.filter((item) => item.category === category);

    renderArticleList(filteredItems);

    currentPage = 1;
    renderPagination();

    showCurrentPage();
  }

  function showCurrentPage() {
    const items = document.querySelectorAll(".article-item");
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? "block" : "none";
    });
  }

  function renderPagination() {
    if (!paginationContainer) return;
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    if (pageCount <= 1) return;

    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.onclick = (e) => {
        e.preventDefault();
        currentPage = i;

        document
          .querySelectorAll(".page-item")
          .forEach((el) => el.classList.remove("active"));
        li.classList.add("active");

        showCurrentPage();

        const scrollTarget = document.querySelector(".filter-wrapper");
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      paginationContainer.appendChild(li);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get("type") || "all";

  filterArticles(typeFromUrl);

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      filterArticles(tag.getAttribute("data-filter"));
      window.history.pushState({}, "", window.location.pathname);
    });
  });
});