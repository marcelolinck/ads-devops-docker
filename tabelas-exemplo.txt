-- Tabela: categorias (5 campos)

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    ativo TINYINT(1) DEFAULT 1,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categorias (nome, descricao, ativo) VALUES
('Eletrônicos', 'Produtos eletrônicos em geral', 1),
('Alimentos', 'Itens alimentícios', 1),
('Vestuário', 'Roupas e acessórios', 1);


-- Tabela: produtos (5 campos)

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INT DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO produtos (nome, preco, quantidade_estoque, categoria_id) VALUES
('Fone de Ouvido Bluetooth', 89.90, 50, 1),
('Arroz 5kg', 24.50, 120, 2),
('Camiseta Básica', 39.90, 80, 3);
