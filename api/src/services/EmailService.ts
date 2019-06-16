import * as Mailer from 'nodemailer'
import { Transporter } from 'nodemailer'

class EMailService {
    private transporter: Transporter;
    constructor() {
        this.transporter = Mailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'manoel.josefneto@gmail.com',
                pass: 'manoel02'
            }
        })
    }

    send(from, to, subject, html) {
        const mailOptions = {
            from: `HeroFit <${from}>`,
            to,
            subject,
            html
        }
        return this.transporter.sendMail(mailOptions)
            .then((result) => {
                console.log(`Email Eviado com sucesso ${result.info}`);
                return Promise.resolve(true)
            }).catch((err) => {
                console.log(`Erro ao eviar email \n ${err}`);
                return Promise.reject(false)
            });
    }
} 

export default new EMailService()