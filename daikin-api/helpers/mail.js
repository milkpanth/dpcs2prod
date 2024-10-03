require("dotenv").config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendMail(toAddress, template, data) {
        const msg = {
            to: toAddress,
            from: process.env.SENDGRID_ADDRESS,
            subject: "DPCS Mail",
            templateId: template,
            dynamic_template_data: data
        }

        sgMail.send(msg).catch(err=> console.error(err))
    },
    sendMail2(toAddress, template) {
        const msg = {
            to: toAddress,
            from: process.env.SENDGRID_ADDRESS,
            templateId: template
        }

        sgMail.send(msg).catch(err=> console.error(err))
    }
}