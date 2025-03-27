import { Subject, type Observable } from "rxjs";
import type { BulkWriteRow, EventBulk, PreparedQuery, RxDocumentData, RxJsonSchema, RxStorageBulkWriteResponse, RxStorageChangeEvent, RxStorageDefaultCheckpoint, RxStorageInstance, RxStorageInstanceCreationParams, StringKeys } from "../../types";
import type { MMKVSettings, MMKVStorageInternals } from "./mmkv-types";
import type { RxStorageMMKV } from ".";
import { getPrimaryFieldOfPrimaryKey } from "rxdb-old";
import { MMKV } from "react-native-mmkv";
import { flatClone } from "../utils";

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

    public bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string) {
        
    }

    public findDocumentsById(ids: string[], withDeleted: boolean) {
        
    }

    public query(preparedQuery: PreparedQuery<RxDocType>) {

    }

    public count(preparedQuery: PreparedQuery<RxDocType>) {

    }

    public getAttachmentData(documentId: string, attachmentId: string, digest: string) {
        
    }
    
    public getChangedDocumentsSince(limit: number, checkpoint?: RxStorageDefaultCheckpoint | undefined): Promise<{ documents: RxDocumentData<RxDocType>[]; checkpoint: RxStorageDefaultCheckpoint; }> {
        
    }

    public changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocType>, RxStorageDefaultCheckpoint>> {
        
    }

    public cleanup(minimumDeletedTime: number): Promise<boolean> {
        
    }

    close: () => Promise<void>;
    remove(): Promise<void> {
        
    }
}
    
export function createMMKVStorageInstance<RxDocType>(
    storage: RxStorageMMKV,
    params: RxStorageInstanceCreationParams<RxDocType, MMKVSettings>,
    settings: MMKVSettings
): RxStorageInstanceMMKV<RxDocType>{
    settings = flatClone(settings);
    if (!settings.mode) settings.mode = Mode.SingleProcess;
}