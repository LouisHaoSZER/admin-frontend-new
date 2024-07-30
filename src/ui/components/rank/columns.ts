import { h } from 'vue'
import ProblemTitle from './components/ProblemTitle.vue'
import Title from './components/title.vue'
import Rank from './components/rank.vue'
import ProFile from './components/ProFile.vue'
import penalty from './components/penalty.vue'
import ProblemSubmit from './components/ProblemSubmit.vue'

const renderTitle = (title: string, isProBlem = false) => {
  if (isProBlem) {
    return h(ProblemTitle, {
      title,
      onClick: () => { console.log('click') },
    })
  }
  return h(Title, { title })
}
export const CreateProBlemColumns = (problemCount: number) => {
  return Array.from({ length: problemCount }, (_, i) => {
    return ({
      colKey: String.fromCharCode(65 + i),
      title: renderTitle(String.fromCharCode(65 + i), true),
      width: '100',
      cell: (h: any, { row }: any) => {
        return h(ProblemSubmit, { status: row[String.fromCharCode(65 + i)].status, problemId: row[String.fromCharCode(65 + i)].problemId, error: row[String.fromCharCode(65 + i)].error })
      },
    })
  })
}
// Rank 70px Name 150px Solved 80px Penalty 100px problem(A-F) 100px School 150px
export const CreateColumns = (problem: any) => {
  return [
    {
      colKey: 'index',
      title: renderTitle('Rank'),
      width: '70',
      cell: (h: any, { row }: any) => {
        return h(Rank, { rank: row.index, rankSum: 20 })
      },
    },
    {
      colKey: 'name',
      title: renderTitle('Name'),
      width: '180',
      cell: (h: any, { row }: any) => {
        return h(ProFile, { name: row.name.name, studentId: row.name.studentId, className: row.name.className })
      },
    },
    {
      colKey: 'solved',
      title: renderTitle('Solved'),
      width: '80',
      cell: (h: any, { row }: any) => {
        return h('div', { class: 'flex items-center justify-center text-4' }, row.solved)
      },
    },
    {
      colKey: 'penalty',
      title: renderTitle('Penalty'),
      width: '100',
      cell(h: any, { row }: any) {
        return h(penalty, { penalty: row.penalty })
      },
    },
    ...problem,
    {
      colKey: 'school',
      title: renderTitle('School'),
      width: '150',
      cell: (h: any, { row }: any) => {
        return h('div', { class: 'flex items-center justify-center text-4' }, row.school)
      },
    },
  ]
}
