export interface IQueryPeopleData {
  pageSize: number;
  currentPage: number;
  id: string;
  username: string;
  name: string;
  status: string;
  role: string;
}

export interface IPeopleData {
  username: string;
  name: string;
  status: string;
  role: string;
}
export interface IEditPeopleData {
  id: string;
  username: string;
  name: string;
  status: string;
  role: string;
}