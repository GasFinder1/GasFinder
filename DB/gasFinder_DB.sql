#drop database gasfinder;
create database gasfinder;
use gasfinder;

create table tbl_estado (
	id_estado int primary key auto_Increment,
    estado varchar(50), #NOT NULL?
    uf varchar(2)#NOT NULL?
);

INSERT INTO tbl_estado (estado, uf)
VALUES ('Acre', 'AC'),
 ('Alagoas', 'AL'),
 ('Amapá', 'AP'),
 ('Amazonas', 'AM'),
 ('Bahia', 'BA'),
 ('Ceará', 'CE'),
 ('Distrito Federal', 'DF'),
 ('Espírito Santo', 'ES'),
 ('Goiás', 'GO'),
 ('Maranhão', 'MA'),
 ('Mato Grosso', 'MT'),
 ('Mato Grosso do Sul', 'MS'),
 ('Minas Gerais', 'MG'),
 ('Pará', 'PA'),
 ('Paraíba', 'PB'),
 ('Paraná', 'PR'),
 ('Pernambuco', 'PE'),
 ('Piauí', 'PI'),
 ('Rio de Janeiro', 'RJ'),
 ('Rio Grande do Norte', 'RN'),
 ('Rio Grande do Sul', 'RS'),
 ('Rondônia', 'RO'),
 ('Roraima', 'RR'),
 ('Santa Catarina', 'SC'),
 ('São Paulo', 'SP'),
 ('Sergipe', 'SE'),
 ('Tocantins', 'TO');

create table tbl_usuario (
	id_usuario int primary key auto_increment,
    nome_usuario varchar(45) not null,
    email varchar (60) not null unique,
    senha varchar (20) not null
);
    
create table tbl_tipo_combustivel (
	id_combustivel int primary key auto_increment,
	nome_combustivel varchar(30) not null,
	unid_medida varchar (10)
);

INSERT INTO tbl_tipo_combustivel(nome_combustivel, unid_medida)
VALUES("Gasolina", "R$ / litro"),
("Gasolina Aditivada", "R$ / litro"),
("Etanol", "R$ / litro"),
("Diesel S10", "R$ / litro"),
("Diesel S500", "R$ / litro"),
("GNV", "R$ / m³");


create table tbl_posto (
	id_posto int (11)primary key auto_increment,
    cnpj varchar (14) not null unique,
	nome_posto varchar (115) not null,
    endereco varchar (65) not null default "",
	logradouro varchar (65),
	cep varchar (8) not null,
	municipio varchar (45) not null,
	bandeira varchar (45) not null,
	numero int (6),
	bairro varchar (50),
	complemento  varchar (125),
    uf int not null,
    foreign key(uf) references tbl_estado(id_estado)
);

INSERT into tbl_posto (nome_posto, cnpj, logradouro, cep, municipio, bandeira, numero, bairro, complemento, uf)
VALUES("COMPETRO COMERCIO E DISTRIBUICAO DE DERIVADOS DE PETROLEO LTDA", "00003188000121", "COMPETRO", "18061000", "SOROCABA", "BRANCA", "306", "JARDIM ZULMIRA", "", 25);

create table tbl_favoritos (
	id_favorito int primary key auto_increment,
    FK_id_usuario int,
    FK_id_posto int(11),
    foreign key(FK_id_posto) references tbl_posto(id_posto),
    foreign key(fk_id_usuario) references tbl_usuario(id_usuario)
);

create table tbl_posto_has_tipo_combustivel (
	fk_id_posto INT NOT NULL,
    fk_id_tipo_combustivel INT NOT NULL,
    foreign key(fk_id_posto) references tbl_posto(id_posto),
    foreign key(fk_id_tipo_combustivel) references tbl_tipo_combustivel(id_combustivel),
    valor FLOAT not null
);

create table tbl_colaborativa (
    valor_inserido float not null,
    dt_atualização date not null,
    fk_id_combustivel int not null,          
	fk_id_posto int not null,						
    fk_id_usuario int not null,
    foreign key(fk_id_usuario) references tbl_usuario(id_usuario),
    foreign key(fk_id_posto) references tbl_posto(id_posto),
    foreign key(fk_id_combustivel) references tbl_tipo_combustivel(id_combustivel)
);
-- trigger vai usar data de colaboração do user 
-- para deletar anualmente a contribuição quando fizer aniversario
    
create table tbl_historico_preco (
	fk_id_posto int primary key auto_increment, # ESSA CHAVE PRIMÁRIA ESTÁ CORRETA ?
	fk_id_combustivel int not null,
    ultimo_valor float not null,
    dt_atualizacao date not null,							   #DT_ATUALIZAÇÃO JÁ EXISTE NA TABELA COLABORATIVA##
    foreign key (fk_id_posto) references tbl_posto(id_posto),
    foreign key(fk_id_combustivel) references tbl_tipo_combustivel(id_combustivel)
);

CREATE TABLE tbl_localizacao_posto (
	id_tlc	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	lat		DOUBLE not null,
    lon		DOUBLE not null,
    fk_id_posto	int,
    foreign key(fk_id_posto) references tbl_posto(id_posto)
);

INSERT INTO tbl_localizacao_posto (lat, lon, fk_id_posto) VALUES(0.0, 0.0, 2);

#select * from tbl_tipo_combustivel;
#select * from tbl_estado;

-- | ====================== VIEWS ====================== | -- 
CREATE VIEW dados_posto AS
	SELECT p.id_posto, p.cnpj, p.nome_posto, p.endereco, p.cep, p.municipio, p.bandeira, p.numero, p.bairro,
    e.uf, e.estado,
    ptc.valor,
    tc.nome_combustivel, tc.unid_medida
		FROM tbl_posto AS p, tbl_posto_has_tipo_combustivel AS ptc, tbl_tipo_combustivel AS tc, tbl_estado AS e
		WHERE p.id_posto = ptc.fk_id_posto
		AND ptc.fk_id_tipo_combustivel = tc.id_combustivel
        AND p.uf = e.id_estado
		ORDER BY p.id_posto;
        
CREATE VIEW localizacao_dados_posto AS
	SELECT tlp.lat, tlp.lon,
		p.id_posto, p.cnpj, p.nome_posto, p.endereco, p.cep, p.municipio, p.bandeira, p.numero, p.bairro,
		e.uf, e.estado,
		ptc.valor,
		tc.nome_combustivel, tc.unid_medida
		FROM tbl_localizacao_posto AS tlp , tbl_posto AS p, tbl_posto_has_tipo_combustivel AS ptc, tbl_tipo_combustivel AS tc, tbl_estado AS e
		WHERE tlp.fk_id_posto = p.id_posto
        AND p.id_posto = ptc.fk_id_posto
		AND ptc.fk_id_tipo_combustivel = tc.id_combustivel
        AND p.uf = e.id_estado
		ORDER BY p.id_posto;
        
-- DROP VIEW localizacao_dados_posto;
-- ==========================================================

-- =============== SELECTS da tabela posto =============== -- 
select * from tbl_posto;
SELECT * FROM tbl_posto_has_tipo_combustivel WHERE fk_id_posto = 1 and fk_id_tipo_combustivel = 1;
SELECT * FROM tbl_posto WHERE id_posto = (SELECT COUNT(*) FROM tbl_posto);
SELECT * FROM tbl_posto WHERE cep = 11740000;
SELECT * FROM tbl_posto WHERE cep = 11740000 AND nome_posto = 'TENDA ATACADO SA';
SELECT * FROM tbl_posto WHERE nome_posto = 'TENDA ATACADO SA';
SELECT * FROM tbl_posto WHERE endereco LIKE "%bit%encourt%" and endereco LIKE "%regis%";
SELECT * FROM tbl_posto WHERE municipio LIKE "%EMBU DAS ARTES%" OR municipio = "EMBU DAS ARTES";
SELECT * FROM tbl_posto WHERE municipio = "EMBU DAS ARTES";
SELECT * FROM tbl_posto WHERE cep = 06850000 AND ( endereco LIKE "%regis%" OR endereco LIKE "%bittencourt%") AND ( nome_posto LIKE "%Leopoldo%" OR endereco LIKE "%Exemplo%");
SELECT * FROM tbl_posto WHERE cep = 06850000 AND ( endereco LIKE "%regis%" OR endereco LIKE "%bittencourt%");
SELECT * FROM tbl_posto WHERE endereco LIKE "%esq%";
SELECT * FROM tbl_posto WHERE nome_posto LIKE "%TRUCCOLLO%";

SELECT p1.* FROM tbl_posto p1
		JOIN (
			SELECT DISTINCT cep, nome_posto
			FROM tbl_posto
			ORDER BY id_posto DESC
			LIMIT 10
		) p2 ON p1.cep = p2.cep AND p1.nome_posto = p2.nome_posto;
        

-- =============== OUTROS SELECTS =============== --
SELECT * FROM dados_posto WHERE municipio LIKE "%Embu das artes%";
SELECT * FROM tbl_localizacao_posto;
SELECT * FROM localizacao_dados_posto WHERE lat = 0.0 AND lon = 0.0;
 
SELECT cep, nome_posto, COUNT(*) as quantidade
	FROM tbl_posto
	GROUP BY cep, nome_posto
	HAVING COUNT(*) > 1;
    
SELECT p.cep, p.nome_posto, e.estado, COUNT(*) as quantidade
	FROM tbl_posto p
	JOIN tbl_estado e ON p.uf = e.id_estado
	GROUP BY p.cep, p.nome_posto, e.estado
	HAVING COUNT(*) > 1;

SELECT cep, COUNT(*) AS total_postos
	FROM tbl_posto
	GROUP BY cep
	ORDER BY total_postos DESC;

SELECT NomePosto, CEP, Endereco,
    MATCH(CEP, Endereco, NomePosto) AGAINST ('termo de pesquisa') AS relevancia
	FROM postos WHERE MATCH(CEP, Endereco, NomePosto) 
    AGAINST ('termo de pesquisa')
	ORDER BY relevancia DESC LIMIT 1;
-- =======================================================================