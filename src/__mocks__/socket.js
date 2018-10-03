// @flow

let SERVER_EVENTS = {};
let CLIENT_EVENTS = {};

function clientEmit(event:string, ...args:any)
{
	if(!SERVER_EVENTS[event])
	{
		return
	}

	SERVER_EVENTS[event].forEach((func:Function) => func(...args));
}

function serverEmit(event:string, ...args:any)
{
	if(!CLIENT_EVENTS[event])
	{
		return
	}

	CLIENT_EVENTS[event].forEach((func:Function) => func(...args));
}

const socket = {
	on(event:string, func:Function)
	{
		if (CLIENT_EVENTS[event])
		{
			return CLIENT_EVENTS[event].push(func);
		}
		CLIENT_EVENTS[event] = [func];
	},
	emit: clientEmit,
};

// export const io = url => {
// 	return socket;
// };

// Additional helpers, not included in the real socket.io-client,just for out test.
// to emulate server emit.
export const serverSocket = {
	on(event:string, func:Function)
	{
		if (SERVER_EVENTS[event])
		{
			return SERVER_EVENTS[event].push(func);
		}
		SERVER_EVENTS[event] = [func];
	},
	emit: serverEmit,
};
 
// cleanup helper
export function cleanup()
{
	SERVER_EVENTS = {}
	CLIENT_EVENTS = {}
}

export default socket;
