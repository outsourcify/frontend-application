export type DataType =
  | 'text'
  | 'numeric'
  | 'currency'
  | 'date'
  | 'boolean'
  | 'image'
  | 'tag'
  | 'delete'
  | 'rating';

export interface TableColumn {
  field: string;
  header: string;
  filterable?: boolean;
  sortable?: boolean;
  dataType: DataType;
}
