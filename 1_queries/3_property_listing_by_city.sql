SELECT p.id,p.title,p.cost_per_night,AVG(pr.rating) average_rating
FROM properties p
JOIN property_reviews pr
ON 	pr.property_id=p.id
WHERE p.city LIKE '%Vancouver%'
GROUP BY p.id
HAVING AVG(pr.rating) >= 4
ORDER BY p.cost_per_night;