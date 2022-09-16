const { Client } = require('node-scp');


async function run() {
    console.log('Olá mundo');

    try {
        const client = await Client({
            host: '20.120.4.78',
            port: 22,
            username: 'tqssolucoes',
            password: 'Usrtqs8774636'
        })

        await client.uploadFile(
            'README.md',
            '/home/tqssolucoes/README.md'
        );
        client.close();
        console.log('SCP Completado com Sucesso');
    } catch (e) {
        console.log(e);
    }
}

run();