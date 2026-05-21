<?php
/**
 * GetSocial Theme — Verificación de licencia
 * GET: ?key=XXX&shop=tienda.myshopify.com&secret=opcional
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- CONFIGURACIÓN (edita antes de subir) ---
const API_SECRET = ''; // ej. 'mi_secreto_largo' o déjalo '' para desactivar
const STORAGE_FILE = __DIR__ . '/../storage/licenses.json'; // ruta absoluta en producción

// En producción, usa ruta fuera de public_html, ej.:
// const STORAGE_FILE = '/home/usuario/getsocial-license-storage/licenses.json';

function respond(bool $valid, string $message, int $code = 200): void
{
    http_response_code($code);
    echo json_encode([
        'valid' => $valid,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$key = trim($_GET['key'] ?? '');
$shop = strtolower(trim($_GET['shop'] ?? ''));
$secret = $_GET['secret'] ?? '';

if (API_SECRET !== '' && !hash_equals(API_SECRET, $secret)) {
    respond(false, 'No autorizado', 403);
}

if ($key === '' || $shop === '') {
    respond(false, 'Faltan parámetros key o shop', 400);
}

if (!preg_match('/^[a-z0-9][a-z0-9\-]*\.myshopify\.com$/', $shop)) {
    respond(false, 'Dominio de tienda no válido', 400);
}

if (!is_file(STORAGE_FILE)) {
    respond(false, 'Servidor de licencias no configurado', 500);
}

$raw = file_get_contents(STORAGE_FILE);
$data = json_decode($raw ?: '{}', true);
if (!is_array($data)) {
    respond(false, 'Base de datos de licencias corrupta', 500);
}

if (!isset($data[$key])) {
    respond(false, 'Clave de licencia no encontrada', 200);
}

$license = $data[$key];
$maxShops = (int) ($license['max_shops'] ?? 1);
$boundShop = isset($license['shop']) && $license['shop'] !== null && $license['shop'] !== ''
    ? strtolower((string) $license['shop'])
    : null;

// Ya activada en esta misma tienda
if ($boundShop === $shop) {
    respond(true, "Licencia válida para {$shop}");
}

// Activación primera vez
if ($boundShop === null) {
    $data[$key]['shop'] = $shop;
    $data[$key]['activated_at'] = date('c');
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents(STORAGE_FILE, $encoded, LOCK_EX) === false) {
        respond(false, 'Error al guardar activación', 500);
    }
    respond(true, "Licencia activada para {$shop}");
}

// Otra tienda intenta usar la misma clave
respond(false, "Esta clave ya está activada en {$boundShop}");
