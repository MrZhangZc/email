
# bull-email

send email use redis bull queue

## Installation

```js
$ npm i bull-email
$ yarn add bull-email
```

## Example

```js
const Queue = require('bull-email');

const Task = new Queue();

async function send () {
  Task.sendEmail({
    title: '测试一下',
    template: `<h1>我是zzc</h1>`,
    recipient: 'jiayouzzc@126.com',
    pass: 'xxxxxxxxxx'
  })
}

send();
```
