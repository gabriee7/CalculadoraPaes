var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.getElementById("addRow").addEventListener("click", function (ev) {
    ev.preventDefault();
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = '<td><input id="nomeIngredienteEscolha-1" list="ingredientes" class="form-control" placeholder="Escolha"><datalist id="ingredientes"></datalist></td><td>';
    cell2.innerHTML = ' <input type="number" step="0.01" class="form-control" placeholder="Percentual"></td>';
});
document.addEventListener("DOMContentLoaded", function () {
    var btnAddIngrediente = document.getElementById("btnSalvarIngrediente");
    btnAddIngrediente.addEventListener("click", addIngrediente);
});
document.addEventListener("DOMContentLoaded", loadIngredientes);
function loadIngredientes() {
    return __awaiter(this, void 0, void 0, function () {
        var datalist, response, ingredientes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    datalist = document.getElementById("ingredientes");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/ingredientes")];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    ingredientes = _a.sent();
                    datalist.innerHTML = "";
                    ingredientes.forEach(function (ingrediente) {
                        console.log(ingrediente);
                        var option = document.createElement("option");
                        option.value = ingrediente.nome;
                        datalist.appendChild(option);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    console.error("Erro ao buscar os ingredientes:", response.statusText);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Erro ao buscar os ingredientes:", error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
;
function addIngrediente() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeIngredienteInput, nomeIngrediente, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nomeIngredienteInput = document.getElementById("nomeIngrediente");
                    nomeIngrediente = nomeIngredienteInput.value;
                    if (nomeIngrediente.trim() === "") {
                        alert("Por favor, insira um nome para o ingrediente.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/ingredientes", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nome: nomeIngrediente,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        alert("Ingrediente adicionado com sucesso.");
                        nomeIngredienteInput.value = "";
                    }
                    else {
                        alert("Erro ao adicionar o ingrediente.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao adicionar o ingrediente:", error_2);
                    alert("Erro ao adicionar o ingrediente.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
