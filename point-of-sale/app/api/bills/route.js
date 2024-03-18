const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'tom',
		password: '1234',
		database: 'point_of_sale_db'
	}
});
 const PAYMENT_METHOD =[`cc`,`mbob`,`cash`]
 const TAX_RATE =0.05

export async function GET(req) {
    const searchParams= req.nextUrl.searchParams;
    const storeId = searchParams.get('store_id')
    var query= knex ('bills')
    if(storeId) query = query.where('store_id',storeId)
    var result = await query.select ('*')
    return Response.json({data:result})
    }

export async function POST(req){
    const {paymentMethod,subTotal,storeId}=await req.json()
    if(!PAYMENT_METHOD.includes(paymentMethod)){
        return new Response(`Bad request:payment method should include one of the [${PAYMENT_METHOD}.join(`,`)],{status:400}`)
    }
    const taxToApply =TAX_RATE * subTotal
        const result = await knex('bills').insert({
		payment_method: paymentMethod,
		subtotal: subTotal,
		paid_at: (new Date().toISOString()),
		total: subTotal + taxToApply,
		tax: taxToApply,
		store_Id: storeId
	
    }).returning('*')

	return Response.json({ data: result })


}