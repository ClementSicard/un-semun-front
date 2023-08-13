interface RecordDownload {
    العربية: string;
    English: string;
    Español: string;
    Français: string;
    Русский: string;
    中文: string;
}

interface RecordSubject {
    unbist: string[];
    unbisn: string[];
    misc: string[];
}

interface RecordCollection {
    resource_type: string[];
    un_bodies: string[];
}

interface ApiRecord {
    id: string;
    title: string;
    location: string;
    symbol: string;
    publication_date: string;
    authors: string[];
    description: string;
    downloads: RecordDownload;
    subjects: RecordSubject;
    agenda: string;
    collections: RecordCollection;
}

interface ApiResponse {
    total: number;
    search_id: string;
    records: ApiRecord[];
}

export default ApiResponse;