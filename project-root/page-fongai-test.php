<?php
/**
 * Template Name: FongAI
 */

// 1. 強制讓 GoDaddy 不要快取這個跳轉動作
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

// 2. 執行伺服器端跳轉 (301 代表永久轉址，對 SEO 最好)
// 這會讓瀏覽器一觸碰到 https://fongai.co 就立刻噴向 /fongai/
header("Location: https://fongai.co/fongai/", true, 301);

// 3. 結束程式，確保後面不會再跑出任何 WordPress 的東西
exit;