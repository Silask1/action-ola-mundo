const { Client } = require('node-scp');
const core = require('@actions/core');
const path = require('path');


async function run() {
    const source = core.getInput('source', { required: true });
    const target = core.getInput('target', { required: true });

    console.log('Source: ' + source);
    console.log('Target:' + target);
    console.log('Targer Completo:' + path.join(target, source));

    try {
        FileSystemFileEntry.getDirectory('.', {}, (d) => {
            console.log(d.filesystem);
            console.log(d.fullPath);
        });

        var file = new File(source);
        if (file.exists()) {
            throw 'Arquivo [' + source + '] não existe';
        }
        file.close();

        const client = await Client({
            host: '20.120.4.78',
            port: 22,
            username: 'tqssolucoes',
            password: 'Usrtqs8774636'
        });
        console.log('Conectado');

        // await client.uploadFile(
        //     source,
        //     path.join(target, source)
        // );
        await client.uploadFile(
            './README.md',
            '/home/tqssolucoes/README.md'
        );
        client.close();
        console.log('SCP Completado com Sucesso');
    } catch (e) {
        console.log(e);
    }
}

run();