import { FC, useState } from 'react'

export interface Param {
	id: number
	name: string
	type: string
}

export interface ParamValue {
	paramId: number
	value: string
}

export interface Model {
	paramValues: ParamValue[]
	// colors: Color[]; Можете объяснить для чего это
}


interface Props {
	params: Param[]
	model: Model
}

type TypeEditedValue = {
	[key: number]: string
}

const styles: any = {
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
		gap: '120px'
	},
	items: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: '20px',
		gap: '10px'
	}
}


const App: FC<Props> = ({ params, model }) => {
	const getEditedValues = (paramValues: ParamValue[]): TypeEditedValue => {
		const editedValues: TypeEditedValue = {}
		paramValues.forEach(paramValue => {
			editedValues[paramValue.paramId] = paramValue.value
		})
		return editedValues
	}
	const [editedValues, setEditedValues] = useState<TypeEditedValue>(
		getEditedValues(model.paramValues)
	)

	const handleParamChange = (paramId: number, value: string) => {
		setEditedValues(prevState => ({
			...prevState,
			[paramId]: value
		}))
	}

	const getModel = (): Model => {
		const paramValues: ParamValue[] = params.map(param => ({
			paramId: param.id,
			value: editedValues[param.id] || ''
		}))
		return {
			paramValues
		}
	}
	return (
		<div style={styles.wrapper}>
			<div style={styles.items}>
				{params.map(param => (
					<div key={param.id}>
						<label>{param.name}</label>
						<input
							type='text'
							value={editedValues[param.id] || ''}
							onChange={e => handleParamChange(param.id, e.target.value)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
