const { loadData } = require('./custom_modules/dataLoader');
const { sortStringsIgnoreSpaces } = require('./custom_modules/stringSort');
const { 
    createFolderAsync, 
    writeFileAsync
} = require('./custom_modules/fileSystem');

async function main() {
    try {
        console.log('=== Загрузка пользователей ===');
        const usersData = await loadData('https://jsonplaceholder.typicode.com/users');
        
        if (usersData.error) {
            console.error('Ошибка загрузки:', usersData.error);
            return;
        }

        console.log('Данные загружены:', !usersData.isLoading);

        const userNames = usersData.data.map(user => user.name);
        const sortedNames = sortStringsIgnoreSpaces(userNames);
        
        console.log('\n=== Отсортированные имена ===');
        sortedNames.forEach(name => console.log(name));

        console.log('\n=== Создание файловой структуры ===');
        await createFolderAsync('users');
        
        const namesContent = sortedNames.join('\n');
        await writeFileAsync('users/names.txt', namesContent);
        
        const emails = usersData.data.map(user => user.email).join('\n');
        await writeFileAsync('users/emails.txt', emails);

        console.log('Файлы успешно созданы!');
        console.log('Созданы файлы: users/names.txt и users/emails.txt');

    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

main();