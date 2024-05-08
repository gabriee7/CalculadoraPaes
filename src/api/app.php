<?php
// Incluir dependências
require_once '../persistence/conexaoBD.php';
require_once '../persistence/IngredienteDAO.php';
require_once '../persistence/PaoDAO.php';

// Função para lidar com a requisição HTTP
function handleRequest() {
    // Verifica o método HTTP e o caminho da requisição
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // Remova o prefixo '/api' se necessário para lidar com as rotas corretamente
    if (strpos($path, '/api') === 0) {
        $path = substr($path, 4);
    }

    // Mapeamento de rotas
    switch ($method) {
        case 'GET':
            if ($path === '/app.php/ingredientes') {
                handleListIngredientes();
            } elseif (preg_match('/^\/ingredientes\/(\d+)$/', $path, $matches)) {
                handleGetIngrediente((int)$matches[1]);
            } elseif ($path === '/app.php/paes') {
                handleListPaes();
            } elseif (preg_match('/^\/paes\/(\d+)$/', $path, $matches)) {
                handleGetPao((int)$matches[1]);
            } else {
                handleNotFound();
            }
            break;
        case 'POST':
            if ($path === '/app.php/ingredientes') {
                handleAddIngrediente();
            } elseif ($path === '/app.php/paes') {
                handleAddPao();
            } else {
                handleNotFound();
            }
            break;
        default:
            handleMethodNotAllowed();
            break;
    }
}

// Manipulação de rotas

function handleListIngredientes() {
    $ingredienteDAO = new IngredienteDAO();
    $ingredientes = $ingredienteDAO->listIngredientes();
    sendJsonResponse($ingredientes);
}

function handleAddIngrediente() {
    $data = json_decode(file_get_contents('php://input'), true);
    // Verificar se os dados são válidos
    if (isset($data['nome']) && is_string($data['nome'])) {
        $ingredienteDAO = new IngredienteDAO();
        $ingredienteDAO->addIngrediente($data['nome']);
        sendJsonResponse(['message' => 'Ingrediente adicionado com sucesso']);
    } else {
        sendBadRequest('Dados inválidos');
    }
}

function handleGetIngrediente($id) {
    $ingredienteDAO = new IngredienteDAO();
    $ingrediente = $ingredienteDAO->getIngrediente($id);
    sendJsonResponse($ingrediente);
}

function handleListPaes() {
    $paoDAO = new PaoDAO();
    $paes = $paoDAO->listPaes();
    sendJsonResponse($paes);
}

function handleAddPao() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['nome']) && isset($data['descricao']) && isset($data['ingredientes'])) {
        $paoDAO = new PaoDAO();
        $paoDAO->addPao($data['nome'], $data['descricao'], $data['ingredientes']);
        sendJsonResponse(['message' => 'Pão adicionado com sucesso']);
    } else {
        sendBadRequest('Dados inválidos');
    }
}

function handleGetPao($id) {
    $paoDAO = new PaoDAO();
    $pao = $paoDAO->getPao($id);
    sendJsonResponse($pao);
}

// Funções auxiliares para envio de respostas

function sendJsonResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
}

function sendBadRequest($message = 'Dados inválidos') {
    http_response_code(400);
    sendJsonResponse(['message' => $message]);
}

function handleNotFound() {
    http_response_code(404);
    sendJsonResponse(['message' => 'Requisição não encontrada']);
}

function handleMethodNotAllowed() {
    http_response_code(405);
    sendJsonResponse(['message' => 'Método não permitido']);
}

// Executa a função para lidar com a requisição HTTP
handleRequest();