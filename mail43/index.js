const nodemailer = require('nodemailer');
const required = (object, ...args) => !args.find(i => Object.keys(object).indexOf(i) === -1);


const v4uuid = function(){
	const alphabet = 'abdefghijklmnopqrstuvwxyz';
	const segments = [8, 4, 4, 4, 12];

	let output = "";

	segments.forEach(s => {
		for(let i = 0; i < s; i += 1){
			if(random(0, 1) === 0)
				output += random(0, 9).toString();
			else output += alphabet[random(alphabet.length - 1)];
		}
		output += "-";
	});

	return output.substring(0, output.length - 1);
}

function replaceAll(input, search, replace){
  if(typeof search === 'object'){
    let output = input.toString();
    for(let i in search)
      output = output.replaceAll(i, search[i]);
    return output
  }
  else return input.toString().split(search).join(replace);
}

module.exports.account = class{
    constructor(express_server, server_domain, auth){


        if( required(auth, 'host', 'port', 'use_tls', 'username', 'password') ){
          for(let i in auth)
              this[i] = auth[i];

          this.verify = function(email_address, content, redirect, callback = _ => undefined){
              if(!required(content, 'subject', 'body')) throw new Error('\n\nmail43.account.verify(mail) requires ((String)subject, (String)body)\n\n');

              const transport = nodemailer.createTransport({
                host: auth.host,
                port: auth.port,
                secure: auth.use_tls,
                auth: {
                  user: auth.username,
                  pass: auth.password
                }
              });

              const uuid = v4uuid();

							if(!server_domain.startsWith('https://') && !server_domain.startsWith('http://')) server_domain = 'https://' + server_domain;

              const body = replaceAll(content.body, {
                '{button}': '<a style="text-decoration: none; background-color: #0084ff; cursor: pointer; font-weight: bold; color: #fff; border: none; padding: 8px 15px; border-radius: 999px; font-size: 20px; display: inline;" href="' + server_domain + '/verify/' + uuid + '">Click here</a>',
                '{link}': '<a style="color: #0084ff" href="' + server_domain + '/' + uuid + '">' + server_domain + '/verify/' + uuid + '</a><style>a{text-decoration: none;} a:hover{text-decoration: underline}</style>'
              });

              transport.sendMail({
                 from: auth.sender ? auth.sender : auth.username,
                 to: email_address,
                 subject: content.subject,
                 html: body
              }, (error, info) => {
                if(error) callback('error', error);
                else{
                  callback('sended', uuid);
                  express_server.get('/verify/' + uuid, (req, res) => {
                      callback('verified', uuid);
                      res.redirect(redirect);
                      return;
                  });
                }
              });

              return uuid;
          }


        }
        else
            throw new Error("\n\nmail43.account constructor requires object to have following keys: ((String)host, (Number)port, (Boolean)use_tls, (String)username, (String)password)\n\n")

    }
};


function random(min, max){
	if(max === undefined)
		return Math.floor(Math.random() * (min + 1));
	else
		return Math.floor(Math.random() * ((max + 1) - min) + min);
}
