SELECT p.id, p.title, p.cost_per_night, r.start_date, r.guest_id, AVG(pr.rating) average_rating
FROM properties p
JOIN reservations r
ON p.id=r.property_id
JOIN property_reviews pr
ON 	pr.property_id=p.id
WHERE r.end_date < now()::date AND r.guest_id=1
GROUP BY p.id, r.start_date, r.guest_id, r.end_date
ORDER BY r.start_date;