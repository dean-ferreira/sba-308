function validateID(courseInfoID, agCourseID) {
    return courseInfoID === agCourseID;
}

function isDateOnTime(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return date1 <= date2;
}

function calcAvgScore(learnerProfile) {
    const assignmentsDue = getAssignmentsDue(learnerProfile.assignments);
    const learnerSubmissions = getLearnerSubmissions(learnerProfile);
    const totalPointsDue = calcTotalPointsDue(assignmentsDue);
    if (totalPointsDue == 0) {
        throw new RangeError(
            'Check assignmentsDue - totalPointsPossible is equal to zero'
        );
    }
    const totalPointsEarned = calcTotalPointsEarned(
        assignmentsDue,
        learnerSubmissions
    );
    const avgScore = totalPointsEarned / totalPointsDue;
    const avgScoreRounded = Math.ceil(avgScore * 100) / 100;
    return avgScoreRounded;
}

function updateAvgScore(learnerProfile, avgScore) {
    learnerProfile.avg_score = avgScore;
}

function calcTotalPointsDue(assignmentsDue) {
    let totalPointsDue = 0;
    for (const assignmentID in assignmentsDue) {
        const assignment = assignmentsDue[assignmentID];
        totalPointsDue += assignment.points_possible;
    }
    return totalPointsDue;
}

function calcTotalPointsEarned(assignmentsDue, learnerSubmissions) {
    let totalPointsEarned = 0;
    for (assignment of assignmentsDue) {
        const learnerSubmission = learnerSubmissions[assignment.id];
        if (!isDateOnTime(learnerSubmission.submitted_at, assignment.due_at)) {
            learnerSubmission.score =
                learnerSubmission.score - assignment.points_possible * 0.1;
        }
        totalPointsEarned += learnerSubmission.score;
    }
    return totalPointsEarned;
}

function getAssignmentsDue(assignments) {
    const assignmentsDue = [];
    for (const assignmentID in assignments) {
        let currentDate = new Date().toISOString().slice(0, 10);
        if (isDateOnTime(assignments[assignmentID].due_at, currentDate)) {
            assignmentsDue.push(assignments[assignmentID]);
        }
    }
    return assignmentsDue;
}

function getLearnerSubmissions(learnerProfile) {
    return learnerProfile.submissions;
}

module.exports = {
    validateID,
    isDateOnTime,
    calcAvgScore,
    updateAvgScore,
    calcTotalPointsDue,
    calcTotalPointsEarned,
    getAssignmentsDue,
    getLearnerSubmissions,
};
