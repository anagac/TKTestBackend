module.exports = {
    mongo : {
        url: process.env.MONGOLAB_URI
    },
    emailConnector: {
        transports: [{
           type: "smtp",
           host: "smtp.sendgrid.net",
           secure: false,
           port: 587,
           tls: {
             rejectUnauthorized: false
           },
           auth: {
             user: process.env.SENDGRID_USERNAME,
             pass: process.env.SENDGRID_PASSWORD
           }
        }]
    }
};