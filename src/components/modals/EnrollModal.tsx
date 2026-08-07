import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Phone,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Clock,
  Building,
  Target,
  ShieldCheck,
  Check,
  Ticket,
  Database
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { createRegistration } from '../../services/supabaseService';

interface EnrollModalProps {
  isOpen: boolean;
  initialCourseId?: string;
  onClose: () => void;
  onComplete: (regDetails: { regId: string; studentName: string; courseName: string }) => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, initialCourseId, onClose, onComplete }) => {
  const { courses: dbCourses, branches: dbBranches } = useAppData();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [customCourseName, setCustomCourseName] = useState<string>('');
  
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [customBranchName, setCustomBranchName] = useState<string>('');

  const [selectedShift, setSelectedShift] = useState<string>('Morning Shift (09:00 - 10:30)');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [targetGoal, setTargetGoal] = useState<string>('Target IELTS Band 7.5+');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedRegId, setConfirmedRegId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const initial = initialCourseId || dbCourses[0]?.id || '';
      setSelectedCourseId(initial);
      setSelectedBranchId(dbBranches[0]?.id || '');
      
      const foundCourse = dbCourses.find((c) => c.id === initial);
      if (foundCourse) setCustomCourseName(foundCourse.name);

      const foundBranch = dbBranches.find((b) => b.id === dbBranches[0]?.id);
      if (foundBranch) setCustomBranchName(foundBranch.name);

      setStep(1);
    }
  }, [isOpen, initialCourseId, dbCourses, dbBranches]);

  if (!isOpen) return null;

  const selectedCourseObj = dbCourses.find((c) => c.id === selectedCourseId);
  const selectedBranchObj = dbBranches.find((b) => b.id === selectedBranchId);

  const finalCourseName = selectedCourseObj?.name || customCourseName || 'General Academic Prep';
  const finalBranchName = selectedBranchObj?.name || customBranchName || 'Main Campus';

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      await createRegistration({
        full_name: fullName,
        phone,
        course_id: selectedCourseObj?.id || undefined,
        course_name: finalCourseName,
        branch_id: selectedBranchObj?.id || undefined,
        branch_name: finalBranchName,
        shift: selectedShift,
        target_goal: targetGoal,
      });

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedRegId = `ISTUDY-2026-${randomNum}`;
      setConfirmedRegId(generatedRegId);

      onComplete({
        regId: generatedRegId,
        studentName: fullName,
        courseName: finalCourseName,
      });

      setStep(4); // Move to Success confirmation view
    } catch (err) {
      console.error('Enroll submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative text-slate-900 my-auto"
      >
        {/* Header Bar */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Course Registration Portal</h3>
              <p className="text-xs text-slate-500 font-medium">
                {step === 4 ? 'Registration Completed' : `Step ${step} of 3 • Reserve Your Seat`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-200/70 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Steps Timeline Indicator */}
        {step !== 4 && (
          <div className="bg-slate-100/70 px-6 py-3 border-b border-slate-200/80 flex items-center justify-between">
            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                1
              </div>
              <span>Select Course</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-300 shrink-0" />

            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                2
              </div>
              <span>Campus & Shift</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-300 shrink-0" />

            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                3
              </div>
              <span>Student Info</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitRegistration} className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Select Course */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">1. Select Educational Program</h4>
                <p className="text-xs text-slate-500">Choose from courses in your live Supabase database.</p>
              </div>

              {dbCourses.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {dbCourses.map((c) => {
                    const isSelected = c.id === selectedCourseId;
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedCourseId(c.id);
                          setCustomCourseName(c.name);
                        }}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 text-slate-900 shadow-md shadow-blue-100'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                              isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-bold text-sm text-slate-900">{c.name}</span>
                          </div>

                          <span className="text-xs font-extrabold text-blue-700 bg-blue-100/60 px-3 py-1 rounded-full">
                            {c.price}
                          </span>
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pl-7">
                          {c.categoryLabel && <span className="text-slate-700 font-bold">{c.categoryLabel}</span>}
                          {c.duration && <span>• {c.duration}</span>}
                          {c.lessonsPerWeek && <span>• {c.lessonsPerWeek}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-800">Desired Course Name *</label>
                  <input
                    type="text"
                    required
                    value={customCourseName}
                    onChange={(e) => setCustomCourseName(e.target.value)}
                    placeholder="e.g. IELTS Rocket Band 7.5+ or Full-Stack Engineering"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                  <p className="text-[11px] text-slate-500">
                    No courses found in database yet. Type your desired course name to register.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={!selectedCourseId && !customCourseName.trim()}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Continue to Campus & Shift</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Campus & Shift Selection */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">2. Select Campus Location & Class Shift</h4>
                <p className="text-xs text-slate-500">Pick your preferred study branch and schedule.</p>
              </div>

              {/* Campus Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Campus Location *</span>
                </label>

                {dbBranches.length > 0 ? (
                  <div className="space-y-2">
                    {dbBranches.map((b) => {
                      const isSelected = b.id === selectedBranchId;
                      return (
                        <div
                          key={b.id}
                          onClick={() => {
                            setSelectedBranchId(b.id);
                            setCustomBranchName(b.name);
                          }}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 text-slate-900 shadow-md'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">{b.name}</span>
                            {b.metro && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                {b.metro}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">{b.address}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    required
                    value={customBranchName}
                    onChange={(e) => setCustomBranchName(e.target.value)}
                    placeholder="e.g. Central Campus (Amir Temur)"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                )}
              </div>

              {/* Shift Selector */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Preferred Class Shift *</span>
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                >
                  <option value="Morning Shift (09:00 - 10:30)">Morning Shift (09:00 - 10:30)</option>
                  <option value="Late Morning Shift (10:30 - 12:00)">Late Morning Shift (10:30 - 12:00)</option>
                  <option value="Afternoon Shift (14:30 - 16:00)">Afternoon Shift (14:30 - 16:00)</option>
                  <option value="Evening Shift (18:30 - 20:00)">Evening Shift (18:30 - 20:00)</option>
                  <option value="Weekend Intensive (Sat-Sun 10:00 - 13:00)">Weekend Intensive (Sat-Sun 10:00 - 13:00)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all cursor-pointer"
                >
                  <span>Enter Student Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Student Details */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900">3. Student Contact Details</h4>
                <p className="text-xs text-slate-500">Provide candidate information to confirm seat reservation.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shakhzod Umarov"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 (90) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Target Score / Goal</label>
                  <input
                    type="text"
                    placeholder="e.g. Target IELTS Band 7.5+ or Oxford Full Grant"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>
              </div>

              {/* Registration Summary Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Selected Program:</span>
                  <span className="text-blue-600 font-extrabold">{finalCourseName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Campus Branch:</span>
                  <span className="font-semibold text-slate-900">{finalBranchName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Shift:</span>
                  <span className="font-semibold text-slate-900">{selectedShift}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !fullName.trim() || !phone.trim()}
                  className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Registering in Supabase...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Reserve Seat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Ticket Screen */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">Seat Reservation Confirmed!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you <strong className="text-slate-900">{fullName}</strong>. Your seat for <strong className="text-blue-600">{finalCourseName}</strong> has been successfully registered in Supabase.
                </p>
              </div>

              {/* Reservation Ticket Badge */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Ticket className="w-4 h-4 text-blue-600" />
                    <span>Official Registration Reference</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ref Code</span>
                    <p className="font-extrabold text-blue-600">{confirmedRegId}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Campus</span>
                    <p className="font-bold text-slate-900 truncate">{finalBranchName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Shift</span>
                    <p className="font-semibold text-slate-700 truncate">{selectedShift}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Contact</span>
                    <p className="font-semibold text-slate-700">{phone}</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Our academic advisor will contact you at {phone} within 15 minutes to confirm your diagnostic test time.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
              >
                Close & Return to Site
              </button>
            </div>
          )}

        </form>
      </motion.div>
    </div>
  );
};
