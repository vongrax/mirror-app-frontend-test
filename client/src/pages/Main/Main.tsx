import {FC} from "react";
import {Button, Card, Layout} from "antd";
import DynamicGrid from "../../components/DynamicGrid.tsx";
import styles from "./styles.module.scss";


const { Sider } = Layout;

const Main: FC = () => {

    const gridSettings = {
        columns: 3,
        rows: 4,
    };
    return (

        <Layout className={styles.layout}>
            <Sider width="20%" className={styles.sidebar}>
                <Button block>Обновить</Button>
            </Sider>
            <Layout className={styles.content}>
                <DynamicGrid grid={gridSettings}>
                    <Card title="Карточка 1">Контент 1</Card>
                    <Card title="Карточка 2">Контент 2</Card>
                    <Card title="Карточка 3">Контент 3</Card>
                    <Card title="Карточка 4">Контент 4</Card>
                </DynamicGrid>
            </Layout>
        </Layout>
    );
}

export default Main;
