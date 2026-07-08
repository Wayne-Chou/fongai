/**
 * 靜態頁／產品搜尋索引（標題 + 摘要）
 * type: page | product
 * product 僅在 lang === "zh" 時由 search-engine 顯示
 */
const searchPagesData = [
  {
    id: "page:index",
    type: "page",
    url: "/index.html",
    title: {
      zh: "首頁｜FongAI 高齡防跌",
      en: "Home | FongAI Fall Prevention",
      ja: "ホーム｜FongAI転倒予防",
    },
    excerpt: {
      zh: "AI 動態骨架與行動力評估，協助醫療與長照降低跌倒風險。",
      en: "AI skeletal analysis and mobility assessment for safer elder care.",
      ja: "AI骨格分析と移動能力評価で高齢者ケアの安全を支援。",
    },
  },
  {
    id: "page:about",
    type: "page",
    url: "/about.html",
    title: {
      zh: "公司介紹｜用 AI 守護高齡行動力",
      en: "About Us | Protecting Elder Mobility with AI",
      ja: "会社紹介｜AIで高齢者の移動能力を守る",
    },
    excerpt: {
      zh: "建豐健康科技透過 FongAI 影像分析，將標準化評估帶入日常照護。",
      en: "Jianfeng brings standardized assessment into daily care with FongAI.",
      ja: "FongAI映像解析で標準化された評価を日常ケアへ。",
    },
  },
  {
    id: "page:technology",
    type: "page",
    url: "/technology.html",
    title: {
      zh: "核心技術｜AI 深度影像分析",
      en: "Core Technology | AI Video Analysis",
      ja: "コア技術｜AI映像解析",
    },
    excerpt: {
      zh: "以 17 個關鍵骨架點解碼行動力，即時評估跌倒風險。",
      en: "Real-time fall-risk assessment via 17 skeletal joints.",
      ja: "17骨格キーポイントで転倒リスクをリアルタイム評価。",
    },
  },
  {
    id: "page:contact",
    type: "page",
    url: "/contact.html",
    title: {
      zh: "聯絡我們",
      en: "Contact Us",
      ja: "お問い合わせ",
    },
    excerpt: {
      zh: "醫療、照護單位與預防醫學夥伴諮詢合作。",
      en: "Inquiries and partnerships for medical and care organizations.",
      ja: "医療・介護・予防医学パートナーとの連携相談。",
    },
  },
  {
    id: "page:fongaiapp",
    type: "page",
    url: "/fongaiapp.html",
    title: {
      zh: "FongAI 快速鑑測 APP",
      en: "FongAI Rapid Assessment APP",
      ja: "FongAI迅速検知APP",
    },
    excerpt: {
      zh: "約 2 分鐘完成專業防跌鑑測，無需穿戴裝置。",
      en: "Professional fall screening in about 2 minutes, no wearables.",
      ja: "約2分で転倒リスク評価、装着デバイス不要。",
    },
  },
  {
    id: "page:vivifrail",
    type: "page",
    url: "/vivifrail.html",
    title: {
      zh: "Vivifrail 長者活力體能訓練方案",
      en: "Vivifrail Exercise Guidance",
      ja: "Vivifrail活力運動指引",
    },
    excerpt: {
      zh: "依鑑測結果匹配科學化運動方案，降低跌倒風險。",
      en: "Personalized exercise plans based on assessment results.",
      ja: "評価結果に基づく科学的運動プログラム。",
    },
  },
  {
    id: "page:exercise",
    type: "page",
    url: "/fongai-exercise.html",
    title: {
      zh: "FongAI 建議運動課程",
      en: "FongAI Suggested Exercise Courses",
      ja: "FongAI推奨運動コース",
    },
    excerpt: {
      zh: "有氧、肌力、平衡與柔軟度四大建議課程。",
      en: "Aerobic, strength, balance and flexibility recommendations.",
      ja: "有酸素・筋力・バランス・柔軟性の4領域提案。",
    },
  },
  {
    id: "page:partners",
    type: "page",
    url: "/partners.html",
    title: {
      zh: "經銷夥伴招募",
      en: "Distributor Recruitment",
      ja: "代理店・パートナー募集",
    },
    excerpt: {
      zh: "攜手開拓高齡健康市場與防跌服務經銷網路。",
      en: "Partner with us to expand senior health and fall prevention services.",
      ja: "高齢者ヘルスケア市場を共に開拓。",
    },
  },
  {
    id: "page:news-list",
    type: "page",
    url: "/news/news.html",
    title: {
      zh: "資訊與案例",
      en: "Insights and Cases",
      ja: "ニュースと事例",
    },
    excerpt: {
      zh: "健康科技動態、醫學專欄與機構合作實踐成果。",
      en: "Health tech trends, medical columns, and partner case studies.",
      ja: "ヘルスケア技術動向、医学コラム、連携実績。",
    },
  },
  {
    id: "page:wp-list",
    type: "page",
    url: "/whitepapers/index.html",
    title: {
      zh: "產業白皮書",
      en: "Industry Whitepapers",
      ja: "産業ホワイトペーパー",
    },
    excerpt: {
      zh: "從 AI 防跌到行動力經濟，重塑高齡科技未來。",
      en: "From AI fall prevention to the mobility economy.",
      ja: "AI転倒予防からモビリティ経済まで。",
    },
  },
  {
    id: "product:selected",
    type: "product",
    url: "/product/selected-products.html",
    title: {
      zh: "建豐嚴選健康生活好物",
      en: "Featured Products",
      ja: "建豐厳選健康グッズ",
    },
    excerpt: {
      zh: "骨架檢測後用戶的輔具與健康用品精選平台。",
      en: "Curated aids and wellness products for post-assessment users.",
      ja: "骨格検査後向けの補助具・健康用品セレクト。",
    },
  },
  {
    id: "product:01",
    type: "product",
    url: "/product/product-01.html",
    title: {
      zh: "足適能調整式遠紅外線鞋墊",
      en: "Adjustable Far-Infrared Insoles",
      ja: "足適能調整式遠赤外線インソール",
    },
    excerpt: {
      zh: "足弓支撐、減壓與步態姿勢調整輔助。",
      en: "Arch support, pressure relief, and gait posture adjustment.",
      ja: "土踏まずサポート、減圧、歩行姿勢の調整補助。",
    },
  },
  {
    id: "product:02",
    type: "product",
    url: "/product/product-02.html",
    title: {
      zh: "運動地墊遊戲平台",
      en: "Interactive Exercise Floor Mat",
      ja: "運動マットゲームプラットフォーム",
    },
    excerpt: {
      zh: "互動式地墊，結合運動與遊戲促進長者活動。",
      en: "Interactive mat combining exercise and games for seniors.",
      ja: "運動とゲームを組み合わせた高齢者向けインタラクティブマット。",
    },
  },
  {
    id: "product:03",
    type: "product",
    url: "/product/product-03.html",
    title: {
      zh: "HappyGoGo 團體運動軟體",
      en: "HappyGoGo Group Exercise Software",
      ja: "HappyGoGo団体運動ソフト",
    },
    excerpt: {
      zh: "趣味團體訓練課程，促進社交與體能。",
      en: "Fun group training that boosts social engagement and fitness.",
      ja: "楽しい団体トレーニングで交流と体力を促進。",
    },
  },
];
