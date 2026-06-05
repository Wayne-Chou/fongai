<?php

// 防止快取
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

// 預設首頁
$page = $_GET['page'] ?? 'index';

// 保留 /
$page = preg_replace('/[^a-zA-Z0-9_\/-]/', '', $page);

// 對應 html
$file = __DIR__ . '/' . $page . '.html';

// 載入頁面
if (file_exists($file)) {
    include($file);
} else {
    http_response_code(404);
    echo "<h1>404 Page Not Found</h1>";
}