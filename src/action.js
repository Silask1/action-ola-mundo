const { Client } = require('node-scp');
const core = require('@actions/core');
const path = require('path');


async function run() {
    const source = core.getInput('source');
    const target = core.getInput('target');

    try {
        const client = await Client({
            host: '20.120.4.78',
            port: 22,
            username: 'tqssolucoes',
            password: 'Usrtqs8774636'
        })

        await client.uploadFile(
            source,
            path.join(target, source)
        );
        client.close();
        console.log('SCP Completado com Sucesso');
    } catch (e) {
        console.log(e);
    }
}

run();