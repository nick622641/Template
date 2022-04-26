const nodemailer = require('nodemailer')

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          rejectUnauthorized: process.env.NODE_ENV === "DEVELOPMENT" ? false : true
        }
      })

      let message = ''

      const output = `
        <p>You have a new contact request</p>
        <h3>Contact details</h3>
        <ul>
          <li>Name: ${options.name}</li>
          <li>Email: ${options.email}</li>
          <li>Country: ${options.country}</li>
        </ul>
        <h3>Message</h3>
        <p>${options.message}</p>
      `

      if ( options.type === 'contact' ) {
        message = {
          from: `${options.name} <${options.email}>`,
          to: process.env.SMTP_FROM_EMAIL,
          subject: options.subject,
          html: output
        }
         
      } 
      
      if ( options.type === 'forgot' ) {
        message = {
          from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_NOREPLY}>`,
          to: options.email,
          subject: options.subject,
          text: options.message
        }
      }      

      await transporter.sendMail(message)
}

module.exports = sendEmail