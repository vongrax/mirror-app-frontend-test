import {makeAutoObservable, runInAction} from 'mobx';
import api from "../api/api.ts";
import {Settings} from "../typespaces/interfaces/settings.interface.ts";


class SettingsStore {
    settings: Settings | null;

    settingsLoading: boolean;

    constructor() {
        this.settings = null

        this.settingsLoading = false

        makeAutoObservable(this);
    }

    fetchSettings = async (): Promise<Settings | undefined> => {
        this.settingsLoading = true;
        try {
            const {data} = await api.get<Settings>('/settings');

            runInAction(() => {
                this.settings = data
            });

            return data;
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.settingsLoading = false;
            })
        }
    };
}

const settingsStore = new SettingsStore();

export default settingsStore;
