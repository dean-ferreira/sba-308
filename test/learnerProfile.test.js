const {
    populateLearnerProfiles,
    createLearnerProfile,
    getAssignments,
    createNewSubmission,
    addSubmission,
} = require('../src/learnerProfile');

describe('populateLearnerProfiles', () => {
    test('Returns an object containing learnerProfiles - accessible by their id', () => {
        const receivedSubmissions = [
            {
                learner_id: 125,
                assignment_id: 1,
                submission: {
                    submitted_at: '2023-01-25',
                    score: 47,
                },
            },
            {
                learner_id: 125,
                assignment_id: 2,
                submission: {
                    submitted_at: '2023-02-12',
                    score: 150,
                },
            },
            {
                learner_id: 125,
                assignment_id: 3,
                submission: {
                    submitted_at: '2023-01-25',
                    score: 400,
                },
            },
            {
                learner_id: 132,
                assignment_id: 1,
                submission: {
                    submitted_at: '2023-01-24',
                    score: 39,
                },
            },
            {
                learner_id: 132,
                assignment_id: 2,
                submission: {
                    submitted_at: '2023-03-07',
                    score: 140,
                },
            },
        ];

        const assignmentGroup = {
            id: 12345,
            name: 'Fundamentals of JavaScript',
            course_id: 451,
            group_weight: 25,
            assignments: [
                {
                    id: 1,
                    name: 'Declare a Variable',
                    due_at: '2023-01-25',
                    points_possible: 50,
                },
                {
                    id: 2,
                    name: 'Write a Function',
                    due_at: '2023-02-27',
                    points_possible: 150,
                },
                {
                    id: 3,
                    name: 'Code the World',
                    due_at: '3156-11-15',
                    points_possible: 500,
                },
            ],
        };
        expect(
            populateLearnerProfiles(receivedSubmissions, assignmentGroup)
        ).toEqual({
            125: {
                profile_id: 125,
                avg_score: 0,
                assignments: {
                    1: {
                        id: 1,
                        name: 'Declare a Variable',
                        due_at: '2023-01-25',
                        points_possible: 50,
                    },
                    2: {
                        id: 2,
                        name: 'Write a Function',
                        due_at: '2023-02-27',
                        points_possible: 150,
                    },
                    3: {
                        id: 3,
                        name: 'Code the World',
                        due_at: '3156-11-15',
                        points_possible: 500,
                    },
                },
                submissions: {
                    1: {
                        submitted_at: '2023-01-25',
                        score: 47,
                    },
                    2: {
                        submitted_at: '2023-02-12',
                        score: 150,
                    },
                    3: {
                        submitted_at: '2023-01-25',
                        score: 400,
                    },
                },
            },
            132: {
                profile_id: 132,
                avg_score: 0,
                assignments: {
                    1: {
                        id: 1,
                        name: 'Declare a Variable',
                        due_at: '2023-01-25',
                        points_possible: 50,
                    },
                    2: {
                        id: 2,
                        name: 'Write a Function',
                        due_at: '2023-02-27',
                        points_possible: 150,
                    },
                    3: {
                        id: 3,
                        name: 'Code the World',
                        due_at: '3156-11-15',
                        points_possible: 500,
                    },
                },
                submissions: {
                    1: {
                        submitted_at: '2023-01-24',
                        score: 39,
                    },
                    2: {
                        submitted_at: '2023-03-07',
                        score: 140,
                    },
                },
            },
        });
    });
});

describe('createLearnerProfile', () => {
    test('Returns a learnerProfile object with the id property and empty assignments and submissions', () => {
        expect(
            createLearnerProfile({
                learner_id: 125,
                assignment_id: 1,
                submission: {
                    submitted_at: '2023-01-25',
                    score: 47,
                },
            })
        ).toEqual({
            profile_id: 125,
            avg_score: 0,
            assignments: {},
            submissions: {},
        });
    });
});

describe('getAssignments', () => {
    test('Returns an object contain assignments', () => {
        const assignmentGroup = {
            id: 12345,
            name: 'Fundamentals of JavaScript',
            course_id: 451,
            group_weight: 25,
            assignments: [
                {
                    id: 1,
                    name: 'Declare a Variable',
                    due_at: '2023-01-25',
                    points_possible: 50,
                },
                {
                    id: 2,
                    name: 'Write a Function',
                    due_at: '2023-02-27',
                    points_possible: 150,
                },
                {
                    id: 3,
                    name: 'Code the World',
                    due_at: '3156-11-15',
                    points_possible: 500,
                },
            ],
        };
        expect(getAssignments(assignmentGroup)).toEqual({
            1: {
                id: 1,
                name: 'Declare a Variable',
                due_at: '2023-01-25',
                points_possible: 50,
            },
            2: {
                id: 2,
                name: 'Write a Function',
                due_at: '2023-02-27',
                points_possible: 150,
            },
            3: {
                id: 3,
                name: 'Code the World',
                due_at: '3156-11-15',
                points_possible: 500,
            },
        });
    });
});

describe('createNewSubmission', () => {
    test('Returns a submission object', () => {
        expect(createNewSubmission('2023-01-25', 47)).toEqual({
            submitted_at: '2023-01-25',
            score: 47,
        });
    });
});

describe('addSubmission', () => {
    test('Add newSubmission to submissions', () => {
        const learnerProfile = {
            profile_id: 125,
            avg_score: 0,
            assignmentsDue: {},
            submissions: {},
        };
        const submissionID = 1;
        const newSubmission = {
            submitted_at: '2023-01-25',
            score: 47,
        };
        addSubmission(learnerProfile, submissionID, newSubmission);
        expect(learnerProfile.submissions).toEqual({
            1: {
                submitted_at: '2023-01-25',
                score: 47,
            },
        });
    });
});
