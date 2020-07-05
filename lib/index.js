const Bull = require('bull');
const nodemailer = require('nodemailer');

class Queue {
  constructor(opts) {

    this.port = 6379 || opts.port;
    this.host = '127.0.0.1' || opts.host

    this.queue = new Bull('email', {
      redis: {
        port: this.port,
        host: this.host,
      },
      prefix: 'email_',
      defaultJobOptions: {
        attempts: 1,
        removeOnComplete: true,
        backoff: false,
        delay: 0
      },
      limiter: {
        max: 200000,
        duration: 1000
      },
      settings: {
        maxStalledCount: 1,
        guardInterval: 1,
        retryProcessDelay: 500,
      }
    });

    this.callFun();
  } 

  async callFun () {
    this.queue.process(async job => {
      const {title, template, recipient, pass} = job.data
      const transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
          user: '1761997216@qq.com',
          pass: pass,
        }
      })
  
      const mailOptions = {
        from: '1761997216@qq.com',
        to: recipient,  
        subject: title,
        html: template
      }
      
      try{
        await transporter.sendMail(mailOptions)
        console.log(`to ${recipient} email send success`)
      }catch(err){
        console.log('to ${recipient} email send faild', err)
      }
    })
  }

  async sendEmail(args) {
    await this.queue.add(args);
  }
}

module.exports = Queue;
