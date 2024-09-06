export const data: { ref: any } = { ref: null }

export const Toast = ( type, title, message ) => {
	( data.ref as any ).current.show( { severity: type, summary: title, detail: message } )   
}