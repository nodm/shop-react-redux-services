CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.products
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    price numeric NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.products
    OWNER to dbadmin;


CREATE TABLE IF NOT EXISTS public.stocks
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
	count integer DEFAULT 0,
	FOREIGN KEY (id) REFERENCES products(id)
);

ALTER TABLE IF EXISTS public.stocks
    OWNER to dbadmin;

DELETE FROM public.products;

INSERT INTO public.products (title, description, image_url, price) VALUES ('Awesome Soft Chicken', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', 'https://loremflickr.com/640/480/business?23065', 628.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Refined Frozen Ball', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', 'https://loremflickr.com/640/480/business?28435', 785.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Electronic Concrete Soap', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', 'https://loremflickr.com/640/480/business?54469', 448.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Licensed Granite Shirt', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', 'https://loremflickr.com/640/480/business?8223', 635.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Electronic Plastic Car', 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design', 'https://loremflickr.com/640/480/business?7181', 501.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Oriental Rubber Soap', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', 'https://loremflickr.com/640/480/business?52357', 431.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Gorgeous Metal Chicken', 'The Football Is Good For Training And Recreational Purposes', 'https://loremflickr.com/640/480/business?41967', 77.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Handcrafted Concrete Soap', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', 'https://loremflickr.com/640/480/business?68831', 328.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Awesome Granite Tuna', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', 'https://loremflickr.com/640/480/business?64907', 346.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Oriental Bronze Mouse', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', 'https://loremflickr.com/640/480/business?40397', 262.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Licensed Fresh Mouse', 'The Football Is Good For Training And Recreational Purposes', 'https://loremflickr.com/640/480/business?81047', 111.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Practical Wooden Bacon', 'The Football Is Good For Training And Recreational Purposes', 'https://loremflickr.com/640/480/business?37174', 194.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Elegant Concrete Table', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', 'https://loremflickr.com/640/480/business?39972', 880.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Incredible Bronze Pizza', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', 'https://loremflickr.com/640/480/business?34108', 834.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Small Wooden Pizza', 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit', 'https://loremflickr.com/640/480/business?38037', 31.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Gorgeous Metal Soap', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', 'https://loremflickr.com/640/480/business?11571', 968.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Recycled Metal Bacon', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', 'https://loremflickr.com/640/480/business?42542', 52.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Gorgeous Rubber Salad', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', 'https://loremflickr.com/640/480/business?49679', 81.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Handcrafted Soft Cheese', 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support', 'https://loremflickr.com/640/480/business?74969', 789.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Bespoke Concrete Pizza', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', 'https://loremflickr.com/640/480/business?62476', 359.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Refined Steel Cheese', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', 'https://loremflickr.com/640/480/business?43863', 459.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Bespoke Granite Tuna', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', 'https://loremflickr.com/640/480/business?86405', 909.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Fantastic Cotton Keyboard', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', 'https://loremflickr.com/640/480/business?41453', 270.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Small Soft Computer', 'Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', 'https://loremflickr.com/640/480/business?52278', 188.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Incredible Steel Soap', 'Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', 'https://loremflickr.com/640/480/business?15268', 124.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Tasty Soft Table', 'The Football Is Good For Training And Recreational Purposes', 'https://loremflickr.com/640/480/business?32406', 497.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Handcrafted Concrete Shoes', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', 'https://loremflickr.com/640/480/business?39379', 638.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Elegant Frozen Shirt', 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016', 'https://loremflickr.com/640/480/business?38726', 17.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Bespoke Frozen Tuna', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', 'https://loremflickr.com/640/480/business?64760', 138.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Luxurious Fresh Chips', 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals', 'https://loremflickr.com/640/480/business?94257', 263.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Refined Steel Computer', 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality', 'https://loremflickr.com/640/480/business?38438', 549.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Unbranded Soft Tuna', 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart', 'https://loremflickr.com/640/480/business?70146', 801.00);
INSERT INTO public.products (title, description, image_url, price) VALUES ('Handcrafted Plastic Keyboard', 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients', 'https://loremflickr.com/640/480/business?5627', 558.00);

DELETE FROM public.stocks;

INSERT INTO public.stocks (id, count) VALUES ('12f39fc4-e5fe-4785-8152-493dde93ee5f',  1);
INSERT INTO public.stocks (id, count) VALUES ('155b0b36-a948-4bab-99aa-b61dd10dda20',  2);
INSERT INTO public.stocks (id, count) VALUES ('19c1d299-edb3-4c9e-8439-3ff56c1b418b',  3);
INSERT INTO public.stocks (id, count) VALUES ('1d4589b9-6efd-4bc5-a477-6215ed43bff9',  4);
INSERT INTO public.stocks (id, count) VALUES ('25e093a6-8fca-44e7-8b18-763e6ec3e6bf',  5);
INSERT INTO public.stocks (id, count) VALUES ('2af51b04-1f9e-495e-94e9-f08d81bee9fa',  6);
INSERT INTO public.stocks (id, count) VALUES ('33917e77-96ec-4051-bfb8-ce749b224318',  7);
INSERT INTO public.stocks (id, count) VALUES ('39d8e2ae-1016-4070-a846-d3fe80c2ab3a',  8);
INSERT INTO public.stocks (id, count) VALUES ('3d181e5c-2eeb-4b16-9400-086f4de3d4ab',  9);
INSERT INTO public.stocks (id, count) VALUES ('4d914687-e44f-4539-bb2b-1e84a07bb1c9', 10);
INSERT INTO public.stocks (id, count) VALUES ('5bc9add5-670a-4971-81f2-0a0fc0f775c7', 11);
INSERT INTO public.stocks (id, count) VALUES ('62d07de2-1412-46b2-88d1-4013d93c5c5e', 12);
INSERT INTO public.stocks (id, count) VALUES ('66e8e6bd-70f1-4c0b-ae0d-a90961065055', 13);
INSERT INTO public.stocks (id, count) VALUES ('69ae345b-ac6b-4b22-9c8e-bc1c18b81551', 14);
INSERT INTO public.stocks (id, count) VALUES ('7cafc0f4-f782-46b4-9fd4-992ef843e4ae', 15);
INSERT INTO public.stocks (id, count) VALUES ('7f017fb5-148e-495f-a7f7-77ae4d189032', 16);
INSERT INTO public.stocks (id, count) VALUES ('905fe99f-2fdd-4458-ac80-d7baebd6148f', 17);
INSERT INTO public.stocks (id, count) VALUES ('9573bd89-edbe-4510-a333-fb0c7fabfbdb', 18);
INSERT INTO public.stocks (id, count) VALUES ('9606bb21-494f-449a-8e5e-ab4786578ba2', 19);
INSERT INTO public.stocks (id, count) VALUES ('9a4acfe9-dc45-462a-b179-fd5e8234ba94', 20);
INSERT INTO public.stocks (id, count) VALUES ('a177274b-a369-4526-a88f-f3197df9395e', 21);
INSERT INTO public.stocks (id, count) VALUES ('ad90ff62-5ca3-4a6e-957a-68812d58859f', 22);
INSERT INTO public.stocks (id, count) VALUES ('b0aae2b4-0c89-4edd-9aae-7eebae4d4987', 23);
INSERT INTO public.stocks (id, count) VALUES ('c337915f-1ff9-44ac-b316-0b7ac739d2eb', 24);
INSERT INTO public.stocks (id, count) VALUES ('c9cd33aa-a340-417b-8566-e0b83b6fc309', 25);
INSERT INTO public.stocks (id, count) VALUES ('cd9919eb-4a63-4cf0-97b6-de7695d14849', 26);
INSERT INTO public.stocks (id, count) VALUES ('cf47d4d8-2406-4b48-b2d2-8c2af1a04620', 27);
INSERT INTO public.stocks (id, count) VALUES ('d8f0bb12-ec9a-4f15-9fb9-045d91fcce79', 28);
INSERT INTO public.stocks (id, count) VALUES ('e000ef36-5ed1-4fc3-9240-414a2867e873', 29);
INSERT INTO public.stocks (id, count) VALUES ('f05f1295-7e84-4de0-a423-77306f32e318', 30);
INSERT INTO public.stocks (id, count) VALUES ('f25986b8-940f-4d67-ac76-845696295217', 31);
INSERT INTO public.stocks (id, count) VALUES ('fbdcb116-2110-4fbf-b899-f260b4c22af9', 32);
INSERT INTO public.stocks (id, count) VALUES ('fd31b4b4-a6d5-4e28-9bd3-5790823ae186', 33);
