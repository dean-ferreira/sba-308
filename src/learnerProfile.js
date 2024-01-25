function populateLearnerProfiles(receivedSubmissions, assignmentGroup) {
    const learnerProfiles = {};
    for (const entry of receivedSubmissions) {
        if (!learnerProfiles.hasOwnProperty(entry.learner_id)) {
            const newProfile = createLearnerProfile(entry);
            newProfile.assignments = getAssignments(assignmentGroup);
            learnerProfiles[entry.learner_id] = newProfile;
        }
        const newSubmission = createNewSubmission(
            entry.submission.submitted_at,
            entry.submission.score
        );
        addSubmission(
            learnerProfiles[entry.learner_id],
            entry.assignment_id,
            newSubmission
        );
    }
    return learnerProfiles;
}

function createLearnerProfile(learnerSubmission) {
    return {
        profile_id: learnerSubmission.learner_id,
        avg_score: 0,
        assignments: {},
        submissions: {},
    };
}

function getAssignments(assignmentGroup) {
    const assignments = {};
    for (const assignment of assignmentGroup.assignments) {
        assignments[assignment.id] = assignment;
    }
    return assignments;
}

function createNewSubmission(submissionDate, grade) {
    return {
        submitted_at: submissionDate,
        score: grade,
    };
}

function addSubmission(learnerProfile, submissionID, newSubmission) {
    learnerProfile.submissions[submissionID] = newSubmission;
}

module.exports = {
    populateLearnerProfiles,
    createLearnerProfile,
    getAssignments,
    createNewSubmission,
    addSubmission,
};
