let excercises = []

export function save (excercise) {
  excercises.push({
    ...excercise,
    key: excercises.length
  })
}

export function get () {
  return excercises
}
