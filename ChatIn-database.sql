-- Criação da tabela 'usuarios'
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    apelido VARCHAR(50)
);

-- Criação da tabela 'conversas'
CREATE TABLE conversas (
    id SERIAL PRIMARY KEY,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_user_to INT NOT NULL,
    fk_user_from INT NOT NULL,
    FOREIGN KEY (fk_user_to) REFERENCES usuarios(id),
    FOREIGN KEY (fk_user_from) REFERENCES usuarios(id)
);

-- Criação da tabela 'historicos'
CREATE TABLE historicos (
    id SERIAL PRIMARY KEY,
    mensagem TEXT NOT NULL,
    fk_user INT NOT NULL,
    fk_id_conversa INT NOT NULL,
    dt_msg_send TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_msg_received TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (fk_user) REFERENCES usuarios(id),
    FOREIGN KEY (fk_id_conversa) REFERENCES conversas(id)
);