import type { Problem } from '@/infra/types/problem/problem'

export interface IProblemAuthRepo {
  getProblemInfo: (problemId: number) => Promise<Problem.Info.GetProblemInfo.Response>
  submitCode: (problemId: number, code: string, lang: string, contestid: number) => Promise<Problem.Submit.Response>
}
