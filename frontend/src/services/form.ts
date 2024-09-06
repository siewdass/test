import { useForm as Form } from 'react-hook-form'

export const useForm = ( schema ) => {
	const { register, handleSubmit, reset, formState: { errors }, getValues } = Form( )
	return [ { register, errors, getValues, reset, ...schema }, handleSubmit ]
}
