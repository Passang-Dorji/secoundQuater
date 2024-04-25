import knex from '@/database'

export async function GET(){
    const data = await knex('user')
    return Response.json({data})
}
export async function POST(req){
    const {name,email,contact} = await req.json()
    const body = await knex('user').insert({
        name,
        email,
        contact
    })
    return Response.json({body})
}