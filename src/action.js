const { Client } = require('node-scp');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');


async function run() {
    const source = core.getInput('source', { required: true });
    const target = core.getInput('target', { required: true });
    const github_token = core.getInput('github_token', { required: true});
    var run_number = core.getInput('run_number', {required: true})

    core.info("Github_Token: " + github);
    core.info("Run_Number Secret: " + run_number);

    var numero_action = run_number + 1;

    var octokit = github.getOctokit(github_token);
    const result = await octokit.request("PUT /orgs/{org}}/actions/secrets/{secret_name}", {
        org: "Silask1",
        secret_name: "RUN_NUMBER_LAB",
        encrypted_value: numero_action,
        visibility: "private"
    }).catch(err => {
        console.log(err);
    });
    if (result.status = 200) {
        core.info("atualizado");
        console.log("numero_action: " + numero_action);
    }
    else {
        core.info("não atualizado");
    }

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