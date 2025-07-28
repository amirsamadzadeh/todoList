export function validateForm(formObject) {
  let errors = {};
  if (!formObject.todoName || formObject.todoName.length === 0) {
    errors.todoName = "Name cannot be empty.";
  } else if (formObject.todoName.length <= 5) {
    errors.todoName =
      "The name is too short. Please provide a more descriptive title.";
  }

  if (!formObject.category) {
    errors.category = "Please choose at least one category.";
  }

  if (!formObject.difficulty || formObject.difficulty == 0) {
    errors.difficulty = "Please select difficulty.";
  }

  if (
    !formObject.todoDescription ||
    formObject.todoDescription.trim().length === 0
  ) {
    errors.todoDescription = "Description cannot be empty.";
  } else if (formObject.todoDescription.length < 10) {
    errors.todoDescription = "Description must be at least 10 characters.";
  } else if (formObject.todoDescription.length > 50) {
    errors.todoDescription = "Description must be no more than 50 characters.";
  }

  return errors;
}
