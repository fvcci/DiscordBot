const db = require("./../app.js");

// Returns the string with all symbols escaped
const escapifySymbols = msgContents => {
    const regex = /(?=['"`\\])/g;
    return msgContents.replace(regex, '\\');
}

// Returns the picture URL if the inputted argument is a picture. Else, returns the message contents
const urlifyPicture = message => {

    // If there are no attachments, provide just the content
    if (message.attachments.size === 0) {
        return message.content;
    }

    // Otherwise, Concatenate the message content and all the urls
    return message.attachments.reduce(
        (msgAttachments, attachment) => msgAttachments + attachment,
        (message.content.length !== 0) ? message.content + ' ' : message.content
    );

}

module.exports = {

    insertDeletedMessage (message) {

        const sql = ` INSERT INTO deleted_messages(user_id, username, message, channel) VALUES( 
            ${message.author.id}, 
            "${escapifySymbols(message.author.username)}",
            "${escapifySymbols(urlifyPicture(message))}",
            "${message.channel.name}"
        );`;

        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }   
            console.log(result);
         });
        
    }

};