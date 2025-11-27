const os = require('os');

function getOSInfo() {
    console.log('=== Информация о ОС ===');
    console.log('Платформа:', os.platform());
    console.log('Архитектура:', os.arch());
    console.log('Версия:', os.version());
    console.log('Общая память:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Свободная память:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Главная директория:', os.homedir());
    console.log('Имя хоста:', os.hostname());
    
    const networks = os.networkInterfaces();
    console.log('Сетевые интерфейсы:');
    Object.keys(networks).forEach(interfaceName => {
        networks[interfaceName].forEach(net => {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`  ${interfaceName}: ${net.address}`);
            }
        });
    });
}

function checkMemory() {
    const freeMemGB = os.freemem() / 1024 / 1024 / 1024;
    console.log(`Свободная память: ${freeMemGB.toFixed(2)} GB`);
    console.log(`Память больше 4GB: ${freeMemGB > 4 ? 'ДА' : 'НЕТ'}`);
    return freeMemGB > 4;
}

function checkAccess() {
    const mode = process.env.MODE;
    console.log(`Текущий режим доступа: ${mode}`);
    
    if (mode === 'admin' || mode === 'development') {
        getOSInfo();
        return true;
    } else {
        console.log('Доступ запрещен: недостаточно прав');
        return false;
    }
}

console.log('=== Проверка памяти ===');
checkMemory();
console.log('\n=== Проверка доступа ===');
checkAccess();