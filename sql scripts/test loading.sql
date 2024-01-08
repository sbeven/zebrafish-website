USE Genes;
CREATE TABLE IF NOT EXISTS Genes.a (
    gene VARCHAR(40),
    `Late RPCs` FLOAT(10),
    `Photoreceptor Precursor` FLOAT(10),
    RGC FLOAT(10),
    `Early RPCs` FLOAT(10),
    Amacrine FLOAT(10),
    `Muller Glia` FLOAT(10),
    Horizontal FLOAT(10),
    Bipolar FLOAT(10),
    Photoreceptor FLOAT(10)
);
LOAD DATA LOCAL INFILE 
'C:/Users/drago/OneDrive/Documents/zebrafish website/csvs/Developing_Retina_58373Pairs_cov.csv'
INTO TABLE a
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

CREATE TABLE IF NOT EXISTS Genes.b (
gene VARCHAR(40),
`Late RPCs spec` FLOAT(10),
`Photoreceptor Precursor spec` FLOAT(10),
`RGC spec` FLOAT(10),
`Early RPCs spec` FLOAT(10),
`Amacrine spec` FLOAT(10),
`Muller Glia spec` FLOAT(10),
`Horizontal spec` FLOAT(10),
`Bipolar spec` FLOAT(10),
`Photoreceptor spec` FLOAT(10)
);
LOAD DATA LOCAL INFILE 
'C:/Users/drago/OneDrive/Documents/zebrafish website/csvs/Developing_Retina_58373Pairs_spec.csv'
INTO TABLE b
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;



CREATE TABLE c AS SELECT a.*,
    `b`.`Late RPCs spec`,
    `b`.`Photoreceptor Precursor spec`,
    `b`.`RGC spec`,
    `b`.`Early RPCs spec`,
    `b`.`Amacrine spec`,
    `b`.`Muller Glia spec`,
    `b`.`Horizontal spec`,
    `b`.`Bipolar spec`,
    `b`.`Photoreceptor spec`
FROM a INNER JOIN b ON a.gene = b.gene;
