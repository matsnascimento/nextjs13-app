-- DropForeignKey
ALTER TABLE `Prompt` DROP FOREIGN KEY `Prompt_categoryId_fkey`;

-- CreateTable
CREATE TABLE `_CategoryPromptToPrompt` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryPromptToPrompt_AB_unique`(`A`, `B`),
    INDEX `_CategoryPromptToPrompt_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryPromptToPrompt` ADD CONSTRAINT `_CategoryPromptToPrompt_A_fkey` FOREIGN KEY (`A`) REFERENCES `CategoryPrompt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryPromptToPrompt` ADD CONSTRAINT `_CategoryPromptToPrompt_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prompt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
