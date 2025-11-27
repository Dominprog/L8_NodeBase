require('dotenv').config();

console.log('=== Персональные данные ===');
console.log('Имя:', process.env.FIRST_NAME);
console.log('Фамилия:', process.env.LAST_NAME);
console.log('Группа:', process.env.GROUP);
console.log('Номер в списке:', process.env.NUMBER);
console.log('Текущий режим:', process.env.MODE);
console.log('===========================\n');

require('./os/index.js');

const bcrypt = require('bcryptjs');

async function benchmarkBcrypt() {
    console.log('\n=== Тестирование bcrypt ===');
    const passwords = Array(13).fill().map((_, i) => `password${i + 1}`);
    
    const times = [];
    
    for (let i = 0; i < passwords.length; i++) {
        const start = Date.now();
        const hash = await bcrypt.hash(passwords[i], 10);
        const end = Date.now();
        const time = end - start;
        
        times.push(time);
        console.log(`Пароль ${i + 1}: ${time}ms`);
    }
    
    console.log('\n=== Анализ времени ===');
    console.log('Минимальное время:', Math.min(...times), 'ms');
    console.log('Максимальное время:', Math.max(...times), 'ms');
    console.log('Среднее время:', (times.reduce((a, b) => a + b) / times.length).toFixed(2), 'ms');
    console.log('Разница в производительности обусловлена особенностями хеширования и нагрузкой на CPU');
}

benchmarkBcrypt();