export type User = {

};

export type Friend = {
	id: string,
	fullname: string,
	is_typing: boolean,
	last_message: string,
};

export type IsTyping = {
	sender_id: string,
};

export type SendMessageAck = {
	temp_message_id: string,
	message_id: string,
	sent_at: string,
};

export type Message = {
	type: string,
	message_id: string,
	received_at: string,
	sent_at: string,
	message: string,
	sender_id: string,
	temp_message_id?: string,
};

export type ReceiveMessage = {
	message_id: string,
	received_at: string,
};

export type ServerSendMessage = {
	type: string,
	message: string,
	temp_message_id: string,
}