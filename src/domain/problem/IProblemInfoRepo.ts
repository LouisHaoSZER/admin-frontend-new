import type { Problem } from '@/infra/types/problem/problem'

export interface IProblemInfoRepo {
  getProblemList: (page: number, pageSize: number, conditions?: Problem.Info.GetProblemList.Serach) => Promise<Problem.Info.GetProblemList.Response>
  getSubmitStatus: (page: number, pageSize: number, conditions?: Problem.Status.Request) => Promise<Problem.Status.Response>
}
