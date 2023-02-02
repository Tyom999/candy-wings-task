module.exports = {
    roomMessage: `SELECT * FROM (SELECT Message.id, Message.text, Message.createdAt, Message.updatedAt, Message.userId, user.name AS 'userName' FROM message AS Message LEFT OUTER JOIN user AS user ON Message.userId = user.id WHERE  Message.roomId = (SELECT id FROM room WHERE user1Id='<%=user1Id%>' AND user2Id ='<%=user2Id%>' OR user1Id='<%=user2Id%>' AND user2Id='<%=user1Id%>') ORDER BY createdAt DESC LIMIT <%=limit%> OFFSET <%=offset%>) as message ORDER BY message.createdAt ASC`
};
