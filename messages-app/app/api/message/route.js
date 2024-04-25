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
    const data = await knex("messages").select("id","messages_content")
    return Response.json({data})
}

export async function POST(req){
    const {senderId,recieverId,messagesBody}=await req.json()
    const body= await knex('messages').insert({
        sender_id: senderId,
        reciever_id: recieverId,
        messages_content: messagesBody,
        sent_at:new Date().toISOString(),
        recieved_at:new Date().toISOString(),  
    })
    .returning('*')
    return Response.json({body})
}