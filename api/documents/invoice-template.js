module.exports = ({
    paymentId,
    paymentAmount,
    paymentDate,
    totalPaid,
    appartementNumber,
    appartementOwner,
}) => {
    const today = new Date()
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Invoice</title>
        </head>
        <body>
            <div class="mx-auto p-16" style="max-width: 800px">
                <div class="flex items-center justify-between mb-8 px-3">
                    <div>
                        <span class="text-2xl">
                            Syndicat Ticket #${paymentId}
                        </span>
                        <br />
                        <span>Date</span>: ${`${today.getDate()}. ${
                            today.getMonth() + 1
                        }. ${today.getFullYear()}.`}
                        <br />
                    </div>
                    <div class="text-right">
                        <img
                            src="https://www.stenvdb.be/assets/img/email-signature.png"
                        />
                    </div>
                </div>

                <div class="border border-t-2 border-gray-200 mb-8 px-3"></div>

                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Appartment Owner</div>
                    <div class="text-right font-medium">
                        ${appartementOwner}
                    </div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Appartment Number</div>
                    <div class="text-right font-medium">
                        ${appartementNumber}
                    </div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Monthly Paid Amount</div>
                    <div class="text-right font-medium">
                        ${paymentAmount} MAD
                    </div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Months Paid</div>
                    <div class="text-right font-medium">${paymentDate}</div>
                </div>

                <div class="flex justify-between items-center mb-2 px-3">
                    <div class="text-2xl leading-none">
                        <span class="">Total</span>:
                    </div>
                    <div class="text-2xl text-right font-medium">
                        ${totalPaid} MAD
                    </div>
                </div>

                <div class="mb-8 text-4xl text-center px-3">
                    <span>Thank you!</span>
                </div>

                <div class="text-center text-sm px-3">
                    contact@syndicat.ma ∖ www.syndicat-app.ma
                </div>
            </div>
        </body>
        </html>
    `
}
