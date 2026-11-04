'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  Department,
  Employee,
  ReviewCycle,
  OKR,
  FeedbackItem,
  SelfReflection,
  ManagerNote,
  PerformanceReview,
  AuditLogItem,
  OrganizationSettings,
  UserRole
} from '@/types';
import { DataRepository } from './repository';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextValue {
  isHydrated: boolean;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  departments: Department[];
  employees: Employee[];
  reviewCycles: ReviewCycle[];
  okrs: OKR[];
  feedback: FeedbackItem[];
  selfReflections: SelfReflection[];
  managerNotes: ManagerNote[];
  performanceReviews: PerformanceReview[];
  auditLogs: AuditLogItem[];
  settings: OrganizationSettings;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  refreshData: () => void;
  resetAllDemoData: () => void;
  // Mutations
  addEmployee: (employee: Omit<Employee, 'id'>) => Employee;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  addReviewCycle: (cycle: Omit<ReviewCycle, 'id' | 'completedReviewsCount'>) => ReviewCycle;
  updateReviewCycle: (id: string, updates: Partial<ReviewCycle>) => void;
  addOKR: (okr: Omit<OKR, 'id' | 'updatedAt'>) => OKR;
  updateOKR: (id: string, updates: Partial<OKR>) => void;
  addFeedback: (fb: Omit<FeedbackItem, 'id' | 'submittedAt'>) => FeedbackItem;
  saveSelfReflection: (ref: Omit<SelfReflection, 'id' | 'submittedAt'>) => SelfReflection;
  addManagerNote: (note: Omit<ManagerNote, 'id' | 'date'>) => ManagerNote;
  savePerformanceReview: (review: PerformanceReview) => void;
  updateSettings: (settings: Partial<OrganizationSettings>) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeRole, setActiveRoleState] = useState<UserRole>('hr_admin');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [reviewCycles, setReviewCycles] = useState<ReviewCycle[]>([]);
  const [okrs, setOkrs] = useState<OKR[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [selfReflections, setSelfReflections] = useState<SelfReflection[]>([]);
  const [managerNotes, setManagerNotes] = useState<ManagerNote[]>([]);
  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [settings, setSettings] = useState<OrganizationSettings>(DataRepository.getSettings());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const loadData = useCallback(() => {
    const role = DataRepository.getActiveRole();
    setActiveRoleState(role);
    setDepartments(DataRepository.getDepartments());
    setEmployees(DataRepository.getEmployees());
    setReviewCycles(DataRepository.getReviewCycles());
    setOkrs(DataRepository.getOKRs());
    setFeedback(DataRepository.getFeedback());
    setSelfReflections(DataRepository.getSelfReflections());
    setManagerNotes(DataRepository.getManagerNotes(role));
    setPerformanceReviews(DataRepository.getPerformanceReviews());
    setAuditLogs(DataRepository.getAuditLogs());
    setSettings(DataRepository.getSettings());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
      loadData();
    }, 0);

    const handleStorageUpdate = () => {
      loadData();
    };

    window.addEventListener('reviewforge_storage_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('reviewforge_storage_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [loadData]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const setActiveRole = useCallback((role: UserRole) => {
    DataRepository.setActiveRole(role);
    setActiveRoleState(role);
    loadData();
    const roleTitles: Record<UserRole, string> = {
      hr_admin: 'HR Administrator',
      manager: 'Manager',
      employee: 'Employee',
      peer_reviewer: 'Peer Reviewer'
    };
    showToast(`Switched perspective to ${roleTitles[role]}`, 'info');
  }, [loadData, showToast]);

  const resetAllDemoData = useCallback(() => {
    DataRepository.resetAll();
    loadData();
    showToast('Demo data restored to initial seed state', 'success');
  }, [loadData, showToast]);

  const addEmployee = useCallback((emp: Omit<Employee, 'id'>) => {
    const created = DataRepository.addEmployee(emp);
    loadData();
    showToast(`Added employee ${created.name}`, 'success');
    return created;
  }, [loadData, showToast]);

  const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
    DataRepository.updateEmployee(id, updates);
    loadData();
    showToast('Employee details updated', 'success');
  }, [loadData, showToast]);

  const addReviewCycle = useCallback((cycle: Omit<ReviewCycle, 'id' | 'completedReviewsCount'>) => {
    const created = DataRepository.addReviewCycle(cycle);
    loadData();
    showToast(`Created review cycle "${created.title}"`, 'success');
    return created;
  }, [loadData, showToast]);

  const updateReviewCycle = useCallback((id: string, updates: Partial<ReviewCycle>) => {
    DataRepository.updateReviewCycle(id, updates);
    loadData();
    showToast('Review cycle updated', 'success');
  }, [loadData, showToast]);

  const addOKR = useCallback((okr: Omit<OKR, 'id' | 'updatedAt'>) => {
    const created = DataRepository.addOKR(okr);
    loadData();
    showToast('New OKR objective registered', 'success');
    return created;
  }, [loadData, showToast]);

  const updateOKR = useCallback((id: string, updates: Partial<OKR>) => {
    DataRepository.updateOKR(id, updates);
    loadData();
    showToast('OKR progress updated', 'success');
  }, [loadData, showToast]);

  const addFeedback = useCallback((fb: Omit<FeedbackItem, 'id' | 'submittedAt'>) => {
    const created = DataRepository.addFeedback(fb);
    loadData();
    showToast('360° feedback submitted successfully', 'success');
    return created;
  }, [loadData, showToast]);

  const saveSelfReflection = useCallback((ref: Omit<SelfReflection, 'id' | 'submittedAt'>) => {
    const saved = DataRepository.saveSelfReflection(ref);
    loadData();
    showToast('Self-reflection saved successfully', 'success');
    return saved;
  }, [loadData, showToast]);

  const addManagerNote = useCallback((note: Omit<ManagerNote, 'id' | 'date'>) => {
    const created = DataRepository.addManagerNote(note);
    loadData();
    showToast('Private manager observation saved', 'success');
    return created;
  }, [loadData, showToast]);

  const savePerformanceReview = useCallback((review: PerformanceReview) => {
    DataRepository.savePerformanceReview(review);
    loadData();
    showToast(`Review for ${review.employeeName} saved (${review.status})`, 'success');
  }, [loadData, showToast]);

  const updateSettings = useCallback((newSettings: Partial<OrganizationSettings>) => {
    const updated = DataRepository.updateSettings(newSettings);
    loadData();
    showToast('Organization settings updated', 'success');
    return updated;
  }, [loadData, showToast]);

  const value: StoreContextValue = {
    isHydrated,
    activeRole,
    setActiveRole,
    departments,
    employees,
    reviewCycles,
    okrs,
    feedback,
    selfReflections,
    managerNotes,
    performanceReviews,
    auditLogs,
    settings,
    toasts,
    showToast,
    removeToast,
    refreshData: loadData,
    resetAllDemoData,
    addEmployee,
    updateEmployee,
    addReviewCycle,
    updateReviewCycle,
    addOKR,
    updateOKR,
    addFeedback,
    saveSelfReflection,
    addManagerNote,
    savePerformanceReview,
    updateSettings
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
