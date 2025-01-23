import {FC, useEffect, useState} from "react";
import {Button, Card, Layout} from "antd";
import DynamicGrid from "../../components/DynamicGrid/DynamicGrid.tsx";
import styles from "./styles.module.scss";
import {observer} from "mobx-react-lite";
import settingsStore from "../../store/settings.store.ts";
import {Grid} from "../../typespaces/interfaces/settings.interface.ts";


const {Sider} = Layout;

const Main: FC = () => {

    const [settings, setSettings] = useState<Grid | null>(null)

    const {fetchSettings} = settingsStore;

    useEffect(() => {
        fetchSettings().then((response) => {
            if (response) {
                setSettings({
                    rows: response.layout.params[response.layout.current].rows,
                    columns: response.layout.params[response.layout.current].columns
                })
            }
        })
    }, [])

    const reload = () => {
        window.location.reload()
    }

    return (

        settings ? <Layout className={styles.layout}>
            <Sider width="20%" className={styles.sidebar}>
                <Button block onClick={reload}>Обновить</Button>
            </Sider>
            <Layout className={styles.content}>
                <DynamicGrid grid={{
                    rows: settings.rows,
                    columns: settings.columns
                }}>
                    <Card title="Карточка 1">Контент 1</Card>
                    <Card title="Карточка 2">Контент 2</Card>
                    <Card title="Карточка 3">Контент 3</Card>
                    <Card title="Карточка 4">Контент 4</Card>
                </DynamicGrid>
            </Layout>
        </Layout> : null
    );
}

export default observer(Main);
