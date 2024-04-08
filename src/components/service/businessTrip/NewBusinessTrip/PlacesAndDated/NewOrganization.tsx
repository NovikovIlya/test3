import React, {useEffect, useState} from 'react';
import {Col, DatePicker, Form, Input, InputNumber, Row, Tooltip} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import dayjs from "dayjs";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setNewSumDay} from "../../../../../store/reducers/FormReducers/SumDayReducer";
import {SumDay} from "../SumDay";


export interface INewOrganization {
    id: number
    innOrg: number
    nameOrg: string
    legalAddress: string
    actualAddress: string
    date: Array<dayjs.Dayjs> | Array<null>
}

export const NewOrganization = (props: INewOrganization) => {

    const [sumDay, setSumDay] = useState(0)
    const dispatch = useDispatch()

    function changeSumDay(dates: Array<dayjs.Dayjs | null>) {
        if (dates) {
            const sumDay = dates[1]!.diff(dates[0], 'day') + 1
            setSumDay(sumDay)
            dispatch(setNewSumDay(sumDay))
        } else {
            setSumDay(0)
        }
    }


    const [fetch, setFetch] = useState(0)
    const [test, setTest] = useState('Орг')

    useEffect(() => {
        console.log(fetch)
        setTest('Организация 11')
        // form.setFieldValue('goal', 'GOAL') нужно использовать данный метод, чтобы менять значение
    }, [fetch]);

    return (
        <Row gutter={[16, 0]} className={`w-[87%]`}>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'ИНН организации'}/>}
                    name={'inn'}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^[0-9]{10}$'),
                        message: 'ИНН содержит 10 цифр'
                    }]}>
                    <InputNumber
                        type={"number"}
                        placeholder={'Ввести'}
                        controls={false}
                        onChange={(value) => {
                            if (String(value).length === 10 && value !== null) {
                                setFetch(+value)
                            }
                        }}

                    />
                </Form.Item>
            </Col>
            <Col span={12} className={`
                relative 
                mb-[30px]`}>
                <Form.Item
                    label={<LabelFormItem label={'Организация'}/>}
                    name={'nameOrg'}
                    initialValue={props.nameOrg}
                    rules={[{
                        required: true
                    }]}>
                    <Input
                        className={`
                                text-base`}
                        placeholder={'Автоматический подбор'}
                        disabled
                    />
                </Form.Item>
                <span className={`
                    absolute 
                    bottom-[-5px] 
                    left-[7px]
                    text-[#3073D7]
                    cursor-pointer
                    `}>
                    Нет подходящей организации?
                </span>

            </Col>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Юридический адрес'}/>}
                    name={'legalAddress'}
                    rules={[{
                        required: true
                    }]}
                    initialValue={props.legalAddress}>
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Автоматический подбор'}
                        disabled
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Фактический адрес'}/>}
                    name={'actualAddress'}
                    rules={[{
                        required: true
                    }]}
                >
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Дата начала и окончания'}/>}
                    name={'datePicker'}
                    rules={[{
                        type: 'array',
                        required: true,
                    }]}
                    initialValue={props.date}>
                    <DatePicker.RangePicker
                        placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                        className={`text-2xl w-full`}
                        format={'DD.MM.YYYY'}
                        onChange={(dates) => {
                            changeSumDay(dates)
                        }}
                        separator={'—'}
                    />
                </Form.Item>
                <SumDay>
                    {sumDay} дней
                </SumDay>
            </Col>
        </Row>

    );
};
