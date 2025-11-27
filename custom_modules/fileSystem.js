const { FileSystemAsync, FileSystemSync } = require('../fs_module/index.js');

module.exports = {
    writeFileAsync: FileSystemAsync.writeFile,
    readFileAsync: FileSystemAsync.readFile,
    updateFileAsync: FileSystemAsync.updateFile,
    deleteFileContentAsync: FileSystemAsync.deleteFileContent,
    cleanFileAsync: FileSystemAsync.cleanFile,
    copyFileAsync: FileSystemAsync.copyFile,
    createFolderAsync: FileSystemAsync.createFolder,
    deleteFolderAsync: FileSystemAsync.deleteFolder,
    getAllFilesAsync: FileSystemAsync.getAllFiles,
    cleanProjectAsync: FileSystemAsync.cleanProject,

    writeFileSync: FileSystemSync.writeFile,
    readFileSync: FileSystemSync.readFile,
    updateFileSync: FileSystemSync.updateFile,
    deleteFileContentSync: FileSystemSync.deleteFileContent,
    cleanFileSync: FileSystemSync.cleanFile,
    copyFileSync: FileSystemSync.copyFile,
    createFolderSync: FileSystemSync.createFolder,
    deleteFolderSync: FileSystemSync.deleteFolder
};