import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { Grid } from "@/typespaces/interfaces/settings.interface.ts";

interface Props {
    grid: Grid;
    children?: ReactNode;
}

const DynamicGrid: FC<Props> = ({ grid, children }) => {
    const { columns, rows } = grid;

    const containerStyle = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, auto)`,
    };

    return (
        <div className={styles.container} style={containerStyle}>
            {children}
        </div>
    );
};

export default DynamicGrid;
