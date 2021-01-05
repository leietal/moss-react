import { combineReducers } from "redux";

const localList = localStorage.getItem("list");
const initialList = (localList && JSON.parse(localList)) || [];
function list(list = initialList, { type, value }) {
  if (type === "ADD_TODO") {
    value.startTime = Date.now();
    value.id = Date.now() + "" + parseInt(Math.random() * 1000);
    list.splice(list.length, 0, value);
  } else if (type === "REMOVE_TODO") {
    const index = list.findIndex((item) => item.id === value);
    list.splice(index, 1);
  } else if (type === "UPDATE_TODO") {
    const { id, item } = value;
    if (item.status === "done") {
      item.endTime = Date.now();
    }
    const index = list.findIndex((item) => item.id === id);
    list.splice(index, 1, Object.assign(list[index], item));
  }
  localStorage.setItem("list", JSON.stringify(list));
  return [...list];
}

const localSelecteds = localStorage.getItem("selecteds");
const initialSelecteds = (localSelecteds && JSON.parse(localSelecteds)) || {
  undo: 1,
  doing: 1,
  done: 1,
};
function selecteds(selecteds = initialSelecteds, { type, value }) {
  if (type === "ADD_SELECT") {
    selecteds[value] = 1;
  } else if (type === "REMOVE_SELECT") {
    selecteds[value] = 0;
  }
  localStorage.setItem("selecteds", JSON.stringify(selecteds));
  return selecteds;
}

const someApp = combineReducers({
  list,
  selecteds,
});

export default someApp;
