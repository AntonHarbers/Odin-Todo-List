const getProjectsFromLocalStorage = () => {
  if (localStorage.getItem('projects')) {
    return JSON.parse(localStorage.getItem('projects'));
  } else {
    return [];
  }
};

const updateProjectsInLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export { updateProjectsInLocalStorage, getProjectsFromLocalStorage };
