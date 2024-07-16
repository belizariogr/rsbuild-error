import Dataset from "../Dataset/Dataset";

export interface Search {
    dataset: Dataset;
    module: string;
    group?: string;
    hasFilters?: boolean;
    doSearch?: (text: string, dataset: Dataset) => void;
    doFilter?: (close: boolean, dataset: Dataset) => void;
    doClearFilters?: (dataset: Dataset) => void;
    doOpenFilterBar?: (dataset: Dataset) => void;
    doOpenArrangeBar?: (dataset: Dataset) => void;
    initialText?: string;
    doSetSearchText?: (text: string, dataset: Dataset) => void;
}

export type SearchContextType = {
    search: Search;
    setSearch: (search: Search) => void;
}

type SearchProviderProps = {}