import { FC, useEffect, useState } from "react";
import { Button, Layout, Pagination, Spin } from "antd";
import { observer } from "mobx-react-lite";
import settingsStore from "@/store/settings.store.ts";
import postsStore from "@/store/posts.store.ts";
import CardTemplate from "@/components/CardTemplate/CardTemplate.tsx";
import LayoutRender from "@/components/LayoutRender/LayoutRender.tsx";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";
import Loader from "@/components/Loader/Loader.tsx";
import { Grid, Settings } from "@/typespaces/interfaces/settings.interface.ts";
import { Navigation } from "@/typespaces/enums/navigation.enum.ts";
import styles from "./styles.module.css";

const MAX_POSTS = 100;

const Main: FC = observer(() => {
    const [grid, setGrid] = useState<Grid>({ rows: 1, columns: 1 });
    const { fetchSettings, settings, settingsLoading } = settingsStore;
    const { fetchPosts, posts, setPage, page, postsLoading } = postsStore;

    const setResponseSettings = async (response?: Settings) => {
        if (response) {
            setGrid({
                rows: response.layout.params[response.layout.current].rows,
                columns: response.layout.params[response.layout.current].columns,
            });
            await fetchPosts();
        }
    };

    const reload = async () => {
        const response = await fetchSettings();
        setPage(1);
        await setResponseSettings(response);
    };

    const loadMore = async () => {
        setPage(page + 1);
        await fetchPosts();
        const settingsRows = settings?.layout.params[settings.layout.current].rows || 0;
        setGrid((prevState) => {
            return {
                ...prevState,
                rows: (prevState?.rows || 0) + settingsRows,
            } as Grid;
        });
    };

    const onPageChange = async (page: number) => {
        setPage(page);
        await fetchPosts();
    };

    useEffect(() => {
        fetchSettings().then(async (response) => {
            await setResponseSettings(response);
        });
    }, []);

    return settings ? (
        <Layout className={styles.layout}>
            <Sidebar reload={reload} settings={settings} isLoading={settingsLoading} />
            <Layout className={styles.content}>
                {postsLoading && <Loader className={styles.loader} />}
                <LayoutRender currentLayout={settings.layout.current} params={settings.layout.params}>
                    {posts.map((post) => (
                        <CardTemplate key={post.id} data={post} template={settings?.template} />
                    ))}
                </LayoutRender>
                {settings?.navigation === Navigation.PAGINATION && (
                    <Pagination
                        align="center"
                        current={page}
                        defaultCurrent={page}
                        onChange={onPageChange}
                        total={MAX_POSTS}
                        showSizeChanger={false}
                        pageSize={grid?.rows * grid?.columns}
                    />
                )}
                {settings?.navigation === Navigation.LOAD_MORE && posts.length < MAX_POSTS && (
                    <Button onClick={loadMore}>Загрузить еще</Button>
                )}
            </Layout>
        </Layout>
    ) : (
        <Spin size="large" fullscreen />
    );
});

export default Main;
