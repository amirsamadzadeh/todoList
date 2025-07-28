export function applyFiltersAndSort(todos, filterValue, sortValue) {
  let filtered = [...todos];

  // ----- Filter -----
  if (filterValue === "completed") {
    filtered = filtered.filter((todo) => todo.isCompleted);
  } else if (filterValue === "pending") {
    filtered = filtered.filter((todo) => !todo.isCompleted);
  } else if (filterValue?.startsWith("difficulty-")) {
    const level = parseInt(filterValue.split("-")[1]);
    filtered = filtered.filter((todo) => parseInt(todo.difficulty) === level);
  }

  // ----- Sort -----
  if (sortValue === "date") {
    filtered.sort(
      (a, b) => new Date(b.dateModified) - new Date(a.dateModified)
    );
  } else if (sortValue === "Completed") {
    filtered.sort((a, b) => b.isCompleted - a.isCompleted);
  } else if (sortValue === "NotCompleted") {
    filtered.sort((a, b) => a.isCompleted - b.isCompleted);
  } else if (sortValue === "difficultyAsc") {
    filtered.sort((a, b) => a.difficulty - b.difficulty);
  } else if (sortValue === "difficultyDesc") {
    filtered.sort((a, b) => b.difficulty - a.difficulty);
  }

  return filtered;
}
