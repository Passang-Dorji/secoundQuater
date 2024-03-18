const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'passang',
      password : '1234',
      database : 'point_of_sale_db'
    }
  });

export async function GET(){
    const data = await knex('products').select('*')
    return Response.json({data})
}
export async function POST(req){
    const body= await req.json()
    const {name,barcode,is_perishable,day_to_perish}=body;
    await knex ('products').insert({
        name:name,
        barcode:barcode,
        is_perishable: false,
        day_to_perish:day_to_perish    
    })
    return Response.json({body})
}