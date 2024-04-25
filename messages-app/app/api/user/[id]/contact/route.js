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
export async function GET(req,{params}){
    
    const { id } = params
     const data = await knex('messages')
        .join('users as senders','messages.sender_id','senders.id')
        .join('users as recievers','messages.reciever_id','recievers.id')
        .distinctOn(knex.raw('least(sender_id, reciever_id)'), knex.raw('greatest(sender_id, reciever_id)'))
            .where('reciever_id', id)
            .orWhere('sender_id', id)
            .orderByRaw('least(sender_id, reciever_id), greatest(sender_id, reciever_id), sent_at desc')
            .select('messages.*','senders.name as sender','recievers.name as reciever')
        return Response.json({data})
 }