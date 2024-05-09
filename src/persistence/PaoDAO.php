<?php
require_once 'conexaoBD.php';
require_once 'IngredienteDAO.php';

class PaoDAO {
    private $conn;

    public function __construct() {
        $this->conn = getDbConnection();
    }

    public function addPao($nome, $descricao, $ingredientes) {
        try {
            $query = "INSERT INTO pao (nome, descricao) VALUES (?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ss", $nome, $descricao);
    
            if (!$stmt->execute()) {
                error_log("addPao: Erro ao adicionar pão: " . $stmt->error);
                throw new Exception('Erro ao adicionar pão: ' . $stmt->error);
            }
    
            $paoId = $stmt->insert_id;
            $stmt->close();
    
            $query = "INSERT INTO pao_ingrediente (pao_id, ingrediente_id, percentual) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            foreach ($ingredientes as $ingrediente) {
                $ingredienteNome = $ingrediente['ingrediente'];
                $percentual = $ingrediente['percentual'];

                $query = "SELECT id FROM ingrediente WHERE nome = ?";
                $ingredientStmt = $this->conn->prepare($query);
                $ingredientStmt->bind_param("s", $ingredienteNome);

                if ($ingredientStmt->execute()) {
                    $result = $ingredientStmt->get_result();
                    if ($row = $result->fetch_assoc()) {
                        $ingredienteId = (int)$row['id'];
                    } else {
                        throw new Exception("Ingrediente com nome '{$ingredienteNome}' não encontrado.");
                    }
                } else {
                    error_log("Erro ao buscar ingrediente_id: " . $ingredientStmt->error);
                    throw new Exception('Erro ao buscar ingrediente_id: ' . $ingredientStmt->error);
                }

                $ingredientStmt->close();

                $stmt->bind_param("iid", $paoId, $ingredienteId, $percentual);
                if (!$stmt->execute()) {
                    error_log("addPao: Erro ao inserir ingrediente: " . $stmt->error);
                    throw new Exception('Erro ao adicionar ingrediente: ' . $stmt->error);
                }

            }

            $stmt->close();

            error_log("addPao: Pão e ingredientes adicionados com sucesso.");
        } catch (Exception $e) {
            error_log("addPao: Erro ao adicionar pão: " . $e->getMessage());
            throw $e;
        }
    }
    
    public function getPao($id) {
        $query = "SELECT * FROM pao WHERE id = ?";
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
        $query = "SELECT * FROM pao";
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
