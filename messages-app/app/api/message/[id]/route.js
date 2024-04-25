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
  export async function GET(req,{params}) {
      const senderId =params.id
      const { searchParams } = req.nextUrl;
    const recieverId = searchParams.get("rId");
    const Data = await knex("messages")
      .join("users as sender", "messages.sender_id", "sender.id")
      .join("users as reciever", "messages.reciever_id", "reciever.id")
      .where((qb)=>{
        qb.where("messages.sender_id", senderId)
        .where("messages.reciever_id", recieverId)
      })
      .orWhere((qb)=>{
          qb.where("messages.sender_id", recieverId)
            .where("messages.reciever_id", senderId)
      })
      .orderBy("messages.sent_at", "desc")
      .select(
        "sender.name as sender_name",
        "reciever.name as reciever_name",
        "messages.messages_content",
        "messages.sent_at",
        "messages.recieved_at"
      );
    return Response.json({ Data });
  }
  

  
  
  
  
  
  
  
  
  