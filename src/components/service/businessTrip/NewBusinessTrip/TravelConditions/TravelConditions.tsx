import React, {useState} from 'react';
import {Button, Col, Form, Row} from "antd";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {useDispatch} from "react-redux";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {INewDataTravelConditions, NewDataTravelConditions} from "./NewDataTravelConditions";
import {TravelCard} from "../cardsData/TravelCard";
import {WrapperForConditionsTabs} from "../WrapperForConditionsTabs/WrapperForConditionsTabs";
import {ColSpan16RowGutter16} from "../WrapperForConditionsTabs/ColSpan16RowGutter16";
import {ColSpan8} from "../WrapperForConditionsTabs/ColSpan8";
import {validateMessages} from "../../../../../utils/validateMessage";

export const TravelConditions = () => {

    const dispatch = useDispatch()

    const [listTravelCondition, setListTravelCondition] = useState<INewDataTravelConditions[]>([
        {id: 1, typeTransport: '', departurePoint: '', destinationPoint: '', date: [],},
    ])

    function addDataTravelCondition() {
        setListTravelCondition([
            ...listTravelCondition,
            {
                id: listTravelCondition.length + 1,
                typeTransport: '',
                destinationPoint: '',
                departurePoint: '',
                date: [],
            }
        ])
    }

    function sendDataTravelCondition(values: INewDataTravelConditions) {
        console.log(values)
    }

    return (
        <Form layout={'vertical'}
              validateMessages={validateMessages}
              onFinish={values => sendDataTravelCondition(values)}
        >
            <Row gutter={[16, 0]} className={`w-full`}>
                <ColSpan16RowGutter16>
                    {
                        listTravelCondition.map((elem) => (
                            <NewDataTravelConditions
                                id={elem.id}
                                typeTransport={elem.typeTransport}
                                departurePoint={elem.departurePoint}
                                destinationPoint={elem.destinationPoint}
                                date={elem.date}
                            />
                        ))
                    }

                    <Col span={13}>
                        <ButtonAddData addData={addDataTravelCondition} nameData={'данные'}/>
                    </Col>

                    <Col span={12}>
                        <div className={`flex gap-5 mt-5`}>
                            <Button
                                type={'default'}
                                shape={'round'}
                                className={`h-10 w-max border-[#3073D7]`}
                                onClick={() => {
                                    dispatch(setCondition(keysTabsBusinessTrip.placesAndDated))
                                }}>
                                     <span className={`text-lg 
                                     text-[#3073D7]`}>
                                         Назад
                                     </span>
                            </Button>

                            <Button
                                type={'primary'}
                                shape={'round'}
                                className={'h-10 w-max'}
                                htmlType={'submit'}
                                // onClick={() => {
                                //     dispatch(setCondition(keysTabsBusinessTrip.livingConditions))
                                // }}
                            >
                                <span className={'text-lg'}>Далее</span>
                            </Button>
                        </div>
                    </Col>
                </ColSpan16RowGutter16>
                <ColSpan8>
                    <TravelCard/>
                </ColSpan8>
            </Row>
        </Form>
    );
};
