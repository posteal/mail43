<h1>License</h1>
mail43 is a free library for your server. If your website has a login and sign up form, is usefull to fave an email verification system for avoid spam users or just to have more trust from new users.
<br>
This library is <b>garanteed</b> up to a certain point, this means that any modification (possible being open source) will not be subject of technical support.
<br>
<h1>How to use it</h1>
<b>Install</b>
<pre>npm i express nodemailer mail43 --save</pre><br>
  <b>Inside your server.js</b><br>
  <pre>
// Express
const express = require('express');
const app = express();

/* 
 \*
 \*  mail43
 \*
 \*/
const mail43 = require('mail43');

// declaring an email account
const EMAIL_ACCOUNT = new mail43.account(app, 'YOURDOMAIN.COM', {
  host: 'smtp.example.com',
  port: 465,
  use_tls: true,
  username: 'no-reply@example.com',
  password: 'Your email password'
});

// verifying an user
const verification = EMAIL_ACCOUNT.verify('example@gmail.com', {
  subject: 'Email verification test',
  body: 'Hello world!&lt;br>Press this button: {button}&lt;br>Or if it doesn't work, use this link {link}'
}, 'YOUR_REDIRECT_URL', feed)

// handling feeds
function feed(callback_type, data){
  if(callback_type === 'error') throw new Error(data);
  else if(callback_type === 'sended') console.log("Sended email verification (UUID: %s", data);
  else if(callback_type === 'verified' && data === verification) console.log("User verified the Email Account, UUID: %s", data);
}

// Starting server
app.listen(3000);
</pre>

<h1>Understanging the example (STEP by STEP)</h1>
<span>First, you have to install Express, Nodemailer and Mail43</span>
<ol><li>npm i express nodemailer mail43 --save</li></ol>
<br>
<span>Open your JavaScript server main file and import packages</span>
<ol>
<li><code>const express = require('express')</code></li>
<li><code>const mail43 = require('mail43')</code></li>
</ol>
<br>
<span>Create your express server</span>
<ol>
<li><pre>const app = express();</pre></li>
</ol>
<br>
<span>Declare your email account (example: name@posteal.com)</span>
<pre>
const EMAIL_ACCOUNT = new mail43.account(app, 'YOURDOMAIN.COM', {
    host: 'smtp.example.com',
    port: 465,
    use_tls: true,
    username: 'no-reply@example.com',
    password: 'Your email password'
  });
</pre>
<span>How you can see, the mail43.account constructor, requires 3 parameters, the first one is your express app, then your domain, use for links and CTA in the email, and the last is your email authentication info</span>
<br><br>
<span>After a user complete the sign up form, send him the verification</span>
<pre>
const verification = EMAIL_ACCOUNT.verify('example@gmail.com', {
    subject: 'Email verification test',
    body: 'Hello world!&lt;br>Press this button: {button}&lt;br>Or if it doesn't work, use this link {link}'
}, 'YOUR_REDIRECT_URL', feed);
</pre>
<span>This function returnes the verification UUID that you will use for comparison<br>
{button} will be replaced with a nice style button written in HTML and CSS, and {link} with the link</span>
<br><br>
<span>Create the function "feed" that will hand the requests</span>
<pre>
function feed(callback_type, data){
     if(callback_type === 'error') throw new Error(data);
     else if(callback_type === 'sended') console.log("Sended email verification (UUID: %s", data);
     else if(callback_type === 'verified' && data === verification) console.log("User verified the Email Account, UUID: %s", data);
}
</pre>
<span>the callback function (in this case it's "feed") accept 2 parameters, the callback_type and the data.<br>
callback_type can be "error", "sended" or "verified".</span><br><br>

<ul>
  <li>"error" means that there is an error while sending the message, it returned the Error String (in the "data" variable)</li>
  <li>"sended" means that the email il succesfully sended, it returns the UUID (in the "data" variable)</li>
  <li>"verified" means that the user has verified his email, it returns the UUID (in the "data" variable)</li>
</ul>
