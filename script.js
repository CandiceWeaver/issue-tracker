'use strict';

const body = document.querySelector('body');
const issueInputForm = document.getElementById('issueInputForm');
const issueDescribeInput = document.getElementById('issueDescribeInput');
const issueSeverityInput = document.getElementById('issueSeverityInput');
const issueAssignedToInput = document.getElementById('issueAssignedToInput');
const issuesList = document.getElementById('issuesList');

const saveIssue = event => {
  event.preventDefault();

  const issueDescribe = issueDescribeInput.value;
  const issueSeverity = issueSeverityInput.value;
  const issueAssigned = issueAssignedToInput.value;
  const issueId = chance.guid();
  const issueStatus = 'Open';

  const issue = {
    id: issueId,
    description: issueDescribe,
    severity: issueSeverity,
    assignedTo: issueAssigned,
    status: issueStatus,
  };

  if (localStorage.getItem('issues') === null) {
    let issues = [];

    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem('issues'));

    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  issueInputForm.reset();
  fetchIssues();
};

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
};

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let description = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    issuesList.innerHTML += `
    <div class="bg-light bg-gradient mx-3 my-4 py-4 px-3 rounded border">
        <h6>Issue ID: ${id}</h6>
        <p><span class="badge bg-info bg-gradient">${status}</span></p>
        <h3>${description}</h3>
        <p class="d-flex"><ion-icon class="align-self-center me-1" name="time-outline"></ion-icon>${severity}</p>
        <p class="d-flex"><ion-icon class="align-self-center me-1" name="person"></ion-icon></span>${assignedTo}</p>
        <a href="#" class="btn btn-warning">Close</a>
        <a href="#" class="btn btn-danger">Delete</a>
    </div>`;

    document.querySelector('.btn-warning').addEventListener('click', () => {
      setStatusClosed(id);
    });

    document.querySelector('.btn-danger').addEventListener('click', () => {
      deleteIssue(id);
    });
  }
};

window.addEventListener('load', fetchIssues);
issueInputForm.addEventListener('submit', saveIssue);
