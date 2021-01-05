export function addTodo(value) {
  console.log("addTodo------------------->", value);
  return { type: "ADD_TODO", value };
}

export function removeTodo(value) {
  console.log("removeTodo------------------->", value);
  return { type: "REMOVE_TODO", value };
}

export function updateTodo(value) {
  console.log("updateTodo------------------->", value);
  return { type: "UPDATE_TODO", value };
}

export function select(value) {
  console.log("select------------------->", value);
  return { type: "ADD_SELECT", value };
}

export function unselect(value) {
  console.log("unselect------------------->", value);
  return { type: "REMOVE_SELECT", value };
}
