INSERT INTO users(name,email,password) VALUES
('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna','jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza','jacksondavid@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Etta West','charlielevy@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Margaret Wong','makaylaweiss@icloud.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leroy Hart','jaycereynolds@inbox.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO  properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) VALUES
(1,'Speed lamp','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',930.61,6,4,8,'Canada','536 Namsub Highway','Sotboske','Quebec',28142,true),
(1,'Blank corner','description','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',85234,6,6,7,'Canada','651 Nami Road','Bohbatev','Alberta',83680,true),
(2,'Habit mix','description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',46058,0,5,6,'Canada','1650 Hejto Center','Genwezuj','Newfoundland And Labrador',44583,true),
(4,'Headed know','description','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',82640,0,5,5,'Canada','513 Powov Grove','Jaebvap','Ontario',38051,true),
(6,'Port out','description','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',2358,2,8,0,'Canada','1392 Gaza Junction','Upetafpuv','Nova Scotia',81059,true),
(6,'Fun glad','description','https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg',34291,6,6,4,'Canada','169 Nuwug Circle','Vutgapha','Newfoundland And Labrador',159,true),
(7,'Shine twenty','description','https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg',13644,1,7,8,'Canada','340 Dokto Park','Upfufa','Nova Scotia',29045,true),
(8,'Game fill','description','https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg',23428,5,6,4,'Canada','834 Buwmi Road','Rotunif','Newfoundland And Labrador',58224,true);

INSERT INTO  property_reviews (guest_id,property_id,reservation_id,rating,message) VALUES
(2,5,10,3,'message'),
(1,4,1,4,'message'),
(8,1,2,4,'message'),
(3,8,5,4,'message'),
(4,2,7,5,'message'),
(4,3,4,4,'message'),
(5,6,3,5,'message');

INSERT INTO  reservations (start_date,end_date,property_id,guest_id) VALUES
('2018-09-11 00:00:00','2018-09-26',313,399),
('2019-01-04 00:00:00','2019-02-01',515,628),
('2021-10-01 00:00:00','2021-10-14',217,93),
('2014-10-21 00:00:00','2014-10-21',557,71),
('2016-07-17 00:00:00','2016-08-01',672,794),
('2018-05-01 00:00:00','2018-05-27',285,160),
('2022-10-04 00:00:00','2022-10-23',65,120),
('2015-09-13 00:00:00','2015-09-30',614,419),
('2023-05-27 00:00:00','2023-05-28',484,661),
('2023-04-23 00:00:00','2023-05-02',770,71);