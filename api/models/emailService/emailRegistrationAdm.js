// Server - CovidBit - Fast Pandas
// Created: 31, January, 2021, Teresa Costa
// Edit: 25, March, 2021, Adilah, HTML Template

const nodemailer = require("nodemailer");


const emailRegistrationAdm = function (email, businessName, url) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'covidbitreg@gmail.com',
            pass: 'FASTPANDAS'
        }
    });
    const mailOptions = {
        from: 'covidbitreg@gmail.com',
        to: email,
        subject: 'COVIDBIT Website Registration Request',
        html:
            `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head>
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
            <meta content="width=device-width" name="viewport">
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible">
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
            <!--<![endif]-->
            <style type="text/css">
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    table,
                    td,
                    tr {
                        vertical-align: top;
                        border-collapse: collapse;
                    }
            
                    * {
                        line-height: inherit;
                    }
            
                    a[x-apple-data-detectors=true] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                </style>
            <style id="media-query" type="text/css">
                    @media (max-width: 670px) {
            
                        .block-grid,
                        .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }
            
                        .block-grid {
                            width: 100% !important;
                        }
            
                        .col {
                            width: 100% !important;
                        }
            
                        .col_cont {
                            margin: 0 auto;
                        }
            
                        img.fullwidth,
                        img.fullwidthOnMobile {
                            max-width: 100% !important;
                        }
            
                        .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                        }
            
                        .no-stack.two-up .col {
                            width: 50% !important;
                        }
            
                        .no-stack .col.num2 {
                            width: 16.6% !important;
                        }
            
                        .no-stack .col.num3 {
                            width: 25% !important;
                        }
            
                        .no-stack .col.num4 {
                            width: 33% !important;
                        }
            
                        .no-stack .col.num5 {
                            width: 41.6% !important;
                        }
            
                        .no-stack .col.num6 {
                            width: 50% !important;
                        }
            
                        .no-stack .col.num7 {
                            width: 58.3% !important;
                        }
            
                        .no-stack .col.num8 {
                            width: 66.6% !important;
                        }
            
                        .no-stack .col.num9 {
                            width: 75% !important;
                        }
            
                        .no-stack .col.num10 {
                            width: 83.3% !important;
                        }
            
                        .video-block {
                            max-width: none !important;
                        }
            
                        .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                        }
                    }
                </style>
            <style id="icon-media-query" type="text/css">
                    @media (max-width: 670px) {
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
                    }
                </style>
            </head>
            <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #000000;">
        
                <table bgcolor="#000000" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td style="word-break: break-word; vertical-align: top;" valign="top">
                <div style="background-color:#ffffff;">
                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                <div class="col_cont" style="width:100% !important;">
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                <div style="font-size:1px;line-height:15px"> </div><img align="center" alt="your logo" border="0" class="center fixedwidth" src="cid:covidbit-logo" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 200px; display: block;" title="your logo" width="200"/>
                <div style="font-size:1px;line-height:25px"> </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                
                
                
                <div style="background-color:#ffffff;">
                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #f1d0ff;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:WhiteSmoke;background-image:url('images/bg-white-rombo.png');background-position:top left;background-repeat:no-repeat">
                <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                <div class="col_cont" style="width:100% !important;">
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:45px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                
                <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px;" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                
                <div align="center" class="img-container center fixedwidth" style="padding-right: 20px;padding-left: 20px;">
                    <div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:0px;padding-left:45px;">
                        <div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #393d47; mso-line-height-alt: 18px;">
                        <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;"><strong><span style="text-align: left; background-color: transparent;">Hello <span style="color: #aa67cf;">${businessName}</span>,</span></strong></span></p>
                        <br><br>
                        </div>
        
        
            <!-- Start of Email Content -->
        
            <div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:0px;padding-right:45px;padding-bottom:10px;padding-left:45px;">
            <div class="txtTinyMce-wrapper" style="line-height: 1.5; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; font-size: 12px; color: #393d47; mso-line-height-alt: 18px;"><span style="font-size: 32px;"><strong>Welcome </strong></span></div>
            </div>
            
            <!-- center image -->
            <div align="center" class="img-container center fixedwidth" style="padding-right: 20px;padding-left: 20px;">
                <div style="font-size:1px;line-height:20px">&nbsp;</div><img align="center" alt="Welcome" border="0" class="center fixedwidth" src="cid:handshakers" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 325px; display: block;" title="Welcome" width="325">
                <div style="font-size:1px;line-height:20px">&nbsp;</div>
            </div>
        
            <div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:0px;padding-left:45px;">
            <div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #393d47; mso-line-height-alt: 18px;">
            <!-- <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 16px;"><strong><span style="text-align: left; background-color: transparent;">Hello,</span></strong></span></p> -->
            <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; margin: 0;">&nbsp;</p>
            <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 16px;"><span style="text-align: left; background-color: transparent;"><span style="color: black;">Your registration is complete. Thanks for joining. </span></span><span style="">We're really excited to have you join our platform. We are hoping to create a safer community together.</span></span></p>
            <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; margin: 0;">&nbsp;</p>
            <p style="line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; margin: 0;">&nbsp;</p>
            </div>
            </div>
        
            <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                <a href=${url} style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #8412c0; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; width: auto; width: auto; border-top: 1px solid #8412c0; border-right: 1px solid #8412c0; border-bottom: 1px solid #8412c0; border-left: 1px solid #8412c0; padding-top: 10px; padding-bottom: 10px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 14px; line-height: 28px;" style="font-size: 14px; line-height: 28px;">SET YOUR PASSWORD</span></span></span></a></div>
            </div>
        
            <!-- End of Email Content -->
        
        
            <!-- question -->
            <div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:10px;padding-left:45px;">
            <div class="txtTinyMce-wrapper" style="line-height: 2; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: left; color: #393d47; mso-line-height-alt: 18px;">
                <span style="font-size: 13px; mso-ansi-font-size: 14px;">
                <span style="font-size: 13px; color: black; mso-ansi-font-size: 14px;"><strong>Have a question?</span></strong><br>
                <span style="font-size: 13px; color: black; mso-ansi-font-size: 14px;">You can always contact our team at <u><strong>fastpandasseneca@gmail.com</strong></u>, we will be happy to help you!</span></div>
            </div>
        
            <!-- trademark -->
            <div style="color:#393d47;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:20px;padding-left:10px;">
            <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; color: #393d47; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
            <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><span style="color: black;"></span></p>
            </div>
            </div>
        
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        
            <!-- footer -->
            <div style="background-color: whitesmoke;">
            <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
            <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
            <div class="col_cont" style="width:100% !important;">
            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
            <tbody>
            <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
            </tr>
            </tbody>
            </table>
        
            <div style="color:#393d47;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; color: #393d47; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"><span style="color: #000000;"><span style="font-size: 11px;">Creating a safer world together.</span></span></p>
                <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
                <p style="font-size: 11px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 13px; margin: 0;"><span style="font-size: 11px;"><span style="color: #000000;">COVIDBIT © 2021&nbsp;</span></p>
                <p style="line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
            </div>
        
           
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </td>
            </tr>
            </tbody>
            </table>
            
            </body></html>`,
        attachments: [{
            filename: 'welcome-handshakers.png',
            path: __dirname + '/images/welcome-handshakers.png',
            cid: 'handshakers'
        },
        {
            filename: 'covidbit-logo.png',
            path: __dirname + '/images/covidbit-logo.png',
            cid: 'covidbit-logo'
        }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { emailRegistrationAdm };