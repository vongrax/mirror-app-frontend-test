import { makeAutoObservable, runInAction } from "mobx";
import settingsStore from "./settings.store.ts";
import api from "@/api/api.ts";
import { Post } from "@/typespaces/interfaces/post.interface.ts";
import { Navigation } from "@/typespaces/enums/navigation.enum.ts";

type SettingsStore = typeof settingsStore;

class PostsStore {
    posts: Post[];

    settingsStore: SettingsStore;

    page: number;

    postsLoading: boolean;

    constructor(settingsStore: SettingsStore) {
        this.posts = [];
        this.settingsStore = settingsStore;
        this.page = 1;
        this.postsLoading = false;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    fetchPosts = async (): Promise<Post[] | undefined> => {
        this.postsLoading = true;
        const { settings } = this.settingsStore;
        const rows = settings?.layout.params[settings.layout.current].rows || 0;
        const columns = settings?.layout.params[settings.layout.current].columns || 0;
        const isChangePage = this.page > 1 && settings?.navigation === Navigation.LOAD_MORE;

        try {
            const { data } = await api.get<Post[]>("/posts", {
                params: {
                    ["_expand"]: "user",
                    ["_page"]: this.page,
                    ["_limit"]: rows * columns,
                },
            });

            runInAction(() => {
                if (isChangePage) {
                    this.posts.push(...data);
                    return;
                }

                this.posts = data;
            });

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.postsLoading = false;
            });
        }
    };

    setPage(page: number) {
        this.page = page;
    }
}

const postsStore = new PostsStore(settingsStore);

export default postsStore;
