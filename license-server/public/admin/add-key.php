<?php
/**
 * Crear clave de licencia (protege con contraseña).
 * POST: secret, admin_password, email, key (opcional), max_shops
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const API_SECRET = '';
const ADMIN_PASSWORD = 'cambia_esto'; // contraseña para este script
const STORAGE_FILE = __DIR__ . '/../../storage/licenses.json';

function respond(array $payload, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['ok' => false, 'error' => 'POST only'], 405);
}

$secret = $_POST['secret'] ?? '';
$adminPass = $_POST['admin_password'] ?? '';
$email = trim($_POST['email'] ?? '');
$key = trim($_POST['key'] ?? '');
$maxShops = (int) ($_POST['max_shops'] ?? 1);

if (API_SECRET !== '' && !hash_equals(API_SECRET, $secret)) {
    respond(['ok' => false, 'error' => 'secret inválido'], 403);
}

if (!hash_equals(ADMIN_PASSWORD, $adminPass)) {
    respond(['ok' => false, 'error' => 'admin_password inválido'], 403);
}

if ($email === '') {
    respond(['ok' => false, 'error' => 'email requerido'], 400);
}

if ($key === '') {
    $key = 'GS-' . strtoupper(bin2hex(random_bytes(4))) . '-' . strtoupper(bin2hex(random_bytes(2)));
}

$data = [];
if (is_file(STORAGE_FILE)) {
    $data = json_decode(file_get_contents(STORAGE_FILE) ?: '{}', true) ?: [];
}

if (isset($data[$key])) {
    respond(['ok' => false, 'error' => 'clave ya existe'], 409);
}

$data[$key] = [
    'email' => $email,
    'shop' => null,
    'max_shops' => max(1, $maxShops),
    'created' => date('c'),
];

file_put_contents(STORAGE_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

respond(['ok' => true, 'key' => $key, 'email' => $email]);
