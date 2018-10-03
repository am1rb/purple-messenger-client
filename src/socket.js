// @flow

import openSocket from 'socket.io-client';

import {WEB_SERVER_URL} from './config'


// these are implemented for support the related mock type definitions
export const serverSocket = {
	on: (...args:any) => {},
	emit: (...args:any) => {},
}

export const cleanup = () => {}
//

const socket = openSocket(WEB_SERVER_URL)

export default socket;