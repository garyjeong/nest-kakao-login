-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleteAt` DATETIME(3) NULL,

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
