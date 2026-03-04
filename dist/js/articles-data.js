/**
 * FongAI 文章資料庫
 * 所有的文章內容都管理在這裡
 */
const articlesData = [
  {
    id: "news-2026-001",
    category: "news",
    categoryName: "媒體報導",
    title: "FongAI 獲選年度創新健康科技獎",
    date: "2026-02-12",
    excerpt:
      "運用動態骨架偵測技術，我們在今年度的科技論壇中展示了如何大幅降低照護成本...",
    image: "https://images.pexels.com/photos/7578803/pexels-photo-7578803.jpeg",
    content: `
      <p>建豐健康科技今日宣布榮獲「2026 年度創新健康科技獎」。這項殊榮肯定了我們在 AI 動作偵測與預防醫學領域的卓越貢獻。</p>
      <h3>技術核心</h3>
      <p>我們的 AI 引擎能夠在不穿戴任何感測器的情況下，精準捕捉人體 33 個關鍵骨架點，這對長照機構的風險評估具有劃時代的意義。</p>
      
    `,
  },
  {
    id: "health-2026-001",
    category: "health",
    categoryName: "健康專欄",
    title: "預防醫學：居家檢測的新常態",
    date: "2026-02-10",
    excerpt:
      "後疫情時代，如何透過智慧化設備在家中完成基礎肌力檢測已成為重要議題...",
    image: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg",
    content: `
      <p>隨著高齡化社會來臨，肌少症已成為隱形殺手。透過建豐開發的居家檢測系統，長者只需對著手機鏡頭完成坐站測試，即可獲得健康評分。</p>
      <blockquote>「早發現、早訓練，是遠離失能的最佳捷徑。」</blockquote>
      <p>我們建議 65 歲以上的長者應每週進行一次基礎動作評估。</p>
    `,
  },
  {
    id: "service-2026-001",
    category: "service",
    categoryName: "機構案例",
    title: "台北市立聯合醫院導入案例",
    date: "2026-01-25",
    excerpt:
      "透過與醫療體系的串接，建豐協助完成超過 500 位長者的肌少症初步篩檢...",
    image: "https://images.pexels.com/photos/3020831/pexels-photo-3020831.jpeg",
    content: `<p>本計畫與台北市立聯合醫院合作，成功在社區據點佈建 AI 檢測站...</p>`,
  },
  {
    id: "tech-2026-001",
    category: "tech",
    categoryName: "AI 技術解析",
    title: "動態骨架偵測技術深度剖析",
    date: "2026-01-15",
    excerpt: "深入探討 FongAI 如何利用電腦視覺解決傳統穿戴式設備的不便...",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    content: `<p>電腦視覺在動作識別上的挑戰在於光影與遮擋問題...</p>`,
  },
  {
    id: "news-2026-002",
    category: "news",
    categoryName: "媒體報導",
    title: "建豐與日本醫療集團展開跨國合作",
    date: "2026-01-05",
    excerpt: "正式簽署戰略合作協議，將 AI 照護系統引進日本關東地區銀髮公寓...",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    content: `<p>日本市場對於 AI 照護技術有極大需求，建豐將提供全套軟體支援...</p>`,
  },
  {
    id: "service-2026-002",
    category: "service",
    categoryName: "機構案例",
    title: "企業員工健康日：科技篩檢活動",
    date: "2025-12-20",
    excerpt:
      "協助知名電子大廠舉辦全院健康日，透過 AI 檢測分析員工職場久坐職業病風險...",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    content: `<p>久坐導致的肩頸痠痛與腰部問題，透過 AI 掃描姿勢即能給出建議...</p>`,
  },
  {
    id: "health-2026-002",
    category: "health",
    categoryName: "健康專欄",
    title: "冬季防跌：長者室內運動指南",
    date: "2025-12-10",
    excerpt: "冷冬是長者跌倒的高峰期，這三個動作每天五分鐘，提升平衡力...",
    image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    content: `<p>防跌訓練的核心在於強化核心肌群與下肢穩定性...</p>`,
  },
  {
    id: "tech-2026-002",
    category: "tech",
    categoryName: "AI 技術解析",
    title: "邊緣運算在即時動作偵測中的應用",
    date: "2025-11-28",
    excerpt: "如何在隱私保護的前提下，不將影像上傳雲端即完成即時分析？",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    content: `<p>為了保護使用者隱私，我們將運算過程放在本地裝置執行...</p>`,
  },
  {
    id: "service-2026-003",
    category: "service",
    categoryName: "機構案例",
    title: "連鎖健身中心智能訓練場景開發",
    date: "2025-11-15",
    excerpt: "協助連鎖健身品牌開發數位教練系統，精準矯正學員深蹲姿勢...",
    image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg",
    content: `<p>深蹲不只是蹲下去，膝蓋與背部的角度是關鍵...</p>`,
  },
  {
    id: "service-2026-003",
    category: "service",
    categoryName: "機構案例",
    title: "連鎖健身中心智能訓練場景開發",
    date: "2025-11-15",
    excerpt: "協助連鎖健身品牌開發數位教練系統，精準矯正學員深蹲姿勢...",
    image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg",
    content: `<p>深蹲不只是蹲下去，膝蓋與背部的角度是關鍵...</p>`,
  },
  {
    id: "enterprise-2026-001",
    category: "enterprise",
    categoryName: "企業健康講座",
    title: "科技導入職場：AI 健康講座實戰分享",
    date: "2026-02-05",
    excerpt:
      "建豐健康科技受邀至上市科技企業舉辦員工健康講座，透過 AI 動作分析技術現場示範職場久坐風險評估...",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    content: `
    <p>隨著職場型態改變，久坐與肩頸痠痛已成為現代企業員工的常見健康問題。建豐健康科技受邀至科技產業龍頭企業，舉辦 AI 健康講座與即時檢測體驗活動。</p>

    <h3>AI 現場即時姿勢分析</h3>
    <p>透過 FongAI 動態骨架辨識系統，員工只需站在鏡頭前完成簡單動作，即可立即獲得姿勢穩定度與肌力風險評估報告。</p>

    <blockquote>「科技不只是效率工具，更是預防醫學的延伸。」</blockquote>

    <h3>數據化健康管理</h3>
    <p>本次講座共超過 200 名員工參與，活動後企業 HR 將整體數據匯整為健康趨勢報告，作為未來職場健康管理決策參考。</p>

    <p>建豐未來將持續與企業合作，推動智慧健康管理進入更多工作場域。</p>
  `,
  },
];
