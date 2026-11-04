'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { ManagerNote, ManagerNoteCategory } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import {
  StickyNote,
  Plus,
  Lock,
  ShieldCheck,
  Calendar,
  User,
  FolderKanban,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function ManagerNotesPage() {
  const { managerNotes, employees, addManagerNote, activeRole } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEmp, setSelectedEmp] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    employeeId: employees[1]?.id || 'emp-002',
    managerId: 'emp-001',
    managerName: 'Dr. Aris Thorne',
    title: '',
    category: 'Achievement' as ManagerNoteCategory,
    description: '',
    relatedProject: '',
    evidenceRef: ''
  });

  // Access check: only managers and HR admin should view this page
  const isAuthorized = activeRole === 'manager' || activeRole === 'hr_admin';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <EmptyState
          icon={<Lock className="w-8 h-8 text-[#9E2A2B]" />}
          title="Access Restricted: Confidential Manager Journal"
          description="Manager observations are strictly private and accessible only to managers and HR administrators. Switch your demo role to Manager or HR Administrator to access this view."
        />
      </div>
    );
  }

  const filteredNotes = managerNotes.filter(n => {
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    const matchesEmp = selectedEmp === 'all' || n.employeeId === selectedEmp;
    return matchesCat && matchesEmp;
  });

  const handleOpenAdd = () => {
    setFormData({
      employeeId: employees[1]?.id || 'emp-002',
      managerId: 'emp-001',
      managerName: 'Dr. Aris Thorne',
      title: 'Decisive Caching Architecture Implementation',
      category: 'Achievement',
      description:
        'Demonstrated strong technical depth when refactoring Redis caching layers. Resulted in 31.5% reduction in API response times.',
      relatedProject: 'API Performance & Gateway Architecture',
      evidenceRef: 'Q2 OKR Key Result 3 (31.5% Latency Gain)'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    addManagerNote({
      employeeId: formData.employeeId,
      managerId: formData.managerId,
      managerName: formData.managerName,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      relatedProject: formData.relatedProject,
      evidenceRef: formData.evidenceRef,
      isPrivateToManagers: true
    });

    setIsAddModalOpen(false);
  };

  const categoryBadgeVariant = (cat: ManagerNoteCategory) => {
    switch (cat) {
      case 'Achievement':
        return 'lime' as const;
      case 'Problem Solving':
        return 'blue' as const;
      case 'Leadership':
        return 'forest' as const;
      case 'Improvement':
        return 'amber' as const;
      default:
        return 'sage' as const;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Private Manager Observations
            </h1>
            <Badge variant="amber">Strictly Confidential</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Real-time journal of performance observations, incident triage notes, and coaching logs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Add Observation
        </Button>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 bg-[#FEF6E7] border border-[#FBDCA8] rounded-xl flex items-start gap-3.5 text-xs text-[#92540D]">
        <Lock className="w-5 h-5 shrink-0 mt-0.5 text-[#D97706]" />
        <div>
          <span className="font-bold">Confidential Manager Working Notes</span>
          <p className="mt-0.5 leading-relaxed text-[#92540D]/90">
            These records are stored securely and are never rendered on employee-facing profile tabs or reports. They serve as verified empirical backing when drafting reviews in the AI Review Studio.
          </p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Observation Categories</option>
            <option value="Achievement">Achievement</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Leadership">Leadership</option>
            <option value="Improvement">Improvement</option>
            <option value="Problem Solving">Problem Solving</option>
            <option value="Delivery">Delivery</option>
          </select>

          {/* Employee Filter */}
          <select
            value={selectedEmp}
            onChange={e => setSelectedEmp(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Team Members</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.jobTitle})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-[#747D75] font-medium">
          Showing {filteredNotes.length} Note(s)
        </span>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => {
            const employee = employees.find(e => e.id === note.employeeId);

            return (
              <Card key={note.id} className="flex flex-col justify-between hover:border-[#D0D4CA] transition-all">
                <CardHeader>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={categoryBadgeVariant(note.category)} dot>
                        {note.category}
                      </Badge>
                      {employee && (
                        <span className="text-xs font-semibold text-[#17251F]">
                          For: {employee.name}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-sm mt-1.5">{note.title}</CardTitle>
                  </div>
                  <span className="text-[11px] font-mono text-[#747D75]">{note.date}</span>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-xs text-[#202820] leading-relaxed">
                    {note.description}
                  </p>

                  {(note.relatedProject || note.evidenceRef) && (
                    <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs space-y-1">
                      {note.relatedProject && (
                        <div className="flex items-center gap-1.5 text-[#747D75]">
                          <FolderKanban className="w-3.5 h-3.5 text-[#5876D8]" />
                          <span>Project: <strong className="text-[#17251F]">{note.relatedProject}</strong></span>
                        </div>
                      )}
                      {note.evidenceRef && (
                        <div className="flex items-center gap-1.5 text-[#747D75]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5E1A]" />
                          <span>Linked Evidence: <strong className="text-[#17251F]">{note.evidenceRef}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <div className="flex items-center gap-1 text-[11px] text-[#747D75]">
                    <User className="w-3 h-3" />
                    <span>Logged by: {note.managerName}</span>
                  </div>
                  <span className="text-[10px] text-[#92540D] font-mono font-semibold">
                    Hidden from employee view
                  </span>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="md:col-span-2">
            <EmptyState
              icon={<StickyNote className="w-8 h-8 text-[#747D75]" />}
              title="No Manager Observations"
              description="No notes match your selected criteria."
            />
          </div>
        )}
      </div>

      {/* Add Observation Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record Private Observation"
        description="Log a private note or coaching observation for an employee."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Employee</label>
              <select
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.jobTitle})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as ManagerNoteCategory })}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              >
                <option value="Achievement">Achievement</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Leadership">Leadership</option>
                <option value="Improvement">Improvement</option>
                <option value="Problem Solving">Problem Solving</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#17251F] mb-1">Note Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Incident response during database failover..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#17251F] mb-1">Observation Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of what occurred, context, and impact..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Related Project (Optional)</label>
              <input
                type="text"
                value={formData.relatedProject}
                onChange={e => setFormData({ ...formData, relatedProject: e.target.value })}
                placeholder="e.g. Edge API Gateway Overhaul"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Evidence Reference (Optional)</label>
              <input
                type="text"
                value={formData.evidenceRef}
                onChange={e => setFormData({ ...formData, evidenceRef: e.target.value })}
                placeholder="e.g. Incident Post-Mortem #4892"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E6E8E1] flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Observation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

