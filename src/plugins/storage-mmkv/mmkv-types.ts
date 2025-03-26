import type { Mode } from "react-native-mmkv";
import type { RxDocumentData } from "../../types/index.d.ts";

export type MMKVSettings = {
    path?: string;
    batchSize?: number;
    id?: string;
    encryptionKey?: string;
    mode?: Mode;
    readOnly?: boolean;
};

export type MMKVStorageInternals<RxDocType> = {
    indexes: {
        [indexName: string]: MMKVIndexMeta<RxDocType>;
    };
};

export type MMKVIndexMeta<RxDocType> = {
    indexId: string;
    indexName: string;
    index: string[];
    getIndexableString: (doc: RxDocumentData<RxDocType>) => string;
};