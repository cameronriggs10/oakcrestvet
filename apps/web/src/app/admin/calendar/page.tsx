"use client";
import { useState } from "react";
import { Calendar, Clock, Settings, Plus, X, Save, ChevronLeft, ChevronRight, Users, Copy, AlertCircle } from "lucide-react";

type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

interface TimeSlot {
  start: string;
  end: string;
  type: string;
  maxPatients: number;
}

interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

interface VetSchedule {
  vetName: string;
  weekSchedule: Record<DayOfWeek, DaySchedule>;
  overrides: ScheduleOverride[];
}

interface ScheduleOverride {
  id: number;
  date: string;
  type: "closed" | "modified" | "added";
  reason: string;
  slots?: TimeSlot[];
}

const daysOfWeek: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels: Record<DayOfWeek, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
  thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday"
};

const appointmentTypes = [
  "Wellness Exam", "Sick Visit", "Vaccination", "Dental Cleaning",
  "Surgery", "Follow-up", "Emergency", "Drop-off"
];

const vets = ["Dr. Jim Tibbs", "Dr. Sarah Chen", "Dr. Mark Williams"];

const defaultSlot: TimeSlot = { start: "09:00", end: "10:00", type: "Wellness Exam", maxPatients: 1 };

function createDefaultWeekSchedule(): Record<DayOfWeek, DaySchedule> {
  const schedule: Record<string, DaySchedule> = {};
  daysOfWeek.forEach((day, i) => {
    if (i < 5) {
      schedule[day] = {
        enabled: true,
        slots: [
          { start: "09:00", end: "10:00", type: "Wellness Exam", maxPatients: 2 },
          { start: "10:00", end: "11:00", type: "Sick Visit", maxPatients: 2 },
          { start: "11:00", end: "12:00", type: "Vaccination", maxPatients: 3 },
          { start: "12:00", end: "13:00", type: "Lunch Break", maxPatients: 0 },
          { start: "13:00", end: "14:00", type: "Surgery", maxPatients: 1 },
          { start: "14:00", end: "15:00", type: "Wellness Exam", maxPatients: 2 },
          { start: "15:00", end: "16:00", type: "Follow-up", maxPatients: 3 },
          { start: "16:00", end: "17:00", type: "Drop-off", maxPatients: 2 },
        ]
      };
    } else {
      schedule[day] = { enabled: i === 5, slots: i === 5 ? [
        { start: "09:00", end: "10:00", type: "Wellness Exam", maxPatients: 2 },
        { start: "10:00", end: "11:00", type: "Sick Visit", maxPatients: 2 },
        { start: "11:00", end: "12:00", type: "Vaccination", maxPatients: 3 },
        { start: "12:00", end: "13:00", type: "Walk-in", maxPatients: 4 },
      ] : [] };
    }
  });
  return schedule;
}

export default function AdminCalendar() {
  const [selectedVet, setSelectedVet] = useState<string>("all");
  const [view, setView] = useState<"week" | "schedule" | "day">("schedule");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("monday");
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7 - today.getDay() + 1);
    return daysOfWeek.map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const [schedules, setSchedules] = useState<VetSchedule[]>(
    vets.map(v => ({
      vetName: v,
      weekSchedule: createDefaultWeekSchedule(),
      overrides: [
        { id: 1, date: "2025-07-04", type: "closed" as const, reason: "Independence Day" },
        { id: 2, date: "2025-05-26", type: "closed" as const, reason: "Memorial Day" },
      ],
    }))
  );

  const currentSchedule = schedules.find(s => s.vetName === selectedVet)!;
  const [editingDay, setEditingDay] = useState<DayOfWeek | null>(null);
  const [showOverride, setShowOverride] = useState(false);
  const [overrideDate, setOverrideDate] = useState("");
  const [overrideType, setOverrideType] = useState<"closed" | "modified" | "added">("closed");
  const [overrideReason, setOverrideReason] = useState("");
  const [applyToAll, setApplyToAll] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateSchedule = (day: DayOfWeek, field: keyof DaySchedule, value: any) => {
    setSchedules(prev => prev.map(s => {
      if (s.vetName !== selectedVet) return s;
      return { ...s, weekSchedule: { ...s.weekSchedule, [day]: { ...s.weekSchedule[day], [field]: value } } };
    }));
  };

  const updateSlot = (day: DayOfWeek, idx: number, field: keyof TimeSlot, value: any) => {
    setSchedules(prev => prev.map(s => {
      if (s.vetName !== selectedVet) return s;
      const slots = [...s.weekSchedule[day].slots];
      slots[idx] = { ...slots[idx], [field]: value };
      return { ...s, weekSchedule: { ...s.weekSchedule, [day]: { ...s.weekSchedule[day], slots } } };
    }));
  };

  const addSlot = (day: DayOfWeek) => {
    setSchedules(prev => prev.map(s => {
      if (s.vetName !== selectedVet) return s;
      const slots = [...s.weekSchedule[day].slots, { ...defaultSlot }];
      return { ...s, weekSchedule: { ...s.weekSchedule, [day]: { ...s.weekSchedule[day], slots } } };
    }));
  };

  const removeSlot = (day: DayOfWeek, idx: number) => {
    setSchedules(prev => prev.map(s => {
      if (s.vetName !== selectedVet) return s;
      const slots = s.weekSchedule[day].slots.filter((_, i) => i !== idx);
      return { ...s, weekSchedule: { ...s.weekSchedule, [day]: { ...s.weekSchedule[day], slots } } };
    }));
  };

  const copyToAllVets = (day: DayOfWeek) => {
    const sourceDay = currentSchedule.weekSchedule[day];
    setSchedules(prev => prev.map(s => ({
      ...s,
      weekSchedule: { ...s.weekSchedule, [day]: { ...sourceDay } }
    })));
  };

  const copyDayToAllDays = (day: DayOfWeek) => {
    const sourceDay = currentSchedule.weekSchedule[day];
    const newWeek = { ...currentSchedule.weekSchedule };
    daysOfWeek.forEach(d => {
      if (d !== day && newWeek[d].enabled) {
        newWeek[d] = { ...newWeek[d], slots: sourceDay.slots.map(s => ({ ...s })) };
      }
    });
    setSchedules(prev => prev.map(s => {
      if (s.vetName !== selectedVet) return s;
      return { ...s, weekSchedule: newWeek };
    }));
  };

  const addOverride = () => {
    if (!overrideDate) return;
    setSchedules(prev => prev.map(s => {
      if (!applyToAll && s.vetName !== selectedVet) return s;
      return {
        ...s,
        overrides: [...s.overrides, {
          id: Date.now(),
          date: overrideDate,
          type: overrideType,
          reason: overrideReason,
          slots: overrideType === "modified" ? [{ start: "09:00", end: "13:00", type: "Limited Hours", maxPatients: 2 }] : undefined
        }]
      };
    }));
    setShowOverride(false);
    setOverrideDate("");
    setOverrideReason("");
  };

  const removeOverride = (id: number) => {
    setSchedules(prev => prev.map(s => ({
      ...s,
      overrides: s.overrides.filter(o => o.id !== id)
    })));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const weekDates = getWeekDates();

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-sage-900">Calendar Management</h1>
          <p className="text-sm text-sage-500 mt-1">Set schedules, block dates, and manage hours per veterinarian</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
          <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Schedule"}
        </button>
      </div>

      <div className="p-8 space-y-6">
        {/* Vet Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-sage-400" />
              <span className="text-sm text-sage-600">Vet:</span>
            </div>
            <button onClick={() => setSelectedVet("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedVet === "all" ? "bg-primary-500 text-white" : "bg-white border border-sage-200 text-sage-700 hover:bg-sage-50"
              }`}>All Vets</button>
            {vets.map(v => (
              <button key={v} onClick={() => setSelectedVet(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedVet === v ? "bg-primary-500 text-white" : "bg-white border border-sage-200 text-sage-700 hover:bg-sage-50"
                }`}>{v}</button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs text-sage-500 cursor-pointer">
                <input type="checkbox" checked={excludeWeekends} onChange={e => setExcludeWeekends(e.target.checked)} className="rounded" />
                Hide Weekends
              </label>
              <div className="flex gap-0.5 border border-sage-200 rounded-lg overflow-hidden">
                <button onClick={() => setView("schedule")}
                  className={`px-2.5 py-1.5 text-[10px] font-medium ${view === "schedule" ? "bg-primary-50 text-primary-600" : "text-sage-500 hover:bg-sage-50"}`}>Weekly</button>
                <button onClick={() => setView("day")}
                  className={`px-2.5 py-1.5 text-[10px] font-medium ${view === "day" ? "bg-primary-50 text-primary-600" : "text-sage-500 hover:bg-sage-50"}`}>Daily</button>
                <button onClick={() => setView("week")}
                  className={`px-2.5 py-1.5 text-[10px] font-medium ${view === "week" ? "bg-primary-50 text-primary-600" : "text-sage-500 hover:bg-sage-50"}`}>Calendar</button>
              </div>
            </div>
          </div>

          {/* Day Selector for Daily View */}
          {view === "day" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-sage-500">Day:</span>
              {daysOfWeek.filter(d => !excludeWeekends || d !== "saturday" && d !== "sunday").map(d => (
                <button key={d} onClick={() => setSelectedDay(d)}
                  className={`px-3 py-1.5 text-xs rounded-lg ${selectedDay === d ? "bg-primary-500 text-white" : "bg-white border border-sage-200 text-sage-700"}`}>{dayLabels[d].substring(0,3)}</button>
              ))}
            </div>
          )}

        {view === "schedule" ? (
          <>
            {/* Overrides Banner */}
            {currentSchedule.overrides.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-amber-800 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Schedule Overrides</h3>
                  <button onClick={() => setShowOverride(true)} className="text-xs text-amber-700 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add Override</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentSchedule.overrides.map(o => (
                    <span key={o.id} className="inline-flex items-center gap-1 text-xs bg-white border border-amber-200 rounded-lg px-2.5 py-1">
                      {o.type === "closed" ? "🔴" : "🟡"} {o.date} - {o.reason}
                      <button onClick={() => removeOverride(o.id)} className="text-amber-400 hover:text-amber-600 ml-1"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Grid */}
            <div className={`grid grid-cols-1 gap-3 ${view === "day" ? "" : excludeWeekends ? "lg:grid-cols-5" : "lg:grid-cols-7"}`}>
              {(view === "day" ? [selectedDay] : daysOfWeek.filter(d => !excludeWeekends || (d !== "saturday" && d !== "sunday"))).flatMap((day) => {
                const showVets = selectedVet === "all" ? vets : [selectedVet];
                return showVets.map(vetName => {
                  const vetSchedule = schedules.find(s => s.vetName === vetName)!;
                  const daySch = vetSchedule?.weekSchedule[day];
                  if (!daySch) return [];
                  return (
                  <div key={day + vetName} className={`bg-white rounded-2xl border overflow-hidden ${
                    editingDay === day && selectedVet !== "all" ? 'ring-2 ring-primary-400 border-primary-300' : 'border-sage-100'
                  }`}>
                    <div className={`px-3 py-2 text-center ${daySch.enabled ? 'bg-primary-50' : 'bg-sage-50'}`}>
                      <p className="text-xs font-semibold text-sage-900">{dayLabels[day]}</p>
                      <p className="text-xs text-sage-500">{daySch.enabled ? 'Open' : 'Closed'}</p>
                    </div>

                    {editingDay === day ? (
                      <div className="p-2 space-y-2">
                        <label className="flex items-center gap-2 text-xs">
                          <input type="checkbox" checked={daySch.enabled} onChange={e => updateSchedule(day, "enabled", e.target.checked)} className="rounded" />
                          Open this day
                        </label>
                        {daySch.enabled && (
                          <>
                            {daySch.slots.map((slot, idx) => (
                              <div key={idx} className="bg-sage-50 rounded-lg p-2 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-sage-700">Slot {idx + 1}</span>
                                  <button onClick={() => removeSlot(day, idx)} className="text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  <input type="time" value={slot.start} onChange={e => updateSlot(day, idx, "start", e.target.value)}
                                    className="px-1.5 py-1 border border-sage-200 rounded text-xs" />
                                  <input type="time" value={slot.end} onChange={e => updateSlot(day, idx, "end", e.target.value)}
                                    className="px-1.5 py-1 border border-sage-200 rounded text-xs" />
                                </div>
                                <select value={slot.type} onChange={e => updateSlot(day, idx, "type", e.target.value)}
                                  className="w-full px-1.5 py-1 border border-sage-200 rounded text-xs">
                                  {appointmentTypes.map(t => <option key={t}>{t}</option>)}
                                </select>
                                <div className="flex items-center gap-1 text-xs">
                                  <span className="text-sage-500">Max:</span>
                                  <input type="number" value={slot.maxPatients} onChange={e => updateSlot(day, idx, "maxPatients", parseInt(e.target.value) || 0)}
                                    className="w-12 px-1.5 py-0.5 border border-sage-200 rounded text-xs" min={0} />
                                </div>
                              </div>
                            ))}
                            <button onClick={() => addSlot(day)} className="w-full py-1.5 text-xs text-primary-600 border border-dashed border-primary-200 rounded-lg hover:bg-primary-50">
                              <Plus className="w-3 h-3 inline" /> Add Time Slot
                            </button>
                          </>
                        )}
                        <div className="flex gap-1 pt-1">
                          <button onClick={() => setEditingDay(null)} className="flex-1 py-1 text-xs bg-primary-500 text-white rounded-lg">Done</button>
                          <button onClick={() => copyDayToAllDays(day)} className="px-2 py-1 text-xs bg-sage-100 text-sage-600 rounded-lg hover:bg-sage-200" title="Copy to all days">
                            <Copy className="w-3 h-3" />
                          </button>
                          <button onClick={() => copyToAllVets(day)} className="px-2 py-1 text-xs bg-sage-100 text-sage-600 rounded-lg hover:bg-sage-200" title="Copy to all vets">
                            <Users className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 space-y-1">
                        {daySch.enabled ? (
                          daySch.slots.length > 0 ? (
                            daySch.slots.slice(0, 4).map((slot, idx) => (
                              <div key={idx} className="text-[10px] text-sage-600 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 shrink-0" />
                                <span>{slot.start}-{slot.end}</span>
                                <span className="text-sage-400 ml-auto">{slot.type.substring(0, 8)}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-[10px] text-sage-400 text-center py-2">No slots set</p>
                          )
                        ) : (
                          <div className="text-[10px] text-red-400 text-center py-2">🔴 Closed</div>
                        )}
                        {daySch.enabled && daySch.slots.length > 4 && (
                          <p className="text-[10px] text-sage-400 text-center">+{daySch.slots.length - 4} more</p>
                        )}
                        <button onClick={() => setEditingDay(day)}
                          className="w-full mt-1 py-1 text-[10px] text-primary-600 hover:bg-primary-50 rounded transition-colors">
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Calendar View with Overrides */
          <div className="bg-white rounded-2xl border border-sage-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setWeekOffset(prev => prev - 1)} className="p-1.5 hover:bg-sage-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
              <h2 className="font-semibold text-sage-900">
                {weekDates[0]?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6]?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <button onClick={() => setWeekOffset(prev => prev + 1)} className="p-1.5 hover:bg-sage-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day, i) => {
                const date = weekDates[i];
                const dateStr = date?.toISOString().split('T')[0];
                const override = currentSchedule.overrides.find(o => o.date === dateStr);
                const daySch = currentSchedule.weekSchedule[day];

                return (
                  <div key={day} className={`rounded-xl p-2 min-h-[80px] ${
                    override ? (override.type === "closed" ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200')
                    : daySch.enabled ? 'bg-white border border-sage-200' : 'bg-sage-50 border border-sage-100'
                  }`}>
                    <p className="text-xs font-medium text-sage-900 mb-1">{date?.getDate()} {dayLabels[day].substring(0, 3)}</p>
                    {override ? (
                      <p className="text-[10px] text-red-600">{override.reason}</p>
                    ) : daySch.enabled ? (
                      <p className="text-[10px] text-green-600">{daySch.slots.length} slots</p>
                    ) : (
                      <p className="text-[10px] text-sage-400">Closed</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Override Modal */}
        {showOverride && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowOverride(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sage-900">Add Schedule Override</h3>
                <button onClick={() => setShowOverride(false)}><X className="w-4 h-4 text-sage-400" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Date</label>
                  <input type="date" value={overrideDate} onChange={e => setOverrideDate(e.target.value)} className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Type</label>
                  <select value={overrideType} onChange={e => setOverrideType(e.target.value as any)} className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm">
                    <option value="closed">Closed (Holiday/Off)</option>
                    <option value="modified">Modified Hours</option>
                    <option value="added">Extra Hours</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-sage-700 mb-1 block">Reason</label>
                  <input value={overrideReason} onChange={e => setOverrideReason(e.target.value)} placeholder="e.g., Independence Day" className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm" />
                </div>
                <label className="flex items-center gap-2 text-sm text-sage-700">
                  <input type="checkbox" checked={applyToAll} onChange={e => setApplyToAll(e.target.checked)} className="rounded" />
                  Apply to all veterinarians
                </label>
                <button onClick={addOverride} className="w-full py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                  Add Override
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}