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

interface DocumentNode {
    key: string;
    attributes: {
        summary: string;
        symbol: string;
        altTitle: string;
        location: string;
        id: string;
        title: string;
        publicationDate: string | null;
        url: string;
        nodeType: "Document";
    };
}

interface TopicNode {
    key: string;
    attributes: {
        cluster: string;
        labelEn: string;
        labelZh: string;
        labelEs: string;
        labelFr: string;
        labelRu: string;
        labelAr: string;
        id: string;
        summary: string | null;
        nodeType: "Topic";
    };
}
interface MetaTopicNode {
    key: string;
    attributes: {
        cluster: string;
        labelEn: string;
        labelZh: string;
        labelEs: string;
        labelFr: string;
        labelRu: string;
        labelAr: string;
        summary: string | null;

        id: string;
        nodeType: "MetaTopic";
    };
}

interface CountryNode {
    key: string;
    attributes: {
        id: string;
        labelEn: string;
        labelZh: string;
        labelEs: string;
        labelFr: string;
        labelRu: string;
        labelAr: string;
        labelEnFormal: string;
        labelZhFormal: string;
        labelEsFormal: string;
        labelFrFormal: string;
        labelRuFormal: string;
        labelArFormal: string;
        summary: string | null;

        nodeType: "Country";
    };
}

interface UNBodyNode {
    key: string;
    attributes: {
        id: string;
        accronym: string;
        nodeType: "UNBody";
        summary: string | null;

    };
}

type GraphNode = DocumentNode | TopicNode | CountryNode | UNBodyNode | MetaTopicNode;

interface Edge {
    source: string;
    target: string;
    type: string;
}

interface Graph {
    nodes: GraphNode[];
    edges: Edge[];
}

interface ApiResponse {
    total: number;
    search_id: string;
    records: ApiRecord[];
    graph: Graph;
}

export type { ApiResponse, ApiRecord, GraphNode, Graph as GraphFromAPI, Edge };