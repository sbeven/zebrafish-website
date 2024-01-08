SELECT 
	gene,
    (RGC * 0.5 +  `RGC spec` * 0.5) AS weighted
FROM 
    c
ORDER BY 
    weighted DESC
LIMIT 50;