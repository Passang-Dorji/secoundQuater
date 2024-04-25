import knex from '@/database'

export async function GET(){
    const data = await knex('task').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {userId,name,description,status} = await req.json()
    const body = await knex('task').insert({
        user_id:userId,
        name,
        description,
        status,
        date: new Date().toISOString()
    })
    return Response.json({body})
}