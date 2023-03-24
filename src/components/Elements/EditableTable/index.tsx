import React, { useContext, useEffect, useMemo } from 'react'
import styles from '@/styles/Elements/EditableTable/editable-table.module.scss'
import { Form, Space, Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FormInstance, Rule } from 'antd/es/form';
import { TableComponents } from 'rc-table/lib/interface';



const EditableContext = React.createContext<FormInstance<any> | null>(null)

type ITableItem<T> = T & { id?: number, key?: string | number }

interface EditableRowProps
{
	index?: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) =>
{
	const [form] = Form.useForm();

	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
}

interface EditableCellProps
{
	record: { [param: string]: any };
	editable: boolean;
	children: React.ReactNode;
	dataIndex: string;
	editing: boolean;
	inputNode: JSX.Element;
	inputType?: string | number;
	validatorRule?: Rule[];
	required?: boolean;
	fieldValue?: string | number;
}

const EditableCell: React.FC<EditableCellProps> = (props) =>
{
	const { record, editable, children, dataIndex, editing, inputNode, validatorRule, required, fieldValue, inputType, ...restProps } = props
	const form = useContext(EditableContext)
	const isEmpty = (value: any): value is undefined | null => value === null || value === undefined

	useEffect(() =>
	{
		if (editing)
		{
			form?.setFieldsValue({
				[dataIndex]: !isEmpty(fieldValue) ? fieldValue
					: (isEmpty(record[dataIndex]) ? ''
						: (inputType === 'string' ? String(record[dataIndex])
							: Number(record[dataIndex])))
			})
		}
	}, [editing, form, dataIndex, record, fieldValue, inputType])

	const defaultRule = useMemo<Rule[]>(() =>
		[
			{
				// 默认必填
				required: !!required,
				message: `该单元格为必填！`,
			},
			{
				max: 20,
				type: 'string',
				message: '不得超过20个字符！',
			}
		], [required])

	const renderCell = () =>
	{
		return editing ? (
			<Form.Item
				name={dataIndex}
				style={{ margin: 0 }}
				rules={validatorRule || defaultRule}
			>
				{inputNode}
			</Form.Item>
		) : children
	}

	return <td {...restProps}>{renderCell()}</td>
}

interface EditableTableProps<D> extends Omit<TableProps<D>, 'rowKey' | 'rowClassName' | 'components'>
{
	containerId: string;
}

const EditableTable = <D extends Record<string, string | number>, P>(props: EditableTableProps<D>) =>
{
	const { containerId } = props
	const tableComponent = useMemo<TableComponents<D>>(() => ({
		body: {
			row: EditableRow,
			cell: EditableCell
		},
	}), [])

	const getRowKey = (record: ITableItem<D>) =>
	{
		const key = record.key || record.id
		return String(key)
	}

	return <div className={styles.editableTable}>
		<Table
			{...props}
			id={containerId}
			components={tableComponent}
			className={`${styles.editableTable}`}
			rowKey={getRowKey}
			rowClassName="editable-row"
		></Table>
	</div>
}

export default React.memo(EditableTable)
