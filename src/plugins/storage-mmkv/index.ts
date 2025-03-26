import { ensureRxStorageInstanceParamsAreCorrect } from "../../rx-storage-helper";
import type { RxStorage, RxStorageInstanceCreationParams } from "../../types";
import { RXDB_VERSION } from "../utils";
import { RX_STORAGE_NAME_DENOKV } from "./mmkv-helper";
import type { MMKVSettings, MMKVStorageInternals } from "./mmkv-types";
import type { RxStorageInstanceMMKV } from "./rx-storage-instance-mmkv";

export class RxStorageMMKV implements RxStorage<MMKVStorageInternals<any>, MMKVSettings>{
    public name = RX_STORAGE_NAME_DENOKV;
    public readonly rxdbVersion = RXDB_VERSION;

    constructor(
        public settings: MMKVSettings
    ) { }

    public createStorageInstance<RxDocType>(
        params: RxStorageInstanceCreationParams<RxDocType, MMKVSettings>
    ): RxStorageInstanceMMKV<RxDocType> {
        ensureRxStorageInstanceParamsAreCorrect(params);
        return new createMMKVStorageInstance(this, params, this.settings);
    }
}

export function getRxStorageMMKV(
    settings: MMKVSettings = {}
): RxStorageMMKV {
    const storage = new RxStorageMMKV(settings);
    return storage;
}