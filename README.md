> This is a fork of 

# Node Bounce Snoop

Based on 
  - [prasad83/node-bounce-handler](https://github.com/prasad83/node-bounce-handler).
 
This should help (email is messy) to detect if an email message is a bounce message


# Usage

### check if an email is a bounce



```javascript
  const EmailSnoop = require('mail-bounce-snoop');

  let message = "<email as text with all header and parts>";

  //using Promise
  EmailSnoop.isBouncedEmail(message).then(isBounce => {
      if (isBounce) {
        console.log("This is a bounce message")
      }
  });
  
  //using callback
  EmailSnoop.isBouncedEmail(message.toString(), (isBounce) => {
      if (isBounce) {
        console.log("This is a bounce message")
      }
  });  
  
  //The message could be set with EmailSnoop.init(message), otherwise the snoop remembers the last used email
```

### get bounce detail

```javascript
  const EmailSnoop = require('mail-bounce-snoop');
  
  //using Promise
  EmailSnoop.getBouncedEmailDetail(message.toString()).then(result => {
    /*
    * e.g. result 
    * {
    *   "recipient":"receiver@mail.to",
    *   "status":"5.0.0",
    *   "action":"failed",
    *   "messageid":"<123456@abc.de>",
    *   "is":"bounce"
    * } 
    */
  });
  
  //using callback
  EmailSnoop.getBouncedEmailDetail(message.toString(), (result) => {
     //...
  });  
```

### Example combination

```javascript
  const EmailSnoop = require('mail-bounce-snoop');
  
  EmailSnoop.init(message);

  //using the email set via init
  EmailSnoop.isBounced((isBounce) => {
      if (!isBounce) {
        console.log("All fine");
        
        return;
      }
      
      //using the email set via init or previous function call
      EmailSnoop.getBouncedDetail().then(result => {
        console.log(`Email to ${result.recipient} failed with status ${result.status}`)
      });
  });

```
