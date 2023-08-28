CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `pass` varchar(255),
  `fullname` varchar(255),
  `role_id` integer,
  `specialty_id` integer
);

CREATE TABLE `specialty` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `roles` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `appointment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `date` timestamp,
  `patient_id` integer,
  `doctor_id` integer,
  `specialty_id` integer,
  `state` varchar(255),
  `observation` text COMMENT 'Appointment details'
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `appointment` (`patient_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`id`) REFERENCES `appointment` (`doctor_id`);

ALTER TABLE `specialty` ADD FOREIGN KEY (`id`) REFERENCES `appointment` (`specialty_id`);
