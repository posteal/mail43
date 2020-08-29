<h1>License</h1>
mail43 is a free library for your server. If your website has a login and sign up form, is usefull to fave an email verification system for avoid spam users or just to have more trust from new users.
<br>
This library is <b>garanteed</b> up to a certain point, this means that any modification (possible being open source) will not be subject of technical support.
<br>
<h1>How to use it</h1>
<b>Install</b>
<code>npm i express nodemailer mail43 --save</code><br>
<section>
  <b>Inside your server.js</b><br>
  <code>
    // Express
    const express = require('express');
    const app = express();
    
    /* 
     *
     * mail43
     *
     */
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
      body: 'Hello world!<br>Press this button: {button}<br>Or if it doesn't work, use this link {link}'
    }, 'YOUR_REDIRECT_URL', feed)
    
    // handling feeds
    function feed(callback_type, data){
       if(callback_type === 'error') throw new Error(data);
       else if(callback_type === 'sended') console.log("Sended email verification (UUID: %s", data);
       else if(callback_type === 'verified') console.log("User verified the Email Account, UUID: %s", data);
    }

    
    // Starting sever
    app.listen(3000);
  </code>
</section>
