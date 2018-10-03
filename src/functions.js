
import {WEB_SERVER_URL} from './config'


export function buildAPIPath(path)
{
	return [WEB_SERVER_URL, path].join('')
}

export function encodeData(json) {
	var params = [];
	for(var key in json) {
		params.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]));
    }
	return params.join('&');
}

export function handleResponseError(errorCodes={}, onErrorCallback, scope=null)
{
    return function(...args)
    {
        var error = args[0];

        var status_code = error.response ? error.response.status : null;

        if(status_code && errorCodes[status_code])
        {
            errorCodes[status_code].call(scope, error);
        }
        else
        {
            var error_message = error.message;

            if(error.response===undefined)
            {
                error_message = "server connect error";
            }
            
            onErrorCallback && onErrorCallback.call(scope, error_message, error);
        }

    }
}