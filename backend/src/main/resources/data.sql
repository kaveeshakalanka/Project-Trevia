-- 1. INITIAL DATA
-- ROLES
INSERT INTO roles (name) VALUES ('ROLE_USER') ON DUPLICATE KEY UPDATE name = 'ROLE_USER';
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON DUPLICATE KEY UPDATE name = 'ROLE_ADMIN';
INSERT INTO roles (name) VALUES ('ROLE_SUPPLIER') ON DUPLICATE KEY UPDATE name = 'ROLE_SUPPLIER';

-- USERS (Admin)
INSERT INTO users (username, email, password, created_at) 
VALUES ('admin', 'admin@trevia.com', '$2a$10$9gALBadd6TpbuOKfNzTyruIcDhHsiLC1P0NJ76GmgsSGUoOqA7ehu', NOW()) 
ON DUPLICATE KEY UPDATE email = 'admin@trevia.com', password = '$2a$10$9gALBadd6TpbuOKfNzTyruIcDhHsiLC1P0NJ76GmgsSGUoOqA7ehu';

-- USERS (Supplier)
INSERT INTO users (username, email, password, created_at) 
VALUES ('supplier', 'supplier@trevia.com', '$2b$10$WjYRs3f.i.IPnv/op.NIEuszPCui9Yhxz4pjVElBytk/He0VJFxx2', NOW()) 
ON DUPLICATE KEY UPDATE email = 'supplier@trevia.com', password = '$2b$10$WjYRs3f.i.IPnv/op.NIEuszPCui9Yhxz4pjVElBytk/He0VJFxx2';

-- USER ROLES
-- Admin Roles
INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN' 
ON DUPLICATE KEY UPDATE user_id = user_id;

INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'admin' AND r.name = 'ROLE_USER' 
ON DUPLICATE KEY UPDATE user_id = user_id;

-- Supplier Roles
INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'supplier' AND r.name = 'ROLE_SUPPLIER' 
ON DUPLICATE KEY UPDATE user_id = user_id;

INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r WHERE u.username = 'supplier' AND r.name = 'ROLE_USER' 
ON DUPLICATE KEY UPDATE user_id = user_id;

-- 2. CATEGORY HIERARCHY
-- Root Categories
INSERT INTO categories (name, description, parent_id) VALUES ('Men', 'Men''s Fashion', NULL);
INSERT INTO categories (name, description, parent_id) VALUES ('Women', 'Women''s Fashion', NULL);
INSERT INTO categories (name, description, parent_id) VALUES ('Kids', 'Kids'' Fashion', NULL);
INSERT INTO categories (name, description, parent_id) VALUES ('Unisex', 'For Everyone', NULL);
INSERT INTO categories (name, description, parent_id) VALUES ('Accessories', 'General Accessories', NULL); -- Kept as root or could be sub

-- Sub Categories (Men)
INSERT INTO categories (name, description, parent_id) SELECT 'Tops', 'T-Shirts, Hoodies etc', id FROM categories WHERE name = 'Men';
INSERT INTO categories (name, description, parent_id) SELECT 'Bottoms', 'Pants, Jeans etc', id FROM categories WHERE name = 'Men';
INSERT INTO categories (name, description, parent_id) SELECT 'Outerwear', 'Jackets, Coats', id FROM categories WHERE name = 'Men';
INSERT INTO categories (name, description, parent_id) SELECT 'Activewear', 'Sports', id FROM categories WHERE name = 'Men';

-- Sub Categories (Women)
INSERT INTO categories (name, description, parent_id) SELECT 'Tops', 'Blouses, Sweaters', id FROM categories WHERE name = 'Women';
INSERT INTO categories (name, description, parent_id) SELECT 'Bottoms', 'Skirts, Jeans', id FROM categories WHERE name = 'Women';
INSERT INTO categories (name, description, parent_id) SELECT 'Dresses & Jumpsuits', 'Dresses', id FROM categories WHERE name = 'Women';
INSERT INTO categories (name, description, parent_id) SELECT 'Outerwear', 'Jackets', id FROM categories WHERE name = 'Women';

-- Sub Categories (Unisex)
INSERT INTO categories (name, description, parent_id) SELECT 'Tops', 'Hoodies, Tees', id FROM categories WHERE name = 'Unisex';

-- KIDS-CATEGORY
INSERT INTO categories (name, description, parent_id)
SELECT 'Clothing', 'Kids Clothing', id FROM categories WHERE name = 'Kids';

-- Accessories - Watch
INSERT INTO categories (name, description, parent_id)
SELECT 'Watches', 'Wrist Watches', id FROM categories WHERE name = 'Accessories';

-- ACCESSORIES
INSERT INTO categories (name, description, parent_id)
SELECT 'Shoes', 'Footwear Collection', id FROM categories WHERE name = 'Accessories';

-- ACCESSORIES - SHOES(K,M,W)
INSERT INTO categories (name, description, parent_id)
SELECT 'Kids Shoes', 'Kids Footwear', id FROM categories WHERE name = 'Shoes';

INSERT INTO categories (name, description, parent_id)
SELECT 'Men Shoes', 'Men Footwear', id FROM categories WHERE name = 'Shoes';

INSERT INTO categories (name, description, parent_id)
SELECT 'Women Shoes', 'Women Footwear', id FROM categories WHERE name = 'Shoes';



-- PRODUCTS  

-- Shoes -> 


-- Kids -> Shoes
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Kidstep Casual Shoes', 20, 40, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932677/kidstep_casual_shoes_oxu400.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Kids Casual Running Sneakers', 25, 50, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932677/Kids_Casual_Running_Sneakers_wndebp.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Girls Summer Comfort Sandals', 22, 35, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932676/Girls_summer_comfort_sandals_xlchwn.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Boys & Girls Beach Sandals', 18, 45, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932676/Boys_Girls_Beach_Sandals_mobwww.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Bow Sandals', 19, 30, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932676/Bow_Sandals_v9gxbg.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Spiderman Boys Summer Clogs', 24, 25, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Spiderman_Boys_summer_clogs_taq67k.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Skor Baby Shoes', 16, 40, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Skor_baby_shoes_gmbfpb.jpg'
FROM categories WHERE name='Kids Shoes';

INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'WIKENCY Girls Party Flats', 28, 20, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/WIKENCY_Girls_Party_Flats_bjs906.jpg'
FROM categories WHERE name='Kids Shoes';

-- Men -> Shoes
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Handmade Leather Shoe', 85, 20, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Handmade_Leather_shoe_ypdxun.jpg' 
FROM categories WHERE name='Men Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Casual Men’s Loafers', 55, 30, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Casual_Men_s_Loafers_x7wch4.jpg' 
FROM categories WHERE name='Men Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Veelzijdige Platte Sandals', 35, 25, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Veelzijdige_Platte_Sandals_s9f7m5.jpg' 
FROM categories WHERE name='Men Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Casual Shoes', 50, 40, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Casual_Shoes_p54vzj.jpg' 
FROM categories WHERE name='Men Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Summer Sandals', 32, 35, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Summer_Sandals_fjnqsn.jpg' 
FROM categories WHERE name='Men Shoes';

-- Women -> Shoes
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Ballet Flat Shoes', 38, 40, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Ballet_Flat_Shoes_e5dbxt.jpg' 
FROM categories WHERE name='Women Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Skate Shoes', 60, 30, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932677/Skate_Shoes_vmjyha.jpg' 
FROM categories WHERE name='Women Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Heels', 70, 25, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932677/Heels_t9vjn6.jpg' 
FROM categories WHERE name='Women Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Chunky Sneakers', 65, 35, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932676/Chunky_Sneakers_n6g66s.jpg' 
FROM categories WHERE name='Women Shoes';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Sandals', 40, 45, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932677/sandals_bsvyt5.jpg' 
FROM categories WHERE name='Women Shoes';


-- Watches ->  
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Women''s Bangle Watch and Bracelet Set', 90, 20, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Women_s_Bangle_Watch_and_Bracelet_Set_at2yg1.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Women''s Luxury Wristwatch', 120, 15, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Women_s_Luxury_Wristwatch_mqyfl4.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Leather Watch', 75, 30, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Leather_Watch_ll0kkt.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Men''s Watch', 85, 25, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Men_s_Watch_v5ynje.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Rolex Watch', 2500, 5, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Rolex_watch_t9l0di.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Round Pointer Quartz Watch', 55, 40, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Round_Pointer_Quartz_Watch_kkz6qi.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Seiko Watch', 400, 10, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Seiko_Watch_ianuqj.jpg' FROM categories WHERE name='Watches';
INSERT INTO products (name, price, stock, category_id, is_deleted, image_url)
SELECT 'Smart Watch', 150, 35, id, 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/smart_watch_ehz1kp.jpg' FROM categories WHERE name='Watches';

-- Kids -> Products

-- Kids -> Clothing
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Baby Girls & Boys Clothes Suit', 30, 40, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Baby_Girls_Boys_Clothes_Suit_lvxgeb.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Baby Pocket Denim', 28, 35, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Baby_Pocket_Denim_rrmv4n.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Twins Outfits', 45, 20, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Twins_Outfits_akbwb0.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Boys Sweatshirt & Joggers', 35, 30, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Boys_Sweatshirt_Joggers_hyj4bk.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Pajamas', 22, 50, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Pajamas_ymuo2o.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Frock & Boys Suit', 40, 25, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Frock_boys_suit_ox5cno.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Boys & Girls Jumpsuit', 33, 30, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Boys_Girls_Jumpsuit_w97gl4.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Girls Summer Outfits', 29, 40, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Girls_Summer_Outfits_p1fw3t.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Girls Cute Pajama Set', 26, 45, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/Girls_Cute_Pajama_Set_pdhdqz.jpg' FROM categories WHERE name='Clothing';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Boys Plaid Pocket Shirt', 24, 35, id, 'S,M,', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932678/Boys_Plaid_Pocket_Shirt_wud6wg.jpg' FROM categories WHERE name='Clothing';



-- Men -> Products

-- Men -> Activewear
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT '3 Piece Sportswear Set', 45, 30, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/3_piece_sportswear_set_ghvrks.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Straight Leg Jogger', 28, 40, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/straight_leg_jogger_vfqj1f.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Gymshark Convert T-Shirt', 32, 50, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Gymshark_Convert_T-Shirt_ubi5bj.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Sports Shorts', 25, 45, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Sports_Shorts_izbdrq.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Workout Tops', 27, 40, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Casual_Workout_Tops_cbgjy1.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Shorts With Zipper Pockets', 30, 35, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Casual_Shorts_With_Zipper_Pockets_pefcxx.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Active Raglan Muscle Fit', 29, 50, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932680/Active_Raglan_Muscle_Fit_coybpp.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Sports T-Shirts', 26, 60, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Sports_T-Shirts_dzzumm.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Hoodie And Jogger Pants Set', 55, 25, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Hoodie_And_Jogger_Pants_Set_djxcoz.jpg' FROM categories WHERE name='Activewear';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Sports Suit Set', 60, 20, id, 'M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932681/Sports_Suit_Set_rurpkj.jpg' FROM categories WHERE name='Activewear';



-- Men -> Tops
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Bari Sailor Polo', 28, 45, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Bari_Sailor_Polo_amyrgl.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Classic Men''s Shirt', 32, 40, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Classic_Men_s_Shirt_yjy2oj.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men Flap Pocket Denim Jacket Without Tee', 55, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932708/Men_Flap_Pocket_Denim_Jacket_Without_Tee_yyg5af.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Business Cotton Blend T-Shirt', 26, 50, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Casual_Business_Cotton_Blend_T-Shirt_whyihc.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men’s Half-Button Long-Sleeve Shirt', 35, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932708/Men_s_Half-Button_Long-Sleeve_Shirt_baliab.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Collared Neck Shirt', 34, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932685/Collared_Neck_Shirt_ssfgjx.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Linen Shirt', 36, 28, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Casual_Linen_Shirt_f9x9zz.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Short Sleeve Shirt', 30, 45, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Short_Sleeve_Shirt_mfd5l4.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Round Neck Short-sleeved T-shirt', 24, 60, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Round_Neck_Short-sleeved_T-shirt_qqqtfp.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Cotton Linen Shirt V-Neck Short Sleeve Shirts', 38, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Casual_Cotton_Linen_Shirt_V-Neck_Short_Sleeve_Shirts_egiovg.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Men');


-- Men -> Bottoms
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Wide Leg Pants', 35, 40, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Wide_Leg_Pants_jkbxxz.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Cargo Pants', 38, 45, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Cargo_Pants_sqdv4j.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Straight-Leg Loose-Fit Lässig Jeans', 42, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Straight-Leg_Loose-Fit_L%C3%A4ssig_Jeans_scc1co.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Snowflake Washed Denim Jeans', 45, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Snowflake_Washed_Denim_Jeans_segtca.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Baggy Slacks Pants', 40, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Baggy_Slacks_Pants_uqj1pn.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men Loose Outfit', 50, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Men_Loose_outfit_xy783x.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men''s Business Casual Lyocell Jeans', 55, 15, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Men_s_Business_Casual_Lyocell_Jeans_jug4nw.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men''s Casual Commuting Solid Color Tapered Pants', 48, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Men_s_Casual_Commuting_Solid_Color_Tapered_Pants_xcmcq7.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Top And Pants Casual Suit Set', 65, 18, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Top_And_Pants_Casual_Suit_Set_tx0cpf.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Mens Elastic Formal Suit Trousers', 52, 22, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932682/Mens_Elastic_Formal_Suit_Trousers_v0povg.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Men');



-- Men -> Outerwear
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Winter Warm Vest Jacket Men Waistcoat', 60, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Winter_Warm_Vest_Jacket_Men_Waistcoat_ensmpo.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Antonios Bomber Winter Jacket', 75, 15, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Antonios_Bomber_Winter_Jacket_jqvpwu.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Outdoor Heavy-Duty Winter Jackets', 90, 10, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Outdoor_Heavy-Duty_Winter_Jackets_k0khry.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Sports Windbreaker Jacket', 55, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Sports_Windbreaker_Jacket_ul6id9.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Zip Pocket Bomber Jacket', 65, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Zip_Pocket_Bomber_Jacket_pzjigz.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Zip Up Bomber Jacket Without Tee', 62, 22, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932684/Zip_Up_Bomber_Jacket_Without_Tee_yjntsq.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Long Sleeve Jacket & Coat, Casual', 70, 18, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Long_Sleeve_Jacket_Coat_Casual_acv0jp.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Big Letter Hooded Sweatshirt', 50, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Big_Letter_Hooded_Sweatshirt_pfh3ss.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Long Men''s Wool Trench Coat', 120, 8, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Long_Men_s_Wool_Trench_Coat_bkfcy0.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Outdoor Vintage Thick Jacket Coat', 95, 12, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932683/Outdoor_Vintage_Thick_Jacket_Coat_exo7w7.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Men');


-- Women ->Products

-- Women -> Outerwear
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Elegant Curve Jacket', 55, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Elegant_Curve_Jacket_ztxziw.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Dual Pocket Drop Shoulder Teddy Coat', 75, 18, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Dual_Pocket_Drop_Shoulder_Teddy_Coat_aydk6k.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Wool Blend Coat Button Down Shirt Tops', 80, 15, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Wool_Blend_Coat_Button_Down_Shirt_Tops_gyoeuf.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Ladies Fashionable Fluffy Trim Zip Up Coat', 78, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Ladies_Fashionable_Fluffy_Trim_Zip_Up_Coat_ywruly.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Hoodie Jacket', 45, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Hoodie_jacket_o7rtgu.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Button Front Bear & Letter Patch Striped Print Long Sleeve Jacket', 60, 22, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932722/Button_Front_Bear_Letter_Patch_Striped_Print_Long_Sleeve_Jacket_mpku4s.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Plaid Print Elegant Long Sleeve Coat', 85, 14, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Plaid_Print_Elegant_Long_Sleeve_Coat_dcfhkg.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Zipper Long Sleeve Drawstring Flap Pockets Jacket', 58, 28, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Casual_Zipper_Long_Sleeve_Drawstring_Flap_Pockets_Jacket_swvdfo.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Luxe Grace Jacket', 90, 12, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Luxe_Grace_Jacket_zmlbpy.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Flap Pocket Zip Up Corduroy Jacket', 65, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932723/Flap_Pocket_Zip_Up_Corduroy_Jacket_ogvybc.jpg' FROM categories WHERE name='Outerwear' AND parent_id=(SELECT id FROM categories WHERE name='Women');


-- Women -> Tops
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Elegant Office Blouse', 38, 40, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Elegant_Office_Blouse_mnexqx.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Batwing Sleeve Blouse', 42, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Batwing_Sleeve_Blouse_csosdj.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Drawstring Waist Blouse', 36, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Drawstring_Waist_Blouse_y3smw1.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Letter Print Drop Shoulder T-Shirt', 28, 50, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Letter_Print_Drop_Shoulder_T-Shirt_kgtszx.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Round Neck Texture Fabric Summer Shirt', 32, 45, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Round_Neck_Texture_Fabric_Summer_Shirt_ukrscz.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Allover Print Loose Round Neck Sleeve Blouse', 34, 38, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Casual_Allover_Print_Loose_Round_Neck_Sleeve_Blouse_uvpeqg.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Printed Long Sleeve Shirt', 40, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Printed_Long_Sleeve_Shirt_pykv0b.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Short Sleeve T-Shirt', 26, 55, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Short_Sleeve_T-Shirt_yyuvr6.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Striped Batwing Wrap Shirt – Elegant Casual Wear', 44, 28, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932724/Striped_Batwing_Wrap_Shirt_Elegant_Casual_Wear_dbvv78.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Wrap Front Striped Batwing Sleeve Crop Top', 35, 33, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932725/Wrap_Front_Striped_Batwing_Sleeve_Crop_Top_jziyqx.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Women');


-- Women -> Bottoms
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Cargo Pant', 36, 40, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Cargo_Pant_kce5wy.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Loose High Waist Wide Leg Bottoms', 38, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/Loose_High_Waist_Wide_Leg_Bottoms_buqmzo.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Wide Leg Pants', 40, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932711/Wide_Leg_Pants_izyfkd.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Flayer Wide Leg Pants', 42, 28, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/Flayer_Wide_Leg_Pants_idw841.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'High-Waisted Wide Leg Jeans', 45, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769964208/High-Waisted_Wide_Leg_Jeans_eltlzf.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Stylish Pants', 37, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/Stylish_pants_ns9hpu.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'High Waist Wide Leg Jeans', 46, 22, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932679/High_Waist_Wide_Leg_Jeans_q5895j.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Trouser', 39, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/Trouser_dvxdfp.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Pocket Wide Leg Casual Denim Jeans', 44, 26, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/Pocket_Wide_Leg_Casual_Denim_Jeans_ccxbk6.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'High Stretch Ribbed Pit Turn-Down Low Waist Skinny Flare Pants', 48, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932710/High_Stretch_Ribbed_Pit_Turn-Down_Low_Waist_Skinny_Flare_Pants_wca2al.jpg' FROM categories WHERE name='Bottoms' AND parent_id=(SELECT id FROM categories WHERE name='Women');


-- Women -> Dresses & Jumpsuits
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Elegant Jumpsuits & Rompers', 55, 25, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933063/Elegant_Jumpsuits_Rompers_ck3d2x.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'V Neck A Line Dress', 48, 30, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933066/V_Neck_A_Line_Dress_ksfecy.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Wide Leg Jumpsuit with Pockets', 60, 22, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933066/Wide_Leg_Jumpsuit_with_Pockets_kwnha3.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Round Neck Short Sleeve Jumpsuit', 45, 28, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933065/Round_Neck_Short_Sleeve_Top_and_Pants_Set_vwksoi.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Tied Ruffled Cap Sleeve Midi Dress', 52, 26, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933065/Tied_Ruffled_Cap_Sleeve_Midi_Dress_vlrtix.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Round Neck Short Sleeve Top and Pants Set', 58, 20, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933065/Round_Neck_Short_Sleeve_Top_and_Pants_Set_vwksoi.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Ruffled Cap Sleeve Zip Back Dress', 50, 24, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933065/Ruffled_Cap_Sleeve_Zip_Back_Dress_lbk2fd.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Short Sleeve Mini Dress', 42, 35, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933064/Short_Sleeve_Mini_Dress_xjzbah.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Casual Street Style Flap Pocket Denim Bib Overall Jumpsuit, T-Shirt', 65, 18, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933063/Casual_Street_Style_Flap_Pocket_Denim_Bib_Overall_Jumpsuit_T-Shirt_bdlkai.jpg' FROM categories WHERE name='Dresses & Jumpsuits';
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Elegant Long Sleeve Dress', 70, 15, id, 'S,M,L,XL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769933064/Elegant_Long_Sleeve_Dress_vz7zix.jpg' FROM categories WHERE name='Dresses & Jumpsuits';


-- Unisex -> Tops
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Kinoa Plain Unisex Top', 25, 50, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Kinoa_Plain_Unisex_Top_valheb.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Cotton Textured T-Shirt', 22, 60, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Cotton_Textured_T-Shirt_pcugmz.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Men Tee', 20, 70, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Men_Tee_vyf6f5.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Numaric Casual T-Shirt', 24, 55, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Numaric_Casual_T-Shirt_qkifft.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Printed T-Shirts', 26, 65, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Printed_T-Shirts_vb4sbe.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'REIOASUD California Hoodie', 48, 30, id, 'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/REIOASUD_California_Hoodie_qnxj7q.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');
INSERT INTO products (name, price, stock, category_id, sizes, is_deleted, image_url)
SELECT 'Unisex Hoodies', 45, 35, id,'S,M,L,XL,XXL', 0, 'https://res.cloudinary.com/djh4uce6p/image/upload/v1769932709/Unisex_Hoodies_zyoc2e.jpg' FROM categories WHERE name='Tops' AND parent_id=(SELECT id FROM categories WHERE name='Unisex');

-- 3. WAREHOUSES
INSERT INTO warehouses (name, location, address, capacity, manager, is_active, created_at)
VALUES ('Trevia Main Warehouse', 'Colombo', '123 Main St, Colombo', 10000, 'Manager One', true, NOW());

INSERT INTO warehouses (name, location, address, capacity, manager, is_active, created_at)
VALUES ('Kandy Branch', 'Kandy', '456 Hill St, Kandy', 5000, 'Manager Two', true, NOW());

INSERT INTO warehouses (name, location, address, capacity, manager, is_active, created_at)
VALUES ('Galle Hub', 'Galle', '789 Beach Rd, Galle', 3000, 'Manager Three', true, NOW());
