export interface OSCALCatalog {
    catalog: {
        uuid: string;
        metadata: OSCALMetadata;
        groups?: OSCALGroup[];
        controls?: OSCALControl[];
        back_matter?: any;
    };
}

export interface OSCALMetadata {
    title: string;
    last_modified: string;
    version: string;
    oscal_version: string;
    roles?: any[];
    parties?: any[];
    links?: OSCALLink[];
}

export interface OSCALLink {
    href: string;
    rel: string;
}

export interface OSCALGroup {
    id?: string;
    class?: string;
    title: string;
    groups?: OSCALGroup[];
    controls?: OSCALControl[];
}

export interface OSCALControl {
    id: string;
    class?: string;
    title: string;
    params?: OSCALParameter[];
    props?: OSCALProperty[];
    links?: OSCALLink[];
    parts?: OSCALPart[];
    controls?: OSCALControl[];
}

export interface OSCALParameter {
    id: string;
    label?: string;
    values?: string[];
}

export interface OSCALProperty {
    name: string;
    value: string;
    ns?: string;
    class?: string;
}

export interface OSCALPart {
    id?: string;
    name: string;
    ns?: string;
    class?: string;
    title?: string;
    props?: OSCALProperty[];
    prose?: string;
    parts?: OSCALPart[];
}
