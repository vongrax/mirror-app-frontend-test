import { FC } from "react";
import { Spin } from "antd";
import styles from "./styles.module.css";

interface Props {
    className?: string;
}

const Loader: FC<Props> = ({ className }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <Spin size={"large"} />
        </div>
    );
};

export default Loader;
