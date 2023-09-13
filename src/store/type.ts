export interface IMainState {
  isAsideExpand: boolean,
  tagsData: string[]
}
export interface ILoginState {
  token: string
}
export interface IHomeState {
  initData: {
    type: string;
    value: number;
  }[],
  pieChartData: {
    title: string;
    name: string;
    value: number;
  }[],
  trendChartData: {
    date: string[];
    value: number[];
  },
}