const { populateLearnerProfiles } = require('./src/learnerProfile');
const {
    updateAvgScore,
    calcAvgScore,
    validateID,
    getAssignmentsDue,
} = require('./src/utils');

// The provided course information.
const CourseInfo = {
    id: 451,
    name: 'Introduction to JavaScript',
};

// The provided assignment group.
const AssignmentGroup = {
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

// The provided learner submission data.
const LearnerSubmissions = [
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

function populateLearnerData(learnerProfile) {
    const learnerData = {
        id: learnerProfile.profile_id,
        avg: learnerProfile.avg_score,
    };
    const assignmentsDue = getAssignmentsDue(learnerProfile.assignments);
    for (assignment of assignmentsDue) {
        const grade =
            learnerProfile.submissions[assignment.id].score /
            assignment.points_possible;
        learnerData[assignment.id] = Math.round(grade * 1000) / 1000;
    }
    return learnerData;
}

function getLearnerData(course, ag, submissions) {
    const result = [];
    try {
        if (!validateID(course.id, ag.course_id)) {
            throw new Error('Invalid ID - Mismatch');
        }
        const learnerProfiles = populateLearnerProfiles(submissions, ag);
        for (profile_id in learnerProfiles) {
            updateAvgScore(
                learnerProfiles[profile_id],
                calcAvgScore(learnerProfiles[profile_id])
            );
            result.push(populateLearnerData(learnerProfiles[profile_id]));
        }
    } catch (error) {
        console.error(error.message);
    } finally {
        return result;
    }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
