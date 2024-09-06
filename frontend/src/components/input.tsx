import { CSSProperties } from 'react'

import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'

export const Input = ( { label, form } ) => {
	const id = Math.random( ).toString( 36 )

	const styles: { [ key: string ]: CSSProperties } = {
		input: { background: '#f6f6f6', textIndent: 10, height: 40, width: '100%', border: `1px solid ${ !form?.errors[ label ] ? '#6b7280' : 'red' }` },
		error: { background: '#f6f6f6', color: '#6b7280', position: 'relative', float: 'right', fontSize: 12, margin: '-10px 12px -6px 0px', padding: '0px 10px' }
	}

	return (
		<FloatLabel>
			<InputText id={ id } type={ form[ label ].type } { ...form.register( label, form[ label ] ) } style={ styles.input } autoComplete='new-password' />
			<label htmlFor={ id }>{ label }</label>
			{ form.errors[ label ] && <p style={ styles.error }>{ form.errors[ label ]?.message }</p> }
		</FloatLabel>
	)
}
