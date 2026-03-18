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

  const itemsPerPage = 9;
  let currentPage = 1;
  let filteredItems = [];

  const articleList = document.getElementById("article-list");
  const paginationContainer = document.getElementById("pagination");
  const tags = document.querySelectorAll(".filter-tag");

  //
  function renderArticleList(data, page = 1) {
    if (!articleList) return;

    // 只取出當前頁面需要的資料 (例如 0~9, 9~18)
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pagedData = data.slice(start, end);

    articleList.innerHTML = pagedData
      .map(
        (article) => `
            <div class="col-md-6 col-lg-4 article-item" data-reveal>
                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <div class="card-img-wrapper" style="aspect-ratio: 16/9; background: #f0f0f0;">
                        <img src="${article.image}" 
                             loading="lazy" 
                             class="card-img-top" 
                             style="width: 100%; height: 100%; object-fit: cover;" 
                             alt="${article.title}">
                    </div>
                    <div class="card-body p-4">
                        <span class="badge badge-category mb-2">${article.categoryName}</span>
                        <h5 class="card-title fw-bold">${article.title}</h5>
                        <p class="card-text text-secondary small text-truncate-2">${article.excerpt}</p>
                        <a href="detail.html?id=${article.id}" class="stretched-link text-decoration-none fw-bold">
                            閱讀更多 <i class="bi bi-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    if (window.refreshRevealAnimations) {
      window.refreshRevealAnimations();
    }
  }

  // --- 執行篩選與分頁邏輯 ---
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

  // --- 核心功能 3：顯示分頁內容 ---
  function showCurrentPage() {
    const items = document.querySelectorAll(".article-item");
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? "block" : "none";
    });
  }

  // --- 核心功能 4：產生頁碼 ---
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

  // --- 初始化執行 ---
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get("type") || "all";

  // 依據 URL 初始化
  filterArticles(typeFromUrl);

  // 綁定標籤點擊事件
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      filterArticles(tag.getAttribute("data-filter"));
      // 點擊分類時清除 URL 參數，避免重新整理又跳回原分類
      window.history.pushState({}, "", window.location.pathname);
    });
  });
});
