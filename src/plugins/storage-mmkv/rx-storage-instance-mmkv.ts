import { Subject } from "rxjs";
import type { EventBulk, RxDocumentData, RxJsonSchema, RxStorageChangeEvent, RxStorageDefaultCheckpoint, RxStorageInstance, StringKeys } from "../../types";
import type { MMKVSettings, MMKVStorageInternals } from "./mmkv-types";
import type { RxStorageMMKV } from ".";
import { getPrimaryFieldOfPrimaryKey } from "rxdb-old";
import { MMKV } from "react-native-mmkv";

export class RxStorageInstanceMMKV<RxDocType> implements RxStorageInstance<
    RxDocType,
    MMKVStorageInternals<RxDocType>,
    MMKVSettings,
    RxStorageDefaultCheckpoint
    > {
    public readonly primaryPath: StringKeys<RxDocumentData<RxDocType>>
    private change$: Subject<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>> = new Subject();
    public closed?: void;
    public readonly kv: any;

    constructor(
        public readonly storage: RxStorageMMKV,
        public readonly databaseName: string,
        public readonly collectionName: string,
        public readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>,
        public readonly internals: MMKVStorageInternals<RxDocType>,
        public readonly options: Readonly<MMKVSettings>,
        public readonly settings: MMKVSettings,
        public readonly keySpace = ['rxdb', databaseName, collectionName, schema.version].join('|'),
        public readonly kvOptions = {consistency: settings.consistencyLevel}
    ) { 
        this.primaryPath = getPrimaryFieldOfPrimaryKey(this.schema.primaryKey);
        this.kv = new MMKV(settings);
    };

    }