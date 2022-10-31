const { Client } = require('node-scp');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const sodium = require('libsodium-wrappers')
const key = 'base64-encoded-public-key' 

async function run() {
    const source = core.getInput('source', { required: true });
    const target = core.getInput('target', { required: true });
    const github_token = core.getInput('github_token', { required: true});
    var run_number = core.getInput('run_number', {required: true})

    core.info("Github_Token: " + github);
    core.info("Run_Number Secret: " + run_number);

    var secret = run_number + 1;
    var output;

    sodium.ready.then(() => {
        // Convert Secret & Base64 key to Uint8Array.
        let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
        let binsec = sodium.from_string(secret);
      
        //Encrypt the secret using LibSodium
        let encBytes = sodium.crypto_box_seal(binsec, binkey);
      
        // Convert encrypted Uint8Array to Base64
        output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);
      
        console.log(output);
      });

    var octokit = github.getOctokit(github_token);
    const result = await octokit.request("PUT /orgs/{org}}/actions/secrets/{secret_name}", {
        org: "Silask1",
        secret_name: "RUN_NUMBER_LAB",
        encrypted_value: output,
        visibility: "private"
    }).catch(err => {
        console.log(err);
    });
    if (result.status = 200) {
        core.info("atualizado");
        console.log("numero_action: " + secret);
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