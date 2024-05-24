import {DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Col, Form, Row, Select, Space} from 'antd'
import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {useCreateTaskMutation} from '../../../../store/api/practiceApi/taskService'
import {validateMessages} from "../../../../utils/validateMessage";
import TextArea from "antd/es/input/TextArea";
import './createTask/CreateTask.scss'
import {
    useEditTaskMutation,
    useGetOneTaskQuery,
    useGetPracticeTypeQuery
} from "../../../../store/api/practiceApi/individualTask";
import {PracticeType, Task, TaskEdit, TaskSend} from "../../../../models/Practice";
import {OptionsNameSpecialty} from "../roster/registerContracts/RegisterContracts";
import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";

const EditTask = () => {
    const path = useLocation()
    const id: string = path.pathname.split('/').at(-1)!
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const {data, isSuccess} = useGetOneTaskQuery(id)
    const [edit] = useEditTaskMutation()
    const [msg, setMsg] = useState('')
    //приходить с бэка
    const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setNameSpecialty(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);

    const [practiceType, setPracticeType] = useState<PracticeType[]>()
    const {data: dataPracticeType, isSuccess: isSuccessPracticeType} = useGetPracticeTypeQuery()


    useEffect(() => {
        if (isSuccessPracticeType) {
            setPracticeType(dataPracticeType)
        }
    }, [dataPracticeType]);

    const optionsSubDivision = [
        {
            value: 'Институт фундаментальной медицины и биологии(Высшая школа биологии)',
            label: 'Институт фундаментальной медицины и биологии(Высшая школа биологии)',
        },
        {
            value: 'Институт фундаментальной медицины и биологии(Высшая школа медицины)',
            label: 'Институт фундаментальной медицины и биологии(Высшая школа медицины)'
        },
    ]

    useEffect(() => {
        if (isSuccess) {
            form.setFieldValue('subDivision', data.subdivisionName)
            form.setFieldValue('specialityName', data.specialityName)
            form.setFieldValue('practiceType', data.practiceType)
            const listTasks = data.tasks.map(elem => {
                return  {
                    task: elem.taskDescription
                }
            })
            form.setFieldValue('tasks', listTasks)

        }
    }, [data]);

    function onFinish(values: Task) {        const specName = dataNameSpecialty!.find(elem => {
        if (elem.value === values.specialityName) {
            return elem
        }
    })
        const practiceType = dataPracticeType!.find(elem => {
            if (elem.value === values.practiceType) {
                return elem
            }
        })
        const newData: TaskEdit = {
            id: data!.id,
            specialityNameId: String(specName!.id),
            practiceTypeId: String(practiceType!.id),
            subdivisionNameId: '1',
            tasks: values.tasks.map(elem => elem.task)
        }

        edit(newData)
            .then(() => {
                setMsg('Данные сохранены')
            })
            .catch(e => console.log(e))
    }



    return (
        <section className="container">
            <Space size={10} align="center">
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => {
                        navigate('/services/practices/individualTasks/')
                    }}
                />
                <span className="text-[28px] font-normal">
					Редактировать задание
				</span>
            </Space>
            <Form<Task>
                validateMessages={validateMessages}
                onFinish={(values) => onFinish(values)}
                layout={'vertical'}
                form={form}
            >
                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={'Подразделение'}
                                       rules={[{required: true}]}
                                       name={'subDivision'}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={optionsSubDivision}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction={'vertical'} className={'w-full'}>
                            <Form.Item label={'Шифр и наименование специальности'}
                                       rules={[{required: true}]}
                                       initialValue={'Test 1'}
                                       name={'specialityName'}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={nameSpecialty}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Space direction="vertical" className="w-full z-10">
                            <Form.Item
                                label={'Тип практики'}
                                rules={[{required: true}]}
                                initialValue={'Test 1'}
                                name={"practiceType"}>
                                <Select
                                    size="large"
                                    popupMatchSelectWidth={false}
                                    className="w-full"
                                    options={practiceType}
                                />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Space direction="vertical" className="w-full  mb-4 mt-8">
                    <span className="font-bold">
                        Индивидуальные задания (от 1 до 10)
                    </span>
                </Space>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.List name={'tasks'}
                                   rules={[{
                                       validator: async (_, tasks) => {
                                           if (tasks.length < 1 || tasks.length > 10) {
                                               return Promise.reject(new Error('Заданий может быть от 1 до 10'))
                                           }
                                       }
                                   }]}
                        >
                            {(fields, operation, {errors}) => (
                                <>
                                    {fields.map((field) => (
                                        <Space.Compact className={'w-full'}
                                                       key={field.key}>
                                            <div className={'flex items-center w-full gap-5'}>
                                                <div className={'flex w-full'}>
                                                    <div
                                                        className={'flex items-center justify-center bg-[#E9EFF8] p-[7px] border-solid border-[1px] border-[#d9d9d9] rounded-l-lg mb-[24px]'}>
                                                        <span className={'text-base font-bold'}>
                                                            {field.name + 1}
                                                        </span>
                                                    </div>
                                                    <Form.Item name={[field.name, 'task']}
                                                               className={'w-full h-min'}
                                                    >
                                                        <TextArea autoSize
                                                                  size="large"
                                                                  placeholder="Добавить задание"
                                                                  className={'textArea'}

                                                        />
                                                    </Form.Item>
                                                </div>
                                                <Button
                                                    className={'mb-[24px]'}
                                                    size="large"
                                                    type="primary"
                                                    icon={<DeleteOutlined/>}
                                                    onClick={() => {
                                                        operation.remove(field.name)
                                                    }}
                                                />
                                            </div>
                                        </Space.Compact>
                                    ))}

                                    <Form.ErrorList
                                        errors={errors}
                                        className={'mb-[15px] text-red-600'}
                                    />

                                    <Button
                                        size="large"
                                        type="primary"
                                        icon={<PlusOutlined/>}
                                        onClick={() => operation.add()}
                                        disabled={fields.length === 10}
                                    />
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="my-8">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space className="w-full">
                            <Button
                                className="!rounded-full"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                            <span className={'text-lg text-[green]'}>{msg}</span>

                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

export default EditTask