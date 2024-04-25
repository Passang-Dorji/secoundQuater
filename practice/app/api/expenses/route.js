import knex from '@/database'

export async function GET(){
    const data = await knex ('expenses').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {userId, amount} = await req.json()
    const body = await knex('expenses').insert({
        user_id: userId,
        amount,
        created_at: new Date().toISOString()
    })
}