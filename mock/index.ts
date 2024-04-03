// 执行模块所有抛出方法
const modules: Record<string, any> = import.meta.glob('./modules/**.ts', {
  eager: true
})

export default () => {
  for (let i in modules) {
    for (let j in modules[i]) {
      modules[i][j]();
    }
  }
}
