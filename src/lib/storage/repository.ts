'use client';

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
import {
  INITIAL_DEPARTMENTS,
  INITIAL_EMPLOYEES,
  INITIAL_REVIEW_CYCLES,
  INITIAL_OKRS,
  INITIAL_FEEDBACK,
  INITIAL_SELF_REFLECTIONS,
  INITIAL_MANAGER_NOTES,
  INITIAL_PERFORMANCE_REVIEWS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS
} from '@/lib/mock-data';

const STORAGE_KEYS = {
  DEPARTMENTS: 'reviewforge_departments',
  EMPLOYEES: 'reviewforge_employees',
  REVIEW_CYCLES: 'reviewforge_review_cycles',
  OKRS: 'reviewforge_okrs',
  FEEDBACK: 'reviewforge_feedback',
  SELF_REFLECTIONS: 'reviewforge_self_reflections',
  MANAGER_NOTES: 'reviewforge_manager_notes',
  PERFORMANCE_REVIEWS: 'reviewforge_performance_reviews',
  AUDIT_LOGS: 'reviewforge_audit_logs',
  SETTINGS: 'reviewforge_settings',
  ACTIVE_ROLE: 'reviewforge_active_role'
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('reviewforge_storage_updated'));
  } catch (err) {
    console.warn(`Error writing ${key} to localStorage:`, err);
  }
}

export class DataRepository {
  // Reset all to seed
  static resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(INITIAL_DEPARTMENTS));
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
    localStorage.setItem(STORAGE_KEYS.REVIEW_CYCLES, JSON.stringify(INITIAL_REVIEW_CYCLES));
    localStorage.setItem(STORAGE_KEYS.OKRS, JSON.stringify(INITIAL_OKRS));
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
    localStorage.setItem(STORAGE_KEYS.SELF_REFLECTIONS, JSON.stringify(INITIAL_SELF_REFLECTIONS));
    localStorage.setItem(STORAGE_KEYS.MANAGER_NOTES, JSON.stringify(INITIAL_MANAGER_NOTES));
    localStorage.setItem(STORAGE_KEYS.PERFORMANCE_REVIEWS, JSON.stringify(INITIAL_PERFORMANCE_REVIEWS));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, JSON.stringify('hr_admin'));
    window.dispatchEvent(new Event('reviewforge_storage_updated'));
  }

  // Active Role
  static getActiveRole(): UserRole {
    return safeGet<UserRole>(STORAGE_KEYS.ACTIVE_ROLE, 'hr_admin');
  }

  static setActiveRole(role: UserRole): void {
    safeSet(STORAGE_KEYS.ACTIVE_ROLE, role);
    this.addAuditLog('User', role, 'Switched Demo Role', `Role: ${role}`, `Switched perspective to ${role}`);
  }

  // Departments
  static getDepartments(): Department[] {
    return safeGet<Department[]>(STORAGE_KEYS.DEPARTMENTS, INITIAL_DEPARTMENTS);
  }

  // Employees
  static getEmployees(): Employee[] {
    return safeGet<Employee[]>(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }

  static getEmployeeById(id: string): Employee | undefined {
    return this.getEmployees().find(e => e.id === id);
  }

  static addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const list = this.getEmployees();
    const newEmp: Employee = {
      ...employee,
      id: `emp-${String(list.length + 1).padStart(3, '0')}`
    };
    list.unshift(newEmp);
    safeSet(STORAGE_KEYS.EMPLOYEES, list);
    this.addAuditLog('HR Admin', 'hr_admin', 'Added Employee', newEmp.name, `Created record ${newEmp.employeeNumber}`);
    return newEmp;
  }

  static updateEmployee(id: string, updates: Partial<Employee>): Employee | undefined {
    const list = this.getEmployees();
    const idx = list.findIndex(e => e.id === id);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...updates };
    safeSet(STORAGE_KEYS.EMPLOYEES, list);
    return list[idx];
  }

  // Review Cycles
  static getReviewCycles(): ReviewCycle[] {
    return safeGet<ReviewCycle[]>(STORAGE_KEYS.REVIEW_CYCLES, INITIAL_REVIEW_CYCLES);
  }

  static addReviewCycle(cycle: Omit<ReviewCycle, 'id' | 'completedReviewsCount'>): ReviewCycle {
    const list = this.getReviewCycles();
    const newCycle: ReviewCycle = {
      ...cycle,
      id: `cycle-${Date.now()}`,
      completedReviewsCount: 0
    };
    list.unshift(newCycle);
    safeSet(STORAGE_KEYS.REVIEW_CYCLES, list);
    this.addAuditLog('HR Admin', 'hr_admin', 'Created Review Cycle', newCycle.title, `Scheduled from ${newCycle.startDate} to ${newCycle.endDate}`);
    return newCycle;
  }

  static updateReviewCycle(id: string, updates: Partial<ReviewCycle>): ReviewCycle | undefined {
    const list = this.getReviewCycles();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...updates };
    safeSet(STORAGE_KEYS.REVIEW_CYCLES, list);
    return list[idx];
  }

  // OKRs
  static getOKRs(): OKR[] {
    return safeGet<OKR[]>(STORAGE_KEYS.OKRS, INITIAL_OKRS);
  }

  static getOKRsByEmployee(employeeId: string): OKR[] {
    return this.getOKRs().filter(o => o.employeeId === employeeId);
  }

  static addOKR(okr: Omit<OKR, 'id' | 'updatedAt'>): OKR {
    const list = this.getOKRs();
    const newOKR: OKR = {
      ...okr,
      id: `okr-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newOKR);
    safeSet(STORAGE_KEYS.OKRS, list);
    return newOKR;
  }

  static updateOKR(id: string, updates: Partial<OKR>): OKR | undefined {
    const list = this.getOKRs();
    const idx = list.findIndex(o => o.id === id);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
    safeSet(STORAGE_KEYS.OKRS, list);
    return list[idx];
  }

  // Feedback
  static getFeedback(): FeedbackItem[] {
    return safeGet<FeedbackItem[]>(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK);
  }

  static getFeedbackForEmployee(employeeId: string, viewingRole: UserRole = 'hr_admin'): FeedbackItem[] {
    const list = this.getFeedback().filter(f => f.targetEmployeeId === employeeId);
    // CRITICAL REQUIREMENT: If viewing as employee, mask anonymous feedback provider identities!
    if (viewingRole === 'employee') {
      return list.map(f => {
        if (f.isAnonymous) {
          return {
            ...f,
            providerEmployeeId: null,
            providerEmployeeName: 'Anonymous Colleague',
            providerRole: 'Peer (Anonymized)'
          };
        }
        return f;
      });
    }
    return list;
  }

  static addFeedback(feedback: Omit<FeedbackItem, 'id' | 'submittedAt'>): FeedbackItem {
    const list = this.getFeedback();
    const newItem: FeedbackItem = {
      ...feedback,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newItem);
    safeSet(STORAGE_KEYS.FEEDBACK, list);
    return newItem;
  }

  // Self Reflections
  static getSelfReflections(): SelfReflection[] {
    return safeGet<SelfReflection[]>(STORAGE_KEYS.SELF_REFLECTIONS, INITIAL_SELF_REFLECTIONS);
  }

  static getSelfReflectionByEmployee(employeeId: string): SelfReflection | undefined {
    return this.getSelfReflections().find(r => r.employeeId === employeeId);
  }

  static saveSelfReflection(reflection: Omit<SelfReflection, 'id' | 'submittedAt'>): SelfReflection {
    const list = this.getSelfReflections();
    const existingIdx = list.findIndex(r => r.employeeId === reflection.employeeId && r.reviewCycleId === reflection.reviewCycleId);
    const dateStr = new Date().toISOString().split('T')[0];
    if (existingIdx !== -1) {
      list[existingIdx] = { ...list[existingIdx], ...reflection, submittedAt: dateStr };
      safeSet(STORAGE_KEYS.SELF_REFLECTIONS, list);
      return list[existingIdx];
    } else {
      const newItem: SelfReflection = {
        ...reflection,
        id: `ref-${Date.now()}`,
        submittedAt: dateStr
      };
      list.unshift(newItem);
      safeSet(STORAGE_KEYS.SELF_REFLECTIONS, list);
      return newItem;
    }
  }

  // Manager Notes (STRICT PRIVACY: Hidden from employee)
  static getManagerNotes(viewingRole: UserRole = 'manager'): ManagerNote[] {
    // If viewing as employee, NEVER return private manager notes
    if (viewingRole === 'employee' || viewingRole === 'peer_reviewer') {
      return [];
    }
    return safeGet<ManagerNote[]>(STORAGE_KEYS.MANAGER_NOTES, INITIAL_MANAGER_NOTES);
  }

  static getManagerNotesForEmployee(employeeId: string, viewingRole: UserRole = 'manager'): ManagerNote[] {
    if (viewingRole === 'employee' || viewingRole === 'peer_reviewer') {
      return [];
    }
    return this.getManagerNotes(viewingRole).filter(n => n.employeeId === employeeId);
  }

  static addManagerNote(note: Omit<ManagerNote, 'id' | 'date'>): ManagerNote {
    const list = safeGet<ManagerNote[]>(STORAGE_KEYS.MANAGER_NOTES, INITIAL_MANAGER_NOTES);
    const newItem: ManagerNote = {
      ...note,
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isPrivateToManagers: true
    };
    list.unshift(newItem);
    safeSet(STORAGE_KEYS.MANAGER_NOTES, list);
    return newItem;
  }

  // Performance Reviews
  static getPerformanceReviews(): PerformanceReview[] {
    return safeGet<PerformanceReview[]>(STORAGE_KEYS.PERFORMANCE_REVIEWS, INITIAL_PERFORMANCE_REVIEWS);
  }

  static getPerformanceReviewById(id: string): PerformanceReview | undefined {
    return this.getPerformanceReviews().find(r => r.id === id);
  }

  static getPerformanceReviewForEmployee(employeeId: string): PerformanceReview | undefined {
    return this.getPerformanceReviews().find(r => r.employeeId === employeeId);
  }

  static savePerformanceReview(review: PerformanceReview): void {
    const list = this.getPerformanceReviews();
    const idx = list.findIndex(r => r.id === review.id);
    if (idx !== -1) {
      list[idx] = { ...review, lastUpdatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...review, lastUpdatedAt: new Date().toISOString() });
    }
    safeSet(STORAGE_KEYS.PERFORMANCE_REVIEWS, list);

    // Also update employee review status
    const emp = this.getEmployeeById(review.employeeId);
    if (emp) {
      let statusToSet = emp.reviewStatus;
      if (review.status === 'Approved') statusToSet = 'Approved';
      else if (review.status === 'Released') statusToSet = 'Released';
      else if (review.status === 'Pending Approval') statusToSet = 'Pending Approval';
      else if (review.status === 'Draft') statusToSet = 'In Progress';
      this.updateEmployee(review.employeeId, { reviewStatus: statusToSet });
    }
  }

  // Audit Logs
  static getAuditLogs(): AuditLogItem[] {
    return safeGet<AuditLogItem[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  static addAuditLog(actorName: string, actorRole: UserRole, action: string, target: string, details: string): void {
    const list = this.getAuditLogs();
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName,
      actorRole,
      action,
      target,
      details
    };
    list.unshift(newLog);
    if (list.length > 50) list.pop();
    safeSet(STORAGE_KEYS.AUDIT_LOGS, list);
  }

  // Organization Settings
  static getSettings(): OrganizationSettings {
    return safeGet<OrganizationSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  static updateSettings(settings: Partial<OrganizationSettings>): OrganizationSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    safeSet(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }
}

