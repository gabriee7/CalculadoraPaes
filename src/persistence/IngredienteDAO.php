<?php
require_once 'conexaoBD.php';

class IngredienteDAO {
    private $conn;

    public function __construct() {
        $this->conn = getDbConnection();
    }

    public function addIngrediente($nome) {
        $query = "INSERT INTO ingredientes (nome) VALUES (?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $nome);
        if (!$stmt->execute()) {
            throw new Exception('Erro ao adicionar ingrediente: ' . $stmt->error);
        }
        $stmt->close();
    }

    public function getIngrediente($id) {
        $query = "SELECT * FROM ingredientes WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            throw new Exception('Erro ao obter ingrediente: ' . $stmt->error);
        }
        $result = $stmt->get_result();
        $ingrediente = $result->fetch_assoc();
        $stmt->close();
        return $ingrediente;
    }

    public function listIngredientes() {
        $query = "SELECT * FROM ingredientes";
        $result = $this->conn->query($query);
        if (!$result) {
            throw new Exception('Erro ao listar ingredientes: ' . $this->conn->error);
        }
        $ingredientes = [];
        while ($row = $result->fetch_assoc()) {
            $ingredientes[] = $row;
        }
        return $ingredientes;
    }

    public function __destruct() {
        $this->conn->close();
    }
}
