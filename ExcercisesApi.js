let excercises = []

export function save (excercise) {
  console.log(excercise)
  excercises.push(excercise)
}

export function get () {
  return excercises
}
