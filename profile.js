const colors = require('colors');
const https = require('https');
const http = require('http');
const ora = require('ora');


printMessage = (spinner, userName, topic, badgeCount, points) =>
	spinner.succeed(`${userName.toString().green}` +' has'.red + ` ${badgeCount.toString().green}` + ` total badges and `.red + `${points.toString().green || 'no'}`.red + ` points in `.red +`${topic.green}`);

printError = (error, spinner) => {
	spinner.fail(error.message.red);
};

get = (username, topic) => {
	console.log(`Searching for...`.red);
	console.log(`Username: ${username.green}`.red);
	console.log(`Topic: ${topic.green}`.red);

	const spinner = ora('Loading Results...'.italic.green).start();
	try {

		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			if (response.statusCode === 200) {
                let body = "";
                
				response.on('data', data => {
					body += data.toString();
                });
            
                response.on('end', () => {
                    try {
						let jsonBody = JSON.parse(body);
                        printMessage(
							spinner,
                            username,
                            topic, 
                            jsonBody.badges.length, 
                            jsonBody.points[topic]
                        );
                    } catch (error) {
                        printError(error, spinner);				
                    }			
			});
			} else {
				const message = `There was an error getting the profile for user: "`.red + `${username.green}` +'" ('.red + `${response.statusCode.toString().green}` + ' - '.red + `${http.STATUS_CODES[response.statusCode].green}` + `)`.red;
				const statusCodeError = new Error(message);
				printError(statusCodeError, spinner);
			}
		});

	request.on('error', error => console.error(`Problem with request: ${error}`));
	} catch (error) {
		printError(error, spinner);
	}
}

module.exports.get = get;