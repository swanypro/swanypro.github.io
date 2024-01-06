function addelement(term, desc) {
    var completelist = document.getElementById("theList");

    if (term == 'You') {
        completelist.innerHTML += '<dt' + '<img src = "you.png" width = "40" height = "40">' + '</dt>';
        completelist.innerHTML += '<dd>' + desc + '</dd>';
    } else {
        completelist.innerHTML += '<dt' + '<img src = "chatgpt.png" width = "40" height = "40">' + '</dt>';
        completelist.innerHTML += '<dd>' + desc + '</dd>';
    }

}

document.getElementById('submit-button').addEventListener('click', async() => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');

    if (inputText) {
        addelement('You', inputText.value);
        const response = await chatGPT(inputText.value);
        inputText.value = '';
        addelement('ChatGPT', response);
    }
});

async function chatGPT(message) {
    const apiKey ='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';
    const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    const data = {
        message: [{ role: 'system', content: 'You' }, { role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
    };

    const requesOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${apiKey}',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            message: [{
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        })
    };

    try {
        const response = await fetch(endpoint, requesOptions);
        const result = await response.json();
        console.log(result.choices[0].message.content);

        return result.choices[0].message.content;
    } catch (error) {
        console.log('log:', error);
        console.error('Error', error);
    }
}
