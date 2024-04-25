const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'passang',
      password : '1234',
      database : 'messages_db'
    }
  });
export async function GET(){
const data = await knex("users").select('*')
return Response.json({data})
}
export async function POST(req){
    const body = await req.json()
    const {name,email}=body
    await knex('users').insert({
        name:name,
        email:email
    })
    .returning('*')
    return Response.json({body})
}