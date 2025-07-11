CREATE TABLE nf (
    nnf tinyint,
    dest tinyint,
    serie tinyint,
    vt decimal(8, 2),
    emt date,
    chave char(44),
    sts tinyint
);

CREATE TABLE stock (
    id int primary key auto_increment,
    product varchar(50),
    sd decimal(6, 2),
    p_custo decimal(6, 2),
    p_venda decimal(6, 2),
    forn varchar(50),
    CONSTRAINT chk_negativar_saldo CHECK (sd >= 0)
);

CREATE TABLE userapp (
    id int primary key auto_increment,
    user varchar(50),
    password varchar(255)
);

CREATE TABLE sys (
    id smallint primary key auto_increment,
    name varchar(20),
    value decimal(6,2),
    bit tinyint,
    l1 date
);

INSERT INTO sys (name, value, bit, l1) VALUES ('license', null, 1, curdate()), ('point', 5, 1, curdate()), ('sdmin', 3, 1, curdate()), ('opencx', null, 0, curdate()), ('closecx', null, 0, curdate()), ('sefaz', null, 0, curdate());

CREATE TABLE nsd (
    id int primary key auto_increment,
    productid int,
    old_sd smallint,
    new_sd smallint,
    forn varchar(50),
    p_custo decimal(6,2),
    date date,
    time time
);

CREATE TRIGGER att_estoque
AFTER INSERT ON nsd
FOR EACH ROW
BEGIN
    UPDATE stock
    SET sd = sd + NEW.new_sd
    WHERE id = NEW.productid;
END;

CREATE EVENT sale_price
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    UPDATE stock s
    INNER JOIN sale sa
        ON s.id = sa.prod 
    SET s.p_venda = sa.saleprice
    WHERE sa.init = CURRENT_DATE();

    UPDATE stock s
    INNER JOIN sale sa
        ON s.id = sa.prod
    SET s.p_venda = sa.oldprice
    WHERE sa.end = CURRENT_DATE();
END;

CREATE TABLE cxlog (
    id int primary key auto_increment,
    oxc tinyint,
    userno smallint,
    date date,
    time time
);

CREATE TABLE cxop (
    id int primary key auto_increment,
    cash decimal(6,2),
    cred decimal(6,2),
    deb decimal(6,2),
    pix decimal(6,2),
    cashback decimal(6,2)
    idlog int
);

CREATE TABLE pedno (
    pedido int,
    prodno int,
    valor_unit decimal(6,2),
    unino smallint,
    data_fechamento date,
    sta tinyint,
    userno tinyint
);

CREATE TABLE pay (
    pedido int,
    tipo tinyint,
    valor_recebido decimal(6,2),
    valor_pedido decimal(6,2),
    cb tinyint,
    price_cb decimal(6,2),
    bit decimal(6,2)
);

CREATE TABLE company (
    empresa varchar(100),
    cnpj char(14),
    ie char(9)
    socialname varchar(100)
);