import {FC} from "react";
import {Button, Input, Layout} from "antd";
import Loader from "../Loader/Loader.tsx";
import {getSidebarInputValue} from "../../utils/getSidebarInputValue.ts";
import {Settings} from "../../typespaces/interfaces/settings.interface.ts";
import styles from "./styles.module.scss";

const {Sider} = Layout;

interface SidebarProps {
    reload: () => void
    settings: Settings | null
    isLoading: boolean
}

const Sidebar: FC<SidebarProps> = ({reload, settings, isLoading}) => {
    return (
        <Sider width="20%" className={styles.sidebar}>
            <Button block onClick={reload} className={styles.reloadButton}>Обновить</Button>
            <div className={styles.container}>
                {isLoading ?
                    <Loader/>
                    :
                    <>
                        <div className={styles.inputRow}>
                            <span>Шаблон (Макет)</span>
                            <Input readOnly value={getSidebarInputValue(settings?.layout.current)}/>
                        </div>
                        <div className={styles.inputRow}>
                            <span>Карточка</span>
                            <Input readOnly value={getSidebarInputValue(settings?.template)}/>
                        </div>
                        <div className={styles.inputRow}>
                            <span>Навигация</span>
                            <Input readOnly value={getSidebarInputValue(settings?.navigation)}/>
                        </div>
                        <div className={styles.inputRow}>
                            <span>Колонок</span>
                            <Input readOnly value={settings?.layout.params[settings?.layout.current].columns}/>
                        </div>
                        <div className={styles.inputRow}>
                            <span>Рядов</span>
                            <Input readOnly value={settings?.layout.params[settings?.layout.current].rows}/>
                        </div>
                    </>}
            </div>
        </Sider>
    )
}

export default Sidebar;
