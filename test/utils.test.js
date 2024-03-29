const {
    validateID,
    isDateOnTime,
    calcAvgScore,
    updateAvgScore,
    calcTotalPointsDue,
    calcTotalPointsEarned,
    getAssignmentsDue,
    getLearnerSubmissions,
} = require('../src/utils');

describe('validateID', () => {
    test("Returns true if ID's are equal", () => {
        expect(validateID(451, 451)).toEqual(true);
    });
    test("Returns false if ID's are not equal", () => {
        expect(validateID(450, 4)).toEqual(false);
    });
    test("Returns false if ID's are not stricly equal", () => {
        expect(validateID(450, '450')).toEqual(false);
    });
});

describe('isDateOnTime', () => {
    test('Returns true if date1 is before date2', () => {
        expect(isDateOnTime('2023-01-25', '2023-02-27')).toEqual(true);
    });
    test('Returns true if date1 is equal to date2', () => {
        expect(isDateOnTime('2023-01-25', '2023-01-25')).toEqual(true);
    });
    test('Returns false if date1 is after date2', () => {
        expect(isDateOnTime('2023-02-27', '2023-01-25')).toEqual(false);
    });
});

describe('calcAvgScore', () => {
    test('Returns average for assignments due', () => {
        const learnerProfile1 = {
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
        };
        expect(calcAvgScore(learnerProfile1)).toEqual(0.985);
    });
    test('Throws RangeError when totalPointsPossible is 0 - no assignments are due', () => {
        const learnerProfile2 = {
            profile_id: 125,
            avg_score: 0,
            assignments: {
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
        expect.assertions(2);
        try {
            calcAvgScore(learnerProfile2);
        } catch (error) {
            expect(error).toBeInstanceOf(RangeError);
            expect(error).toHaveProperty(
                'message',
                'Check assignmentsDue - totalPointsPossible is equal to zero'
            );
        }
    });
});

describe('updateAvgScore', () => {
    test('Updates the avg_score property of a learnerProfile object', () => {
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
        updateAvgScore(learnerProfile, 0.985);
        expect(learnerProfile.avg_score).toEqual(0.985);
    });
});

describe('calcTotalPointsDue', () => {
    test('Returns the sum of points due', () => {
        expect(
            calcTotalPointsDue([
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
            ])
        ).toEqual(200);
    });
    test('Returns 0 - assignments are not due', () => {
        expect(calcTotalPointsDue([])).toEqual(0);
    });
});

describe('calcTotalPointsEarned', () => {
    test('Returns the students score for all assignments due', () => {
        expect(
            calcTotalPointsEarned(
                [
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
                ],
                {
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
                }
            )
        ).toEqual(197);
    });
    test('Returns the students score with penalty', () => {
        expect(
            calcTotalPointsEarned(
                [
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
                ],
                {
                    1: {
                        submitted_at: '2024-01-25',
                        score: 47,
                    },
                    2: {
                        submitted_at: '2024-02-12',
                        score: 150,
                    },
                    3: {
                        submitted_at: '2023-01-25',
                        score: 400,
                    },
                }
            )
        ).toEqual(177);
    });
});

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
    test('Returns an object of submissions', () => {
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
