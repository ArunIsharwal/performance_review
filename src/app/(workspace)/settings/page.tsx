'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { UserRole, OrganizationSettings } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import {
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
    resetAllDemoData,
    activeRole,
    setActiveRole,
    auditLogs
  } = useStore();

  const [activeTab, setActiveTab] = useState('org');

  const [orgName, setOrgName] = useState(settings.name);
  const [industry, setIndustry] = useState(settings.industry);
  const [ratingScale, setRatingScale] = useState(settings.ratingScale);
  const [anonymityPolicy, setAnonymityPolicy] = useState(settings.anonymityPolicy);
  const [allowDirectRelease, setAllowDirectRelease] = useState(settings.allowEmployeeDirectRelease);
  const [requireDualSignoff, setRequireDualSignoff] = useState(settings.requireDualManagerSignoff);

  const [notifs, setNotifs] = useState(settings.notificationPreferences);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: orgName,
      industry,
      ratingScale,
      anonymityPolicy,
      allowEmployeeDirectRelease: allowDirectRelease,
      requireDualManagerSignoff: requireDualSignoff,
      notificationPreferences: notifs
    });
  };

  const tabs = [
    { id: 'org', label: 'Organization Profile' },
    { id: 'review-policies', label: 'Review & Feedback Governance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'demo', label: 'Demo Role & Sandbox Controls' },
    { id: 'audit', label: 'Security Audit Log' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Platform Settings & Governance
            </h1>
            <Badge variant="forest">Enterprise Admin</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Configure organization policies, rating rubrics, anonymity safeguards, and demo simulation state.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={() => {
            if (window.confirm('Reset all demo state to factory seed?')) {
              resetAllDemoData();
            }
          }}
        >
          Reset Demo Data
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <form onSubmit={handleSaveSettings}>
        {/* Tab 1: Org Profile */}
        {activeTab === 'org' && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  Enterprise identity and tenant settings
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">
                    Industry Domain
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#17251F] mb-1">
                  Default Performance Evaluation Scale
                </label>
                <select
                  value={ratingScale}
                  onChange={e => setRatingScale(e.target.value as OrganizationSettings['ratingScale'])}
                  className="w-full sm:w-72 px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                >
                  <option value="1-5 Numeric">1-5 Numeric (Recommended Enterprise Standard)</option>
                  <option value="1-4 Descriptive">1-4 Descriptive (Does Not Meet / Meets / Exceeds)</option>
                  <option value="Letter Scale">Letter Scale (A / B / C / D)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-[11px] text-[#747D75]">
                Persisted in local browser storage.
              </span>
              <Button type="submit" variant="primary" size="sm">
                Save Organization Profile
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Tab 2: Review & Feedback Governance */}
        {activeTab === 'review-policies' && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Review & Feedback Governance</CardTitle>
                <CardDescription>
                  Configure confidential notes, peer anonymity, and manager sign-off requirements
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-[#17251F]">
                  Peer Feedback Anonymity Policy
                </label>
                <select
                  value={anonymityPolicy}
                  onChange={e => setAnonymityPolicy(e.target.value as OrganizationSettings['anonymityPolicy'])}
                  className="w-full sm:w-72 px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                >
                  <option value="Strict Anonymity">Strict Anonymity (Provider ID never exposed to employee)</option>
                  <option value="Optional Anonymity">Optional Anonymity (Reviewer chooses per submission)</option>
                  <option value="Transparent">Transparent (All feedback attributed)</option>
                </select>
                <p className="text-[11px] text-[#747D75] mt-1">
                  Enforces UI filtering to ensure that confidential peer reviews cannot be deanonymized by employees.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6E8E1] space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                  <div>
                    <div className="font-semibold text-[#17251F]">
                      Require Dual Manager / Executive Calibration Sign-Off
                    </div>
                    <div className="text-[11px] text-[#747D75]">
                      Prevents reviews from being released until both direct manager and HR lead approve.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireDualSignoff}
                    onChange={e => setRequireDualSignoff(e.target.checked)}
                    className="w-4 h-4 accent-[#17251F] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                  <div>
                    <div className="font-semibold text-[#17251F]">
                      Allow Direct Automated Release of AI Drafts (Disabled by Default)
                    </div>
                    <div className="text-[11px] text-[#747D75]">
                      Strictly discouraged under Responsible AI guidelines to ensure human-in-the-loop oversight.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowDirectRelease}
                    onChange={e => setAllowDirectRelease(e.target.checked)}
                    className="w-4 h-4 accent-[#17251F] cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" variant="primary" size="sm">
                Save Governance Policies
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Simulate alerts and digest notifications across review milestones
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { key: 'emailOnCycleStart', label: 'Email alerts when review cycle launches' },
                { key: 'emailOnFeedbackRequest', label: 'Alert peer reviewers when feedback is requested' },
                { key: 'emailOnReviewReady', label: 'Notify evaluating managers when synthesis draft is ready' },
                { key: 'slackDigestWeekly', label: 'Weekly Slack digest for cycle completion bottlenecks' }
              ].map(item => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl"
                >
                  <span className="font-semibold text-[#17251F]">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(notifs[item.key as keyof typeof notifs])}
                    onChange={e =>
                      setNotifs({
                        ...notifs,
                        [item.key]: e.target.checked
                      })
                    }
                    className="w-4 h-4 accent-[#17251F] cursor-pointer"
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" variant="primary" size="sm">
                Save Notifications
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Tab 4: Demo Role & Sandbox Controls */}
        {activeTab === 'demo' && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Demo Simulation & Role Perspectives</CardTitle>
                <CardDescription>
                  Switch perspective to test role-based permissions and interface adaptations
                </CardDescription>
              </div>
              <Badge variant="lime">Active: {activeRole.toUpperCase()}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    role: 'hr_admin' as UserRole,
                    title: 'HR Administrator',
                    desc: 'Full org visibility, review cycles, calibration, final release.'
                  },
                  {
                    role: 'manager' as UserRole,
                    title: 'Evaluating Manager',
                    desc: 'Direct team reviews, private notes, approve/request changes.'
                  },
                  {
                    role: 'employee' as UserRole,
                    title: 'Employee',
                    desc: 'Own goals, submit self-reflection, released reviews only.'
                  },
                  {
                    role: 'peer_reviewer' as UserRole,
                    title: 'Peer Reviewer',
                    desc: 'Assigned 360 feedback requests, anonymity protected.'
                  }
                ].map(r => {
                  const isCurrent = activeRole === r.role;
                  return (
                    <div
                      key={r.role}
                      onClick={() => setActiveRole(r.role)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#17251F] bg-[#EEF9D1]'
                          : 'border-[#E6E8E1] bg-[#FAFBF8] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#17251F]">{r.title}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-[#17251F] bg-[#C8ED78] px-1.5 py-0.5 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#747D75] mt-1 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-[#FDF2F2] border border-[#F8C8C8] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#9E2A2B]">Reset Demo State</div>
                  <div className="text-[11px] text-[#9E2A2B]/80 mt-0.5">
                    Restores mock employees, OKRs, feedback, and reviews to pristine factory seed.
                  </div>
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Reset all demo data to seed?')) {
                      resetAllDemoData();
                    }
                  }}
                >
                  Reset Factory Seed
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 5: Security Audit Log */}
        {activeTab === 'audit' && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Immutable Security Audit Trail</CardTitle>
                <CardDescription>
                  Tracking administrative, managerial, and synthesizer actions
                </CardDescription>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#2C5E1A]" />
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#E6E8E1]">
                {auditLogs.map(log => (
                  <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#17251F]">{log.action}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {log.actorRole}
                        </Badge>
                      </div>
                      <p className="text-[#747D75] mt-0.5">
                        Target: <strong className="text-[#17251F]">{log.target}</strong> • {log.details}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-[#747D75] shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
