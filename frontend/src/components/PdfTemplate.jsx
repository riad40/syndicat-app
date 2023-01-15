import React from "react"

function PdfTemplate({ data }) {
    return (
        <>
            <div class="mx-auto p-16" style={{ maxWidth: "800px" }}>
                <div class="flex items-center justify-between mb-8 px-3">
                    <div>
                        <span class="text-2xl">Syndicat Ticket #</span>:
                        0001-2019
                        <br />
                        <span>Date</span>: January 1st 2019
                        <br />
                    </div>
                    <div class="text-right">
                        <img src="https://www.stenvdb.be/assets/img/email-signature.png" />
                    </div>
                </div>

                <div class="border border-t-2 border-gray-200 mb-8 px-3"></div>

                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Appartment Owner</div>
                    <div class="text-right font-medium">{data.owner}</div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Appartment Number</div>
                    <div class="text-right font-medium">
                        {data.appartmentNumber}
                    </div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Floor Number</div>
                    <div class="text-right font-medium">{data.floorNumber}</div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Monthly Rate Amount</div>
                    <div class="text-right font-medium">{data.price} MAD</div>
                </div>
                <div class="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                    <div>Months Paid</div>
                    <div class="text-right font-medium">{data.monthsPaid}</div>
                </div>

                <div class="flex justify-between items-center mb-2 px-3">
                    <div class="text-2xl leading-none">
                        <span class="">Total</span>:
                    </div>
                    <div class="text-2xl text-right font-medium">
                        {data.totalPaid} MAD
                    </div>
                </div>

                <div class="mb-8 text-4xl text-center px-3">
                    <span>Thank you!</span>
                </div>

                <div class="text-center text-sm px-3">
                    contact@syndicat.ma ∖ www.syndicat-app.ma
                </div>
            </div>
        </>
    )
}

export default PdfTemplate
