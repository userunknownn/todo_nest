-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
