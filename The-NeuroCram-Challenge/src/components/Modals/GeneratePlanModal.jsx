import { useState } from 'react';
import ModalWrapper from '../UI/ModalWrapper';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import Accordion from '../UI/Accordion';
import SectionHeader from '../UI/SectionHeader';
import { useForm } from '../../hooks/useForm';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getToday } from '../../utils/dateUtils';

// Simple UUID generator
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const GeneratePlanModal = ({ isOpen, onClose, onGenerate }) => {
  const [exams, setExams] = useState([
    { id: generateId(), subject: '', examDate: '', difficulty: 3, confidence: 3, questionTypes: [], priorityGoal: 'Pass' }
  ]);

  const { values, errors, handleChange, handleBlur, validate, setValues } = useForm(
    {
      studyHoursPerDay: 4,
      preferredStudyWindow: 'Afternoon',
      stressLevel: 'Medium',
      averageSleepHours: 7,
      pastScore: '',
      unavailableDays: [],
      majorCommitments: [],
      mandatoryTopics: [],
      skipTopics: []
    },
    {
      studyHoursPerDay: { required: true },
      preferredStudyWindow: { required: true }
    }
  );

  const addExam = () => {
    setExams([...exams, {
      id: generateId(),
      subject: '',
      examDate: '',
      difficulty: 3,
      confidence: 3,
      questionTypes: [],
      priorityGoal: 'Pass'
    }]);
  };

  const removeExam = (id) => {
    if (exams.length > 1) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const updateExam = (id, field, value) => {
    setExams(exams.map(exam =>
      exam.id === id ? { ...exam, [field]: value } : exam
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate exams
    const examErrors = exams.some(exam => 
      !exam.subject || !exam.examDate || !exam.difficulty || !exam.confidence
    );

    if (examErrors) {
      alert('Please fill in all required exam fields (Subject, Exam Date, Difficulty, Confidence)');
      return;
    }

    // Validate form
    if (!validate()) {
      return;
    }

    // Prepare data according to schema
    const planData = {
      exams: exams.map(exam => ({
        id: exam.id,
        subject: exam.subject,
        examDate: exam.examDate,
        difficulty: parseInt(exam.difficulty),
        confidence: parseInt(exam.confidence),
        questionTypes: exam.questionTypes || [],
        priorityGoal: exam.priorityGoal || 'Pass'
      })),
      studentProfile: {
        studyHoursPerDay: parseFloat(values.studyHoursPerDay),
        preferredStudyWindow: values.preferredStudyWindow,
        stressLevel: values.stressLevel,
        averageSleepHours: parseFloat(values.averageSleepHours) || 7,
        pastScore: values.pastScore ? parseFloat(values.pastScore) : undefined
      },
      constraints: {
        unavailableDays: values.unavailableDays || [],
        majorCommitments: values.majorCommitments || [],
        mandatoryTopics: values.mandatoryTopics || [],
        skipTopics: values.skipTopics || []
      }
    };

    if (onGenerate) {
      onGenerate(planData);
    }
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Your Study Plan"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EXAMS Section */}
        <Accordion title="EXAMS" defaultOpen>
          <div className="space-y-4">
            {exams.map((exam, index) => (
              <div key={exam.id} className="p-4 bg-graphite/50 rounded-lg border border-soft-gray/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-neon-teal font-semibold">Exam {index + 1}</h4>
                  {exams.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExam(exam.id)}
                      className="text-infrared hover:text-red-400 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name={`subject-${exam.id}`}
                    label="Subject"
                    value={exam.subject}
                    onChange={(name, value) => updateExam(exam.id, 'subject', value)}
                    required
                    placeholder="e.g., Mathematics"
                  />

                  <Input
                    type="date"
                    name={`examDate-${exam.id}`}
                    label="Exam Date"
                    value={exam.examDate}
                    onChange={(name, value) => updateExam(exam.id, 'examDate', value)}
                    required
                    min={getToday()}
                  />

                  <Select
                    name={`difficulty-${exam.id}`}
                    label="Difficulty (1-5)"
                    value={exam.difficulty}
                    onChange={(name, value) => updateExam(exam.id, 'difficulty', parseInt(value))}
                    options={[1, 2, 3, 4, 5].map(n => ({ value: n, label: n.toString() }))}
                    required
                  />

                  <Select
                    name={`confidence-${exam.id}`}
                    label="Confidence (1-5)"
                    value={exam.confidence}
                    onChange={(name, value) => updateExam(exam.id, 'confidence', parseInt(value))}
                    options={[1, 2, 3, 4, 5].map(n => ({ value: n, label: n.toString() }))}
                    required
                  />

                  <Select
                    name={`priorityGoal-${exam.id}`}
                    label="Priority Goal"
                    value={exam.priorityGoal}
                    onChange={(name, value) => updateExam(exam.id, 'priorityGoal', value)}
                    options={[
                      { value: 'Pass', label: 'Pass' },
                      { value: 'High grade', label: 'High grade' },
                      { value: 'Improve', label: 'Improve' }
                    ]}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addExam}
              variant="secondary"
              className="w-full"
            >
              <PlusIcon className="w-5 h-5 inline mr-2" />
              Add Another Exam
            </Button>
          </div>
        </Accordion>

        {/* STUDENT PROFILE Section */}
        <Accordion title="STUDENT PROFILE" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              name="studyHoursPerDay"
              label="Study Hours Per Day"
              value={values.studyHoursPerDay}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.studyHoursPerDay}
              required
              min="1"
              max="12"
            />

            <Select
              name="preferredStudyWindow"
              label="Preferred Study Window"
              value={values.preferredStudyWindow}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.preferredStudyWindow}
              required
              options={[
                { value: 'Morning', label: 'Morning' },
                { value: 'Afternoon', label: 'Afternoon' },
                { value: 'Night', label: 'Night' }
              ]}
            />

            <Select
              name="stressLevel"
              label="Stress Level"
              value={values.stressLevel}
              onChange={handleChange}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' }
              ]}
            />

            <Input
              type="number"
              name="averageSleepHours"
              label="Average Sleep Hours"
              value={values.averageSleepHours}
              onChange={handleChange}
              min="0"
              max="12"
              step="0.5"
            />

            <Input
              type="number"
              name="pastScore"
              label="Past Score (Optional)"
              value={values.pastScore}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Previous exam score"
            />
          </div>
        </Accordion>

        {/* CONSTRAINTS Section */}
        <Accordion title="CONSTRAINTS">
          <div className="space-y-4">
            <Input
              type="text"
              name="mandatoryTopics"
              label="Mandatory Topics (comma-separated)"
              value={Array.isArray(values.mandatoryTopics) ? values.mandatoryTopics.join(', ') : values.mandatoryTopics}
              onChange={(name, value) => {
                const topics = value.split(',').map(t => t.trim()).filter(t => t);
                setValues({ mandatoryTopics: topics });
              }}
              placeholder="e.g., Calculus, Organic Chemistry"
            />

            <Input
              type="text"
              name="majorCommitments"
              label="Major Commitments (comma-separated)"
              value={Array.isArray(values.majorCommitments) ? values.majorCommitments.join(', ') : values.majorCommitments}
              onChange={(name, value) => {
                const commitments = value.split(',').map(c => c.trim()).filter(c => c);
                setValues({ majorCommitments: commitments });
              }}
              placeholder="e.g., Work shift, Family event"
            />
          </div>
        </Accordion>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Generate Plan
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default GeneratePlanModal;

