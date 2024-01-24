const {
    getAssignmentsDue,
    getLearnerSubmissions,
} = require('../src/assignments');

describe('getAssignmentsDue', () => {
    test('Returns an array - assignments that are due', () => {
        expect(
            getAssignmentsDue({
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
            })
        ).toEqual([
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
        ]);
    });
    test('Returns an empty array - no assigments are due', () => {
        expect(
            getAssignmentsDue({
                1: {
                    id: 1,
                    name: 'Declare a Variable',
                    due_at: '3156-11-15',
                    points_possible: 50,
                },
                2: {
                    id: 2,
                    name: 'Write a Function',
                    due_at: '3156-11-15',
                    points_possible: 150,
                },
                3: {
                    id: 3,
                    name: 'Code the World',
                    due_at: '3156-11-15',
                    points_possible: 500,
                },
            })
        ).toEqual([]);
    });
});

describe('getLearnerSubmissions', () => {
    test('Returns ', () => {
        const learnerProfile = {
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
            learner_submissions: {
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
        };
        expect(getLearnerSubmissions(learnerProfile)).toEqual({
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
        });
    });
});
