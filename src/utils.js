function validateID(courseInfoID, agCourseID) {}

function isDateBefore(dateString1, dateString2) {}

function calcAvgScore(learnerProfile) {}

function updateAvgScore(learnerProfile, avgScore) {}

function calcTotalPointsDue(assignmentsDue) {}

function calcTotalPointsEarned(assignmentsDue, learnerSubmissions) {}

function getAssignmentsDue(assignments) {
    const assignmentsDue = [];
    for (const assignmentID in assignments) {
        let currentDate = new Date().toISOString().slice(0, 10);
        if (isDateBefore(assignments[assignmentID].due_at, currentDate)) {
            assignmentsDue.push(assignments[assignmentID]);
        }
    }
    return assignmentsDue;
}

function getLearnerSubmissions(learnerProfile) {
    return learnerProfile.learner_submissions;
}

module.exports = {
    validateID,
    isDateBefore,
    calcAvgScore,
    updateAvgScore,
    calcTotalPointsDue,
    calcTotalPointsEarned,
    getAssignmentsDue,
    getLearnerSubmissions,
};
