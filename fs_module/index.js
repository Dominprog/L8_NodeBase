const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

class FileSystemAsync {
    static async writeFile(filename, data) {
        await fs.writeFile(filename, data);
    }

    static async readFile(filename) {
        return await fs.readFile(filename, 'utf8');
    }

    static async updateFile(filename, newData) {
        await fs.writeFile(filename, newData);
    }

    static async deleteFileContent(filename) {
        await fs.writeFile(filename, '');
    }

    static async cleanFile(filename) {
        const content = await this.readFile(filename);
        const cleaned = content.replace(/\d/g, '').toLowerCase();
        await this.writeFile(filename, cleaned);
    }

    static async copyFile(source, destination) {
        const content = await this.readFile(source);
        await this.writeFile(destination, content);
    }

    static async createFolder(folderPath) {
        await fs.mkdir(folderPath, { recursive: true });
    }

    static async deleteFolder(folderPath) {
        await fs.rm(folderPath, { recursive: true, force: true });
    }

    static async getAllFiles(startPath = '.') {
        try {
            const items = await fs.readdir(startPath, { withFileTypes: true });
            let files = [];

            for (const item of items) {
                const fullPath = path.join(startPath, item.name);
                
                if (item.name.startsWith('.') || item.name === 'node_modules') continue;

                if (item.isDirectory()) {
                    const subFiles = await this.getAllFiles(fullPath);
                    files = files.concat(subFiles);
                } else {
                    files.push(fullPath);
                }
            }

            return files;
        } catch (error) {
            console.log('Ошибка при получении файлов:', error.message);
            return [];
        }
    }

    static async cleanProject() {
        const files = await this.getAllFiles();
        
        for (const file of files) {
            try {
                await fs.unlink(file);
                console.log(`Удален файл: ${file}`);
            } catch (error) {
                console.log(`Не удалось удалить ${file}:`, error.message);
            }
        }

        try {
            const items = await fs.readdir('.', { withFileTypes: true });
            for (const item of items) {
                if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
                    await this.deleteFolder(item.name);
                    console.log(`Удалена папка: ${item.name}`);
                }
            }
        } catch (error) {
            console.log('Ошибка при удалении папок:', error.message);
        }
    }
}

class FileSystemSync {
    static writeFile(filename, data) {
        fsSync.writeFileSync(filename, data);
    }

    static readFile(filename) {
        return fsSync.readFileSync(filename, 'utf8');
    }

    static updateFile(filename, newData) {
        fsSync.writeFileSync(filename, newData);
    }

    static deleteFileContent(filename) {
        fsSync.writeFileSync(filename, '');
    }

    static cleanFile(filename) {
        const content = this.readFile(filename);
        const cleaned = content.replace(/\d/g, '').toLowerCase();
        this.writeFile(filename, cleaned);
    }

    static copyFile(source, destination) {
        const content = this.readFile(source);
        this.writeFile(destination, content);
    }

    static createFolder(folderPath) {
        fsSync.mkdirSync(folderPath, { recursive: true });
    }

    static deleteFolder(folderPath) {
        fsSync.rmSync(folderPath, { recursive: true, force: true });
    }
}

module.exports = { FileSystemAsync, FileSystemSync };