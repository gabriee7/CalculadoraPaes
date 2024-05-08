<?php
require_once 'conexaoBD.php';
require_once 'IngredienteDAO.php';

class PaoDAO {
    private $conn;

    public function __construct() {
        $this->conn = getDbConnection();
    }

    public function addPao($nome, $descricao, $ingredientes) {
        $query = "INSERT INTO paes (nome, descricao) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $nome, $descricao);
        if (!$stmt->execute()) {
            throw new Exception('Erro ao adicionar pão: ' . $stmt->error);
        }
        $paoId = $stmt->insert_id;
        $stmt->close();

        $ingredienteDAO = new IngredienteDAO(); 

        foreach ($ingredientes as $ingrediente) {
            $ingredienteId = $ingrediente['id'];
            $percentual = $ingrediente['percentual'];

            if (!is_numeric($percentual) || $percentual < 0 || $percentual > 100) {
                throw new Exception('Percentual de ingrediente inválido.');
            }

            $query = "INSERT INTO pao_ingredientes (pao_id, ingrediente_id, percentual) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("iid", $paoId, $ingredienteId, $percentual);
            if (!$stmt->execute()) {
                throw new Exception('Erro ao adicionar ingrediente ao pão: ' . $stmt->error);
            }
            $stmt->close();
        }
    }

    public function getPao($id) {
        $query = "SELECT * FROM paes WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            throw new Exception('Erro ao obter pão: ' . $stmt->error);
        }
        $result = $stmt->get_result();
        $pao = $result->fetch_assoc();
        $stmt->close();

        if (!$pao) {
            return null;
        }

        $query = "SELECT i.id, i.nome, pi.percentual
                  FROM pao_ingredientes pi
                  JOIN ingredientes i ON pi.ingrediente_id = i.id
                  WHERE pi.pao_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            throw new Exception('Erro ao obter ingredientes associados: ' . $stmt->error);
        }
        $result = $stmt->get_result();
        $pao['ingredientes'] = [];
        while ($row = $result->fetch_assoc()) {
            $pao['ingredientes'][] = [
                'id' => $row['id'],
                'nome' => $row['nome'],
                'percentual' => $row['percentual']
            ];
        }
        $stmt->close();
        return $pao;
    }

    public function listPaes() {
        $query = "SELECT * FROM paes";
        $result = $this->conn->query($query);
        if (!$result) {
            throw new Exception('Erro ao listar pães: ' . $this->conn->error);
        }
        $paes = [];
        while ($row = $result->fetch_assoc()) {
            $paes[] = $row;
        }
        return $paes;
    }

    public function __destruct() {
        $this->conn->close();
    }
}
