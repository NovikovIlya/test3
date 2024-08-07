export type ScheduleType = {
    id: string;
    name: string;
    academicYear: string;
    subdivisionId: number;
    period: string;
    dateFilling: string;
    key?: any
}

export type Filter = {
    type: string;
    spec: string;
    course: string;
    educationLevel: string;
    educationType: string;
    dateFilling: string;
    practiceKind: string;
    specialtyName: string | null;
    subDivision: string;
  }

  export interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
  }

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
  }