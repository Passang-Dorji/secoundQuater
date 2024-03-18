const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'passang',
		password: '1234',
		database: 'point_of_sale_db'
	}
});

export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const storeId = searchParams.get('store_id')
	const data = await (storeId === null ? knex('users').select('*') : knex('users').where('store_id', storeId).select('*'))
	return Response.json({ data })
}
export async function POST(req) {
	const body = await req.json()
	const { firstname,lastname,salary,storeId } = body;
	const data = await knex('users').insert({
		firstname:firstname,
        lastname:lastname,
        salary:salary,
        store_id:storeId
    	})
	return Response.json({ data })
}