import {Children, FC, ReactNode} from "react";
import { Row, Col } from "antd";
import styles from "./styles.module.scss";

interface GridData {
    columns: number;
    rows: number;
}

interface Props {
    grid: GridData;
    children?: ReactNode[];
}

const DynamicGrid:FC<Props> = ({ grid, children }) => {
    const { columns, rows } = grid;
    const itemsToRender = columns * rows;

    const displayedChildren = Children.toArray(children).slice(0, itemsToRender);


    return (
        <div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Row className={styles.row} key={rowIndex} gutter={[16, 16]}>
                    {Array.from({ length: columns }).map((_, colIndex) => {
                        const childIndex = rowIndex * columns + colIndex;
                        return displayedChildren ? (
                            <Col key={colIndex} span={24 / columns}>
                                {displayedChildren[childIndex]}
                            </Col>
                        ) : null;
                    })}
                </Row>
            ))}
        </div>
    );
};

export default DynamicGrid;
