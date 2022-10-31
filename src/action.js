const { Client } = require('node-scp');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');


async function run() {
    const source = core.getInput('source', { required: true });
    const target = core.getInput('target', { required: true });
    const github_token = core.getInput('github_token', { required: true});
    const run_number = core.getInput('run_number', {required: true})

    core.info("Run_Number Secret: " + run_number);

    //var octokit = github.getOctokit(github_token);

    // console.log('Source: ' + source);
    // console.log('Target:' + target);
    // console.log('Targer Completo:' + path.join(target, source));

    // try {
    //     const client = await Client({
    //         host: '20.120.4.78',
    //         port: 22,
    //         username: 'tqssolucoes',
    //         password: 'Usrtqs8774636'
    //     });
    //     console.log('Conectado');

    //     await client.uploadFile(
    //         source,
    //         path.join(target, source)
    //     );
    //     client.close();
    //     console.log('SCP Completado com Sucesso');
    // } catch (e) {
    //     console.log(e);
    // }
}

run();