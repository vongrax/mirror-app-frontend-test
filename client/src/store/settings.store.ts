import {makeAutoObservable, runInAction} from 'mobx';
import {Settings} from "../typespaces/interfaces/settings.interface.ts";
import api from "../api/api.ts";


class SettingsStore {
    settings: Settings | null;

    constructor() {
        this.settings = null

        makeAutoObservable(this);

    }

    fetchSettings = async (): Promise<Settings | undefined> => {
        try {
            const {data} = await api.get<Settings>('/settings');

            runInAction(() => {
                this.settings = data
            });

            return data;
        } catch (error) {
            console.log(error);
        }
    };
}

const settingsStore = new SettingsStore();

export default settingsStore;
