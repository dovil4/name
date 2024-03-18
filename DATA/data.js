
import {defineStore} from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [

//        {taskName: 'aaa',
//        taskInformation: "aaa",
//        difficulty: "medium",
//        taskType: "Hobby",
//        taskState: "active",
//        Day: "2024-03-15",
//        IsDone: "False",
//        id:'1'
//      },



    ],
    lastId: 0,
    taskTypes: ['Homework', 'Hobby', 'Chore'],
    difficultyOptions: ['easy', 'medium', 'hard'],

  }),
  actions: {
    addTask(task) {
      this.lastId++;
      const newTaskWithId = { ...task, id: this.lastId };
      this.tasks.push(newTaskWithId);//dont allow to submitt empty tasks
    },
    addTaskType(newType) {
      if (!this.taskTypes.includes(newType)) {
        this.taskTypes.push(newType);
      }
    },
    toggleTaskDoneStatus(taskId, isDone) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.IsDone = isDone ? 'True' : 'False';
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    generateTaskNameSet() {
      const store = useTasksStore();
      const taskNames = store.tasks.map(task => task.taskName);
      const taskNameSet = new Set(taskNames);
      return taskNameSet;
    }

  }
});


