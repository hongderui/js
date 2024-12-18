import { List, Datagrid, NumberField } from 'react-admin';

export const DiabetesList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <NumberField source="id" />
            <NumberField source="Pregnancies" />
            <NumberField source="Glucose" label="血糖" />
            <NumberField source="BloodPressure" label="血压" />
            <NumberField source="SkinThickness" label="皮肤厚度" />
            <NumberField source="Insulin" label="胰岛素" />
            <NumberField source="BMI" label="体重指数" />
            <NumberField 
                source="DiabetesPedigreeFunction" 
                label="糖尿病谱系函数"
                options={{ maximumFractionDigits: 3 }}
            />
            <NumberField source="Age" label="年龄" />
            <NumberField source="Outcome" label="诊断结果" />
        </Datagrid>
    </List>
);